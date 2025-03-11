<template>
  <div class="d-flex justify-space-around">
    <div class="trapezoid-right align-center">
      <div class="content-wrapper d-flex align-center justify-end gap-4">
        <v-btn
          class="text-decoration-none font-weight-bold text-white me-4"
          color="secondary"
          size="large"
          rounded
          to="/visa"
        >
          <!-- <v-icon size="large">mdi-account</v-icon> -->
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="nonzero" fill="none">
              <path
                d="M9 10c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zM4.75 12C2.13 12 0 14.13 0 16.75v3.5c0 .41.34.75.75.75H10v-3.25c0-1.88 1.4-3.43 3.21-3.7.26-.76.75-1.4 1.38-1.86-1-.286-1.054-.19-9.84-.19z"
                fill="#4426F5"
              />
              <path
                d="M22.25 16H21v-.75c0-.965-.785-1.75-1.75-1.75h-2.5c-.965 0-1.75.785-1.75 1.75V16h-1.25a1.74 1.74 0 0 0-1.253.533L18 19.404l5.503-2.871A1.74 1.74 0 0 0 22.25 16zm-5.75 0v-.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V16h-3z"
                fill="#FFF"
              />
              <path
                d="M18.347 20.915a.75.75 0 0 1-.693 0L12 17.965v4.285c0 .965.785 1.75 1.75 1.75h8.5c.965 0 1.75-.785 1.75-1.75v-4.285l-5.653 2.95z"
                fill="#FFF"
              />
            </g>
          </svg>
          {{ $t("offerViza") }}
        </v-btn>
      </div>
    </div>

    <v-img
      src="assets/img/logo.png"
      class="mx-auto"
      min-width="100"
      max-width="100"
      alt="Logo"
    />

    <div class="trapezoid-left">
      <div class="content-wrapper d-flex align-center justify-start gap-4">
        <nuxt-link
          to="/profile"
          class="text-decoration-none text-text font-weight-bold mr-4 d-flex align-center gap-4"
        >
          <!-- <v-icon>mdi-account</v-icon> -->
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="nonzero" fill="none">
              <path
                d="M10.51 0a5.628 5.628 0 0 0-5.623 5.633 5.628 5.628 0 0 0 5.623 5.632 5.628 5.628 0 0 0 5.623-5.632A5.628 5.628 0 0 0 10.51 0z"
                fill="#8EE7AD"
              />
              <path
                d="M14.974 12.097a2.84 2.84 0 0 1 2.135-.966h2.044A2.85 2.85 0 0 1 22 13.983v7.165A2.85 2.85 0 0 1 19.153 24H17.11a2.84 2.84 0 0 1-2.135-.965.806.806 0 0 1 .071-1.136.802.802 0 0 1 1.134.07c.228.26.56.422.93.422h2.044c.685 0 1.24-.557 1.24-1.243v-7.165c0-.686-.555-1.242-1.24-1.242H17.11c-.37 0-.702.161-.93.42a.802.802 0 0 1-1.134.071.806.806 0 0 1-.07-1.135z"
                fill="#4426F5"
              />
              <path
                d="M17.348 16.997a.806.806 0 0 1 0 1.137l-2.142 2.146a.802.802 0 0 1-1.136 0 .806.806 0 0 1 0-1.138l2.142-2.145a.802.802 0 0 1 1.136 0z"
                fill="#8EE7AD"
              />
              <path
                d="M17.348 18.134a.806.806 0 0 0 0-1.137l-2.142-2.146a.802.802 0 0 0-1.136 0 .806.806 0 0 0 0 1.138l2.142 2.145a.802.802 0 0 0 1.136 0z"
                fill="#8EE7AD"
              />
              <path
                d="M10.086 17.566c0-.445.36-.805.803-.805h5.356a.804.804 0 0 1 0 1.61h-5.356a.804.804 0 0 1-.803-.805z"
                fill="#8EE7AD"
              />
              <path
                d="M12.907 13.74A20.213 20.213 0 0 0 .942 15.96c-.58.31-.942.914-.942 1.571v3.94c0 1.037.84 1.878 1.874 1.878H13.32a2.427 2.427 0 0 1-.022-1.631 2.415 2.415 0 0 1-1.054-1.738h-1.354a2.412 2.412 0 0 1-2.41-2.414 2.412 2.412 0 0 1 2.41-2.414h1.354a2.405 2.405 0 0 1 .664-1.412z"
                fill="#4426F5"
              />
            </g>
          </svg>

          {{ $t("profile") }}
        </nuxt-link>

        <!-- Language Selector -->
        <v-select
          v-model="selectedLanguage"
          :items="languages"
          item-title="text"
          item-value="value"
          density="compact"
          variant="outline"
          class="language-selector"
          hide-details
        >
          <template v-slot:selection="{ item }">
            <div class="d-flex align-center">
              <v-img :src="item.raw.flag" width="24" height="18" class="mr-2" />
              <span>{{ item.raw.text }}</span>
            </div>
          </template>
          <template v-slot:item="{ item }">
            <div class="d-flex align-center">
              <v-img :src="item.raw.flag" width="24" height="18" class="mr-2" />
              <span>{{ item.raw.text }}</span>
            </div>
          </template>
        </v-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const languages = ref([
  {
    text: "العربية",
    value: "ar",
    flag: "https://flagcdn.com/sa.svg",
  },
  {
    text: "English",
    value: "en",
    flag: "https://flagcdn.com/us.svg",
  },
]);

const selectedLanguage = ref("ar");
</script>

<style scoped>
.trapezoid-left {
  position: relative;
  border-bottom: 80px solid var(--white);
  border-right: 50px solid transparent;
  width: 100%;
  max-width: 700px;
  margin-right: auto;
  height: 0;
  filter: drop-shadow(0 4px 8px rgba(209, 209, 209, 0.5));
}

.trapezoid-right {
  position: relative;
  border-bottom: 80px solid var(--white);
  border-left: 50px solid transparent;
  width: 100%;
  max-width: 700px;
  margin-left: auto;
  height: 0;
  filter: drop-shadow(0 4px 8px rgba(209, 209, 209, 0.5));
}

.content-wrapper {
  height: 80px;
}

.language-selector {
  max-width: 150px;
}

.gap-4 {
  gap: 8px;
}
</style>
