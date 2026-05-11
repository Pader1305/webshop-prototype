<script setup lang="ts">
const props = defineProps<{
    product: Product;
}>();

const { isDesktop } = useViewport();
</script>

<template>
    <div class="flex h-full" :class="isDesktop ? 'flex-row h-[19.875rem]' : 'flex-col'">
        <h1 v-if="!isDesktop" class="text-bold-28px text-center mb-3">{{ props.product.name }}</h1>
        <figure
            class="w-[18.375rem] flex-1 flex justify-center items-center bg-secondary-90 border border-secondary-50"
            :class="isDesktop ? 'h-full' : 'h-[13.4375rem]'"
        >
            <img :src="props.product.image" alt="Produktbild" class="w-[8.125rem] h-[8.125rem]" />
        </figure>

        <div class="flex flex-col justify-between mx-1 flex-1">
            <div>
                <h1 v-if="isDesktop" class="text-bold-28px">{{ props.product.name }}</h1>
                <div class="flex space-x-1 mt-1">
                    <span class="text-bold-18px">{{ props.product.weight }}g</span>
                    <span class="border border-b-secondary-70 w-[0.0625rem]"></span>
                    <span class="text-bold-18px">{{ props.product.kcal }}kcal</span>
                </div>
            </div>
            <slot />
        </div>
    </div>
</template>
