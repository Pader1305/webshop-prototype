export const useCartStore = defineStore(
    'cartStore',
    () => {
        const cartItems = ref<CartItem[]>([]);

        function addProduct(product: Product, amount: number) {
            const existingItem = cartItems.value.find(item => item.product.id === product.id);
            if (!existingItem) {
                cartItems.value.push({ product, quantity: amount });
            } else {
                existingItem.quantity += amount;
            }
        }

        function increaseProductAmount(productId: number) {
            const item = cartItems.value.find(i => i.product.id === productId);
            if (item) {
                item.quantity++;
            }
        }

        function decreaseProductAmount(productId: number) {
            const item = cartItems.value.find(i => i.product.id === productId);
            if (item) {
                item.quantity = Math.max(0, item.quantity - 1);
            }
        }

        function removeProduct(productId: number) {
            cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
        }

        function clearCart() {
            cartItems.value = [];
        }

        const total = computed(() =>
            cartItems.value.reduce(
                (sum, item) =>
                    sum + item.quantity * (item.product.isOffer ? item.product.offerPrice : item.product.price),
                0,
            ),
        );

        return {
            cartItems,
            addProduct,
            increaseProductAmount,
            decreaseProductAmount,
            removeProduct,
            clearCart,
            total,
        };
    },
    { persist: true },
);
