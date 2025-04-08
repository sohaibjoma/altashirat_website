<template>
  <v-app>
    <div class="app-layout">
      <!-- Fixed Header -->
      <div class="header-container">
        <AppHeader />
      </div>

      <!-- Navbar - Only on non-mobile -->
      <div class="navbar-container" v-if="!mobile">
        <AppNavbar />
      </div>

      <Sidebar />

      <!-- Main Content Area -->

      <v-main>
        <slot />
      </v-main>

      <!-- Footer -->
      <div class="footer-container">
        <AppFooter />
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
</script>

<style scoped></style>
