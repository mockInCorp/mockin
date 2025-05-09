<template>
  <div ref="modalRef" role="dialog" class="modal">
    <div class="center">
      <header>
        <h3>{{ title }}</h3>
        <BaseButton class="close" @click="close" icon="close" type="thirdery" />
      </header>

      <slot :closeModal="close" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseButton from './BaseButton.vue'

defineProps<{ title: string }>()

const emit = defineEmits(['close'])
const modalRef = ref<HTMLDivElement | undefined>(undefined)

const clickingOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target === modalRef.value) {
    close()
  }
}

const close = () => {
  modalRef.value?.classList?.add('close')
  setTimeout(() => {
    modalRef?.value?.classList?.remove('close')
    emit('close')
  }, 5e2 / 2)
}

onMounted(() => {
  window.addEventListener('mousedown', (event) => clickingOutside(event))
})
onBeforeUnmount(() => {
  window.removeEventListener('mousedown', (event) => clickingOutside(event))
})
</script>

<style scoped>
button.close {
  padding: 0.5em 0.5em !important;
}
div.modal[role='dialog'] {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  z-index: 9999999;

  animation: modal-open 0.5s forwards;
  &.close {
    animation: modal-close 0.5s forwards;
  }
}

div.modal[role='dialog'] > div.center {
  background-color: var(--white);
  width: 35em;
  padding: 2em 2em;
  border-radius: 20px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media screen and (max-width: 522px) {
  div.modal[role='dialog'] > div.center {
    width: 27em;
  }
}

div.modal[role='dialog'] > div.center > header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;

  & > h2 {
    font-family: 'poppins-bold', sans-serif;
  }

  & > button {
    border-radius: 100px;
    padding: 0.5em 0.9em;
    user-select: none;
  }
}

@keyframes modal-open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
