<template>
  <v-btn
    class="gradient-button"
    :width="width"
    :text="text"
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

<style scoped>
.gradient-button {
  border-radius: 23px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-button);
}

.gradient-button:hover {
  opacity: 0.9;
}
</style>
