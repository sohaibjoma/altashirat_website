// plugins/i18n/index.ts
import en from "./en.json";
import ar from "./ar.json";

export default {
  legacy: false,
  fallbackLocale: "ar",
  messages: {
    en,
    ar,
  },
};