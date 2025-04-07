<template>
  <v-container fluid class="fill-height pa-0 ma-0 position-relative">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-none d-md-flex pa-0 ma-0">
        <Image
          name="signup.png"
          class="w-100 h-100 object-cover"
          cover
          min-height="100%"
          max-height="100vh"
        />
      </v-col>

      <!-- Register Card Column -->
      <v-col cols="12" md="6" class="d-flex flex-column align-center pa-6">
        <div 
          :class="[
            'back-button-wrapper',
            isRTL ? 'back-button-rtl' : 'back-button-ltr'
          ]"
        >
          <BackButton :text="$t('backToHome')" @click="navigateTo('/')" />
        </div>

        <v-card class="pa-12 rounded-xl w-100 card-with-shadow mt-15" max-width="600">
          <!-- Logo -->
          <div class="d-flex justify-center mb-4">
            <Image name="logo.png" max-width="120" alt="Logo" />
          </div>

          <v-card-title class="text-center font-weight-bold text-text mb-4">
            {{ $t("register") }}
          </v-card-title>

          <!-- Form -->
          <v-card-text>
            <VeeForm v-slot="{ handleSubmit }">
              <v-form
                ref="registerForm"
                @submit.prevent="handleSubmit(formSubmitting)"
              >
                <!-- First Name and Last Name -->
                <v-row>
                  <v-col cols="12" sm="6">
                    <Text
                      v-model="firstName"
                      :label="$t('firstName')"
                      :placeholder="$t('enterFirstName')"
                      name="firstname"
                      rules="required|min:3|max:15"
                      icon="mdi-account"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <Text
                      v-model="lastName"
                      :label="$t('lastName')"
                      :placeholder="$t('enterLastName')"
                      name="lastname"
                      rules="required|min:3|max:15"
                      icon="mdi-account"
                    />
                  </v-col>
                </v-row>

                <!-- Email input -->
                <Text
                  v-model="email"
                  :label="$t('email')"
                  :placeholder="$t('enterEmail')"
                  name="email"
                  rules="required|email"
                  icon="mdi-email"
                />

                <!-- Phone Input -->
                <PhoneInput
                  :title="$t('phoneNumber')"
                  :country-code-model-value="countryCode"
                  country-code-name="phone.country_code"
                  country-code-rules="required"
                  :country-code-label="$t('countryCode')"
                  :phone-number-label="$t('phoneNumber')"
                  :phone-number-placeholder="$t('enterPhoneNumber')"
                  :phone-number-model-value="phoneNumber"
                  phone-number-name="phone.number"
                  phone-number-rules="required|phoneNum"
                  :country-options="phoneCodeOptions"
                  class="mb-5"
                  @update:country-code-model-value="countryCode = $event"
                  @update:phone-number-model-value="phoneNumber = $event"
                />

                <!-- Password Input -->
                <Password
                  v-model="password"
                  :title="$t('password')"
                  :label="$t('enterPassword')"
                  class="mb-3"
                  name="password"
                  rules="required|min:8|max:50"
                />

                <!-- Confirm Password Input -->
                <Password
                  v-model="confirmPassword"
                  :title="$t('confirmPassword')"
                  :label="$t('confirmPasswordDescription')"
                  class="mb-5"
                  name="password_confirmation"
                  rules="required|confirmed:@password"
                />

                <!-- Register Button -->
                <MainButton
                  width="100%"
                  :text="$t('register')"
                  type="submit"
                  :loading="isLoading"
                  class="mb-5"
                />

                <!-- Register Link -->
                <div class="text-center">
                  <span class="me-1 font-weight-bold">{{
                    $t("haveAccount")
                  }}</span>
                  <CustomLink
                    path="/login"
                    class="text-decoration-none text-secondary font-weight-bold"
                  >
                    {{ $t("login") }}
                  </CustomLink>
                </div>
              </v-form>
            </VeeForm>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useI18n } from "#imports";

const { t, locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const countryCode = ref("");
const phoneNumber = ref("");
const country = ref(null);
const password = ref("");
const confirmPassword = ref("");
const countryOptions = ref([]);
const phoneCodeOptions = ref([]);
const countryDataMap = ref({});
const isLoading = ref(false);
const isFetchingCountries = ref(false);
const registerForm = ref(null);

const { GET, POST } = useApi();
const authStore = useAuthStore();
const errorStore = useErrorStore();
const notificationStore = useNotificationStore();

onMounted(async () => {
  try {
    await fetchCountries();
  } catch (error) {
    console.error("Failed to initialize registration page:", error);
    notificationStore.setNotification(
      "Failed to initialize registration page. Please try again.",
      "error"
    );
  }
});

const fetchCountries = async () => {
  isFetchingCountries.value = true;
  try {
    const response = await GET("/countries?pagination=all");

    countryDataMap.value = response.data.reduce((acc, country) => {
      acc[country.id] = country;
      return acc;
    }, {});

    countryOptions.value = response.data.map((country) => ({
      text: country.name,
      value: country.id,
      phone_code: country.phone_code,
      code: country.code.toLowerCase(),
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

    const saudiArabia = countryOptions.value.find((c) => c.code === "sa");
    if (saudiArabia) {
      country.value = saudiArabia.value;
      countryCode.value = "00" + saudiArabia.phone_code.replace(/^\+|^00/, "");
    } else if (countryOptions.value.length > 0) {
      country.value = countryOptions.value[0].value;
      countryCode.value =
        "00" + countryOptions.value[0].phone_code.replace(/^\+|^00/, "");
    }
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    notificationStore.setNotification(
      t("notification.failedToLoadCountries"),
      "error"
    );
  } finally {
    isFetchingCountries.value = false;
  }
};

watch(countryCode, (newCountryCode) => {
  const numericCode = newCountryCode.replace(/^\+|^00/, "");

  const matchingPhoneOption = phoneCodeOptions.value.find(
    (option) => option.value === numericCode
  );
  if (matchingPhoneOption && matchingPhoneOption.country_id) {
    if (country.value !== matchingPhoneOption.country_id) {
      country.value = matchingPhoneOption.country_id;
    }
  }
});

const formSubmitting = async () => {
  if (!registerForm.value) return;

  const { valid } = await registerForm.value.validate();
  if (!valid) return;

  errorStore.clearErrors();
  isLoading.value = true;

  try {
    let formattedCountryCode = countryCode.value;
    if (!formattedCountryCode.startsWith("00")) {
      formattedCountryCode = "00" + formattedCountryCode.replace(/^\+/, "");
    }

    const payload = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      phone: {
        country_code: formattedCountryCode,
        number: phoneNumber.value,
      },
      country: country.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    const response = await POST("/signup", payload);

    authStore.setToken(response.token);
    authStore.setUser(response.user);

    notificationStore.setNotification(t("notification.registerSuccess"), "success");

    navigateTo("/");
  } catch (error) {
    console.error("Registration error:", error);
    notificationStore.setNotification(
      error.response?.data?.message || t("notification.registerFailed"),
      "error"
    );
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  layout: "minimal",
  middleware: "auth",
});
</script>

<style scoped>
.back-button-wrapper {
  position: absolute;
  top: 24px;
  z-index: 100;
}

.back-button-ltr {
  right: 24px;
}

.back-button-rtl {
  left: 24px;
}

.card-with-shadow {
  border-radius: 24px;
  background-color: white;
  border: 1px solid #bbbbbb80 50%;
  box-shadow: 0 10px 30px 5px rgba(176, 211, 255, 0.41),
    0 10px 30px 5px rgba(173, 220, 253, 0.41),
    0 10px 30px 5px rgba(192, 249, 212, 0.41);
}
</style>