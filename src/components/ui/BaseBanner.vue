<template>
  <div :class="level" role="banner">
    <mdicon :name="LEVEL_ICON_MAPPER[level]" />
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  level: {
    type: String,
    required: true,
    default: 'default',
  },
  text: {
    type: String,
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
