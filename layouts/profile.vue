<template>
  <v-app>
    <div>
      <AppHeader />

      <div v-if="!mobile">
        <AppNavbar class="mt-5" />
      </div>

      <Sidebar />

      <v-main>
        <slot />
      </v-main>

      <div class="footer-container">
        <AppFooter />
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useDrawerStore } from "~/stores/drawer";

const { mobile } = useDisplay();
const drawerStore = useDrawerStore();

onMounted(() => {
  drawerStore.open();
});
</script>

<style scoped></style>