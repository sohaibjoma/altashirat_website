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
            name="profile-form-icon.png"
            alt="profile tile image"
            width="30"
          />
          <h3 class="text-text profile__h ps-3 d-none d-md-block">
            {{ $t("profile.title") }}
          </h3>
          <div class="text-text profile__small-title d-md-none">
            {{ $t("profile.title") }}
          </div>
        </div>
        <div class="ms-auto me-lg-10 mb-8 mb-lg-0">
          <CustomLink
            to="/profile/delete-account"
            class="profile__more-btn text-primary bg-bg-input text-decoration-none rounded-pill px-4 py-2"
          >
            {{ $t("profile.more") }}
          </CustomLink>
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
            <Text
              v-model="formState.firstName"
              :label="$t('profile.firstName')"
              name="firstname"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Text
              v-model="formState.middleName"
              :label="$t('profile.middleName')"
              :placeholder="$t('profile.enterMiddleName')"
              name="middlename"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Text
              v-model="formState.lastName"
              :label="$t('profile.lastName')"
              name="lastname"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Text
              v-model="formState.email"
              :label="$t('profile.email')"
              :placeholder="$t('profile.enterEmail')"
              name="email"
              rules="email"
              icon="mdi-email"
            />
          </div>

          <!-- Phone Input -->
          <div class="w-lg-50 w-100 pe-16">
            <PhoneInput
              :title="$t('profile.phoneNumber')"
              :country-code-model-value="formState.countryCode"
              country-code-name="phone.country_code"
              :country-code-label="$t('profile.countryCode')"
              :phone-number-label="$t('profile.phoneNumber')"
              :phone-number-placeholder="$t('profile.enterPhoneNumber')"
              :phone-number-model-value="formState.phoneNumber"
              phone-number-name="phone.number"
              :country-options="phoneCodeOptions"
              class="mb-5"
              @update:country-code-model-value="formState.countryCode = $event"
              @update:phone-number-model-value="formState.phoneNumber = $event"
            />
          </div>

          <!-- Date Input -->
          <div class="w-100 w-lg-50 pe-16">
            <DateInput
              v-model="formState.birthdate"
              name="birthdate"
              :title="$t('profile.birthdate')"
              class="rounded-xl"
            />
          </div>

          <!-- Country Select -->
          <div class="w-100 w-lg-50 pe-16">
            <Select
              v-model="formState.country"
              :title="$t('profile.country')"
              :items="countriesNames"
              name="country"
              class="mb-5"
              icon="mdi-flag"
            />
          </div>

          <!-- Submit Button -->
          <div class="ms-lg-auto w-100">
            <MainButton
              width="150"
              :text="$t('profile.save')"
              type="submit"
              class="mb-5 ms-auto me-14"
            />
          </div>
        </v-form>
      </VeeForm>
    </v-card>
  </v-container>
</template>

<script setup>
import { useI18n } from "#imports";
import { onMounted, reactive, ref } from "vue";

const { t } = useI18n();

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const formState = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  country: "",
  birthdate: null,
});

const codeFlagArr = ref([]);
const phoneCodeOptions = ref([]);
const countriesNames = ref([]);

// API and store usage
const { GET, POST } = useApi();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

// Fetch user and countries on mount
onMounted(async () => {
  await authStore.fetchUser();
  await fetchCountries();
  initializeFormWithUserData(); // Initialize form with user data
});

const fetchCountries = async () => {
  try {
    const response = await GET("/countries?pagination=all");

    codeFlagArr.value = response.data.map((country) => ({
      value: country.id,
      phone_code: country.phone_code,
      code: country.code,
    }));

    phoneCodeOptions.value = response.data.reduce((acc, country) => {
      const numericCode = country.phone_code.replace(/^\+|^00/, "");
      const exists = acc.some((c) => c.value === numericCode);
      if (!exists) {
        acc.push({
          text: `${country.name} (${country.phone_code})`,
          value: numericCode,
          code: country.code.toLowerCase(),
          country_id: country.id,
        });
      }
      return acc;
    }, []);

    countriesNames.value = response.data.map((country) => ({
      text: country.name,
      value: country.id,
    }));
  } catch (error) {
    console.error("Failed to fetch countries:", error);
  }
};
// Initialize form with user data
const initializeFormWithUserData = () => {
  const user = authStore.user;
  if (user) {
    formState.firstName = user.firstname || "";
    formState.middleName = user.middlename || "";
    formState.lastName = user.lastname || "";
    formState.email = user.email || "";
    formState.birthdate = user.birthdate || null;

    // Initialize phone data
    if (user.phone) {
      formState.countryCode = user.phone.country_code || "";
      formState.phoneNumber = user.phone.number || "";
    }

    // Initialize country
    if (user.country) {
      formState.country = user.country.id || "";
    }
  }
};

// Form submission
const formSubmitting = async () => {
  try {
    // Create FormData dynamically with current form state
    const formData = new FormData();
    formData.append("firstname", formState.firstName);
    formData.append("middlename", formState.middleName);
    formData.append("lastname", formState.lastName);
    formData.append("email", formState.email);
    formData.append("birthdate", formState.birthdate);
    formData.append("phone[country_code]", formState.countryCode);
    formData.append("phone[number]", formState.phoneNumber);
    formData.append("country", formState.country);

    const response = await POST("/update-account", formData);

    // Update user in store with new data
    authStore.updateUser({
      firstname: formState.firstName,
      middlename: formState.middleName,
      lastname: formState.lastName,
      email: formState.email,
      birthdate: formState.birthdate,
      phone: {
        country_code: formState.countryCode,
        number: formState.phoneNumber,
      },
      country: { id: formState.country },
    });

    notificationStore.setNotification(
      t("notification.updateSuccess"),
      "success"
    );
  } catch (error) {
    notificationStore.setNotification(
      error.response?.data?.message || t("notification.updateFailed"),
      "error"
    );
  }
};
</script>

<style>
.custom-card {
  border: 2px solid #d1d1d180;
}
</style>
