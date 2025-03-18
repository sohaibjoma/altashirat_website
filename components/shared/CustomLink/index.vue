<template>
          <nuxt-link :to="localePath(path)">
          <slot/>
        </nuxt-link>
</template>

<script setup>
import { useLocalePath } from "#imports";
const localePath = useLocalePath();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>  