import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  experimental: {
    asyncContext: true,
  },
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
    {
      path: "@/components/shared",
      pathPrefix: false,
    },
    {
      path: "@/components/shared/Buttons",
      pathPrefix: false,
    },
    {
      path: "@/components/shared/Inputs",
      pathPrefix: false,
    },   
    {
      path: "@/components/HomePage",
      pathPrefix: false,
    },  
  

  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@vee-validate/nuxt",
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales: [
      { code: "en", iso: "en-US", dir: "ltr" },
      { code: "ar", iso: "ar-EG", dir: "rtl" },
    ],
    defaultLocale: "ar",
    strategy: "prefix_except_default",
    vueI18n: "index.ts", 
    detectBrowserLanguage: false, 
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: ["~/plugins/vuetify/index.js"],
  compatibilityDate: "2025-03-05",
  devtools: { enabled: true },
  css: ["@/public/assets/scss/main.scss"],
});