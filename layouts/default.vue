<template>
  <div class="layout-container">
    <AppHeader />

    <AppNavbar />

    <Sidebar />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "~/components/layout/Header/index.vue";
import AppNavbar from "~/components/layout/Navbar/index.vue";
import AppFooter from "~/components/layout/Footer/index.vue";
import Sidebar from "~/components/layout/Sidebar/index.vue";
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
}
</style>