<template>
<v-hover>
  <template v-slot:default="{ isHovering, props }">
    <v-btn :color="isHovering ? 'primary' : 'white'" rounded="pill" class="px-lg-8 border border-primary border-opacity-100 border-4" height="50" v-bind="props">
    {{ btnText }}
    <template v-slot:append>
      <v-icon
        :icon="locale === 'ar' ? 'mdi-chevron-left' : 'mdi-chevron-right'"
        class="rounded-circle"
        :class="isHovering? 'bg-white': 'bg-primary'"
        color="isHovering? 'primary' : 'white"
      ></v-icon>
    </template>
  </v-btn>
  </template>

</v-hover>

</template>

<script setup>
import { useI18n } from "#imports";

const {  locale } = useI18n();

const props = defineProps({
  btnText: {
    type: String,
    default: 'طلب فيزا توظيف',
  },

});
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>