<template>
  <div class="main-section--wrapper">
    <Image
      name="homepage-right-pattern.png"
      class="main-section__pattern__right"
    />
    <Image
      name="homepage-left-pattern.png"
      class="main-section__pattern__left"
    />
    <section
      class="main-section d-flex flex-column justify-center align-center mb-16"
    >
      <div class="w-50 mt-10 mb-5">
        <h2 class="text-text ms-16 font-weight-black">
          {{ $t('home.employmentVisaProcess') }}
        </h2>
        <Image name="title-after.png" width="60" class="ms-16" />
      </div>
      <v-contaier class="mb-10">
        <v-row class="text-center mt-1 mb-16" justify="center">
    <v-col cols="12" md="6" lg="3" class="mt-4 mt-md-0 d-flex justify-center">
      <MainSmallCard cardPhoto="file.png" :title="$t('home.fillContactForm')" />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="mt-4 mt-md-0 d-flex justify-center">
      <MainSmallCard cardPhoto="customer.png" :title="$t('home.communication')" />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="mt-4 mt-md-0 d-flex justify-center">
      <SpecialMainSmallCard cardPhoto="form.png" :title="$t('home.followProcedures')" />
    </v-col>
    <v-col cols="12" md="6" lg="3" class="mt-4 mt-lg-0 d-flex justify-center">
      <MainSmallCard cardPhoto="stamp.png" :title="$t('home.getVisa')" />
    </v-col>
  </v-row>
      </v-contaier>
    </section>
    <section class="main-section__divider text-center">
      <v-divider :thickness="40" color="bg-input" class="border-opacity-100">
      </v-divider>
      <v-card
        class="main-section__divider__card rounded-pill w-100 w-md-75 w-lg-50 mx-auto bg-bg-input px-8 pb-8"
      >
        <h2 class="mt-8 text-text">{{ $t('home.employmentVisaRequest') }}</h2>
        <p class="text-text px-16 mx-12 mt-4 main-section__divider__card_p">
          {{ $t('home.employmentVisaDescription') }}
        </p>
        <GenericBtn
          btnColor="primary"
          :btnText="$t('home.requestEmploymentVisa')"
          iconColor="primary"
          iconBgClass="bg-white rounded-circle"
          class="mt-5"
        >
        </GenericBtn>
      </v-card>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.main-section__divider__card {
  box-shadow: 10px 2px 20px rgba(142, 231, 173, 1),
    -10px 2px 20px rgba(173, 220, 253, 255),
    -1px -1px 0px rgba(192, 249, 212, 0.41);
}
</style>
