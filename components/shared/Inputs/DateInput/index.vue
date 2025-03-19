<template>
  <div>
    <!-- Title (conditionally rendered) -->
    <div v-if="title" class="text-h6 pb-2 font-weight-bold text-text">
      {{ title }}
    </div>

    <!-- Date Input -->
    <v-text-field
      v-model="internalValue"
      :error="!!errorMessage"
      :error-messages="errorMessage"
      type="date"
      :hint="hint"
      persistent-hint
      variant="solo-filled"
      rounded
      @blur="validateOnImmediate"
    ></v-text-field>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";

// Define props
const props = defineProps({
  rules: [Array, Function],
  hint: String,
  name: String,
  label: String,
  modelValue: String,
  title: String,
});

// Define emits
const emit = defineEmits(["update:modelValue"]);

// Use vee-validate's useField
const { value, errorMessage, setTouched, validate } = useField(
  props.name,
  props.rules
);

// Computed property for v-model
const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    value.value = newValue;
    emit("update:modelValue", newValue);
  },
});

// Validate on blur
const validateOnImmediate = () => {
  setTouched(true);
  validate();
};
</script>

<style scoped></style>