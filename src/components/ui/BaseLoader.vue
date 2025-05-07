<template>
  <div :class="align" class="spin" />
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  size: {
    default: 2,
    type: Number,
  },
  align: {
    type: String,
    default: 'center',
  },
  thickness: {
    default: 1.5,
    type: Number,
  },
  color: {
    type: String,
    required: false,
    default: '#305ddd',
  },
})
const { size, thickness, color } = toRefs(props)

const properties = ref({
  size: `${size.value}em`,
  thickness: `${thickness.value}px`,
  thicknessSize: `${size.value}em`,
  color: color.value,
})
</script>

<style scoped>
.spin {
  width: v-bind('properties.size');
  height: v-bind('properties.size');
  border-radius: 50%;
  animation: rotation 1s linear infinite;

  &.center {
    margin: auto;
  }
  &.start {
    margin-right: auto;
  }

  display: block;
  position: relative;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: v-bind('properties.thicknessSize');
    height: v-bind('properties.thicknessSize');
    border-radius: 50%;
    border: v-bind('properties.thickness') solid transparent;
    border-bottom-color: v-bind('properties.color');
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
