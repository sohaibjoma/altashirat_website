<template>
  <div class="navbar-container w-50 mx-auto d-flex justify-center">
    <v-layout class="overflow-visible" style="height: 56px">
      <v-bottom-navigation
        class="rounded-xl navbar"
        v-model="value"
        grow
        color="primary"
        background-color="white"
        focused-backgrounfcolor="white"
        active-color="white"
        rounded
        active
      >
        <v-btn>{{ $t("home") }}</v-btn>
        <v-btn>{{ $t("about") }}</v-btn>
        <v-btn>{{ $t("contact") }}</v-btn>
        <v-btn>{{ $t("terms") }}</v-btn>
        <v-btn>{{ $t("privacy") }}</v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref(0);
</script>

<style scoped>
.navbar {
  background: var(--gradient-nav);
  min-width: fit-content;
}

.v-btn {
  color: var(--white);
  font-weight: bold;
  font-size: 20px;
}
</style>
