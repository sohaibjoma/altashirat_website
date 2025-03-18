// stores/appLocale.js
import { defineStore } from "pinia";
import { ref, inject } from "vue";
import { useCookie } from "#app";

export const useAppLocale = defineStore("appLocale", () => {
  const localeCookie = useCookie("i18n_redirected", {
    maxAge: 31536000, // 1 year
    default: () => "ar",
  });

  // Initialize appLocale from cookie or default to "ar"
  const appLocale = ref(localeCookie.value || "ar");

  // Inject the i18n instance from the plugin
  const i18n = inject("i18n");

  // Sync with i18n plugin using switchLocale
  const setLocale = (newVal) => {
    if (["en", "ar"].includes(newVal)) {
      appLocale.value = newVal;
      localeCookie.value = newVal;
      // Use switchLocale from the i18n plugin if available
      if (i18n && i18n.switchLocale) {
        i18n.switchLocale(newVal);
      } else {
        // Fallback: Update i18n locale directly if switchLocale isn’t available
        if (window.$nuxt?.$i18n) {
          window.$nuxt.$i18n.global.locale.value = newVal;
        }
      }
    }

  };

  // Watch for external cookie changes (optional)
  watch(localeCookie, (newCookieVal) => {
    if (newCookieVal && appLocale.value !== newCookieVal) {
      appLocale.value = newCookieVal;
      if (i18n && i18n.switchLocale) {
        i18n.switchLocale(newCookieVal);
      }
    }
  });

  return { appLocale, setLocale };
});