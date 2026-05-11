export default defineEventHandler(async event => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);
    const token = getHeader(event, 'authorization');

    if (!token) {
        throw new ApiError(401, 'Unauthorized');
    }
    let requestUrl = runtimeConfig.public.apiBaseUrl + 'api/products';
    if (query.page) {
        const params = new URLSearchParams();
        params.append('page', query.page.toString());
        requestUrl += `?${params}`;
    }

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (!response.ok) {
        throw new ApiError(500, 'An error has occured');
    }
    const data = await response.json();
    return {
        products: data['hydra:member'],
        totalAmount: data['hydra:totalItems'],
    };
});
