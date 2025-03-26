import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { ref, computed, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const { GET } = useApi();
  const settings = ref([]); // Store the raw array from the API
  const isLoading = ref(false); // Track fetching state
  const error = ref(null); // Track errors

  const fetchSettings = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await GET("/settings");
      settings.value = Array.isArray(response.data) ? response.data : []; // Ensure it’s an array
    } catch (err) {
      error.value = err;
      console.error("Failed to fetch settings:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // Reduce the settings array into a key-value object
  const keyValSettings = computed(() => {
    if (settings.value) {
      return settings.value.reduce((acc, item) => {
        // Ensure item is an object with key and value properties
        if (item && typeof item === "object" && "key" in item && "value" in item) {
          acc[item.key] = item.value;
        }
        return acc;
      }, {});
    }
  });

  return { settings, keyValSettings, fetchSettings, isLoading, error };
});