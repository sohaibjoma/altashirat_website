<template>
    <VeeField v-slot="{ field, errors }" :name="name" :rules="rules">
      <v-select
        v-bind="field"
        :model-value="modelValue"
        :items="items"
        :placeholder="$t(placeholder)"
        :error-messages="[
          ...errors.map((error) => $t(error)),
          ...backendErrors,
        ]"
        variant="default"
        item-title="text"
        item-value="value"
        @update:model-value="emit('update:modelValue', $event)"
      >
        <template v-slot:selection="slotProps" v-if="$slots.selection">
          <slot name="selection" v-bind="slotProps"></slot>
        </template>
      </v-select>
    </VeeField>
</template>

<script setup>
import { computed } from "vue";
import { useErrorStore } from "@/stores/error";

const props = defineProps({
  title: { type: String, default: "" },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  hint: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  items: { type: Array, default: () => [] },
  name: { type: String, required: true },
  rules: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const errorStore = useErrorStore();
const backendErrors = computed(() => errorStore.getErrorsForField(props.name));
</script>

<style scoped></style>
