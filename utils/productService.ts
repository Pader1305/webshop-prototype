export async function fetchProducts(page = 1): Promise<ProductWithTotalAmount | null> {
    const authStore = useAuthStore();
    const params = new URLSearchParams();
    params.append('page', page.toString());

    return await useApiFetch<ProductWithTotalAmount>(`/api/products/products?${params}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    });
}

export async function fetchProductById(id: number): Promise<Product | null> {
    const authStore = useAuthStore();
    const params = new URLSearchParams();
    params.append('id', id.toString());

    return await useApiFetch<Product>(`/api/products/product?${params}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    });
}

export async function fetchAllOffers(entriesPerPage: number): Promise<Product[] | null> {
    const authStore = useAuthStore();
    const params = new URLSearchParams();
    params.append('entriesPerPage', entriesPerPage.toString());

    return await useApiFetch<Product[]>(`/api/products/offers?${params}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    });
}
