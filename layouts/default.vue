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
import AppHeader from "~/components/layout/Header/index.vue";
import AppNavbar from "~/components/layout/Navbar/index.vue";
import AppFooter from "~/components/layout/Footer/index.vue";
import Sidebar from "~/components/layout/Sidebar/index.vue";

const { mobile } = useDisplay();
const drawerStore = useDrawerStore();
const route = useRoute();

const showSidebar = computed(() => {
  return route.path.startsWith('/profile');
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.navbar-container {
  margin-top: 54px;
  z-index: 5;
}

.content-container {
  margin-top: 100px;
  flex: 1;
  transition: padding 0.3s ease;
}

.footer-container {
  z-index: 1;
}
</style>