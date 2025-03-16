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
        <nuxt-link to="/" :class="{ 'active-link': isActive('/') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{ $t("home") }}</v-btn>
        </nuxt-link>
        <nuxt-link to="/about" :class="{ 'active-link': isActive('/about') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{ $t("about") }}</v-btn>
        </nuxt-link>
        <nuxt-link to="/contact" :class="{ 'active-link': isActive('/contact') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{ $t("contact") }}</v-btn>
        </nuxt-link>
        <nuxt-link to="/terms" :class="{ 'active-link': isActive('/terms') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{ $t("terms") }}</v-btn>
        </nuxt-link>
        <nuxt-link to="/privacy" :class="{ 'active-link': isActive('/privacy') }">
          <v-btn rounded="pill" class="link-btn rounded-pill">{{ $t("privacy") }}</v-btn>
        </nuxt-link>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";

const value = ref(0);
const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.link-btn {
  color: white;
  height: 40px;
  font-size: 14px;
  padding : 0 10px;
}

.link-btn:hover {
  background-color: var(--v-primary-lighten3); /* Use your custom theme's primary-3 */
}

.active-link .link-btn {
  color: var(--v-primary-base) !important; /* Use your custom theme's primary */
  background-color: var(--white) !important;
}
</style>