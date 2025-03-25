<template>
  <v-container class="pb-12">
    <DeleteAccountCard @delete-account="handleDeleteAccount" />
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "profile",
  middleware: "auth",
});

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
