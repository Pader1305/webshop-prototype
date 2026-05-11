<script setup lang="ts">
const props = defineProps<{
    show: boolean;
    closeModal: () => void;
}>();

const { isDesktop } = useViewport();
</script>

<template>
    <div v-if="props.show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div
            class="bg-white shadow-lg mx-96 p-6 relative"
            :class="isDesktop ? 'w-[44.5rem] h-[19.875rem]' : 'w-[21.1875rem] h-[32.3125rem]'"
        >
            <button
                class="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
                aria-label="Close"
                @click="props.closeModal"
            >
                ✕
            </button>
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
