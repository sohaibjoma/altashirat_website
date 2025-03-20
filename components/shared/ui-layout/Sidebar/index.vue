<template>
  <!-- Toggle button !Only visible on mobile -->
  <div
    v-if="mobile"
    class="sidebar-toggle"
    @click="drawerStore.toggle()"
    :class="{ closed: !drawerStore.isOpen }"
  >
    <v-icon>{{
      drawerStore.isOpen ? "mdi-chevron-right" : "mdi-chevron-left"
    }}</v-icon>
  </div>

  <v-navigation-drawer
    v-if="!mobile || drawerStore.isOpen || isProfilePage"
    v-model="drawerStore.isOpen"
    width="240"
    location="right"
    class="user-sidebar"
    :class="{ 'user-sidebar-mobile': mobile }"
    :temporary="mobile"
    :permanent="!mobile"
    fixed
  >
    <v-list class="sidebar-content">
      <!-- Authenticated layout -->
      <template v-if="isAuthenticated">
        <!-- Welcome card -->
        <v-list-item class="mb-4">
          <div class="welcome-card">
            <div class="avatar-container">
              <v-avatar size="40">
                <img :src="userAvatar" alt="User Avatar" />
              </v-avatar>
              <div class="edit-icon-overlay" @click.stop="editUserPic">
                <v-icon size="small">mdi-pencil</v-icon>
              </div>
            </div>
            <div>
              <div class="font-weight-bold text-text">مرحباً:</div>
              <div v-if="user" class="text-text font-weight-bold">
                {{ user.firstname || user.name }}
              </div>
            </div>
          </div>
        </v-list-item>

        <!-- Navbar items -->
        <v-list-item
          v-for="(item, index) in navItems"
          :key="`nav-${index}`"
          :to="item.to"
          class="my-2 sidebar-item"
          @click="drawerStore.close()"
          active-class="active-item"
        >
          <template v-slot:prepend>
            <v-icon class="item-icon">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-text font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- User routes -->
        <v-list-item
          v-for="item in filteredMenuItems"
          :key="item.title"
          :to="item.to"
          class="my-2 sidebar-item"
          @click="drawerStore.close()"
          active-class="active-item"
        >
          <template v-slot:prepend>
            <v-icon class="item-icon">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-text font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- Logout -->
        <v-list-item
          class="my-2 sidebar-item"
          @click="handleLogout"
          active-class="active-item"
        >
          <template v-slot:prepend>
            <v-icon class="item-icon">mdi-logout</v-icon>
          </template>
          <v-list-item-title class="text-text font-weight-bold">
            {{ t("logout") }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <!-- Unauthenticated layout -->
      <template v-else>
        <!-- Navbar items -->
        <v-list-item
          v-for="(item, index) in navItems"
          :key="`nav-${index}`"
          :to="item.to"
          class="my-2 sidebar-item"
          @click="drawerStore.close()"
          active-class="active-item"
        >
          <template v-slot:prepend>
            <v-icon class="item-icon">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-text font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- Login/Signup -->
        <v-list-item
          v-for="item in filteredMenuItems"
          :key="item.title"
          :to="item.to"
          class="my-2 sidebar-item"
          @click="drawerStore.close()"
          active-class="active-item"
        >
          <template v-slot:prepend>
            <v-icon class="item-icon">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="text-text font-weight-bold">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useDrawerStore } from "~/stores/drawer";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~/stores/auth";
import { useNotificationStore } from "~/stores/notifications";

const { t } = useI18n();
const { mobile } = useDisplay();
const route = useRoute();
const drawerStore = useDrawerStore();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const user = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const userAvatar = ref("/assets/img/logo.png");

const isProfilePage = computed(() => {
  return (
    route.path.startsWith("/profile") ||
    route.path.startsWith("/change-password") ||
    route.path.startsWith("/data") ||
    route.path.startsWith("/account")
  );
});

const editUserPic = () => {
  console.log("Edit profile picture clicked!");
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    notificationStore.setNotification("Logged out successfully", "success");
    drawerStore.close();
  } catch (error) {
    notificationStore.setNotification(
      "Failed to log out. Please try again.",
      "error"
    );
  }
};

const menuItems = computed(() => {
  if (!isAuthenticated.value) {
    return [
      { title: t("login"), icon: "mdi-login", to: "/login" },
      { title: t("register"), icon: "mdi-account-plus", to: "/register" },
    ];
  }

  return [
    {
      title: t("profile.personalInfo"),
      icon: "mdi-account",
      to: "/profile",
    },
    {
      title: t("profile.changePassword"),
      icon: "mdi-lock-reset",
      to: "/change-password",
    },
    {
      title: t("profile.orders"),
      icon: "mdi-cart",
      to: "/data",
    },
  ];
});

const filteredMenuItems = computed(() => menuItems.value);

const navItems = ref([
  { title: t("home-title"), icon: "mdi-home", to: "/" },
  { title: t("about"), icon: "mdi-information", to: "/about" },
  { title: t("contact"), icon: "mdi-phone", to: "/contact" },
  { title: t("terms"), icon: "mdi-file-document", to: "/terms" },
  { title: t("privacy"), icon: "mdi-shield", to: "/privacy" },
]);

onMounted(() => {
  if (isProfilePage.value) {
    drawerStore.open();
  } else {
    drawerStore.close();
  }
});

watch(
  () => route.path,
  (newPath) => {
    if (isProfilePage.value) {
      drawerStore.open();
    } else {
      drawerStore.close();
    }
  }
);

watch(mobile, (isMobile) => {
  if (isMobile && isProfilePage.value) {
    drawerStore.open();
  }
});
</script>

<style scoped>
.user-sidebar {
  background-image: url("/assets/img/sidebar.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  overflow-y: auto;
}

.user-sidebar-mobile {
  height: 100vh;
  top: 0;
}

.sidebar-content {
  height: 100%;
  padding: 16px 0;
}

.sidebar-toggle {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 240px;
  width: 32px;
  height: 32px;
  background-color: var(--primary);
  color: white;
  border-radius: 50% 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  transition: right 0.3s ease;
}

.sidebar-toggle.closed {
  right: 0;
}

.welcome-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 8px 12px;
  width: 200px;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.avatar-container {
  position: relative;
  margin: 10px;
}

.edit-icon-overlay {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--white);
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.sidebar-item {
  padding: 8px 16px;
  transition: all 0.3s ease;
}

.sidebar-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.active-item {
  background-color: rgba(0, 0, 0, 0.2);
}

.item-icon {
  margin-right: 16px;
}
</style>
