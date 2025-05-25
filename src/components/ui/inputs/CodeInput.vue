<template>
  <div class="area">
    <span>Code à 6 chiffres</span>
    <div class="code-input">
      <input
        v-for="(_, index) in code"
        :key="index"
        type="text"
        maxlength="1"
        v-model="code[index]"
        @input="onInput(index, $event)"
        @paste="onPaste"
        @keydown.backspace="onBackspace(index, $event)"
        ref="inputRefs"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const code = ref(Array(6).fill(''))
const inputRefs = ref<HTMLInputElement[]>([])
const model = defineModel({ type: String })

watch(
  code,
  (value) => {
    model.value = value.join('')
  },
  { deep: true },
)

const onInput = (index: number, event: Event) => {
  let value = (event.target! as HTMLInputElement).value
  if (value.length > 1) {
    ;(event.target as HTMLInputElement).value = value.substring(0, 1)
  }
  const [first, ...rest] = value
  value = first ?? ''

  const lastInputBox = index === inputRefs.value.length - 1
  const didInsertContent = first !== undefined

  if (didInsertContent && !lastInputBox) {
    inputRefs.value[index + 1].focus()
    inputRefs.value[index + 1].value = rest.join('')
    inputRefs.value[index + 1].dispatchEvent(new Event('input'))
  }
}
const onPaste = (event: ClipboardEvent) => {
  // TODO: fix le paste (fonctionne pas)
}

const onBackspace = (index: number, event: Event) => {
  const value = (event.target! as HTMLInputElement).value
  if (value === '') {
    inputRefs.value[Math.max(0, index - 1)]?.focus()
  }
}
</script>

<style scoped>
div.area {
  margin: 1em 0;
  display: flex;
  flex-direction: column;
}
span {
  margin-bottom: 0.5em;
  display: block;
  text-align: center;
}
div.code-input {
  display: flex;
  gap: 0.5em;
  justify-content: center;

  & > input {
    height: 3em;
    width: 3em;
    border-radius: 15px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
