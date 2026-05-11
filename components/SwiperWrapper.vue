<script setup lang="ts">
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ChevronLeftIcon from '@/assets/icons/ChevronLeft.svg';
import ChevronRightIcon from '@/assets/icons/ChevronRight.svg';
import type SwiperCore from 'swiper';

const { isDesktop } = useViewport();

const props = defineProps<{
    offerProducts: Product[];
}>();

const emit = defineEmits<{
    (e: 'open-modal', selectedProduct: Product): void;
}>();

const swiperInstance = ref<SwiperCore | null>(null);
const onSwiper = (swiper: SwiperCore) => {
    swiperInstance.value = swiper;
};
</script>

<template>
    <div class="relative w-full">
        <div
            v-if="isDesktop"
            class="custom-prev absolute top-1/2 left-[-2rem] -translate-y-1/2 z-10 cursor-pointer"
            @click="swiperInstance?.slidePrev()"
        >
            <ChevronLeftIcon class="w-6 h-6" />
        </div>
        <div
            v-if="isDesktop"
            class="custom-next absolute top-1/2 right-[-2rem] -translate-y-1/2 z-10 cursor-pointer"
            @click="swiperInstance?.slideNext()"
        >
            <ChevronRightIcon class="w-6 h-6" />
        </div>
        <swiper
            :modules="[Autoplay]"
            :space-between="16"
            :slides-per-view="isDesktop ? 2 : 1"
            :autoplay="{ delay: 3000, disableOnInteraction: true }"
            class="mt-8 mb-16"
            @swiper="onSwiper"
        >
            <swiper-slide v-for="product in props.offerProducts" :key="product.id">
                <ProductOfferCard :product="product" @click="emit('open-modal', product)" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped></style>
