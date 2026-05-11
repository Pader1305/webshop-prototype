<script setup lang="ts">
import BasecomLogo from '@/assets/icons/BasecomLogo.svg';

const { localePath } = useLanguageSwitcher();
</script>

<template>
    <NuxtLink :to="localePath('shop')">
        <div class="flex items-center space-x-1">
            <BasecomLogo class="h-[1.75rem] w-[1.75rem] bg-primary-100" />
            <span class="font-bold text-lg">basekorb</span>
        </div>
    </NuxtLink>
</template>

<style scoped></style>
