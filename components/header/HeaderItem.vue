<script setup lang="ts">
const { isDesktop } = useViewport();

defineProps<{
    label?: string;
    icon?: Component;
    value?: string;
}>();
</script>

<template>
    <div class="flex flex-col">
        <span v-if="isDesktop" class="text-regular-8px text-secondary-40 font-normal leading-[0.625rem] tracking-[0em]">
            {{ label }}
        </span>
        <slot>
            <div class="flex items-center w-full space-x-1 cursor-pointer">
                <component
                    :is="icon"
                    class="w-3 h-3 text-secondary-50 bg-no-repeat bg-origin-padding bg-[position:0_0]"
                />
                <span
                    v-if="value !== null"
                    class="text-regular-12 text-secondary-40 font-normal leading-[1rem] tracking-[0em]"
                >
                    {{ value }}
                </span>
            </div>
        </slot>
    </div>
</template>

<style scoped></style>
