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

    <section class="bg-bg-footer w-75 mx-auto ps-5 pe-5 pt-5 pb-5 d-flex flex-md-column flex-column-reverse ad__maain-card">
      <div
        class="d-flex flex-wrap lg-100 mb-16 bg-white"
      >
        <Image
        :name="locale === 'ar' ? 'advertise-bg.png' : 'advertise-bg-en.png'"
        class="w-100 w-md-66"
        />
        <div class="advertise__card__button-column mx-auto pb-5 pb-lg-0">
          <GenericBtn

            :btnText="$t('home-advertisement.tour_visa_btn')"
          />
          <GenericBtn

            :btnText="$t('home-advertisement.employment_visa_btn')"
          />
          <GenericBtn
            :btnText="$t('home-advertisement.sell_visa_btn')"
          />
        </div>
      </div>

      <v-row align="start" no-gutters>
        <v-col cols="12" md="5" lg="5" class="advertise__article ps-2 mx-auto">
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
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="7" lg="7" class="py-5 ps-16 pe-4 d-flex flex-column align-start jutify-center">
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

    <div class="text-center pt-10 px-5">
      <Image name="advertise.png" class="w-100 w-lg-75 mt-16 mx-auto" />
    </div>
  </div>
</template>

<script setup>
import { useI18n, computed } from "#imports";

const { t, locale } = useI18n();

const listItems = computed(() => [
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
