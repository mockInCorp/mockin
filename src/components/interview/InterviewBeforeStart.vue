<template>
  <section>
    <h3>{{ $t('interview.beforeStart.title') }}</h3>

    <ul>
      <li tabindex="0" v-for="theme in themes" :key="theme.id" @click="selectTheme(theme.id)">
        {{ theme.name }}
        <mdicon name="arrow-right" />
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import globalUtils from '@/utils/global.utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

globalUtils.setPageTitle(t('interview.beforeStart.pageTitle'))

const emit = defineEmits([
  'nextStep',
  'updateInterview',
  'updateQuestionFeedback',
  'setInterviewerAnswering',
])
defineProps<{ interview: unknown; questionFeedback: unknown; isInterviewerAnswering: unknown }>()

const themes = ref([{ id: 'GEN', name: 'Général' }])
const selectTheme = (id: string) => {
  console.log(id)
  emit('nextStep')
}
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
