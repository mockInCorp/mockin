<template>
  <ul>
    <li>
      <mdicon :name="getIcon(feedback?.clarity!)" />
      <span>{{ $t('interview.interface.feedback.clarity') }}</span>
      <span>{{ feedback?.clarity }}/5</span>
    </li>
    <li>
      <mdicon :name="getIcon(feedback?.conciseness!)" />
      <span>{{ $t('interview.interface.feedback.conciseness') }}</span>
      <span>{{ feedback?.conciseness }}/5</span>
    </li>
    <li>
      <mdicon :name="getIcon(feedback?.structure!)" />
      <span>{{ $t('interview.interface.feedback.structure') }}</span>
      <span>{{ feedback?.structure }}/5</span>
    </li>
    <li>
      <mdicon :name="getIcon(feedback?.confidence!)" />
      <span>{{ $t('interview.interface.feedback.confidence') }}</span>
      <span>{{ feedback?.confidence }}/5</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { IFeedback } from './InterviewInProgress.vue'

defineProps<{
  feedback: IFeedback | null
}>()

const getIcon = (score: number) => {
  if (score > 0 && score < 3) {
    return 'emoticon-sad'
  } else if (score >= 2 && score < 4) {
    return 'emoticon-neutral'
  }
  return 'emoticon'
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-size: 0.9em;
}
li {
  display: flex;
  align-items: center;
  gap: 1em;

  font-size: 0.8em;
  font-family: 'manrope-regular', sans-serif;

  & > span:last-of-type {
    background-color: var(--primary);
    padding: 0.3em 0.7em;
    border-radius: 100px;
    color: white;
  }
}
</style>
