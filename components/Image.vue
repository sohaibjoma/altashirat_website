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
    default: "/images/logo.png",
  },
});

const isDynamicImage = computed(() => {
  return props.src.startsWith("http://") || props.src.startsWith("https://");
});

const imageSrc = computed(() => {
  if (isDynamicImage.value) {
    return props.src;
  } else {
    try {
      return new URL(`~/assets/img/${props.src}`, import.meta.url).href;
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
