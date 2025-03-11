<template>
  <div>
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
      v-model="drawerStore.isOpen"
      width="240"
      location="right"
      class="user-sidebar"
      :class="{ 'user-sidebar-mobile': mobile }"
      :temporary="mobile"
    >
      <v-list>
        <!-- User welcome card -->
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
              <div class="text-text font-weight-bold">{{ user.firstname }}</div>
            </div>
          </div>
        </v-list-item>

        <!-- Navigation items -->
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          class="my-2"
          @click="drawerStore.close()"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-text font-weight-bold">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Navbar items (only visible on mobile) -->
        <template v-if="mobile">
          <v-divider class="my-3"></v-divider>
          <v-list-item
            v-for="(item, index) in navItems"
            :key="`nav-${index}`"
            :to="item.to"
            class="my-2"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-text font-weight-bold">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRoute } from "vue-router";
import { useDrawerStore } from "~/stores/drawer";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const { mobile } = useDisplay();
const route = useRoute();
const drawerStore = useDrawerStore();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const userAvatar = ref("/assets/img/logo.png");

const isProfilePage = computed(() => {
  return route.path.startsWith("/profile") || route.path.startsWith("/user");
});

const editUserPic = () => {
  console.log("Edit profile picture clicked!");
};

const menuItems = ref([
  {
    title: "البيانات الشخصية",
    icon: "mdi-account",
    to: "/user/profile",
  },
  {
    title: "تعديل كلمة المرور",
    icon: "mdi-lock-reset",
    to: "/user/change-password",
  },
  {
    title: "الطلبات",
    icon: "mdi-cart",
    to: "/user/data",
  },
  {
    title: "تسجيل الخروج",
    icon: "mdi-logout",
    to: "/logout",
  },
]);

const navItems = ref([
  { title: t("home"), icon: "mdi-home", to: "/" },
  { title: t("about"), icon: "mdi-information", to: "/about" },
  { title: t("contact"), icon: "mdi-phone", to: "/contact" },
  { title: t("terms"), icon: "mdi-file-document", to: "/terms" },
  { title: t("privacy"), icon: "mdi-shield", to: "/privacy" },
]);

onMounted(() => {
  if (isProfilePage.value) {
    drawerStore.open();
  }
});

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith("/user") || newPath.startsWith("/profile")) {
      drawerStore.open();
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
  background-image: url("assets/img/sidebar.png");
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  margin-top: 80px;
  z-index: 1;
  position: fixed;
}

.user-sidebar-mobile {
  margin-top: 0;
  max-height: 100vh;
}

.sidebar-toggle {
  position: fixed;
  top: 160px;
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
  z-index: 100;
  transition: right 0.3s;
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
</style>
