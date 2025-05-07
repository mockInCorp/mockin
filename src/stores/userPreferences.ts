import { defineStore } from 'pinia'
import { computed } from 'vue'

interface IUserPrefrences {
  accessibilityEnabled: boolean
}

export const useUserPreferences = defineStore('userPreferences', () => {
  const KEY = 'user_preferences'

  const userPreferences = computed<Partial<IUserPrefrences>>({
    set: (value) => {
      localStorage.setItem(KEY, JSON.stringify({ ...userPreferences.value, value }))
    },
    get: () => {
      const preferences = localStorage.getItem(KEY)
      try {
        return JSON.parse(preferences!)
      } catch (_) {}
      return {}
    },
  })

  const set = (preference: keyof IUserPrefrences, value: never) => {
    userPreferences.value![preference] = value
  }

  const has = (preference: keyof IUserPrefrences, value: never) => {
    return userPreferences.value![preference] === value
  }

  const get = (preference: keyof IUserPrefrences) => {
    return userPreferences.value![preference]
  }

  return {
    has,
    get,
    set,
  }
})
