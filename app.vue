<template>
    <div class="h-screen flex flex-col overflow-hidden">
        <NuxtRouteAnnouncer />
        <AppHeader />
        <div class="flex-1 overflow-auto p-4">
            <NuxtPage />
        </div>
    </div>
</template>
<script setup lang="ts">
import AppHeader from '~/components/header/AppHeader.vue';
</script>
