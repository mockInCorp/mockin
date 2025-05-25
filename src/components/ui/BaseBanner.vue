<template>
  <div v-show="isShown" :class="level" role="banner">
    <mdicon :name="LEVEL_ICON_MAPPER[level]" />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isShown: {
    type: Boolean,
    required: false,
    default: true,
  },
  level: {
    type: String,
    required: true,
    default: 'default',
  },
  text: {
    type: [String, null],
    required: true,
  },
})

const LEVEL_ICON_MAPPER: Record<string, string> = {
  error: 'close',
}
</script>

<style scoped>
div[role='banner'] {
  display: flex;
  align-items: center;
  gap: 1em;

  &.error {
    background-color: var(--red-200);
    color: var(--red);
    padding: 1em 1em;
    border-left: 3px solid var(--red);
    border-radius: 5px;
  }
}
</style>
