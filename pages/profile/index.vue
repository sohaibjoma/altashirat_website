<template>
  <v-container>
    <v-card variant="outlined" class="rounded-lg custom-card pt-5 w-75">
      <v-card-title class="d-flex justify-space-between align-center">
      <div class="d-flex justify-start align-center">
        <div class="profile__h--starter me-5"></div>
        <Image
          name="profile-form-icon.png"
          alt="profile tile image"
          width="30"
        />
        <h3 class="text-text profile__h ps-3">{{ $t('profile.title') }}</h3>
      </div>
      <span class="ms-auto me-10">
        <CustomLink to="/profile" class="profile__more-btn text-primary bg-bg-input text-decoration-none rounded-pill px-4 py-2">
          المـــزيد
        </CustomLink>
      </span>

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
              label="enterLastName"
              name="middlename"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Text
              v-model="formState.middleName"
              label="enterLastName"
              name="middlename"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-100 w-lg-50 pe-16">
            <Text
              v-model="formState.lastName"
              label="enterLastName"
              name="lastname"
              rules="alpha"
              icon="mdi-account"
            />
          </div>

          <div class="w-50 pe-16">
            <Text
              v-model="formState.email"
              label="enterEmail"
              placeholder="enterEmail"
              name="email"
              rules="email"
              icon="mdi-email"
            />
          </div>

          <!-- Phone Input -->
          <div class="w-50 pe-16">
            <PhoneInput
              :title="$t('phoneNumber')"
              :country-code-model-value="formState.countryCode"
              country-code-name="phone.country_code"
              country-code-rules="required"
              :country-code-label="$t('countryCode')"
              :phone-number-label="$t('phoneNumber')"
              :phone-number-placeholder="$t('enterPhoneNumber')"
              :phone-number-model-value="formState.phoneNumber"
              phone-number-name="phone.number"
              :country-options="phoneCodeOptions"
              class="mb-5"
              @update:country-code-model-value="formState.countryCode = $event"
              @update:phone-number-model-value="formState.phoneNumber = $event"
            />
          </div>

          <!-- Date Input -->
          <div class="w-50 pe-16">
            <DateInput
              v-model="formState.birth_date"
              name="birth_date"
              title="birthdate"
              class="rounded-xl"
            />
          </div>

          <!-- Country Select -->
          <div class="w-50 pe-16">
            <Select
              v-model="formState.country"
              :label="$t('country')"
              :items="countriesNames"
              name="country"
              rules="required"
              class="mb-5"
            />
          </div>

          <!-- Submit Button -->
          <div class="ms-auto w-100">
            <LoginBtn
              width="150"
              text="حفظ"
              type="submit"
              :loading="isLoading"
              class="mb-5 ms-auto me-14"
            />
          </div>
        </v-form>
      </VeeForm>
    </v-card>
  </v-container>
</template>

<script setup>
// Reactive form state
const formState = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  country: "",
  birth_date: null,
});

// Initialize arrays for countries
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

// Fetch countries
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
    console.log("Initializing form with user data:", user); // Debugging

    formState.firstName = user.firstname || "";
    formState.middleName = user.middlename || "";
    formState.lastName = user.lastname || "";
    formState.email = user.email || "";
    formState.birth_date = user.birthdate || null;

    // Initialize phone data
    if (user.phone) {
      formState.countryCode = user.phone.country_code || "";
      formState.phoneNumber = user.phone.number || "";
    }

    // Initialize country
    if (user.country) {
      formState.country = user.country.id || "";
    }

    console.log("Form State after initialization:", formState); // Debugging
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
    formData.append("birth_date", formState.birth_date);
    formData.append("phone[country_code]", formState.countryCode);
    formData.append("phone[number]", formState.phoneNumber);
    formData.append("country", formState.country);

    console.log("Form Data:", Object.fromEntries(formData.entries())); // Debugging

    const response = await POST("update-account", formData);
    notificationStore.setNotification("Login successful!", "success");

  } catch (error) {
    notificationStore.setNotification(
      error.response?.data?.message || "Login failed. Please try again.",
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