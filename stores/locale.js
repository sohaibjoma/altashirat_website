import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore('locale', () => {

  const locale = ref('ar'); // Default locale

  function setLocale(newLocale) {
    locale.value = newLocale;
  }

  return { locale, setLocale };
});