// i18n.config.ts
import en from './en.json';
import ar from './ar.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ar',
  defaultLocale: 'ar',
  vueI18n: {
    fallbackLocale: 'ar',
  messages: {
    en,
    ar,
  },
}
}));