<template>
  <v-chip class="main-chip" :elevation="elevation">
    <slot></slot>
  </v-chip>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  elevation: {
    type: Number,
    default: 2,
  },
});
</script>

<style scoped>
.main-chip {
  font-weight: 500;
  padding: 24px 24px;
  background: var(--gradient-button);
  color: white;
}
</style>
