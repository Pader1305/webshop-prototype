import { ApiError } from '~/types/ApiError';
export default defineEventHandler(async event => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);
    const token = getHeader(event, 'authorization');

    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }
    let requestUrl = runtimeConfig.public.apiBaseUrl + 'api/products';

    if (query.id) {
        requestUrl += `/${query.id}`;
    }

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
});
