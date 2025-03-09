<template>
  <div>
    <div v-if="title" class="mb-2">
      {{ $t(title) }}
    </div>
    <div class="phone-input-container rounded-xl mb-4">
      <div class="country-code-wrapper">
        <Select
          :label="countryCodeLabel"
          :model-value="selectedCountry"
          :items="countryOptions"
          :name="countryCodeName"
          :rules="countryCodeRules"
          class="country-code-select"
          @update:model-value="handleCountryCodeUpdate"
        >
          <template #selection="{ item }">
            <div class="d-flex align-center">
              <span class="country-flag me-1">{{
                getFlagEmoji(item.raw.code)
              }}</span>
              <span>(+{{ item.raw.value }})</span>
            </div>
          </template>
          <template #item="{ item }">
            <v-list-item>
              <template #prepend>
                <span class="country-flag me-1">{{
                  getFlagEmoji(item.raw.code)
                }}</span>
              </template>
              <v-list-item-title>
                {{ item.raw.text }} (+{{ item.raw.value }})
              </v-list-item-title>
            </v-list-item>
          </template>
        </Select>
      </div>

      <Field
        v-slot="{ field, errors }"
        :name="phoneNumberName"
        :rules="phoneNumberRules"
        class="phone-field"
      >
        <v-text-field
          v-bind="field"
          :model-value="phoneNumberModelValue"
          type="tel"
          :placeholder="$t(phoneNumberPlaceholder)"
          :error-messages="[
            ...errors.map((error) => $t(error)),
            ...getBackendErrors(phoneNumberName),
          ]"
          variant="solo-filled"
          @update:model-value="emit('update:phoneNumberModelValue', $event)"
        >
          <template #prepend-inner>
            <v-icon>mdi-cellphone</v-icon>
          </template>
        </v-text-field>
      </Field>
    </div>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { computed } from "vue";
import { useErrorStore } from "@/stores/error";
import Select from "@/components/Inputs/Select/index.vue";

const props = defineProps({
  title: { type: String, default: "" },
  phoneNumberLabel: { type: String, required: true },
  phoneNumberPlaceholder: { type: String, default: "" },
  hint: { type: String, default: "" },
  phoneNumberModelValue: { type: [String, Number], default: "" },
  phoneNumberName: { type: String, required: true },
  phoneNumberRules: { type: String, default: "" },
  countryCodeLabel: { type: String, required: true },
  countryCodePlaceholder: { type: String, default: "" },
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

const getNumericPart = (code) => {
  return code?.replace(/^\+|^00/, "") || "";
};

const selectedCountry = computed(() => {
  const numericPart = getNumericPart(props.countryCodeModelValue);
  return numericPart;
});

const handleCountryCodeUpdate = (value) => {
  const numericValue = getNumericPart(value);
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
.phone-input-container {
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #f0f2f5;
}

.country-code-wrapper {
  background-color: #4527a0;
}

.country-code-select :deep(.v-field) {
  background-color: transparent !important;
  display: flex;
  align-items: center;
}

.country-code-select :deep(.v-field__input) {
  color: white;
  display: flex;
  align-items: center;
}

.country-code-select :deep(.v-field__append-inner) {
  color: white;
}

.phone-field {
  flex-grow: 1;
}

.phone-icon {
  font-size: 20px;
  margin-right: 8px;
}

:deep(.v-input__details) {
  display: none !important;
}
</style>
