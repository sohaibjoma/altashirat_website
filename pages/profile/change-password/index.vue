<template>
  <v-container>
    <v-card
      variant="outlined"
      class="rounded-lg custom-card pt-5 w-75 mx-auto ms-lg-5 mt-lg-5 mx-lg-0 pb-lg-16"
    >
      <v-card-title
        class="d-flex flex-column-reverse flex-lg-row justify-space-between align-center"
      >
        <div class="d-flex justify-start align-center">
          <div class="profile__h--starter me-5 d-none d-md-block"></div>
          <Image
            name="change-pass.png"
            alt="change-password image"
            width="30"
          />
          <h3 class="text-text profile__h ps-3 d-none d-md-block">
            {{ $t("profile.changePasswordTitle") }}
          </h3>
          <div class="text-text profile__small-title d-md-none">
            {{ $t("profile.changePasswordTitle") }}
          </div>
        </div>
      </v-card-title>

      <!-- Form Start -->
      <VeeForm v-slot="{ handleSubmit }">
        <v-form
          @submit.prevent="handleSubmit(formSubmitting)"
          class="d-flex flex-wrap g-4 space-between ps-6"
        >
          <!-- Form Fields -->
          <div class="w-100 w-lg-50 pe-16">
            <Password
              v-model="formState.oldPass"
              :title="$t('profile.currentPassword')"
              :label="$t('profile.enterCurrentPassword')"
              class="mb-1 mt-6 w-100"
              name="old_password"
              rules="required|min:8|max:50"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Password
              v-model="formState.newPass"
              :title="$t('profile.newPassword')"
              :label="$t('profile.enterNewPassword')"
              class="mb-1 mt-6 w-100"
              name="new_password"
              rules="required|min:8|max:50"
            />
          </div>

          <!-- Confirm Password Input -->
          <div class="w-100 w-lg-50 pe-16">
          <Password
            v-model="formState.newPassConfirm"
            :title="$t('profile.enterConfirmNewPassword')"
            :label="$t('profile.confirmNewPassword')"
            class="mb-1 mt-6 w-100"
            name="new_password_confirmation"
            rules="required|confirmed:@new_password"
          />
          </div>

          <!-- Submit Button -->
          <div class="ms-lg-auto w-100 d-flex align-center justify-center">
            <MainButton
              width="150"
              :text="$t('profile.save')"
              type="submit"
              class="mb-5 ms-lg-auto me-lg-14 mt-5"
            />
          </div>
        </v-form>
      </VeeForm>
    </v-card>
  </v-container>
</template>

<script setup>
import { useI18n } from "#imports";

const { t } = useI18n();

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const { POST } = useApi();
const notificationStore = useNotificationStore();

const formState = ref({
  oldPass: "",
  newPass: "",
  newPassConfirm: "",
});

const formSubmitting = async () => {
  try {
    const payload = new FormData();
    payload.append("old_password", formState.value.oldPass);
    payload.append("new_password", formState.value.newPass);
    payload.append("new_password_confirmation", formState.value.newPassConfirm);

    const response = await POST("change-password", payload);
    notificationStore.setNotification(t("notification.registerSuccess"), "success");
  } catch (error) {
    notificationStore.setNotification(
      error.response?.data?.message || t("notification.registerFailed"),
      "error"
    );
  }
};
</script>
