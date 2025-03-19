<template>
  <h1>about us</h1>
  <p>{{ about1 }}</p>

</template>

<script setup>

const settingsStore = useSettingsStore();
const keyValSettings = settingsStore.keyValSettings;

// Optional: Debug
onMounted(() => {
  const about1  = keyValSettings.value.about1;
});


</script>

<style scoped></style>  