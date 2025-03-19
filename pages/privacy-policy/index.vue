<template>
  <Image
    name="privacy-policy.png"
    class="d-block mx-auto mt-12"
    width="100%"
    height="auto"
  />
  <div class="position-relative">
    <MainChip class="chip-position">{{ $t("privacyPolicy.title") }}</MainChip>
  </div>

  <v-container class="d-flex justify-center mt-12">
    <h2>سياسة الخصوصية</h2>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.chip-position {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
