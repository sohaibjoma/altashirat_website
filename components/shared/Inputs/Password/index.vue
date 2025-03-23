<template>
  <div>
    <div v-if="title" class="mb-2 font-weight-bold text-text">
      {{ $t(title) }}
    </div>

    <Field v-slot="{ field, errors }" :name="name" :rules="rules">
      <v-text-field
        v-bind="field"
        :model-value="modelValue"
        :label="$t(label)"
        :type="inputType"
        :error-messages="[
          ...errors.map((error) => $t(error)),
          ...backendErrors,
        ]"
        rounded
        variant="solo-filled"
        clearable
        prepend-inner-icon="mdi-lock"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="togglePasswordVisibility"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </Field>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";
import { computed, ref } from "vue";
import { useErrorStore } from "@/stores/error";

const props = defineProps({
  title: { type: String, default: "" },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  hint: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  name: { type: String, required: true },
  rules: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);
const inputType = computed(() => (showPassword.value ? "text" : "password"));
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const errorStore = useErrorStore();
const backendErrors = computed(() => errorStore.getErrorsForField(props.name));
</script>

<style scoped></style>
