import { createI18n } from 'vue-i18n'
import en from "./en.json";
import ar from "./ar.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ar',
    messages: {
      en: en,
      ar: ar
    }
  })

  vueApp.use(i18n)
})