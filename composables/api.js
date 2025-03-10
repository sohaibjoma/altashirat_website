

import { ref } from "vue";
import api from "~/axios/index";

export function useApi() {
  const loading = ref(false);

  const GET = async (endpoint) => {
    try {
      loading.value = true;
      const response = await api.get(endpoint);
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const POST = async (endpoint, data) => {
    try {
      loading.value = true;
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const DELETE = async (endpoint) => {
    try {
      loading.value = true;
      const response = await api.delete(endpoint);
      return response.data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { GET, POST, DELETE, loading };
}