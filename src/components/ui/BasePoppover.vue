<template>
  <div ref="poppoverRef" class="poppover-area">
    <div ref="poppoverDialogRef" v-show="isShown" class="poppover" role="dialog">
      <slot name="content" />
    </div>
    <slot :open="open" name="button" />
  </div>
</template>

<script lang="ts" setup>
import globalUtils from '@/utils/global.utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isShown = ref(false)
const poppoverRef = ref<null | HTMLDivElement>(null)
const poppoverDialogRef = ref<null | HTMLDivElement>(null)
const closeTimeout = ref<number | null>(null)

const open = () => {
  closeTimeout.value = null
  if (isShown.value) {
    close()
  } else {
    isShown.value = true
  }
}
const close = () => {
  clearTimeout(closeTimeout.value!)
  poppoverDialogRef.value?.classList.add('close')
  setTimeout(() => {
    poppoverDialogRef.value?.classList.remove('close')
    isShown.value = false
  }, 1e3 / 2)
}
const isClickingOutside = ({ target }: Event) => {
  const element = target as HTMLElement
  globalUtils.isClickingOutside(element, poppoverRef.value!, (isFound) => {
    if (!isFound) {
      close()
    }
  })
}

onMounted(() => {
  window.addEventListener('click', isClickingOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', isClickingOutside)
})

defineExpose({
  open,
})
</script>

<style scoped>
div.poppover-area {
  position: relative;
}
div.poppover {
  position: absolute;
  top: 2.3em;
  z-index: 99;

  background-color: var(--white);
  box-shadow: 0 1px 28px 3px #b3b3b38c;
  border-radius: 20px;
  padding: 0.7em 1em;

  animation: poppover-appear 0.5s forwards;

  &.close {
    animation: poppover-disappear 0.5s forwards;
  }
}

@keyframes poppover-appear {
  from {
    opacity: 0;
    transform: translateY(0.5em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes poppover-disappear {
  to {
    opacity: 0;
    transform: translateY(0.5em);
  }
  from {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
