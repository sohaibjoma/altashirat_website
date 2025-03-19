import { defineStore } from "pinia";
import { useApi } from "@/composables/api";
import { useCookie } from "nuxt/app";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(useCookie("auth_token").value || null);
  const user = ref(useCookie("auth_user").value || null);

  const setToken = (newToken) => {
    token.value = newToken;
    useCookie("auth_token").value = newToken;
  };

  const setUser = (newUser) => {
    user.value = newUser;
    useCookie("auth_user").value = JSON.stringify(newUser);
  };

  const clearToken = () => {
    token.value = null;
    user.value = null;
    useCookie("auth_token").value = null;
    useCookie("auth_user").value = null;
  };

  const fetchUser = async () => {
    try {
      const { get } = useApi();
      const response = await get("/show-account");

      if (response.data) {
        setUser(response.data);
        setToken(response.data.token);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const logout = async () => {
    try {
      const { DELETE } = useApi();
      await DELETE("/logout");
      clearToken();
      navigateTo("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    token,
    user,
    setToken,
    setUser,
    clearToken,
    fetchUser,
    logout,
  };
});
