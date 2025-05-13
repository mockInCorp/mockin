<template>
  <h2 class="question">
    <template v-if="isInterviewerAnswering">
      <BaseLoader :thickness="3" :size="1.5" />
    </template>
    <template v-else>
      <span>{{ currentQuestion }}</span>
      <BasePoppover v-if="questionFeedback">
        <template #content>
          <InterviewInProgressFeedback :feedback="questionFeedback" />
        </template>
        <template v-slot:button="{ open }">
          <BaseButton @click="open" icon="comment-quote" type="thirdery" />
        </template>
      </BasePoppover>
    </template>
  </h2>

  <div class="choices">
    <div :style="{ left: feedbackType === 'voice' ? '48%' : '-3px' }" class="slider" />
    <div
      tabindex="0"
      @click="feedbackType = 'text'"
      class="item"
      :class="{ active: feedbackType === 'text' }"
    >
      <mdicon name="pencil-outline" /> {{ $t('interview.interface.choices.0.label') }}
    </div>
    <div
      tabindex="0"
      @click="feedbackType = 'voice'"
      class="item"
      :class="{ active: feedbackType === 'voice' }"
    >
      <mdicon name="microphone" /> {{ $t('interview.interface.choices.1.label') }}
    </div>
  </div>

  <template v-if="feedbackType === 'text'">
    <textarea
      v-model="textFeedback"
      ref="textareaRef"
      :placeholder="`${$t('interview.interface.choices.0.placeholder')}...`"
    />
    <span class="chars-min"
      >{{ MIN_TEXT_CHARS }} {{ $t('interview.interface.choices.0.min') }}.</span
    >
  </template>
  <template v-else>
    <template v-if="isMicrophoneAllowed">
      <div class="voice-area">
        <BaseButton
          :class="{ capture: volume > 1 }"
          @click="!isAudioAvailable && toggleAudio()"
          :icon="isRecording ? 'stop' : isAudioAvailable ? 'check' : 'microphone'"
          :icon-size="40"
          type="thirdery"
        />

        <p v-if="!isRecording && !isAudioAvailable" class="advise">
          {{ $t('interview.interface.choices.1.advices.default.0') }} <mdicon name="microphone" />
          {{ $t('interview.interface.choices.1.advices.default.1') }}.
        </p>
        <p class="recording" v-else-if="isAudioAvailable">
          {{ $t('interview.interface.choices.1.recorded') }}
        </p>
        <p class="recording" v-else>{{ $t('interview.interface.choices.1.recording') }}...</p>
      </div>
    </template>
    <template v-else>
      <BaseBanner
        class="error-banner"
        :text="$t('interview.interface.choices.1.microphoneNotAllowed')"
        level="error"
      />
    </template>
  </template>

  <BaseButton
    :disabled="isDisabled"
    @click="sendAnswer"
    class="validate"
    :text="$t(`interview.interface.${interview?.isFinished ? 'sendResults' : 'validateAnswer'}`)"
    :icon="interview?.isFinished ? 'eye' : 'check'"
    icon-position="right"
  />
</template>

<script lang="ts" setup>
import gql from 'graphql-tag'

