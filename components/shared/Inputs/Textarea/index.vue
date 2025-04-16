<template>
  <div class="mb-2 text-text font-weight-bold">
    {{ label }}
  </div>
  <v-textarea
    v-model="internalValue"
    :error="!!errorMessage"
    :error-messages="errorMessage"
    rounded
    variant="solo-filled"
    :placeholder="placeholder"
    :hint="hint"
    persistent-hint
    :prepend-inner-icon="icon"
    :rows="rows"
    :auto-grow="autoGrow"
  ></v-textarea>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
  rules: [Array, Function],
  hint: String,
  name: String,
  label: String,
  modelValue: String,
  icon: String,
  placeholder: String,
  rows: {
    type: [Number, String],
    default: 3
  },
  autoGrow: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

const { value, errorMessage } = useField(props.name, props.rules);

const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    value.value = newValue;
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped>
.v-textarea .v-field__prepend-inner {
  padding-left: 12px; /* Ensure icon has space */
  align-items: flex-start; /* Align icon to top */
  padding-top: 16px; /* Add some top padding */
}
</style>