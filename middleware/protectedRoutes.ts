export default defineNuxtRouteMiddleware(async () => {
    const localePath = useLocalePath();
    const authStore = useAuthStore();
    await authStore.initializeAuth();
    if (!authStore.isAuthenticated) {
        return navigateTo(localePath('/login'));
    }
});
