<script setup lang="ts">
import ChevronLeftIcon from '@/assets/icons/ChevronLeft.svg';
import ChevronRightIcon from '@/assets/icons/ChevronRight.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import LoadingHand from '~/components/animation/LoadingHand.vue';

const localePath = useLocalePath();

const ENTRIES_PER_PAGE = 12;

const products = ref<ProductWithTotalAmount | null>({ products: [], totalAmount: 0 });
const isLoading = ref(true);

const currentPage = ref(1);
const selectedProduct = ref<Product | null>(null);
const showModal = ref(false);
const offerProducts = ref<Product[] | null>(null);

const totalPages = computed(() => {
    return Math.ceil((products.value?.totalAmount ?? 0) / ENTRIES_PER_PAGE);
});

const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages: number[] = [];

    if (current <= 2) {
        for (let i = 1; i <= Math.min(3, total); i++) {
            pages.push(i);
        }
    } else if (current >= total - 1) {
        for (let i = Math.max(total - 2, 1); i <= total; i++) {
            pages.push(i);
        }
    } else {
        pages.push(current - 1, current, current + 1);
    }

    return pages;
});

function pageUp() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function pageDown() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function openModal(product: Product) {
    selectedProduct.value = product;
    showModal.value = true;
}

const { isDesktop } = useViewport();

watch(currentPage, async newCurrentPage => {
    isLoading.value = true;
    products.value = await fetchProducts(newCurrentPage);
    isLoading.value = false;
});

onMounted(async () => {
    try {
        products.value = await fetchProducts();
        offerProducts.value = await fetchAllOffers(ENTRIES_PER_PAGE);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <LoadingHand class="absolute top-[30vh]" v-if="isLoading" />
    <div v-else :class="isDesktop ? 'w-[35.875rem]' : 'w-[17.375rem]'">
        <SwiperWrapper :offer-products="offerProducts ?? []" @open-modal="openModal" />
        <div class="flex-1 items-center flex flex-col">
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <NuxtLink
                    v-for="product in products?.products"
                    :key="product.id"
                    :to="localePath({ name: 'product-id', params: { id: product.id } })"
                >
                    <ProductCard :product="product"> </ProductCard>
                </NuxtLink>
            </div>

            <div class="flex justify-center items-center space-x-3.5 p-4">
                <div class="w-4">
                    <ChevronLeftIcon v-if="currentPage > 1" class="h-4 w-4 cursor-pointer" @click="pageDown" />
                </div>
                <div v-for="page in visiblePages" :key="page">
                    <span
                        class="cursor-pointer text-regular-16px"
                        :class="{
                            'font-bold text-black': currentPage === page,
                            'text-gray-600': currentPage !== page,
                        }"
                        @click="currentPage = page"
                    >
                        {{ page }}
                    </span>
                </div>

                <div class="w-4">
                    <ChevronRightIcon v-if="currentPage < totalPages" class="h-4 w-4 cursor-pointer" @click="pageUp" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
