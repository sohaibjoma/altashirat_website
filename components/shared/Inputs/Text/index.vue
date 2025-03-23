<template>
  <div class="mb-2 text-text font-weight-bold">
    {{ label }}
  </div>
  <v-text-field
    v-model="internalValue"
    :error="!!errorMessage"
    :error-messages="errorMessage"
    rounded
    variant="solo-filled"
    :placeholder="placeholder"
    :type="type"
    :hint="hint"
    persistent-hint
    :prepend-inner-icon="icon"
    @blur="validateOnImmediate"
  ></v-text-field>
</template>

<script setup>
import { useField } from "vee-validate";
import { computed } from "vue";

const props = defineProps({
  rules: [Array, Function],
  hint: String,
  name: String,
  type: String,
  label: String,
  modelValue: String,
  icon: String,
  placeholder: String,
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
.v-text-field .v-field__prepend-inner {
  padding-left: 12px; /* Ensure icon has space */
}
</style>