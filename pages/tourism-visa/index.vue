<template>
  <div class="tourism-visa">
      <div class="tourism-popup position-absolute w-100 h-100" v-if="!isAuthenticated">
      <div
        class="tourism-card position-fixed mx-auto rounded-xl d-flex justify-center align-center flex-column"
      >
        <h3 class="tourism-popup-title mt-5">{{ $t("createTourismVisa.popupTitle") }}</h3>
        <Image
          name="tourism-visa-empty.png"
          alt="profile tile image"
          width="200"
        />
        <p class="tourism-popup-desc mt-5 px-12">{{ $t("createTourismVisa.popupDesc") }}</p>
        <MainButton
          width="50%"
          :text="$t('login')"
          type="submit"
          to="/login"
          class="my-5"
        />
      </div>
    </div>
    <v-container>
      <h2 class="text-center tourism-title">
        {{ $t("createTourismVisa.mainTitle") }}
      </h2>
      <div class="form w-75 mx-auto">
        <VeeForm v-slot="{ handleSubmit }">
          <v-form @submit.prevent="handleSubmit(formSubmitting)">
            <v-card
              variant="outlined"
              class="rounded-lg custom-card pt-5 ms-lg-5 mt-lg-5 pb-lg-16 mb-5"
            >
              <div class="d-flex justify-start align-center ga-4">
                <div class="tourism__h--starter me-5"></div>
                <Image
                  name="profile-form-icon.png"
                  alt="profile tile image"
                  width="30"
                />
                <h3 class="text-text tourism__h ps-3 d-none d-md-block">
                  {{ $t("createTourismVisa.secondTitle") }}
                </h3>
                <div class="text-text tourism__small-title d-md-none">
                  {{ $t("createTourismVisa.secondTitle") }}
                </div>
              </div>
              <!-- Form Fields -->
              <div class="d-flex flex-wrap g-4 space-between ps-6 mt-5">
                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.firstName"
                    :label="$t('createTourismVisa.firstName')"
                    name="firstname"
                    rules="alpha"
                    icon="mdi-account"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.middleName"
                    :label="$t('createTourismVisa.middleName')"
                    :placeholder="$t('createTourismVisa.enterMiddleName')"
                    name="middlename"
                    rules="alpha"
                    icon="mdi-account"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.lastName"
                    :label="$t('createTourismVisa.lastName')"
                    name="lastname"
                    rules="alpha"
                    icon="mdi-account"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.email"
                    :label="$t('createTourismVisa.email')"
                    :placeholder="$t('createTourismVisa.enterEmail')"
                    name="email"
                    rules="email"
                    icon="mdi-email"
                  />
                </div>

                <!-- Phone Input -->
                <div class="w-lg-50 w-100 pe-16">
                  <PhoneInput
                    :title="$t('createTourismVisa.phoneNumber')"
                    :country-code-model-value="formState.countryCode"
                    country-code-name="phone.country_code"
                    :country-code-label="$t('createTourismVisa.countryCode')"
                    :phone-number-label="$t('createTourismVisa.phoneNumber')"
                    :phone-number-placeholder="
                      $t('createTourismVisa.enterPhoneNumber')
                    "
                    :phone-number-model-value="formState.phoneNumber"
                    phone-number-name="phone.number"
                    :country-options="phoneCodeOptions"
                    class="mb-5"
                    @update:country-code-model-value="
                      formState.countryCode = $event
                    "
                    @update:phone-number-model-value="
                      formState.phoneNumber = $event
                    "
                  />
                </div>

                <!-- Date Input -->
                <div class="w-100 w-lg-50 pe-16">
                  <DateInput
                    v-model="formState.birthdate"
                    name="birthdate"
                    :title="$t('createTourismVisa.birthdate')"
                    class="rounded-xl"
                    rules="required"
                  />
                </div>

                <!-- Gender -->
                <div class="w-100 w-lg-50 pe-16">
                  <Select
                    v-model="formState.gender"
                    :title="$t('createTourismVisa.gender')"
                    :items="gendarNames"
                    name="country"
                    class="mb-5"
                    rules="required"
                    icon="mdi-account"
                  />
                </div>
                <div class="ms-auto me-lg-10 mb-8 mb-lg-0"></div>
              </div>
            </v-card>
            <v-card
              variant="outlined"
              class="rounded-lg custom-card pt-5 ms-lg-5 mt-lg-5 mx-lg-0 pb-lg-16"
            >
              <div class="d-flex justify-start align-center ga-3">
                <div class="tourism__h--starter me-5"></div>
                <Image
                  name="visa-info.png"
                  alt="profile tile image"
                  width="30"
                />
                <h3 class="text-text tourism__h ps-3 d-none d-md-block">
                  {{ $t("createTourismVisa.thirdTitle") }}
                </h3>
                <div class="text-text tourism__small-title d-md-none">
                  {{ $t("createTourismVisa.thirdTitle") }}
                </div>
              </div>
              <div class="ms-auto me-lg-10 mb-8 mb-lg-0"></div>
              <div class="d-flex flex-wrap g-4 space-between ps-6 mt-5">
                <!-- Passport Select -->
                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.passportNumber"
                    :label="$t('createTourismVisa.passportNumber')"
                    name="passportNumber"
                    rules="required|passport"
                    icon="mdi-passport"
                  />
                </div>
                <!-- Country Select -->
                <div class="w-100 w-lg-50 pe-16">
                  <Select
                    v-model="formState.country"
                    :title="$t('createTourismVisa.country')"
                    :items="countriesNames"
                    name="country"
                    class="mb-5"
                    icon="mdi-flag"
                    rules="required"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <File
                    v-model="formState.passportImages"
                    :label="$t('createTourismVisa.passportImages')"
                    name="passportImages"
                    accept="image/png,image/jpeg"
                    icon=""
                    :multiple="true"
                    :required-file-count="1"
                    :max-file-name-length="4"
                    preIcon="mdi-image"
                    appIcon="mdi-cloud-upload"
                    rules="required|images"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <File
                    v-model="formState.attachment"
                    :label="$t('createTourismVisa.attachment')"
                    name="attachment"
                    accept=".pdf"
                    icon=""
                    :multiple="true"
                    :required-file-count="1"
                    :max-file-name-length="4"
                    preIcon="mdi-file-document"
                    appIcon="mdi-cloud-upload"
                    rules="pdf"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.perposeOfVisit"
                    :label="$t('createTourismVisa.perposeOfVisit')"
                    name="perposeOfVisit"
                    rules="required|perposeOfVisit"
                    icon="mdi-passport"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.adultCount"
                    :label="$t('createTourismVisa.adultCount')"
                    name="adultCount"
                    rules="required|count"
                    icon="mdi-account"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Text
                    v-model="formState.childCount"
                    :label="$t('createTourismVisa.childCount')"
                    name="childCount"
                    rules="required|count"
                    icon="mdi-account"
                  />
                </div>

                <div class="w-100 w-lg-50 pe-16">
                  <Textarea
                    v-model="formState.message"
                    :label="$t('createTourismVisa.message')"
                    name="message"
                    :placeholder="$t('createTourismVisa.message')"
                    :rows="5"
                    auto-grow
                    icon="mdi-chat-processing"
                    rules="textarea"
                  />
                </div>
              </div>
              <!-- Submit Button -->
              <div class="ms-lg-auto w-100">
                <MainButton
                  width="150"
                  :text="$t('createTourismVisa.save')"
                  type="submit"
                  class="mb-5 ms-auto me-14"
                />
              </div>
            </v-card>
          </v-form>
        </VeeForm>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useI18n } from "#imports";
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const Authenticated = useAuthStore();
const isAuthenticated = computed(() => Authenticated.isAuthenticated);

