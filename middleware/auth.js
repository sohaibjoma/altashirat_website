export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.token && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/");
  }
});
