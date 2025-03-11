<template>
  <div>
    <h1>Profile Page</h1>
    <div v-if="user">
      <p>Name: {{ user.firstname }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUser();
});

const user = computed(() => authStore.user);
</script>
