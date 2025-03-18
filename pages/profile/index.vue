<template>
  <!-- <div>
    <h1>Profile Page</h1>
    <div v-if="user">
      <p>Name: {{ user.firstname }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else></div>
  </div> -->
  <v-container>
    <v-card variant="outlined" class="w-75 rounded-lg custom-card pt-5">
      <div class="d-flex justify-start align-center">
      <div class="profile__h--starter me-5"></div>
        <Image
          name="profile-form-icon.png"
          alt="profile tile image"
          width="30"
        />
        
        <h3 class="text-text profile__h ps-3">المعلومات الشخصية الخاصة بك</h3>
      </div>
      <!-- form start -->
      <VeeForm v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(formSubmitting)">
          
        </v-form>
      </VeeForm>
    </v-card>
  </v-container>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUser();
});

const user = computed(() => authStore.user);
</script>

<style>
.custom-card {
  border: 2px solid #d1d1d180;
}
</style>
