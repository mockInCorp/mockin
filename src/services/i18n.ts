import { createI18n } from 'vue-i18n'

const getMessages = (): any => {
  const files = import.meta.glob('../locales/**/*.json', { eager: true })
  const locales: Record<string, unknown> = {}
  for (const [name, content] of Object.entries(files)) {
    const locale = name.split('/').pop()?.split('.')[0] as string
    locales[locale] = content.default
  }
  return locales
}

const datetimeFormat: any = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  },
}

export default createI18n({
  messages: getMessages(),
  legacy: false,
  locale: navigator.language.substring(0, 2) || 'fr',
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  datetimeFormats: {
    fr: datetimeFormat,
    en: datetimeFormat,
  },
})
