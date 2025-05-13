<template>
  <template v-if="!link">
    <button
      tabindex="0"
      :disabled="disabled"
      :style="style"
      :class="`${level} ${type} ${className} ${classNames?.join(' ')}`"
    >
      <mdicon :size="iconSize" v-if="icon && iconPosition === 'left'" :name="icon" />
      <span class="text" v-if="text">{{ text }}</span>
      <mdicon :size="iconSize" v-if="icon && iconPosition === 'right'" :name="icon" />
    </button>
  </template>
  <RouterLink :to="link" v-else>
    <button
      tabindex="0"
      :disabled="disabled"
      :style="style"
      :class="`${level} ${type} ${className} ${classNames?.join(' ')}`"
    >
      <mdicon :size="iconSize" v-if="icon && iconPosition === 'left'" :name="icon" />
      <span class="text" v-if="text">{{ text }}</span>
      <mdicon :size="iconSize" v-if="icon && iconPosition === 'right'" :name="icon" />
    </button>
  </RouterLink>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: false,
    default: 'primary',
  },
  level: {
    type: String,
    required: false,
    default: 'default',
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconPosition: {
    type: String,
    required: false,
    default: 'left',
  },
  iconSize: {
    type: Number,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  link: {
    type: Object,
    required: false,
  },
  style: {
    type: Object,
    required: false,
  },
  classNames: {
    type: Array,
    required: false,
    default: () => [],
  },
  className: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style scoped>
a {
  text-decoration: none;
}
button {
  padding: 0.5em 1em;
  font-size: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;

  color: white;
  background-color: transparent;

  border-radius: 100px;

  border: 1px solid black;
  cursor: pointer;

  transition:
    color 0.5s ease,
    background-color 0.5s ease,
    border-color 0.5s ease;
  font-family: 'manrope-medium', sans-serif;

  &:focus {
    outline: 2px dashed var(--primary);
    outline-offset: 4px;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }

  &.primary {
    border-color: var(--primary);
    background-color: var(--primary);
    color: var(--white);
  }
  &.secondary {
    background-color: transparent;
    color: var(--primary);
    border-color: var(--primary);
  }
  &.thirdery {
    border: unset;
    padding: 0.5em 0.5em;
    color: var(--primary);

    &:hover {
      background-color: var(--primary-4);
    }

    & > span.text {
      padding-right: 0.5em;
    }
  }

  &.warning {
    color: var(--red);

    &:hover {
      background-color: var(--red-200);
    }
    &:focus {
      outline-color: var(--red);
    }
  }
  &.extra-warning,
  &.extra-warning:hover {
    color: var(--red-200);
    background-color: var(--red);
  }

  &:not(:disabled) {
    &:not(.thirdery):is(:hover, :focus) {
      border-color: var(--primary-2);
      background-color: var(--primary-2);
      color: var(--white);
    }
  }
}
</style>
