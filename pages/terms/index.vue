<template>
    <Image
      name="terms.png"
      class="d-block mx-auto mt-12"
      width="100%"
      height="auto"
    />
    <div class="position-relative">
      <MainChip class="chip-position">{{ $t("terms") }}</MainChip>
    </div>
  
    <v-container class="d-flex flex-column align-center justify-center mt-12">
      <div
        v-html="keyValSettings.terms_and_conditions"
        class="text-text w-lg-75 w-100 mx-auto pa-3"
      ></div>
    </v-container>
  </template>
  
  <script setup>
  const settingsStore = useSettingsStore();
  const keyValSettings = computed(()=>settingsStore.keyValSettings);
  </script>
  
  <style scoped>
  .chip-position {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
  }
  </style>
  