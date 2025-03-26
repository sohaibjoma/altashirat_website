<template>
  <Image
    name="privacy-policy.png"
    class="d-block mx-auto mt-4"
    width="100%"
    height="auto"
  />
  <div class="position-relative">
    <MainChip class="chip-position">{{ $t("privacy") }}</MainChip>
  </div>

  <v-container class="d-flex flex-column align-center justify-center mt-12">
    <div
      v-html="keyValSettings.privacy_policy"
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
  padding-inline: 60px;
  transform: translateX(-50%);
  font-size: 30px;
}

</style>
