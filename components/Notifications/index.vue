<template>
  <transition name="fade">
    <div v-if="visible" :class="['notification', type]">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useNotificationStore } from "@/stores/notifications";
import { storeToRefs } from "pinia";

const notificationStore = useNotificationStore();
const { message, type } = storeToRefs(notificationStore);

const visible = ref(false);
let timeoutId = null;

watch(message, (newMessage) => {
  if (newMessage) {
    visible.value = true;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      visible.value = false;
      notificationStore.clearNotification();
    }, 3000);
  }
});
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.success {
  background-color: #4caf50;
}

.error {
  background-color: #f44336;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
