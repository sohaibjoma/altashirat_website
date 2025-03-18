<template>
  <v-btn :color="btnColor" rounded="pill" class="px-lg-8" height="50">
    {{ btnText }}
    <template v-slot:append>
      <v-icon
        :icon="locale === 'ar' ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        :class="iconBgClass"
        :color="iconColor"
      ></v-icon>
    </template>
  </v-btn>
</template>

<script setup>
import { useI18n } from "#imports";

const {  locale } = useI18n();

const props = defineProps({
  btnColor: {
    type: String,
    default: 'primary',
  },
  btnText: {
    type: String,
    default: 'طلب فيزا توظيف',
  },
  iconColor: {
    type: String,
    default: 'primary',
  },
  iconBgClass: {
    type: String,
    default: 'bg-white rounded-circle',
  },
});
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>