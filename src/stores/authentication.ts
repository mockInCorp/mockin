import { defineStore } from 'pinia'

export const useAuthenticationStore = defineStore('authentication', () => {
  const storeToken = (token: string) => {
    localStorage.setItem('mockin:token', token)
  }

  return {
    storeToken,
  }
})
