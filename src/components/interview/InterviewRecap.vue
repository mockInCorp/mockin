<template>
  <div v-if="isLoading" class="loader">
    <BaseLoader :size="5" :thickness="3" />
  </div>
  <template v-else-if="recapInterview">
    <!-- TODO: recap css (ça rend geudin) -->
    <ul>
      <li>
        Status:
        <span :class="recapInterview.status.toLowerCase()">
          {{ $t('interview.status.' + recapInterview.status) }}
        </span>
      </li>
      <li>Date de début: {{ $d(recapInterview.startedAt, 'long') }}</li>
      <li>Date de fin: {{ $d(recapInterview.endedAt, 'long') }}</li>
    </ul>

    <InterviewInProgressFeedback :feedback="recapInterview.globalFeedback" />

    <h4>Commentaire de l'interviewer</h4>
    <quote>
      {{ recapInterview.feedbackComment }}
    </quote>

    <BaseButton
      icon="arrow-right"
      icon-position="right"
      type="thirdery"
      :link="{ name: 'interview' }"
      text="Retour à l'accueil"
    />
  </template>
</template>

<script lang="ts" setup>
import { useAPIRequestStore } from '@/stores/apiRequest'
import type { IInterview, IInterviewCache } from '@/types'
import globalUtils from '@/utils/global.utils'
import gql from 'graphql-tag'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseLoader from '../ui/BaseLoader.vue'
import InterviewInProgressFeedback from './InterviewInProgressFeedback.vue'
import BaseButton from '../ui/BaseButton.vue'

const { t } = useI18n()

globalUtils.setPageTitle(t('interview.recap.title'))

defineEmits(['nextStep', 'updateInterview', 'updateQuestionFeedback', 'setInterviewerAnswering'])
const props = defineProps<{
  interview: IInterviewCache
  questionFeedback: unknown
  isInterviewerAnswering: unknown
  theme?: unknown
}>()

const recapInterview = ref<Omit<IInterview, 'questions'> | null>(null)
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const response = await useAPIRequestStore().request<{
      interview: Omit<IInterview, 'questions'>
    }>({
      type: 'QUERY',
      document: gql`
        query Interview($id: ID!) {
          interview(id: $id) {
            endedAt
            globalFeedback {
              clarity
              conciseness
              structure
              confidence
              isRevelant
            }
            id
            startedAt
            status
          }
        }
      `,
      variables: { id: props.interview?.id },
    })
    recapInterview.value = response.interview
  } catch (e) {
    console.error(e)
    const error = e as Error
    window.toast({
      level: 'ERROR',
      title: error.message,
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.loader {
  margin-top: 1em;
}
</style>
