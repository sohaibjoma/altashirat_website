<template>
  <v-card
    class="mx-auto pa-0 mt-10"
    max-width="700"
  >
  <Image
  name="contact.png"
  class="d-block mx-auto w-100 text-center py-6 bg mt-none"
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

const email = keyValSettings.contacts_email;
const phone = keyValSettings.contacts_phone;
const Address = keyValSettings.contacts_address 
</script>

<style scoped>

</style>
