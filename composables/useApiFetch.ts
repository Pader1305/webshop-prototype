import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

interface HydraError {
    '@type': 'hydra:Error';
    'hydra:title': string;
    'hydra:description': string;
}

function isHydraError(payload: unknown): payload is HydraError {
    if (typeof payload !== 'object' || payload === null) {
        return false;
    }

    const obj = payload as Record<string, unknown>;

    if (!('@type' in obj)) {
        return false;
    }
    return obj['@type'] === 'hydra:Error';
}

export async function useApiFetch<T>(url: string, options: NitroFetchOptions<NitroFetchRequest> = {}): Promise<T> {
    const authStore = useAuthStore();
    const localePath = useLocalePath();

    const response = await $fetch<unknown>(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${authStore.token}`,
            ...(options.headers ?? {}),
        },
    });

    if (response.status === 401) {
        await navigateTo(localePath('login'));
        return Promise.reject();
    }

    if (isHydraError(response)) {
        throw new ApiError(500, response['hydra:description'] || response['hydra:title']);
    }

    if (response['error']) {
        throw new ApiError(500, response['error']);
    }

    if (response.status < 200 || response.status >= 300) {
        throw new ApiError(500, response.statusText);
    }
    return response as T;
}
