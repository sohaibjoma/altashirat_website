<template>
  <v-container class="pb-12">
    <DeleteAccountCard @delete-account="handleDeleteAccount" />
  </v-container>
</template>

<script setup>
import { useI18n } from "#imports";

const { t } = useI18n();

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

import { navigateTo } from "#app";

const { POST } = useApi();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const handleDeleteAccount = async (password) => {
  try {
    const response = await POST("/delete-account", { password });
    authStore.clearToken();
    navigateTo("/");
    notificationStore.setNotification(
      t("notification.deleteSuccess"),
      "success"
    );
  } catch (error) {
    notificationStore.setNotification(
      error.response?.data?.message || t("notification.deleteFailed"),
      "error"
    );
    console.error("Error deleting account:", error);
  }
};
</script>

<style scoped></style>
