import type { IContact } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAPIRequestStore } from './apiRequest'
import gql from 'graphql-tag'
import { useI18n } from 'vue-i18n'

export const useAuthenticationStore = defineStore('authentication', () => {
  const token = ref(localStorage.getItem('mockin:token'))
  const isAuthenticated = ref(false)
  const me = ref<IContact | null>(null)

  const { t } = useI18n()

  const init = async () => {
    try {
      const response = await useAPIRequestStore().request<{ me: IContact | null }>({
        type: 'QUERY',
        document: gql`
          query Me {
            me {
              createdAt
              email
              familyName
              gdprAccepted
              givenName
              id
              roles
              tokens
              updatedAt
            }
          }
        `,
      })
      me.value = response?.me
      isAuthenticated.value = !!me.value
    } catch (e) {
      const error = e as Error
      console.error(e)
      window.toast({ level: 'ERROR', title: error.message })
    }
  }

  const storeToken = (t: string) => {
    localStorage.setItem('mockin:token', t)
    token.value = t
    init()
  }

  const disconnect = () => {
    window.confirmModal({
      title: t('header.profile.disconnectConfirm.title'),
      description: t('header.profile.disconnectConfirm.description'),
      onConfirm: () => {
        me.value = null
        localStorage.removeItem('mockin:token')
        token.value = null
        isAuthenticated.value = false
      },
    })
  }

  return {
    storeToken,
    isAuthenticated,
    disconnect,
    init,
    me,
    token,
  }
})
