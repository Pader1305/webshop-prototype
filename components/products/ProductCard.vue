<script setup lang="ts">
const props = defineProps<{
    product: Product;
}>();
</script>

<template>
    <div class="border h-full border-secondary-70 w-[8rem]">
        <div class="flex flex-col justify-between items-center p-4">
            <div class="w-24 h-[3.6875rem] bg-secondary-70 flex items-center justify-center">
                <img class="h-12 w-12" :src="product.image" alt="product image" />
            </div>
        </div>
        <div class="flex items-center justify-between mx-2">
            <span class="text-bold-10px line-clamp-1">{{ props.product.name }}</span>
            <span class="text-regular-10px">{{
                props.product.isOffer
                    ? formatCurrencyEUR(props.product.offerPrice)
                    : formatCurrencyEUR(props.product.price)
            }}</span>
        </div>
    </div>
</template>

<style scoped></style>
