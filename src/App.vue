<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import type { TAuthProvider } from './types'
import { useAuthenticationStore } from './stores/authentication'

import BaseHeader from '@/components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'

import ConfirmModal from './components/ui/modal/ConfirmModal.vue'
import BaseToast from './components/ui/BaseToast.vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()

const { t } = useI18n()

watch(route, async (value) => {
  if (value?.query) {
    const query = value.query as { provider?: TAuthProvider; token?: string }
    if (query.provider && query.token && query.provider === 'google') {
      window.toast({
        level: 'SUCCESS',
        title: t('authentication.success.nowConnected'),
      })
      useAuthenticationStore().storeToken(query.token)
      await router.push({ name: 'home' })
    }
  }
})

useAuthenticationStore().init()
</script>

<template>
  <BaseToast />
  <ConfirmModal />

  <BaseHeader />
  <main>
    <RouterView />
  </main>
  <BaseFooter />
</template>
