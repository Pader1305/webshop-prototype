<script setup lang="ts">
const { isDesktop } = useViewport();
const cartStore = useCartStore();
const toast = useToast();
const { t } = useI18n();
const { translateError } = useErrorTranslator();

async function handleBuy() {
    const dto: PurchaseRequestDTO = {
        ids: cartStore.cartItems.flatMap(item => Array(item.quantity).fill(item.product.id)),
    };

    try {
        await purchase(dto);
        cartStore.clearCart();
        toast.success({ title: t('cart.successTitle'), message: t('cart.purchaseSuccess') });
        return;
    } catch (err) {
        if (err instanceof ApiError) {
            toast.error({ message: translateError(err.message) });
        }
    }
}

function removeProductFromCart(productId: number) {
    cartStore.removeProduct(productId);
    toast.success({ title: t('cart.successTitle'), message: t('cart.productRemoved') });
}

function clearCart() {
    cartStore.clearCart();
    toast.success({ title: t('cart.successTitle'), message: t('cart.cleared') });
}
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-bold-28px">{{ t('cart.title') }}</h1>
        <div :class="isDesktop ? 'w-[35.875rem]' : 'w-[17.375rem]'">
            <template v-if="cartStore.cartItems.length > 0">
                <div v-if="isDesktop" class="w-full flex justify-end mb-2">
                    <span class="text-regular-14px underline" @click="clearCart">{{ t('cart.clear') }}</span>
                </div>
                <div
                    class="w-full overflow-auto"
                    :class="isDesktop ? 'h-[23.0625rem] border border-b-secondary-70 desktop-scroll' : 'h-[60vh]'"
                >
                    <CartCard
                        v-for="entry in cartStore.cartItems"
                        :key="entry.product.id"
                        :product="entry.product"
                        :quantity="entry.quantity"
                        :delete-product="removeProductFromCart"
                        :increase-product="cartStore.increaseProductAmount"
                        :decrease-product="cartStore.decreaseProductAmount"
                    />
                </div>
                <div class="w-full flex justify-between mt-[1.1875rem]">
                    <span class="text-bold-18px">{{ t('cart.total') }}</span>
                    <span class="text-bold-18px">{{ formatCurrencyEUR(cartStore.total) }}</span>
                </div>
                <button
                    class="w-full h-[2.1875rem] bg-secondary-40 text-secondary-100 text-regular-14px rounded mt-[1.125rem]"
                    @click="handleBuy"
                >
                    {{ t('cart.buy') }}
                </button>
                <button
                    v-if="!isDesktop"
                    class="w-full h-[2.1875rem] bg-secondary-90 text-secondary-70 text-regular-14px rounded mt-[1.125rem]"
                    @click="clearCart"
                >
                    {{ t('cart.clear') }}
                </button>
            </template>
            <template v-else>
                <div class="flex justify-center">
                    <span>{{ t('cart.empty') }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.desktop-scroll::-webkit-scrollbar {
    width: 1.25rem;
}

.desktop-scroll::-webkit-scrollbar-track {
    background: var(--color-scrollbar-track-bg);
    border: 1px solid var(--color-scrollbar-track-border);
}

.desktop-scroll::-webkit-scrollbar-thumb {
    background-color: var(--color-scrollbar-thumb-bg);
    border: 1px solid var(--color-scrollbar-thumb-border);
}

.desktop-scroll::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-scrollbar-thumb-hover-bg);
}
</style>
