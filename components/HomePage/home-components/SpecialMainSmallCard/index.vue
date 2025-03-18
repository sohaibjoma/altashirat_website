<template>
  <section>
    <div
      class="pb-2 pe-8 rounded-md mainSection__small-card"
    >

    <v-card
        class="bg-primary rounded-lg mainSection__small-card__img border pt-2 ps-2 rounded-sm"
          :class="locale === 'ar' ? 'mainSection__small-card__img--ar' : 'mainSection__small-card__img--en'"
        elevation="2"
      >
        <Image :name="cardPhoto" height="30" />
      </v-card>
      <Image name="click.png" :class="locale === 'ar' ? 'mainSection__small-card__click--ar' : 'mainSection__small-card__click--en'" height="30" />

    <div class="d-flex justify-start align-centr">
      <div class="mainSection__small-card__border"></div>
      <h5 class="text-text ms-1">
        {{ title }}
      </h5>
    </div>
    <p class="text-text mt-2 mainSection__small-card__text ps-2">{{ $t('home.mainSmallCardText') }}</p>
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
});
</script>

<style scoped>
/* Your CSS styles remain the same */
</style>