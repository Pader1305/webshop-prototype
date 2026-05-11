<script setup lang="ts">
import PlusIcon from 'assets/icons/PlusSvg.svg';
import MinusIcon from 'assets/icons/MinusSvg.svg';
import TrashIcon from 'assets/icons/trash-solid.svg';

const { t } = useI18n();

const props = defineProps<{
    product: Product;
    quantity: number;
    deleteProduct: (id: number) => void;
    increaseProduct: (id: number) => void;
    decreaseProduct: (id: number) => void;
}>();

const total = computed(() => {
    return props.quantity * (props.product.isOffer ? props.product.offerPrice : props.product.price);
});
</script>

<template>
    <div class="flex h-[5.765625rem] items-center border-b border-b-secondary-90 m-2 space-x-2">
        <img :src="props.product.image" class="w-[3.125rem] h-[2rem]" :alt="t('cart.imageAlt')" />
        <div class="flex flex-col flex-1 space-y-2">
            <h1 class="text-bold-12px">{{ props.product.name }}</h1>
            <span class="text-regular-12px">
                {{
                    props.product.isOffer
                        ? formatCurrencyEUR(props.product.offerPrice)
                        : formatCurrencyEUR(props.product.price)
                }}
            </span>
            <div class="flex">
                <div
                    class="w-[1.5rem] h-[1.5rem] border-1 flex items-center justify-center"
                    v-if="quantity > 1"
                    :title="t('cart.decrease')"
                    @click="decreaseProduct(props.product.id)"
                >
                    <MinusIcon class="w-[1.25rem]" />
                </div>
                <div
                    class="w-[1.5rem] h-[1.5rem] border-1 flex items-center justify-center"
                    v-else
                    :title="t('cart.remove')"
                    @click="props.deleteProduct(props.product.id)"
                >
                    <TrashIcon class="icon-xs" />
                </div>

                <div class="w-[1.5rem] h-[1.5rem] border-y flex items-center justify-center">
                    <span>{{ quantity }}</span>
                </div>

                <div
                    class="w-[1.5rem] h-[1.5rem] border-1 flex items-center justify-center"
                    :title="t('cart.increase')"
                    @click="props.increaseProduct(props.product.id)"
                >
                    <PlusIcon class="w-[1.25rem]" />
                </div>

                <div class="ml-auto">
                    <span class="text-bold-14px">{{ formatCurrencyEUR(total) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
