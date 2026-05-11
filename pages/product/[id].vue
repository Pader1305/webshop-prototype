<script setup lang="ts">
import LoadingHand from '~/components/animation/LoadingHand.vue';

const route = useRoute();
const toast = useToast();
const { t } = useI18n();
const localePath = useLocalePath();

const product = ref<Product | null>(null);
const isLoading = ref(true);

const productId = computed<number>(() => {
    const raw = route.params.id;
    if (Array.isArray(raw)) {
        toast.error({ message: t('validation.singleId') });
        return -1;
    }
    if (!/^[0-9]+$/.test(raw)) {
        toast.error({ message: t('validation.invalidId') });
        return -1;
    }
    return parseInt(raw, 10);
});

onMounted(async () => {
    try {
        isLoading.value = true;
        product.value = await fetchProductById(productId.value);
    } catch (err) {
        if (err instanceof ApiError) {
            toast.error({ message: t('errors.Product does not exist') });
            await navigateTo(localePath('shop'));
        }
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <LoadingHand v-if="isLoading" class="absolute top-[30vh] left-[40%]" />
    <ProductDetails v-else :product="product">
        <ProductAmountControl :product="product" />
    </ProductDetails>
</template>

<style scoped></style>
