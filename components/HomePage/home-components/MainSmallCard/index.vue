<template>
  <section>
    <div class="pb-2 pe-8 rounded-md mainSection__small-card">
      <v-card
        class="rounded-lg mainSection__small-card__img border pe-1 pt-2 ps-1 rounded-sm"
        :class="[
          locale === 'ar' ? 'mainSection__small-card__img--ar' : 'mainSection__small-card__img--en',
          hover ? 'hover-state' : ''
        ]"
        elevation="2"
        v-bind="$attrs"
      >
        <slot></slot>
      </v-card>

      <div class="d-flex justify-start align-centr">
        <div class="mainSection__small-card__border"></div>
        <h5 class="text-text ms-1">
          {{ title }}
        </h5>
      </div>
      <p 
        class="text-text mt-2 mainSection__small-card__text ps-2" 
        :style="{ backgroundColor: bgColor }"
      >
        {{ $t('home.mainSmallCardText') }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "#imports";

const { locale } = useI18n();

const props = defineProps({
  cardPhoto: String,
  title: String,
  data: String,
  bgColor: String,
  hover: Boolean
});
</script>

<style scoped>
.hover-state {
  background-color: #4426F5 !important;
  transition: all 0.3s ease;
}

.hover-state :deep svg path,
.hover-state :deep svg g {
  fill: white !important;
}
</style>