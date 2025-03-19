<template>
  <v-btn
    :width="width"
    variant="outlined"
    :text="text"
    rounded
    @click="$emit('click')"
  />
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "auto",
  },
  text: {
    type: String,
    default: "Button",
  },
});
</script>

<style scoped></style>
