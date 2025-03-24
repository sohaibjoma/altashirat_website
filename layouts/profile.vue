<template>
  <v-app>
    <div>
      <AppHeader />

      <div v-if="!mobile">
        <AppNavbar />
      </div>

      <Sidebar />

      <div
        class="content-container"
        :class="{ 'with-sidebar': drawerStore.isOpen }"
      >
        <v-main>
          <div class="pa-4">
            <slot />
          </div>
        </v-main>
      </div>

      <div class="footer-container">
        <AppFooter />
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useDrawerStore } from "~/stores/drawer";

const { mobile } = useDisplay();
const drawerStore = useDrawerStore();

onMounted(() => {
  drawerStore.open();
});
</script>

<style scoped>
.content-container {
  flex: 1;
  transition: padding 0.3s ease;
}
</style>