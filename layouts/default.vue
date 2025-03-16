// layouts/default.vue
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
      
      <!-- Sidebar is conditionally shown and doesn't overlay -->
      <Sidebar />
      
      <!-- Main Content Area -->
      <div class="content-container" :class="{ 'with-sidebar': drawerStore.isOpen && showSidebar }">
        <v-main>
          <div>
            <slot />
          </div>
        </v-main>
      </div>
      
      <!-- Footer -->
      <div class="footer-container">
        <AppFooter />
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import { useDrawerStore } from '~/stores/drawer';

const { mobile } = useDisplay();
const drawerStore = useDrawerStore();
const route = useRoute();

const showSidebar = computed(() => {
  return route.path.startsWith('/profile');
});
</script>

<style scoped>

</style>