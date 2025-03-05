import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,

  icons: {
    defaultSet: 'mdi', // Default icon set
  },

   theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          black: '#000000',
          white: '#ffffff',
          primary: '#4426f5',
          secondary: '#65bcf9',
          accent: '#65bcf9',
          text: '#0e0063',
          'bg-input': '#f1f4fb',
          'text-icon-input': '#b2aecc',
        },
      },
    },
  },
  })
  app.vueApp.use(vuetify)
})