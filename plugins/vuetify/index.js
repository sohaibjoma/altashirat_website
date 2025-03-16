import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { useCookie } from '#app';


export default defineNuxtPlugin((app) => {
  const localeCookie = useCookie("locale")?.value || "ar";
  const isRTL = localeCookie === "ar";
  const vuetify = createVuetify({
    components,
    directives,

  icons: {
    defaultSet: 'mdi',
  },
  locale: {
    locale: localeCookie,
    rtl: { ar: true, en: false },
  },

   theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          black: '#000000',
          white: '#FFFFFF',
          primary: '#4426F5',
          secondary: '#65BCF9',
          accent: '#65BCF9',
          text: '#0E0063',
          'bg-input': '#F1F4FB',
          'text-icon-input': '#B2AECC',
          nav: '#64BAF9',
          'hero-scd-sec':'#8ee7ad',
          'bg-footer': '#eaeaea80'
        },
      },
    },
  },
  })
  app.vueApp.use(vuetify)
})