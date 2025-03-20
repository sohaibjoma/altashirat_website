// layouts/profile.vue
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
      
      <!-- Sidebar is always shown in profile layout -->
      <Sidebar />
      
      <!-- Main Content Area -->
      <div class="content-container" :class="{ 'with-sidebar': drawerStore.isOpen }">
        <v-main>
          <div class="pa-4">
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
import { onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { useDrawerStore } from '~/stores/drawer';


const { mobile } = useDisplay();
const drawerStore = useDrawerStore();

onMounted(() => {
  drawerStore.open();
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar-container {
  z-index: 5;
}

.content-container {
  margin-top: 80px;
  flex: 1;
  transition: padding 0.3s ease;
}

.content-container.with-sidebar {
  padding-right: 40px;
}

.footer-container {
  z-index: 1;
}
</style>