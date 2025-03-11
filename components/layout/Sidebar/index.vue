<template>
  <v-navigation-drawer permanent width="240" class="user-sidebar" >
    <v-list>
      <!-- User welcome section -->
      <v-list-item class="mb-4">
        <v-list-item-avatar>
          <v-avatar size="50">
            <img src="/assets/img/logo.png" alt="User Avatar" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="welcome-text text-text">مرحباً</v-list-item-title>
          <v-list-item-subtitle>{{ userName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- Navigation items -->
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        class="my-2"
      >
        <v-list-item-icon class="ml-3">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="text-right">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const userName = ref("محمد السيد");
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
</script>

<style scoped>
.user-sidebar {
  background-image: url("assets/img/sidebar.png");
  display: flex;
  flex-direction: column;
  height: 100%;
}

.version-info {
  margin-top: auto;
  padding: 16px;
  font-size: 12px;
  opacity: 0.7;
}

.welcome-text {
  font-weight: bold;
}
</style>
