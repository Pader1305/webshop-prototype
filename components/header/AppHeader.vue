<script setup lang="ts">
const { isDesktop } = useViewport();
</script>

<template>
    <DesktopHeader v-if="isDesktop" />
    <MobileHeader v-else />
    <div v-if="!isDesktop" class="h-[0.375rem] bg-secondary-95" />
</template>

<style scoped></style>
