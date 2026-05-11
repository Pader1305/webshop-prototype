<script setup lang="ts">
import { formatCurrencyEUR } from '@/utils/currencyFormatter';
const props = defineProps<{
    product: Product;
}>();
</script>

<template>
    <div class="border border-secondary-70 w-[17.25rem] flex h-full items-center p-4">
        <div class="w-24 h-[3.6875rem] bg-secondary-70 flex items-center justify-center">
            <img class="h-12 w-12" :src="product.image" alt="product image" />
        </div>
        <div class="flex flex-col flex-1 ml-4">
            <span class="text-bold-10px">{{ props.product.name }}</span>
            <span class="text-regular-10px line-through">{{ formatCurrencyEUR(props.product.price) }}</span>
            <span class="text-right w-full text-regular-16px">{{ formatCurrencyEUR(props.product.offerPrice) }}</span>
        </div>
    </div>
</template>

<style scoped></style>
