<template>
  <div class="hero__wrapper mt-3">
    <Image name="plane.png" alt="plane" class="hero__plane overflow-none z-1" />
    <section class="text-center d-flex flex-column justify-center align-center">
      <h1 class="rounded-pill bg-primary py-1 px-2 text-white hero__blue-title">
        {{ $t("home-hero.blue_title") }}
      </h1>
      <h2 class="text-white hero__white-title mb-4">
        {{ $t("home-hero.white_title") }}
      </h2>
    </section>
    <section class="mx-16 px-16">
      <v-row class="text-center mt-7 mx-16 px-16">
        <v-col class="col-12 col-md-4 d-flex justify-center">
          <HeroCard
            cardName="tourism-visa.png"
            :title="$t('home-hero.tourism_visa_card_title')"
          />
        </v-col>
        <v-col class="col-12 col-md-4 d-flex justify-center">
          <HeroCard
            cardName="employment-visa.png"
            :title="$t('home-hero.employment_visa_card_title')"
          />
        </v-col>
        <v-col class="col-12 col-md-4 d-flex justify-center">
          <HeroCard
            cardName="propose-visa.png"
            :title="$t('home-hero.propose_visa_card_title')"
          />
        </v-col>
      </v-row>
    </section>
  </div>

  <section class="bg-bg-input py-4 d-flex flex-column justify-center align-center z-2">
    <h3
      class="rounded-pill bg-hero-scd-sec w-50 py-3 px-2 text-text hero__h3 d-flex justify-center align-start"
    >
      <span class="py-1 pe-1">{{ $t("home-hero.h3_part1") }} </span>
      <Image name="passport.png" height="100" class="d-none d-lg-block" />
      <span class="py-1 ps-lg-4"> {{ $t("home-hero.h3_part2") }} </span>
    </h3>
    <p class="text-text mt-15 hero_p">
      {{ $t("home-hero.hero_p") }}
    </p>
  </section>
</template>

<script setup></script>

<style scoped></style>