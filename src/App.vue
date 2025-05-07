<script setup lang="ts">
import { RouterView } from 'vue-router'

import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'
import ConfirmModal from './components/ui/modal/ConfirmModal.vue'
</script>

<template>
  <ConfirmModal />

  <BaseHeader />
  <main>
    <RouterView />
  </main>
  <BaseFooter />
</template>

<style scoped></style>
