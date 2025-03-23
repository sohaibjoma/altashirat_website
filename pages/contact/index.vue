<template>
  <v-card
    class="mx-auto px-0 pt-0 py-16 mt-10 mb-16"
    max-width="800"
  >
  <Image
  name="contact.png"
  class="d-block mx-auto w-100 bg mt-none"
  />

  <h2 class="w-100 text-text text-center bg-bg-input py-2">{{ t("contactInfo") }}</h2>
    <v-card-text class="mt-8">
      <section class="d-flex justify-start align-center my-2">
        <Image name="contact-icon.png" width="60" class="d-none d-md-block"/>
        <span class="bg-bg-input rounded-circle pa-3 mx-3">
        <v-icon color="primary" size="30">mdi-cellphone</v-icon>
        </span>
        <h3 v-html="keyValSettings.contacts_phone" class="text-text me-5"></h3>
      </section>

      <section class="d-flex justify-start align-center my-2">
        <Image name="contact-icon.png" width="60" class="d-none d-md-block"/>
        <span class="bg-bg-input rounded-circle pa-3 mx-3">
        <v-icon color="primary" size="30">mdi-email</v-icon>
        </span>
        <h3 v-html="keyValSettings.contacts_email" class="text-text me-5"></h3>
      </section>

      <section class="d-flex justify-start align-center mt-2 mb-16">
        <Image name="contact-icon.png" width="60" class="d-none d-md-block"/>
        <span class="bg-bg-input rounded-circle pa-3 mx-3">
        <v-icon color="primary" size="30">mdi-map-marker-radius</v-icon>
        </span>
        <h3 v-html="keyValSettings.contacts_address" class="text-text me-5"></h3>
      </section>
    </v-card-text>
  </v-card>

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
const keyValSettings = computed(()=>settingsStore.keyValSettings);

</script>

<style scoped>

</style>
