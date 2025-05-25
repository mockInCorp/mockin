<template>
  <div
    ref="toastRef"
    v-show="toast"
    class="toast"
    :class="toast?.level?.toLowerCase()"
    role="banner"
  >
    <mdicon :size="50" class="icon" :name="ICON_MAPPER[toast?.level!]" />
    <div class="content">
      <h3>{{ toast?.title }}</h3>
      <h4 v-show="toast?.subtitle">{{ toast?.subtitle }}</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export type TToastLevel = 'SUCCESS' | 'WARNING' | 'INFO' | 'ERROR'

interface IToastParams {
  title: string
  subtitle?: string
  level: TToastLevel
}

const ICON_MAPPER: Record<TToastLevel, string> = {
  SUCCESS: 'check-circle',
  ERROR: 'close-circle',
  INFO: 'information',
  WARNING: 'alert',
}

const TIMEOUT = 3e3

const toast = ref<IToastParams | null>(null)
const timeoutId = ref<number>(0)
const toastRef = ref<undefined | HTMLElement>(undefined)

const close = () => {
  toastRef?.value?.classList?.add('close')
  setTimeout(() => {
    toastRef?.value?.classList?.remove('close')
    toast.value = null
  }, 1e3 / 2)
}

window.toast = (params) => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
  toast.value = params
  timeoutId.value = setTimeout(() => {
    close()
  }, TIMEOUT)
}
</script>

<style scoped>
div.toast {
  z-index: 9999999;
  position: fixed;
  top: 2em;
  right: 0;

  background-color: white;
  box-shadow: 0 2px 7px #d0d0d06b;

  padding: 1em 2em;
  padding-left: 0.8em;

  width: 30em;

  border-left: 5px solid var(--gray-2);
  background-color: var(--white);

  display: flex;
  align-items: center;
  gap: 1em;

  animation: toast-appear 1s forwards;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  & h3 {
    font-family: 'spacegrotesk-bold', sans-serif;
  }
  & h4 {
    margin-top: -0.3em;
    color: var(--gray-1);
  }

  &.close {
    animation: toast-disappear 1s forwards;
  }

  &.error {
    border-color: var(--red);
    color: var(--red);
  }
  &.warning {
    border-color: var(--orange);
    color: var(--orange);
  }
  &.info,
  &.success {
    border-color: var(--primary);
    color: var(--primary);
  }
}

@media screen and (max-width: 538px) {
  div.toast {
    width: 20em;
  }
}

@keyframes toast-appear {
  from {
    right: -300em;
  }
  to {
    right: 0;
  }
}
@keyframes toast-disappear {
  from {
    right: 0;
  }
  to {
    right: -300em;
  }
}
</style>
