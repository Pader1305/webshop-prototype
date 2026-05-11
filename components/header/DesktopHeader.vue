<script setup lang="ts">
import ShopIcon from 'assets/icons/ShopSvg.svg';
import EarthEuropaIcon from 'assets/icons/EarthEuropa.svg';
import DollarSackIcon from 'assets/icons/DollarSack.svg';
import ShoppingCartIcon from 'assets/icons/ShoppingCart.svg';
import UserSvgIcon from 'assets/icons/UserSvg.svg';

const authStore = useAuthStore();
const cartStore = useCartStore();

const { handleLanguageSwitch, currentLocaleName, localePath, t } = useLanguageSwitcher();
async function handleLogout() {
    await authStore.logoutUser();
}
</script>

<template>
    <nav class="px-4 py-2 flex items-baseline-last justify-between text-sm text-gray-800">
        <AppLogo />

        <div v-if="authStore.isAuthenticated" class="flex space-x-1">
            <NuxtLink :to="localePath('shop')" class="flex items-center space-x-1 hover:underline">
                <ShopIcon class="icon-xs text-secondary-50" />
                <span class="text-left text-regular-12px">{{ t('header.shop') }}</span>
            </NuxtLink>
        </div>

        <NuxtLink @click="handleLanguageSwitch">
            <HeaderItem :label="t('header.selectedLanguage')" :icon="EarthEuropaIcon" :value="currentLocaleName" />
        </NuxtLink>

        <HeaderItem v-if="authStore.isAuthenticated" :label="t('header.hello') + ' ' + authStore.user?.firstName">
            <div class="flex items-center w-full space-x-1">
                <NuxtLink :to="localePath('profile')" class="hover:underline flex space-x-1">
                    <UserSvgIcon class="icon-xs text-secondary-50" />
                    <span class="text-left text-regular-12px">{{ t('header.profile') }}</span>
                </NuxtLink>
                <span class="text-left text-regular-12px">|</span>
                <span class="hover:underline text-left text-regular-12px" @click="handleLogout">
                    {{ t('header.logout') }}
                </span>
            </div>
        </HeaderItem>

        <HeaderItem v-if="!authStore.isAuthenticated">
            <div class="flex items-center w-full space-x-1">
                <NuxtLink :to="localePath('register')" class="hover:underline flex space-x-1 cursor-pointer">
                    <UserSvgIcon class="icon-xs text-secondary-50" />
                    <span class="text-left text-regular-12px">{{ t('header.register') }}</span>
                </NuxtLink>
                <span class="text-left text-regular-12px">|</span>
                <NuxtLink :to="localePath('login')" class="hover:underline text-left text-regular-12px cursor-pointer">
                    {{ t('header.login') }}
                </NuxtLink>
            </div>
        </HeaderItem>

        <HeaderItem
            v-if="authStore.isAuthenticated"
            :label="t('header.yourCredit')"
            :icon="DollarSackIcon"
            :value="formatCurrencyEUR(authStore.user?.credit)"
        />
        <NuxtLink :to="localePath('cart')">
            <HeaderItem
                v-if="authStore.isAuthenticated"
                :label="t('header.yourCart')"
                :icon="ShoppingCartIcon"
                :value="formatCurrencyEUR(cartStore.total)"
            />
        </NuxtLink>
    </nav>
</template>

<style scoped></style>
