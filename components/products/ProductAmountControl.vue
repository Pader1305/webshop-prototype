<script setup lang="ts">
import MinusIcon from '@/assets/icons/MinusSvg.svg';
import PlusIcon from '@/assets/icons/PlusSvg.svg';
import ShoppingCartIcon from '@/assets/icons/ShoppingCart.svg';

const props = defineProps<{
    product: Product;
}>();

const { addProduct } = useCartStore();
const { isDesktop } = useViewport();
const toast = useToast();
const { t } = useI18n();
const localePath = useLocalePath();

const defaultAmount = props.product.stock == 0 ? 0 : 1;
const amount = ref(defaultAmount);

const productPrice = computed(() => {
    const basePrice = props.product.isOffer ? props.product.offerPrice : props.product.price;
    return basePrice * amount.value;
});

const add = () => {
    amount.value = Math.min(props.product.stock, amount.value + 1);
};

const subtract = () => {
    amount.value = Math.max(defaultAmount, amount.value - 1);
};

const handleAddToCart = async (product: Product, amount: number) => {
    addProduct(product, amount);
    toast.success({ title: t('cart.successTitle'), message: t('cart.addedToCart') });
    await navigateTo(localePath('shop'));
};
</script>

<template>
    <div>
        <span v-if="isDesktop" class="text-gray-500 text-bold-30px mb-8">
            {{ formatCurrencyEUR(productPrice) }}
        </span>

        <div class="flex">
            <div
                class="w-[2.25rem] h-[2.25rem] border-1 flex items-center justify-center"
                data-testid="decreaseAmount"
                @click="subtract"
            >
                <MinusIcon class="w-[1.25rem]" />
            </div>

            <div class="w-[3.125rem] h-[2.25rem] border-y flex items-center justify-center">
                <span>{{ amount }}</span>
            </div>

            <div
                class="w-[2.25rem] h-[2.25rem] border-1 flex items-center justify-center"
                data-testid="increaseAmount"
                @click="add"
            >
                <PlusIcon class="w-[1.25rem]" />
            </div>

            <div v-if="!isDesktop" class="ml-auto">
                <span class="text-gray-500 text-bold-30px mb-8">
                    {{ formatCurrencyEUR(productPrice) }}
                </span>
            </div>

            <div
                @click="handleAddToCart(product, amount)"
                v-if="isDesktop"
                class="ml-[1.6875rem] flex justify-center items-center"
                data-testid="addToCartDesktop"
            >
                <ShoppingCartIcon class="w-[1.875rem]" />
            </div>
        </div>

        <button
            v-if="!isDesktop"
            class="w-full rounded h-[2.1875rem] bg-secondary-40 text-secondary-100 text-regular-14px mt-3"
            @click="handleAddToCart(product, amount)"
        >
            {{ t('cart.addToCart') }}
        </button>
    </div>
</template>
