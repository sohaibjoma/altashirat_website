// plugins/vuetify.ts
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n; 
  const messages = {
    ar:{
      confirmEdit: { ok: "حفظ", cancel :"إلغاء"},
      open: "فتح",
      close: "إغلاق",
      input:{
        appendAction: "appenAction",
      },
      dataIterator:{
        pageText: "{0}-{1} من {2}",
        rowsPerPageText: "العناصر لكل الصفحة:",
      }
    }
  }
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    icons: {
      defaultSet: "mdi",
    },
    locale: {
      locale: i18n.locale, 
      rtl: { ar: true, en: false }, 
      messages: messages
    },
    theme: {
      defaultTheme: "myCustomTheme",
      themes: {
        myCustomTheme: {
          dark: false,
          colors: {
            black: "#000000",
            white: "#FFFFFF",
            primary: "#4426F5",
            secondary: "#65BCF9",
            accent: "#65BCF9",
            text: "#0E0063",
            "bg-input": "#F1F4FB",
            "text-icon-input": "#B2AECC",
            nav: "#64BAF9",
            "hero-scd-sec": "#8ee7ad",
            "bg-footer": "#eaeaea80",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});