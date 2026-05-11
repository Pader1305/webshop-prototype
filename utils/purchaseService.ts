export async function purchase(purchaseDTO: PurchaseRequestDTO): Promise<void> {
    const response = await useApiFetch<User>('/api/purchase/purchase', {
        method: 'POST',
        body: { products: purchaseDTO.ids },
    });

    const authStore = useAuthStore();
    authStore.setCredit(response.credit);
}
