<template>
  <Image
    name="about-1.png"
    class="d-block mx-auto mt-4"
    width="100%"
    height="auto"
  />
  <div class="position-relative">
    <MainChip class="chip-position">{{ $t("aboutSection.title") }}</MainChip>
  </div>

  <v-container class="mt-12">
    <div v-html="keyValSettings.about1" class="text-text w-75 mx-auto"></div>

    <section class="d-flex justify-between flex-wrap mt-10 w-75 mx-auto">
      <Image
        name="about-2.png"
        width="40%"
        height="auto"
        class="w-100 w-lg-50"
      />
      <v-list
        density="compact"
        class="transparent-list ps-lg-16 w-100 w-lg-50 align-self-center"
      >
        <v-list-item
          v-for="(item, index) in listItems"
          :key="index"
          color="primary"
          class="text-text"
        >
          <template v-slot:prepend>
            <Image
              :name="index % 2 === 0 ? 'check1.png' : 'check2.png'"
              width="25"
              class="me-2"
            />
          </template>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </section>

    <section class="d-flex justify-between flex-wrap w-75 mx-auto align-start">
      <div
        v-html="keyValSettings.about2"
        class="text-text w-lg-50 w-100 mx-auto bg-bg-input pa-3 mt-lg-16"
      ></div>
      <div class="w-100 w-lg-50 pb-16 ps-lg-10">
        <Image name="about-3.png" width="100%" height="auto" />
      </div>
    </section>
  </v-container>
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
const keyValSettings = computed(() => settingsStore.keyValSettings);

console.log("keyValSettings", keyValSettings.value);

const about1 = keyValSettings.value.about1;

const about2 = keyValSettings.value.about2;
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
