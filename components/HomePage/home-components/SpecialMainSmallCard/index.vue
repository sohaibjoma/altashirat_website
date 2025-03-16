<template>
  <section>
    <div
      class="pb-2 pe-8 rounded-md mainSection__small-card"
    >

    <v-card
        class="bg-primary rounded-lg mainSection__small-card__img border pt-2 ps-2 rounded-sm"
        elevation="2"
      >
        <Image :name="cardPhoto" height="30" />
      </v-card>
      <Image name="click.png" class="mainSection__small-card__click" />

    <div class="d-flex justify-start align-centr">
      <div class="mainSection__small-card__border"></div>
      <h5 class="text-text ms-1">
        {{ title }}
      </h5>
    </div>
    <p class="text-text mt-2 mainSection__small-card__text ps-2">عميلنا العزيز عند ملئ الاستمارة سنكون  قادرين على التواصل</p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  cardPhoto: String,
  title: String,
  data: String,
});
</script>

<style scoped>
/* Your CSS styles remain the same */
</style>