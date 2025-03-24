<template>
  <div>
    <div v-if="title" class="mb-2 ms-4 mt-8 font-weight-bold text-text">
      {{ $t(title) }}
    </div>
    <div class="rounded-xl d-flex align-center justify-center overflow-hidden">
      <v-text-field
        v-model="phoneNumberValue"
        type="text"
        :placeholder="$t(phoneNumberPlaceholder)"
        :error-messages="phoneNumberErrorMessages"
        variant="solo-filled"
        @update:model-value="handlePhoneNumberUpdate"
      >
        <template #prepend-inner>
          <v-icon>mdi-cellphone</v-icon>
        </template>
      </v-text-field>

      <div class="country-code-wrapper d-flex d-sm-block xs-12 sm-4">
        <Select
          :model-value="selectedCountry"
          :items="countryOptions"
          :name="countryCodeName"
          :rules="countryCodeRules"
          @update:model-value="handleCountryCodeUpdate"
          class="w-xs-100 w-sm-auto"
        >
          <template #selection="{ item }">
            <div class="d-flex align-center">
              <span>(+{{ item.raw.value }})</span>
              <span class="ms-1 flag-emoji ">{{ getFlagEmoji(item.raw.code) }}</span>
            </div>
          </template>
        </Select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useField } from "vee-validate";
import { useErrorStore } from "@/stores/error"; // Adjust the path as needed

const props = defineProps({
  title: { type: String, default: "" },
  phoneNumberLabel: { type: String, required: true },
  phoneNumberPlaceholder: { type: String, default: "" },
  phoneNumberModelValue: { type: [String, Number], default: "" },
  phoneNumberName: { type: String, required: true },
  phoneNumberRules: { type: String, default: "" },
  countryCodeLabel: { type: String, required: true },
  countryCodeModelValue: { type: [String, Number], default: "" },
  countryCodeName: { type: String, required: true },
  countryCodeRules: { type: String, default: "" },
  countryOptions: { type: Array, required: true },
});

const emit = defineEmits([
  "update:phoneNumberModelValue",
  "update:countryCodeModelValue",
]);

// Use vee-validate's useField for phone number
const {
  value: phoneNumberValue,
  errorMessage: phoneNumberErrorMessage,
  handleChange: handlePhoneNumberChange,
  setValue: setPhoneNumberValue // Get setValue from useField
} = useField(props.phoneNumberName, props.phoneNumberRules, {
  initialValue: props.phoneNumberModelValue,
});

watch(
  () => props.phoneNumberModelValue,
  (newValue) => {
    setPhoneNumberValue(newValue || ""); // Update vee-validate's value when prop changes
  }
);

// Access the error store
const errorStore = useErrorStore();

// Combine validation errors and backend errors for phone number
const phoneNumberErrorMessages = computed(() => {
  const errors = [];
  if (phoneNumberErrorMessage.value) errors.push(phoneNumberErrorMessage.value);
  if (errorStore.getErrorsForField(props.phoneNumberName).length) {
    errors.push(...errorStore.getErrorsForField(props.phoneNumberName));
  }
  return errors;
});

// Handle phone number changes
const handlePhoneNumberUpdate = (newValue) => {
  handlePhoneNumberChange(newValue); // Update the field's value and trigger validation
  emit("update:phoneNumberModelValue", newValue); // Emit the new value to the parent
};

// Handle country code changes
const selectedCountry = computed(() => {
  return props.countryCodeModelValue?.replace(/^\+|^00/, "") || "";
});

const handleCountryCodeUpdate = (value) => {
  const numericValue = value?.replace(/^\+|^00/, "");
  const formattedValue = numericValue ? `00${numericValue}` : "";
  emit("update:countryCodeModelValue", formattedValue);
};

// Get flag emoji for the country code
const getFlagEmoji = (countryCode) => {
  if (!countryCode) return "";
  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt())
  );
};

</script>

<style scoped>
.country-code-wrapper {
  background-color: var(--primary);
  color: var(--white);
  min-width: 10px;
  max-width: 100px;
  width: auto;
}

.flag-emoji {
  font-family: 'Noto Color Emoji', sans-serif;
  font-size: 1.2em; /* Adjust size as needed */
  line-height: 1;
}

:deep(.v-input__details) {
  display: none;
}
</style>