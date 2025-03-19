<template>
  <v-app>
    <Notifications />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup>
const settingsStore = useSettingsStore();

// Fetch settings during app initialization (SSR and client-side)
const { error } = useAsyncData("settings", async () => {
  await settingsStore.fetchSettings();
  return null; // No data returned directly, just populating the store
});

// Optional: Debug
onMounted(() => {
  console.log("App mounted, keyValSettings:", settingsStore.keyValSettings.value);
  if (error.value) {
    console.error("Error fetching settings:", error.value);
  }
});
</script>