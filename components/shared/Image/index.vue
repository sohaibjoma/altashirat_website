<template>
  <img :src="computedSrc" :alt="name" />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  URL: String,
});

const computedSrc = computed(() => {
  return props.URL || getLocalImage(props.name);
});

function getLocalImage(name) {
  return `/assets/img/${name}`;
}
</script>

<style scoped></style>