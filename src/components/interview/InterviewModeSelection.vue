<template>
  <h3>{{ $t('interview.modeSelection.title') }}</h3>
  <p>{{ $t('interview.modeSelection.subtitle') }}</p>

  <ul>
    <li :class="{ active: selectedMode === 'voice' }" @click="selectedMode = 'voice'">
      <mdicon :size="130" name="account-voice" />
      <span class="recommanded">{{ $t('interview.modeSelection.recommanded') }}</span>
      <h4>{{ $t('interview.modeSelection.modes.0.title') }}</h4>
      <p>{{ $t('interview.modeSelection.modes.0.description') }}</p>
    </li>
    <li :class="{ active: selectedMode === 'text' }" @click="selectedMode = 'text'">
      <mdicon :size="130" name="text-box" />
      <h4>{{ $t('interview.modeSelection.modes.1.title') }}</h4>
      <p>{{ $t('interview.modeSelection.modes.1.description') }}</p>
    </li>
  </ul>
  <BaseButton
    :disabled="!selectedMode"
    type="thirdery"
    icon="arrow-right"
    icon-position="right"
    :text="$t('interview.modeSelection.start')"
    @click="nextStep"
    level="extra-warning"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import globalUtils from '@/utils/global.utils'
import { useI18n } from 'vue-i18n'

const selectedMode = ref<undefined | string>(undefined)

const { t } = useI18n()
const emit = defineEmits(['nextStep', 'sendData'])
defineProps<{ data: Record<string, unknown> }>()

globalUtils.setPageTitle(t('interview.modeSelection.pageTitle'))

const nextStep = () => {
  emit('sendData', { mode: selectedMode.value })
  emit('nextStep')
}
</script>

<style scoped>
h5 {
  color: var(--gray-1);
  margin-bottom: 0.5em;
}
h3 {
  margin-top: 0.7em;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 1em;
  margin-top: 2.5em;
}
span.recommanded {
  background-color: var(--primary-4);
  border-radius: 100px;
  padding: 0.5em 1em;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
ul li {
  box-shadow: var(--shadow-settings-1);
  border-radius: 20px;
  padding: 1.5em 2em;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;

  user-select: none;
  &:is(:hover, .active) {
    background-color: var(--primary-4);
  }

  & span {
    color: var(--primary);
  }
}
button {
  margin-left: auto;
  margin-top: 1em;
}
</style>
