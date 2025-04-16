<template>
  <div dir="ltr" class="d-flex justify-space-between">
    <div class="trapezoid-left" v-if="!mobile">
      <div class="content-wrapper d-flex align-center justify-end gap-4">
        <!-- Language Selector -->
        <v-select
          :items="languages"
          item-title="text"
          item-value="value"
          density="compact"
          variant="outline"
          class="language-selector"
          hide-details
          v-model="selectedLanguage"
          @update:modelValue="changeLocale"
        >
          <template v-slot:selection="{ item }">
            <div class="d-flex align-center">
              <v-img :src="item.raw.flag" width="24" height="18" class="mr-2" />
              <span>{{ item.raw.text }}</span>
            </div>
          </template>
        </v-select>

        <CustomLink
          path="/profile"
          class="text-decoration-none text-text font-weight-bold ms-4 d-flex align-center gap-4"
        >
          {{ $t("profileName") }}

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
        </CustomLink>
      </div>
    </div>

    <div class="bg-nav rounded-circle pt-3" v-if="!mobile">
      <Image
        name="emptylogo.png"
        alt="Logo"
        class="mx-5 nav"
        width="70"
        height="80"
      />
    </div>
    <div class="trapezoid-right align-center" v-if="!mobile">
      <div class="content-wrapper d-flex align-center justify-start gap-4">
        <v-btn
          class="text-decoration-none font-weight-bold text-white me-4"
          color="primary"
          size="large"
          rounded
          :to="localePath('/tourism-visa')"
        >
          {{ $t("tourismVisa") }}
          <svg
            width="24"
            height="23"
            viewBox="0 0 24 23"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="nonzero" fill="none">
              <path
                d="M24 10.851c0 5.425-4.066 9.932-9.355 10.727.044-.24.057-.49.027-.743l-.073-.613a9.7 9.7 0 0 0 4.918-2.383 1.291 1.291 0 0 1-.24-.265c-.358-.513.11-1.022.11-1.47 0-.44-.902-.403-.935-.695-.113-1.008.63-1.022 1.025-1.411.396-.39-.391-1.276-.9-1.219-.512.054-1.953-.232-1.821-1.317.16-1.322-1.71-1.205-1.979-1.822-.39-.9.259-2.002 1.106-2.253 1.2-.355 2.381-1.318 2.29-2.39-.105-1.214-.664-2.31-1.584-2.96a9.721 9.721 0 0 0-3.07-.677c-.963.037-1.81.248-1.772.682.095 1.064 3.17 1.34 2.654 2.336-.269.518-2.288 1.25-1.911 2.022.245.502.849.072.624 1.035-.104.444-.5 1.277-1.107 1.33-.62.057-1.138-1.562-2.83-1.615-.798-.025-1.925 1.227-.968 2.116.579.538 1.665-.647 1.986.279.226.652-.03 2.022 1.024 2.595.385.209.974.39 1.557.682-.865.174-1.928.499-3.184.974l-1.057-.274c.442-.363 1.162-.618.98-1.411-.265-1.165-2.32-.725-3.736-2.12-.435-.427-1.362-1.847-1.358-3.553a9.327 9.327 0 0 0-.997 5.856c-.017 0-.033-.003-.05-.003a3.26 3.26 0 0 0-1.29.266 10.715 10.715 0 0 1-.136-1.706C1.948 4.868 6.894 0 12.974 0S24 4.868 24 10.851z"
                fill="#FFF"
              />
              <path
                d="m15.729 14.014-2.693 1.218.042-.577 1.744-.775a10.955 10.955 0 0 0-.764-.024c-.964 0-2.592.48-4.393 1.184l-5.777-1.5a2.045 2.045 0 0 0-1.587.238l-.284.176a.437.437 0 0 0-.006.744l3.473 2.217c-.83.417-1.617.841-2.31 1.246l-1.783-.928a1.137 1.137 0 0 0-.94-.05l-.17.067a.438.438 0 0 0-.223.626l.981 1.717c-.37.313-.58.573-.58.753 0 .539.673.673 1.267.673 1.058 0 15.041-3.15 15.041-6.005 0-.566-.393-.848-1.038-1zM9.833 19.588l3.077-1.067a.224.224 0 0 1 .297.182l.27 2.27a1.32 1.32 0 0 1-.769 1.354l-.288.132a.453.453 0 0 1-.526-.109L9.74 19.941a.22.22 0 0 1 .093-.353z"
                fill="#8EE7AD"
              />
            </g>
          </svg>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image } from "#components";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "#imports";
import { useLocalePath } from "#imports";
const localePath = useLocalePath();

const { locale, setLocale } = useI18n();
const { mobile } = useDisplay();

const languages = ref([
  { text: "العربية", value: "ar", flag: "https://flagcdn.com/sa.svg" },
  { text: "English", value: "en", flag: "https://flagcdn.com/us.svg" },
]);

const selectedLanguage = ref(
  languages.value.find((lang) => lang.value === locale.value) ||
    languages.value[0]
);

const changeLocale = (newLocale) => {
  setLocale(newLocale);
};
</script>

<style scoped></style>
