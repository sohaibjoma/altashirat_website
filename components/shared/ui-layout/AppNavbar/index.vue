<template>
  <div class="navbar-container mx-auto d-flex justify-center align-center">
    <v-layout class="overflow-visible" height="35">
      <v-bottom-navigation
        class="rounded-xl py-2"
        id="navbar"
        v-model="value"
        grow
        color="primary"
        background-color="white"
        rounded
        active
      >
        <CustomLink path="/" :class="{ 'active-link': isActive('/') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{
            $t("home-title")
          }}</v-btn>
        </CustomLink>
        <CustomLink
          path="/about"
          :class="{ 'active-link': isActive('/about') }"
        >
          <v-btn rounded="pill" class="link-btn rounded-pill">{{
            $t("about")
          }}</v-btn>
        </CustomLink>
        <CustomLink
          path="/contact"
          :class="{ 'active-link': isActive('/contact') }"
        >
          <v-btn rounded="pill" class="link-btn rounded-pill">{{
            $t("contact")
          }}</v-btn>
        </CustomLink>
        <CustomLink
          path="/terms"
          :class="{ 'active-link': isActive('/terms') }"
        >
          <v-btn rounded="pill" class="link-btn rounded-pill">{{
            $t("terms")
          }}</v-btn>
        </CustomLink>
        <CustomLink
          path="/privacy-policy"
          :class="{ 'active-link': isActive('/privacy-policy') }"
        >
          <v-btn rounded="pill" class="link-btn rounded-pill">{{
            $t("privacy-policy")
          }}</v-btn>
        </CustomLink>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";
import { useLocalePath } from "#imports";

const value = ref(0);
const route = useRoute();

const localePath = useLocalePath();

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.link-btn {
  color: white;
  height: 40px;
  font-size: 14px;
  padding: 0 10px;
}

.link-btn:hover {
  background-color: var(--v-primary-lighten3);
}

.active-link .link-btn {
  color: var(--primary) !important;
  background-color: var(--white) !important;
}
</style>
