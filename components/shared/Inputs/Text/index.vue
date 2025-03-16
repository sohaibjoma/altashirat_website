<template>
  <div>
    <div v-if="title" class="mb-2 text-h6 font-weight-bold text-text">
      {{ $t(title) }}
    </div>

    <veeField v-slot="{ field, errors }" :name="name" :rules="rules">
      <v-text-field
        v-bind="field"
        :model-value="modelValue"
        :label="$t(label)"
        type="text"
        :placeholder="$t(placeholder)"
        :error-messages="[
          ...errors.map((error) => $t(error)),
          ...backendErrors,
        ]"
        variant="solo-filled"
        dense
        clearable
        rounded
        @update:model-value="emit('update:modelValue', $event)"
        :prepend-inner-icon="icon"
      />
    </veeField>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  hint: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  name: { type: String, required: true },
  rules: { type: String, default: "" },
  icon: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const errorStore = useErrorStore();

const backendErrors = computed(() => errorStore.getErrorsForField(props.name));
</script>

<style scoped></style>
