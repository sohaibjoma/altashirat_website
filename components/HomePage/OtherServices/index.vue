<template>
  <v-row class="other-services__wrapper">
    <Image
      name="other-ser-img.png"
      class="ms-8 mt-5 col-12 col-md-6 col-lg-4"
      width="460"
    />
    <article class="col-12 col-md-6 col-lg-4 mx-auto px-16 pb-4 other-services__article">
      <h2 class="text-white mt-12 other-services__title">
        خدمات أخرى تساعدك على
        <div class="other-services__title--underline">
          <span class="text-hero-scd-sec me-1">__</span>
          <span class="text-primary me-1">_</span>
          <span class="text-secondary me-1">_</span>
          <span class="text-hero-scd-sec">___</span>
        </div>
      </h2>

      <p class="text-white mt-4 text-start other-services__p">
        هل أنت تبحث عن فيزا سياحيةاو فيزا توظيف أو تريد بيع فيز
        نقدم لك المساعدة مع:
      </p>

      <v-list density="compact" class="transparent-list">
        <v-list-item
          v-for="(item, index) in listItems"
          :key="index"
          color="primary" 
          class="text-white"
        >
          <template v-slot:prepend>
            <Image
              :name="index % 2 === 0 ? 'sc-arrow.png' : 'primary-arrow.png'"
              width="25"
              class="me-2"
            />
          </template>

          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </article>

    <Image
      name="other-ser-plane.png"
      class="d-none col-lg-4 d-lg-block mt-16"
      height="350"
      width="420"
    />
  </v-row>
</template>

<script setup>
import { ref } from 'vue';

const listItems = ref([
  'تأشيرات العمل',
  'الشريك الموثوق به ',
  'تصديق الوثائق',
  'تأمين جواز السفر',
  'خطابات دعوة العمل',
]);
</script>

<style scoped>
.transparent-list {
  background-color: transparent;
}
</style>