const { t } = useI18n();

const formState = reactive({
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  birthdate: null,
  passportNumber: "",
  passportImages: [],
  attachment: [],
  countryCode: "",
  phoneNumber: "",
  email: "",
  perposeOfVisit: "",
  country: "",
  adultCount: "",
  childCount: "",
  message: "",
});

const codeFlagArr = ref([]);
const phoneCodeOptions = ref([]);
const countriesNames = ref([]);
const gendarNames = computed(() => [
  { text: t("createTourismVisa.genderOptions.male"), value: 0 },
  { text: t("createTourismVisa.genderOptions.female"), value: 1 },
]);

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
    formData.append("gender", formState.gender);
    formData.append("birthdate", formState.birthdate);
    formData.append("passport_number", formState.passportNumber);
    
    formState.passportImages.forEach((file, index) => {
      formData.append(`passport_images[${index}]`, file);
    });

    if (formState.attachment && formState.attachment.length) {
      formState.attachment.forEach((file, index) => {
        formData.append(`attachment[${index}]`, file);
      });
    }

    formData.append("phone[country_code]", formState.countryCode);
    formData.append("phone[number]", formState.phoneNumber);
    formData.append("contact_email", formState.email);
    formData.append("destination_country", formState.country);
    formData.append("purpose_of_visit", formState.perposeOfVisit);
    formData.append("adults_count", formState.adultCount);
    formData.append("children_count", formState.childCount);
    formData.append("message", formState.message);

    const response = await POST("/tourism-visa", formData);


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

    console.log(response);

    notificationStore.setNotification(
      t("notification.updateSuccess"),
      "success"
    );
  } catch (error) {
    notificationStore.setNotification(
      error.response?.data?.message || t("notification.updateFailed"),
      "error"
    );
    console.log(error.response?.data);
  }
};
</script>

<style>
.custom-card {
  border: 2px solid #d1d1d180;
}
</style>
