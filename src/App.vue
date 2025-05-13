<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'
import ConfirmModal from './components/ui/modal/ConfirmModal.vue'
import { watch } from 'vue'
import type { TAuthProvider } from './types'
import { useAuthenticationStore } from './stores/authentication'

const route = useRoute()

watch(route, (value) => {
  if (value?.query) {
    const query = value.query as { provider?: TAuthProvider; token?: string }
    if (query.provider && query.token && query.provider === 'google') {
      useAuthenticationStore().storeToken(query.token)
    }
  }
})
</script>

<template>
  <ConfirmModal />

  <BaseHeader />
  <main>
    <RouterView />
  </main>
  <BaseFooter />
</template>
