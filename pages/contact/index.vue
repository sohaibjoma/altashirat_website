<template>
  <template>
  <v-card
    class="mx-auto"
    max-width="700"
  >

  <Image
  name="contact.png"
  class="d-block mx-auto w-100 text-center py-6 bg"
  />
  <div class="w-100 text-text bg-bg-input"><span class="mx-auto">{{ t("contactInfo") }}</span></div>

    <v-card-subtitle class="pt-4">
      Number 10
    </v-card-subtitle>

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>
  </v-card>
</template>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "#imports";

const { t } = useI18n();

const listItems = ref([
  t("aboutSection.tourism"),
  t("aboutSection.employment"),
  t("aboutSection.embassy"),
  t("aboutSection.counselate"),
]);

const settingsStore = useSettingsStore();
const keyValSettings = settingsStore.keyValSettings;

const about1 = keyValSettings.about1;
const about2 = keyValSettings.about2;
</script>

<style scoped>
.chip-position {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
