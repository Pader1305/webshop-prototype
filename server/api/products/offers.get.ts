export default defineEventHandler(async event => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);
    const allOffers: Product[] = [];

    const token = getHeader(event, 'authorization');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        });
    }

    const firstPage = await fetchFirstPage(token);
    if (!firstPage || !firstPage?.products) {
        return null;
    }

    const entriesPerPage = parseInt(query?.entriesPerPage as string) || 12;
    const totalPages = Math.ceil(firstPage.totalAmount / entriesPerPage);
    allOffers.push(...firstPage.products);

    const params = new URLSearchParams();
    for (let page = 2; page <= totalPages; page++) {
        let requestUrl = runtimeConfig.public.apiBaseUrl + 'api/products';
        params.set('isOffer', 'true');
        params.set('page', page.toString());
        requestUrl += `?${params}`;
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
        const products: Product[] = data['hydra:member'];
        allOffers.push(...products);
    }
    return allOffers;
});

async function fetchFirstPage(token: string): Promise<ProductWithTotalAmount | null> {
    const runtimeConfig = useRuntimeConfig();

    const params = new URLSearchParams();
    let requestUrl = runtimeConfig.public.apiBaseUrl + 'api/products';
    params.set('isOffer', 'true');
    params.set('page', '1');
    requestUrl += `?${params}`;
    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        throw new ApiError(401, 'Unauthenticated');
    }

    if (!response.ok) {
        throw new ApiError(500, 'Unknown error has occured');
    }
    const data = await response.json();
    return {
        products: data['hydra:member'],
        totalAmount: data['hydra:totalItems'],
    };
}
