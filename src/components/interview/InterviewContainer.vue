<template>
  <div class="container">
    <header>
      <template v-if="step === 0">
        <BaseButton
          :link="{ name: 'home' }"
          type="thirdery"
          icon="arrow-left"
          :text="$t('interview.homeButton')"
        />
      </template>
      <template v-else-if="step === 1">
        <BaseButton
          @click="cancel"
          type="thirdery"
          level="warning"
          icon="close"
          :text="$t('interview.cancelButton')"
        />
        <h5>
          {{ $t('interview.questionsOutOf', [interview?.answerCount, interview?.maxAnswerCount]) }}
        </h5>
      </template>
      <template v-else-if="step === 2">
        <h2>{{ $t('interview.recap.title') }}</h2>
      </template>
    </header>

    <KeepAlive>
      <component
        :interview="interview"
        :question-feedback="questionFeedback"
        :is-interviewer-answering="isInterviewerAnswering"
        @update-question-feedback="updateQuestionFeedback"
        @set-interviewer-answering="setInterviewerAnswering"
        @update-interview="updateInterview"
        @next-step="nextStep"
        :is="{ ...interviewComponent }"
      />
    </KeepAlive>

    <footer v-if="step === 1">
      {{ $t('interview.myData.0') }}
      <RouterLink :to="{ name: 'legal.privacy-policy' }">
        {{ $t('interview.myData.1') }}
      </RouterLink>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import InterviewBeforeStart from './InterviewBeforeStart.vue'
import InterviewInterface from './InterviewInProgress.vue'
import { useAPIRequestStore } from '@/stores/apiRequest'

import gql from 'graphql-tag'
import type { IInterviewCache, IInterviewQuestionFeedback } from '@/types'

import InterviewRecap from './InterviewRecap.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const step = ref(0)
const steps = ref([InterviewBeforeStart, InterviewInterface, InterviewRecap])

const interview = ref<IInterviewCache | undefined>(undefined)
const isInterviewerAnswering = ref(false)
const questionFeedback = ref<IInterviewQuestionFeedback | null>(null)

const interviewComponent = computed(() => steps.value[step.value])
const cancel = () => {
  window.confirmModal({
    title: 'Êtes-vous sûr de vouloir abandonner',
    description: 'Cette action est irreversible.',
    onConfirm: async () => {
      await useAPIRequestStore().request({
        type: 'MUTATION',
        document: gql`
          mutation GiveUpInterview($id: ID!) {
            giveupInterview(id: $id) {
              id
            }
          }
        `,
        variables: {
          id: interview.value?.id,
        },
      })
      step.value = 2
    },
  })
}

const nextStep = async () => {
  step.value++
  if (step.value === 1) {
    try {
      const response = await useAPIRequestStore().request<{
        startInterview: IInterviewCache
      }>({
        type: 'MUTATION',
        document: gql`
          mutation StartInterview {
            startInterview {
              id
              status
              question

              answerCount
              maxAnswerCount
            }
          }
        `,
      })
      interview.value = response.startInterview
    } catch (e) {
      console.error(e)
    }
  }
}
const updateInterview = (props: Partial<IInterviewCache>) => {
  if (interview.value) {
    interview.value = { ...interview.value, ...props }
  }
}
const updateQuestionFeedback = (feedback: IInterviewQuestionFeedback) => {
  questionFeedback.value = feedback
}
const setInterviewerAnswering = (isAnswering: boolean) => {
  isInterviewerAnswering.value = isAnswering
}
</script>

<style scoped>
header {
  border-bottom: 1px solid var(--gray-3);
  padding-bottom: 1em;
}
div.container {
  margin: 4em auto;
  width: 50em;
  border-radius: 20px;
  padding: 1em 2em;
  box-shadow: var(--shadow-settings-1);
}
div.container > header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > h5 {
    color: var(--gray-1);
  }
}
div.container footer {
  text-align: end;
  padding-top: 1.5em;
  color: var(--gray-1);

  & > a {
    color: var(--black-1);
  }
}
</style>
