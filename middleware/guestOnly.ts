export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    await authStore.initializeAuth();

    if (authStore.isAuthenticated) {
        return navigateTo('/shop');
    }
});
