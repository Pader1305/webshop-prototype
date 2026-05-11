export const useAuthStore = defineStore(
    'authStore',
    () => {
        const runtimeConfig = useRuntimeConfig();
        const token = ref<string | null>(null);
        const isAuthenticated = computed(() => !!token.value);
        const user = ref<User | null>(null);
        const localePath = useLocalePath();

        async function initializeAuth() {
            if (!token.value) return;

            try {
                const response = await fetch(runtimeConfig.public.apiBaseUrl + 'users/me', {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                });

                if (!response.ok) {
                    token.value = null;
                    user.value = null;
                    return;
                }
                user.value = await response.json();
            } catch {
                token.value = null;
                user.value = null;
            }
        }

        async function register(
            email: string,
            password: string,
            forename: string,
            surname: string,
        ): Promise<true | string> {
            try {
                const newUser: UserRequestCreateDTO = {
                    email: email,
                    firstName: forename,
                    lastName: surname,
                    plainPassword: password,
                };

                const response = await fetch(runtimeConfig.public.apiBaseUrl + 'api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });

                if (!response.ok) {
                    return 'Ein Fehler ist aufgetreten.';
                }
                return true;
            } catch (error) {
                return 'Verbindungsfehler ' + error;
            }
        }

        async function logoutUser() {
            token.value = null;
            user.value = null;
            await navigateTo(localePath('/login'));
        }

        async function loginUser(email: string, password: string): Promise<true | string> {
            try {
                const response = await fetch(runtimeConfig.public.apiBaseUrl + 'api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.status === 401) {
                    return 'E-Mail oder Passwort ist falsch.';
                }

                if (!response.ok) {
                    return 'Ein Fehler ist aufgetreten.';
                }

                const data = await response.json();
                token.value = data.token;

                const myUser = await fetch(runtimeConfig.public.apiBaseUrl + 'users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!myUser.ok) {
                    return 'Eigene Nutzerdaten konnten nicht abgerufen werden.';
                }
                user.value = await myUser.json();
                return true;
            } catch (error) {
                return 'Verbindungsfehler: ' + error;
            }
        }

        function setCredit(credit: number) {
            if (!user.value) {
                return;
            }
            user.value.credit = credit;
        }

        return { token, initializeAuth, isAuthenticated, user, loginUser, logoutUser, register, setCredit };
    },
    { persist: true },
);
