<template>
  <div v-if="title" class="mb-2 font-weight-bold text-text">
    {{ title }}
  </div>
  <VeeField v-slot="{ field, errors }" :name="name" :rules="rules">
    <v-select
      v-bind="field"
      :model-value="modelValue"
      :items="items"
      :placeholder="$t(placeholder)"
      :error-messages="[...errors.map((error) => $t(error)), ...backendErrors]"
      item-title="text"
      item-value="value"
      rounded
      varient="solo-filled"
      :prepend-inner-icon="icon"
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
  title: { type: String },
  label: { type: String, required: true },
  placeholder: { type: String, default: "" },
  hint: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  items: { type: Array, default: () => [] },
  name: { type: String, required: true },
  rules: { type: String, default: "" },
  icon: String,
});

const emit = defineEmits(["update:modelValue"]);

const errorStore = useErrorStore();
const backendErrors = computed(() => errorStore.getErrorsForField(props.name));
</script>

<style scoped></style>
