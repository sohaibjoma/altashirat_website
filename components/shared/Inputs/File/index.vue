<template>
  <div class="mb-2 text-text font-weight-bold">
    {{ label }}
  </div>
  <v-file-input
    v-model="internalValue"
    :error="!!errorMessage"
    :error-messages="errorMessage"
    rounded
    variant="solo-filled"
    :placeholder="placeholder"
    :hint="hint"
    persistent-hint
    :prepend-inner-icon="preIcon"
    :append-inner-icon="appIcon"
    :prepend-icon="icon"
    @blur="validateOnImmediate"
    :accept="accept"
    :multiple="multiple"
    :show-size="showSize"
    :counter="counter"
    :clearable="clearable"
  ></v-file-input>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
  rules: [Array, Function],
  hint: String,
  name: String,
  label: String,
  modelValue: [Array, Object], // File inputs can return Array or File object
  icon: String,
  appIcon: String,
  preIcon: String,
  placeholder: String,
  accept: String, // e.g. "image/*,.pdf"
  multiple: Boolean,
  showSize: {
    type: Boolean,
    default: true,
  },
  counter: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { value, errorMessage, setTouched, validate } = useField(
  props.name,
  props.rules
);

const internalValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    value.value = newValue;
    emit("update:modelValue", newValue);
  },
});

const validateOnImmediate = () => {
  setTouched(true);
  validate();
};
</script>

<style scoped>
.v-file-input .v-field__prepend-inner {
  padding-left: 12px;
}
</style>
