<template>
  <v-container fluid class="fill-height pa-0 ma-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" md="6" class="d-none d-md-flex pa-0 ma-0">
        <!-- <Image src="login.png" class="w-100 h-100 object-cover" cover min-height="100vh" max-height="100vh" /> -->
        <v-img
          src="assets/img/login.png"
          class="w-100 h-100 object-cover"
          cover
          min-height="100vh"
          max-height="100vh"
        />
      </v-col>

      <!-- Login Card Column -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center pa-4">
        <v-card class="pa-6 rounded-xl w-100 card-with-shadow" max-width="500">
          <!-- Logo -->
          <div class="d-flex justify-center mb-4">
            <v-img src="assets/img/logo.png" max-width="120" alt="Logo" />
            <!-- <Image src="/logo.png" max-width="120" alt="Logo" /> -->
          </div>

          <v-card-title class="text-center text-h5 font-weight-bold text-text">
            {{ $t("login") }}
          </v-card-title>

          <!-- Form -->
          <v-card-text>
            <v-form ref="loginForm" @submit.prevent="submitForm">
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
                phone-number-rules="required|phone"
                :country-options="countryOptions"
                class="mb-5"
                @update:country-code-model-value="countryCode = $event"
                @update:phone-number-model-value="phoneNumber = $event"
              />

              <!-- Password Input -->
              <Password
                v-model="password"
                :title="$t('password')"
                :label="$t('enterPassword')"
                class="mb-1"
                name="password"
                rules="required|min:8|max:50"
              />

              <!-- Forgot Password -->
              <div class="d-flex justify-end mb-5">
                <router-link
                  to="/"
                  class="text-decoration-none font-weight-bold text-text"
                >
                  {{ $t("forgotPassword") }}
                </router-link>
              </div>

              <!-- Login Button -->
              <Button
                width="100%"
                :text="$t('login')"
                type="submit"
                :loading="isLoading"
                class="mb-5"
              />

              <!-- Register Link -->
              <div class="text-center">
                <span class="me-1 font-weight-bold">{{ $t("noAccount") }}</span>
                <router-link
                  to="/register"
                  class="text-decoration-none text-secondary font-weight-bold"
                >
                  {{ $t("registerAccount") }}
                </router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Button from "@/components/Buttons/Login/index.vue";
import PhoneInput from "@/components/Inputs/Phone/index.vue";

const countryCode = ref("");
const phoneNumber = ref("");
const password = ref("");
const countryOptions = ref([]);
const isLoading = ref(false);
const isFetchingCountries = ref(false);
const loginForm = ref(null);

const { GET, POST } = useApi();
const authStore = useAuthStore();
const errorStore = useErrorStore();
const notificationStore = useNotificationStore();

onMounted(async () => {
  try {
    await fetchCountries();
  } catch (error) {
    console.error("Failed to initialize login page:", error);
    notificationStore.setNotification(
      "Failed to initialize login page. Please try again.",
      "error"
    );
  }
});

const fetchCountries = async () => {
  isFetchingCountries.value = true;
  try {
    const response = await GET("/countries?pagination=all");

    const uniqueCountries = response.data.reduce((acc, country) => {
      const numericCode = country.phone_code.replace(/^\+|^00/, "");
      const exists = acc.some((c) => c.value === numericCode);
      if (!exists) {
        acc.push({
          text: country.name,
          value: numericCode,
          code: country.code.toLowerCase(),
        });
      }
      return acc;
    }, []);

    countryOptions.value = uniqueCountries;

    const saudiArabia = countryOptions.value.find((c) => c.value === "966");
    if (saudiArabia) {
      countryCode.value = "00" + saudiArabia.value;
    } else if (countryOptions.value.length > 0) {
      countryCode.value = "00" + countryOptions.value[0].value;
    }
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    notificationStore.setNotification(
      "Failed to load countries. Please try again.",
      "error"
    );
  } finally {
    isFetchingCountries.value = false;
  }
};

const submitForm = async () => {
  if (!loginForm.value) return;

  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  errorStore.clearErrors();
  isLoading.value = true;

  try {
    let formattedCountryCode = countryCode.value;
    if (!formattedCountryCode.startsWith("00")) {
      formattedCountryCode = "00" + formattedCountryCode.replace(/^\+/, "");
    }

    const payload = {
      phone: {
        country_code: formattedCountryCode,
        number: phoneNumber.value,
      },
      password: password.value,
    };

    const response = await POST("/login", payload);

    authStore.setToken(response.token);
    authStore.setUser(response.user);

    notificationStore.setNotification("Login successful!", "success");

    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    notificationStore.setNotification(
      error.response?.data?.message || "Login failed. Please try again.",
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
.card-with-shadow {
  border-radius: 24px;
  background-color: white;
  border: 1px solid #bbbbbb80 50%;
  box-shadow: 0 10px 30px 5px rgba(176, 211, 255, 0.41),
    0 10px 30px 5px rgba(173, 220, 253, 0.41),
    0 10px 30px 5px rgba(192, 249, 212, 0.41);
}
</style>
