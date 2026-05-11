<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-bold-28px">{{ t('productOverview.title') }}</h1>
        <PaginatedProductList />
    </div>
</template>

<style scoped></style>
