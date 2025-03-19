<template>
  <v-container class="py-12">
    <AccountSettingsCard @delete-account="handleDeleteAccount" />
  </v-container>
</template>

<script setup>
import AccountSettingsCard from "~/components/shared/Cards/DeleteAccount/index.vue";
import { useApi } from "~/composables/api";
import { useAuthStore } from "~/stores/auth";
import { navigateTo } from "#app";

const { POST } = useApi();
const authStore = useAuthStore();

const handleDeleteAccount = async (password) => {
  try {
    const response = await POST("/delete-account", { password });
    console.log("API Response:", response);
    authStore.clearToken();
    navigateTo("/");
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};
</script>

<style scoped></style>
