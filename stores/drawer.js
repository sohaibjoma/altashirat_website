import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawerStore = defineStore("drawer", () => {
  const isOpen = ref(false);

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return {
    isOpen,
    toggle,
    open,
    close,
  };
});
