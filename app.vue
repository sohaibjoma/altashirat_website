<template>
  <v-app>
    <Notifications />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const localeStore = useLocaleStore();
const { locale } = useI18n();
const settingsStore = useSettingsStore();

// Watch for changes to the locale and update the store
onMounted(async () => {
  await settingsStore.fetchSettings();
});

watch(
  () => locale.value,
  (newLocale) => {
    localeStore.setLocale(newLocale);
    settingsStore.fetchSettings(); 
  },
  { immediate: true } 
);

</script>