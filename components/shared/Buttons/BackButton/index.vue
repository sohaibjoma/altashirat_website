<template>
  <v-btn
    class="back-button text-white font-weight-bold d-flex align-center justify-center"
    :class="{
      'pa-2 pa-sm-3 pa-md-4': true,
      'text-body-1 text-sm-body-1 text-md-h5': true,
      'large-screen': $vuetify.display.mdAndUp,
    }"
    rounded="xl"
    @click="$emit('click')"
  >
    {{ text }}
    <svg
      :width="$vuetify.display.smAndDown ? '20' : '28'"
      :height="$vuetify.display.smAndDown ? '20' : '28'"
      viewBox="0 0 31 31"
      xmlns="http://www.w3.org/2000/svg"
      class="back-button__icon ms-2"
      :style="{ transform: $vuetify.rtl ? 'rotate(180deg)' : 'none' }"
    >
      <g fill="none" fill-rule="evenodd">
        <circle fill="#4426F5" cx="15.5" cy="15.5" r="15.5" />
        <path
          d="M18.12 8a1.138 1.138 0 0 1 .75 2.016l-6.964 5.966 6.963 5.963a1.138 1.138 0 1 1-1.478 1.722l-7.972-6.82a1.138 1.138 0 0 1 0-1.732l7.972-6.828c.202-.179.46-.28.73-.287z"
          fill="#FFF"
        />
      </g>
    </svg>
  </v-btn>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Button",
  },
});
defineEmits(["click"]);
</script>

<style scoped>
.back-button {
  border-radius: 23px;
  background: var(--hero-scd-sec);
}

.large-screen {
  width: 207px;
  height: 49px;
  border-radius: 25px;
  background: var(--hero-scd-sec);
}

.back-button__icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

@media (max-width: 600px) {
  .back-button {
    border-radius: 18px;
  }
}
</style>
