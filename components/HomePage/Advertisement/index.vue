<template>
  <div class="advertisement--wrapper pt-16">
    <Image
      name="homepage-right-pattern.png"
      class="advertisement__pattern__right"
    />
    <Image
      name="homepage-left-pattern.png"
      class="advertisement__pattern__left"
    />

    <section class="bg-bg-footer w-75 mx-auto ps-5 pe-5 pt-5 pb-5">
      <div class="d-flex jusify-center justify-lg-between advertise__card pb-5 w-50 w-lg-100">
        <div class="ms-16 d-none d-lg-block"></div>

        <div class="d-none d-lg-block"></div>
        <div class="advertise__card__button-column pe-10">
          <GenericBtn
            btnColor="white"
            btnText=" طلب فيزا توظيف"
            iconColor="white"
            iconBgClass="bg-primary rounded-circle"
            class="mt-5"
          >
          </GenericBtn>
          <GenericBtn
            btnColor="primary"
            btnText=" طلب فيزا توظيف"
            iconColor="primary"
            iconBgClass="bg-white rounded-circle"
            class="mt-5"
          >
          </GenericBtn>
          <GenericBtn
            btnColor="white"
            btnText=" طلب فيزا توظيف"
            iconColor="white"
            iconBgClass="bg-primary rounded-circle"
            class="mt-5"
          >
          </GenericBtn>
        </div>
      </div>

      <article class="col-12 col-md-6 col-lg-4 mx-auto px-16 pb-4 advertise__article">
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
    </section>
  </div>
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