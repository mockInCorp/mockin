<template>
  <section>
    <h3>{{ $t('interview.beforeStart.title') }}</h3>

    <ul v-if="themes.length > 0">
      <li tabindex="0" v-for="theme in themes" :key="theme.id" @click="selectTheme(theme)">
        {{ theme.displayName }}
        <mdicon name="arrow-right" />
      </li>
    </ul>
    <BaseLoader v-else />
  </section>
</template>

<script lang="ts" setup>
import { useAPIRequestStore } from '@/stores/apiRequest'
import type { ITheme } from '@/types'
import globalUtils from '@/utils/global.utils'
import gql from 'graphql-tag'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseLoader from '../ui/BaseLoader.vue'

const { t } = useI18n()

globalUtils.setPageTitle(t('interview.beforeStart.pageTitle'))

const emit = defineEmits([
  'nextStep',
  'updateInterview',
  'updateQuestionFeedback',
  'setInterviewerAnswering',
  'selectTheme',
])
defineProps<{
  interview: unknown
  questionFeedback: unknown
  isInterviewerAnswering: unknown
  theme?: unknown
}>()

const themes = ref<ITheme[]>([])

const selectTheme = (t: unknown) => {
  emit('selectTheme', t)
  emit('nextStep')
}

onMounted(async () => {
  const response = await useAPIRequestStore().request<{ themes: ITheme[] }>({
    type: 'QUERY',
    document: gql`
      query InterviewTheme {
        themes {
          displayName
          id
        }
      }
    `,
  })
  themes.value = response.themes
})
</script>

<style scoped>
h3 {
  margin-top: 0.5em;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
  list-style-type: none;

  & > li {
    box-shadow: var(--shadow-settings-1);
    padding: 1em 1em;
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.5s ease;
    position: relative;

    & > span {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      right: 1em;
    }

    &:hover {
      background-color: var(--primary);
      color: var(--white);
    }
  }
}
</style>
