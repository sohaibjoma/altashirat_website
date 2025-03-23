import { defineStore } from "pinia";
import { useCookie } from "nuxt/app";

export const useDrawerStore = defineStore("drawer", {
  state: () => ({
    isOpen: useCookie("sidebarState").value === "true" || false,
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
      useCookie("sidebarState").value = this.isOpen;
    },
    open() {
      this.isOpen = true;
      useCookie("sidebarState").value = true;
    },
    close() {
      this.isOpen = false;
      useCookie("sidebarState").value = false;
    },
  },
});
