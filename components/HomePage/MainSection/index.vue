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
          طريقة استخراج تأشيرات التوظيف
        </h2>
        <Image name="title-after.png" width="60" class="ms-16" />
      </div>
      <v-contaier class="mb-10">
        <v-row class="text-center ga-4 mt-1 mb-16">
          <MainSmallCard
            cardPhoto="file.png"
            title="املأ استمارة التواصل"
            class="col-12 col-md-6 col-lg-3 mt-4 mt-md-0"
          />
          <MainSmallCard
            cardPhoto="customer.png"
            title=" التواصل"
            class="col-12 col-md-6 col-lg-3 mt-4 mt-md-0"
          />
          <SpecialMainSmallCard
            cardPhoto="form.png"
            title="متابعة الإجراءات"
            class="col-12 col-md-6 col-lg-3 mt-4 mt-md-0"
          />
          <MainSmallCard
            cardPhoto="stamp.png"
            title="الحصول على تأشيرة"
            class="col-12 col-md-6 col-lg-3 mt-4 mt-lg-0"
          />
        </v-row>
      </v-contaier>
    </section>
    <section class="main-section__divider text-center">
      <v-divider :thickness="40" color="bg-input" class="border-opacity-100">
      </v-divider>
      <v-card
        class="main-section__divider__card rounded-pill w-100 w-md-75 w-lg-50 mx-auto bg-bg-input px-8 pb-8"
      >
        <h2 class="mt-8 text-text">طــــلب فيزا توظيـــــــــف</h2>
        <p class="text-text px-16 mx-12 mt-4 main-section__divider__card_p">
          لديك وظائف وتأشيرات تريد اخبارنا بها بادر بملأ الاستماره واخبارنا
          بالتفاصيل لديك وظائف وتأشيرات تريد اخبارنا بها بادر بملأ الاستماره
          واخبارنا بالتفاصيل لديك وظائف وتأشيرات تريد اخبارنا بها بادر بملأ
          الاستماره واخبارنا بالتفاصيل
        </p>
        <GenericBtn
          btnColor="primary"
          btnText=" طلب فيزا توظيف"
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
