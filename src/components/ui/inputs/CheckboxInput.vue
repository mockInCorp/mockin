<template>
  <div class="checkbox form-field">
    <input :id="id" v-model="isChecked" type="checkbox" />
    <label tabindex="0" :for="id">
      <mdicon :size="17" class="icon" name="check" />
      <span class="text">{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const model = defineModel({ type: Boolean })
defineProps<{
  id: string
  label: string
}>()

const isChecked = ref(false)
watch(isChecked, (value) => {
  model.value = value
})
</script>

<style scoped>
input[type='checkbox'] {
  display: none;

  &:checked + label > span.icon {
    background-color: var(--primary);
  }

  & + label {
    display: flex;
    gap: 0.5em;
    cursor: pointer;

    align-items: center;
    user-select: none;
    color: var(--primary);

    & > span.icon {
      border: 2px solid var(--primary);
      color: var(--white);
      border-radius: 10px;
      padding: 0.3em 0.4em;
      transition: all 0.5s ease;

      &:focus {
        outline: 2px dashed var(--primary);
        outline-offset: 5px;
      }
    }
  }
}
</style>
