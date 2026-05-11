<script setup lang="ts">
const props = defineProps<{
    showModal: boolean;
    selectedProduct: Product | null;
    closeModal: () => void;
}>();
</script>

<template>
    <BaseModal :show="showModal" :close-modal="closeModal">
        <template v-if="props.selectedProduct !== null">
            <ProductDetails :product="props.selectedProduct">
                <ProductAmountControl :product="props.selectedProduct" :close-handler="closeModal" />
            </ProductDetails>
        </template>
    </BaseModal>
</template>
