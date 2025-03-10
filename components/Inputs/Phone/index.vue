<template>
  <div>
    <div v-if="title" class="mb-2 text-h6 font-weight-bold text-text">
      {{ $t(title) }}
    </div>
    <div class="rounded-xl d-flex align-center justify-center overflow-hidden">
      <!-- Phone Number Field -->
      <VeeField
        v-slot="{ field, errors }"
        :name="phoneNumberName"
        :rules="phoneNumberRules"
      >
        <v-text-field
          v-bind="field"
          :model-value="phoneNumberModelValue"
          type="tel"
          :placeholder="$t(phoneNumberPlaceholder)"
          :error-messages="
            errors.length ? errors : getBackendErrors(phoneNumberName)
          "
          variant="solo-filled"
          clearable
          @update:model-value="emit('update:phoneNumberModelValue', $event)"
        >
          <template #prepend-inner>
            <v-icon>mdi-cellphone</v-icon>
          </template>
        </v-text-field>
      </VeeField>

      <!-- Country Code Select -->
      <div class="country-code-wrapper">
        <Select
          :model-value="selectedCountry"
          :items="countryOptions"
          :name="countryCodeName"
          :rules="countryCodeRules"
          @update:model-value="handleCountryCodeUpdate"
        >
          <template #selection="{ item }">
            <div class="d-flex align-center">
              <span>(+{{ item.raw.value }})</span>
              <span class="mr-1">{{ getFlagEmoji(item.raw.code) }}</span>
            </div>
          </template>
        </Select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

const errorStore = useErrorStore();

const getBackendErrors = (fieldName) => {
  return errorStore.getErrorsForField(fieldName);
};

const selectedCountry = computed(() => {
  return props.countryCodeModelValue?.replace(/^\+|^00/, "") || "";
});

const handleCountryCodeUpdate = (value) => {
  const numericValue = value?.replace(/^\+|^00/, "");
  const formattedValue = numericValue ? `00${numericValue}` : "";
  emit("update:countryCodeModelValue", formattedValue);
};

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
  min-width: 120px;
  max-width: 100px;
  width: auto;
}

:deep(.v-input__details) {
  display: none;
}
</style>
