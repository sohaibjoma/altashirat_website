<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <!-- Image Column -->
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-img
          src="assets/img/login.png"
          max-width="800"
          class="login-image"
          contain
          v-show="$vuetify.display.mdAndUp"
        />
      </v-col>

      <!-- Login Card Column -->
      <v-col
        cols="12"
        md="6"
        lg="6"
        xs="12"
        class="d-flex align-center justify-center"
      >
        <v-card class="login-card pa-6" width="500" height="600">
          <div class="d-flex justify-center mb-4">
            <v-img src="assets/img/logo.png" max-width="120" />
          </div>
          <v-card-title class="text-center text-h5 font-weight-bold">
            {{ $t("login") }}
          </v-card-title>

          <!-- Form Content -->
          <v-card-text>
            <!-- Phone Input -->
            <PhoneInput
              :title="$t('phoneNumber')"
              :country-code-model-value="countryCode"
              country-code-rules="required"
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
              class="mb-4"
              name="password"
              rules="required|min:8|max:50"
            />

            <!-- Forgot Password Link -->
            <div class="text-right mb-4">
              <a
                href="#"
                class="text-decoration-none text-primary font-weight-medium"
              >
                {{ $t("forgotPassword") }}
              </a>
            </div>

            <!-- Login Button -->
            <Button
              width="100%"
              text="$t('login')"
              @click="submitForm"
              class="mb-4"
            />

            <!-- Register Link -->
            <div class="text-center text-body-2">
              <span class="mr-1">{{ $t("noAccount") }}</span>
              <a
                href="#"
                class="text-decoration-none text-primary font-weight-medium"
              >
                {{ $t("registerAccount") }}
              </a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useApi } from "@/composables/api";
import { useAuthStore } from "@/stores/auth";
import { useErrorStore } from "@/stores/error";
import { useNotificationStore } from "@/stores/notifications";
import { useRouter } from "vue-router";
import Button from "@/components/Buttons/Login/index.vue";
import Password from "@/components/Inputs/Password/index.vue";
import PhoneInput from "@/components/Inputs/Phone/index.vue";

const countryCode = ref("");
const phoneNumber = ref("");
const password = ref("");
const countryOptions = ref([]);

const { GET, POST } = useApi();
const authStore = useAuthStore();
const errorStore = useErrorStore();
const notificationStore = useNotificationStore();
const router = useRouter();

onMounted(async () => {
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
  }
});

const submitForm = async () => {
  errorStore.clearErrors();

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

    router.push("/titles");
  } catch (error) {
    console.error("Login error:", error);
    notificationStore.setNotification(
      "Login failed. Please try again.",
      "error"
    );
  }
};
</script>

<style scoped></style>
