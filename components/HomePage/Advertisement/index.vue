<template>
  <div class="advertisement--wrapper pt-16 pb-10">
    <Image
      name="homepage-right-pattern.png"
      class="advertisement__pattern__right"
    />
    <Image
      name="homepage-left-pattern.png"
      class="advertisement__pattern__left"
    />

    <section class="bg-bg-footer w-75 mx-auto ps-5 pe-5 pt-5 pb-5 d-flex flex-md-column flex-column-reverse">
      <div
        class="d-flex justify-center justify-lg-between pb-5 w-50 w-lg-100 mb-16"
        :class="locale === 'ar' ? 'advertise__card ': 'advertise__card--en'"
      >
        <div class="ms-lg-16"></div>
        <div></div>
        <div class="advertise__card__button-column pe-10">
          <GenericBtn
            btnColor="white"
            :btnText="$t('home-advertisement.employment_visa_button')"
            iconColor="white"
            iconBgClass="bg-primary rounded-circle"
            class="mt-5"
          />
          <GenericBtn
            btnColor="primary"
            :btnText="$t('home-advertisement.employment_visa_button')"
            iconColor="primary"
            iconBgClass="bg-white rounded-circle"
            class="mt-5"
          />
          <GenericBtn
            btnColor="white"
            :btnText="$t('home-advertisement.employment_visa_button')"
            iconColor="white"
            iconBgClass="bg-primary rounded-circle"
            class="mt-5"
          />
        </div>
      </div>

      <v-row align="start" no-gutters>
        <v-col cols="12" sm="5" class="advertise__article ps-2">
          <h2 class="text-text font-weight-bold text-start advertisemnet__title">
            {{ $t("home-advertisement.why_choose_us_title") }}
            <br />
            {{ $t("home-advertisement.why_choose_us_subtitle") }}
          </h2>
          <v-list density="compact" class="transparent-list">
            <v-list-item
              v-for="(item, index) in listItems || []"
              :key="index"
              color="primary"
              class="text-text advertisemnet__list__item"
            >
              <template v-slot:prepend>
                <v-icon
                  :icon="'mdi-chevron-left'"
                  :color="index % 2 === 0 ? 'secondary' : 'primary'"
                />
              </template>
              <v-list-item-title v-text="item" />
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" sm="7" class="py-5 ps-16 pe-4 d-flex flex-column align-start jutify-center">
          <div class="text-text mb-2 progress__title">{{ $t("home-advertisement.trusted_company") }}</div>
          <div class="progress-wrapper w-100 position-relative">
            <span class="progress-label text-primary position-absolute progress__tag--95">95%</span>
            <v-progress-linear
              color="secondary"
              model-value="90"
              :height="18"
              class="w-100 rounded-lg mb-6"
              buffer-color="white"
              rounded
              rounded-bar
            />
          </div>

          <div class="text-text mb-2 progress__title">{{ $t("home-advertisement.experienced_team") }}</div>
          <div class="progress-wrapper w-100 position-relative">
            <span class="progress-label text-primary position-absolute progress__tag--97">97%</span>
            <v-progress-linear
              color="secondary"
              model-value="95"
              :height="18"
              class="w-100 rounded-lg mb-6"
              buffer-color="white"
              rounded
              rounded-bar
            />
          </div>

          <div class="text-text mb-2 progress__title">{{ $t("home-advertisement.best_prices") }}</div>
          <div class="progress-wrapper w-100 position-relative">
            <span class="progress-label text-primary position-absolute progress__tag--99">99%</span>
            <v-progress-linear
              color="secondary"
              model-value="98"
              :height="18"
              class="w-100 rounded-lg mb-6"
              rounded
              rounded-bar
            />
          </div>
        </v-col>
      </v-row>
    </section>

    <div class="text-center pt-10">
      <Image name="advertise.png" class="w-100 w-lg-75 mt-16 mx-auto" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "#imports";

const { t, locale } = useI18n();

const listItems = ref([
  t("home-advertisement.listItems.fst"),
  t("home-advertisement.listItems.snd"),
  t("home-advertisement.listItems.thrd"),
  t("home-advertisement.listItems.frth"),
]);
</script>

<style scoped>
.transparent-list {
  background-color: transparent;
  padding-inline-start: 0;
}
</style>
