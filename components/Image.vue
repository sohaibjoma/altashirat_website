<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :class="className"
    :style="style"
    @error="handleImageError"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Image",
  },
  className: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
  fallbackSrc: {
    type: String,
    default: "logo.png",
  },
});

// Check if the image is dynamic (URL) or local
const isDynamicImage = computed(() => {
  return props.src.startsWith("http://") || props.src.startsWith("https://");
});

// Compute the correct image source
const imageSrc = computed(() => {
  if (isDynamicImage.value) {
    return props.src;
  } else {
    try {
      return require(`@/assets/img/${props.src}`);
    } catch (error) {
      console.error(`Failed to load image: ${props.src}`, error);
      return props.fallbackSrc;
    }
  }
});

const handleImageError = (event) => {
  if (props.fallbackSrc) {
    event.target.src = props.fallbackSrc;
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>