import { computed, ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import globalUtils from '@/utils/global.utils'

import { useAPIRequestStore } from '@/stores/apiRequest'
import useLocalStream from '@/composables/useLocalStream'

import BaseButton from '../ui/BaseButton.vue'
import BaseBanner from '../ui/BaseBanner.vue'
import BaseLoader from '../ui/BaseLoader.vue'

import InterviewInProgressFeedback from './InterviewInProgressFeedback.vue'
import BasePoppover from '../ui/BasePoppover.vue'

import type { IInterviewCache, IInterviewQuestionFeedback } from '@/types'

const { t } = useI18n()

const MIN_TEXT_CHARS = 1

globalUtils.setPageTitle(t('interview.interface.pageTitle'))

const emit = defineEmits([
  'nextStep',
  'updateInterview',
  'updateQuestionFeedback',
  'setInterviewerAnswering',
  'selectTheme',
])

const props = defineProps<{
  interview?: IInterviewCache
  questionFeedback: IInterviewQuestionFeedback | null
  isInterviewerAnswering: boolean
  theme?: unknown
}>()
const data = toRef(() => props.interview)

const feedbackType = ref('text')
const textFeedback = ref('')

const currentQuestion = ref('')

const isDisabled = computed(() => {
  if (props.isInterviewerAnswering) {
    return true
  }
  if (feedbackType.value === 'text') {
    return textFeedback.value.trim().length < MIN_TEXT_CHARS
  } else if (feedbackType.value === 'voice') {
    return !isAudioAvailable.value
  }
  return true
})

watch(
  data,
  (value) => {
    currentQuestion.value = value?.question as string
  },
  { deep: true, immediate: true, once: true },
)

const {
  isMicrophoneAllowed,
  isAudioAvailable,
  isRecording,
  volume,
  reset: resetAudio,
  toggle: toggleAudio,
  getAudio,
} = useLocalStream()

const sendAnswer = async () => {
  if (props.interview?.isFinished) {
    emit('nextStep')
    return
  }

  const interviewId = props.interview?.id

  emit('setInterviewerAnswering', true)
  emit('updateQuestionFeedback', null)

  try {
    const { answerInterviewQuestion } = await useAPIRequestStore().request<{
      answerInterviewQuestion: {
        nextQuestion: string
        feedback: IInterviewQuestionFeedback
        isOver: boolean
      }
    }>({
      type: 'MUTATION',
      document: gql`
        mutation Answer($id: ID!, $input: AnswerInterviewQuestionInput!) {
          answerInterviewQuestion(id: $id, input: $input) {
            nextQuestion
            isOver
            feedback {
              clarity
              conciseness
              confidence
              isRevelant
              structure
            }
          }
        }
      `,
      variables: {
        id: interviewId,
        input: {
          feedbackType: feedbackType.value.toUpperCase(),
          ...(feedbackType.value === 'text' && { text: textFeedback.value }),
          ...(feedbackType.value === 'voice' && { audio: getAudio() }),
        },
      },
    })
    emit('updateInterview', {
      answerCount: props.interview!.answerCount! + 1,
      isFinished: answerInterviewQuestion.isOver,
      question: answerInterviewQuestion.nextQuestion,
    })
    emit('updateQuestionFeedback', answerInterviewQuestion.feedback)
  } catch (e) {
    console.error(e)
  } finally {
    textFeedback.value = ''
    resetAudio()
    emit('setInterviewerAnswering', false)
  }
}
</script>

<style scoped>
h2 {
  font-family: 'manrope-bold', sans-serif;
  color: var(--primary-2);
  font-size: 1.4em;
  margin-top: 1em;
  margin-bottom: 0.5em;

  display: flex;
  align-items: center;
  gap: 1em;

  & > span {
    animation: appear 0.5s forwards;
  }

  & > span.wait {
    color: var(--gray-1);
    font-family: 'manrope-medium', sans-serif;
  }
}
h4 {
  margin-bottom: 0.5em;
}
textarea {
  margin-bottom: 0.5em;
}

div.error-banner {
  margin-top: 2em;
}
div.voice-area {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 2.5em;
  align-items: center;

  & > button {
    background-color: var(--primary-4);
    padding: 1em 1em;
    transition: all 0.1s ease;

    &.capture {
      transform: scale(1.15);
    }
  }

  & > p.advise {
    color: var(--gray-1);
  }
  & > p.recording {
    color: var(--primary);
    font-family: 'manrope-bold', sans-serif;
  }
}
span.chars-min {
  color: var(--gray-1);
}
button.validate {
  margin-top: 1em;
  margin-left: auto;
}
div.choices {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 1em auto;

  border: 1px solid var(--gray-1);
  border-radius: 100px;
  width: fit-content;

  position: relative;
  font-family: 'manrope-medium', sans-serif;

  & > div.slider {
    width: 53%;
    height: 2.9em;
    border-radius: 100px;
    border: 3px solid var(--primary);

    position: absolute;
    top: -3px;

    cursor: pointer;
    transition: all 0.5s ease;
  }

  & > div.item {
    padding: 0.5em 1em;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    color: var(--gray-1);

    text-transform: capitalize;
    transition: all 0.5s ease;

    &.active {
      color: var(--primary);
      border-color: var(--primary);
    }
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
