<script setup lang="ts">
import ShoppingCartIcon from 'assets/icons/ShoppingCart.svg';
import BurgerMenuIcon from 'assets/icons/BarsSolidSvg.svg';
import ShopIcon from 'assets/icons/ShopSvg.svg';
import EarthEuropaIcon from 'assets/icons/EarthEuropa.svg';
import UserIcon from 'assets/icons/UserSvg.svg';
import XMarkIcon from 'assets/icons/XMark.svg';
import LogoutIcon from 'assets/icons/Logout.svg';

const { burgerMenuActive, toggleBurgermenu } = useViewport();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { handleLanguageSwitch, currentLocaleName, localePath, t } = useLanguageSwitcher();
</script>

<template>
    <nav
        class="h-[2.75rem] px-4 py-2 flex items-center justify-between text-sm text-gray-800 relative"
        :class="!burgerMenuActive ? 'justify-between' : 'justify-end'"
    >
        <AppLogo v-show="!burgerMenuActive" />
        <div class="flex items-center space-x-5">
            <NuxtLink :to="localePath('cart')">
                <HeaderItem
                    v-show="!burgerMenuActive && authStore.isAuthenticated"
                    :icon="ShoppingCartIcon"
                    :value="formatCurrencyEUR(cartStore.total)"
                />
            </NuxtLink>
            <BurgerMenuIcon
                v-if="!burgerMenuActive && authStore.isAuthenticated"
                class="icon-button"
                @click="toggleBurgermenu"
            />
            <XMarkIcon
                v-else-if="burgerMenuActive && authStore.isAuthenticated"
                class="icon-button"
                @click="toggleBurgermenu"
            />
        </div>
        <div
            v-if="burgerMenuActive"
            class="absolute w-[100%] h-[100vh] m-0 top-[3.14rem] z-50 right-0 flex justify-between"
        >
            <div class="w-[50%] opacity-[62%] bg-secondary-70" @click="toggleBurgermenu" />
            <div class="w-[50%] bg-primary-100">
                <div class="flex flex-col m-5">
                    <div class="flex items-center space-x-3 border-b-1 border-secondary-95 p-1">
                        <ShopIcon class="icon-xs" />
                        <NuxtLink class="text-regular-16px" :to="localePath('shop')">{{ t('header.shop') }}</NuxtLink>
                    </div>
                    <div class="flex items-center space-x-3 border-b-1 border-secondary-95 p-1">
                        <UserIcon class="icon-xs" />
                        <NuxtLink class="text-regular-16px" :to="localePath('profile')">{{
                            t('header.profile')
                        }}</NuxtLink>
                    </div>
                    <div
                        class="flex items-center space-x-3 border-b-1 border-secondary-95 p-1 cursor-pointer"
                        @click="handleLanguageSwitch"
                    >
                        <EarthEuropaIcon class="icon-xs" />
                        <span class="text-regular-16px">{{ currentLocaleName }}</span>
                    </div>
                    <div
                        class="flex items-center space-x-3 border-b-1 border-secondary-95 p-1"
                        @click="async () => await authStore.logoutUser()"
                    >
                        <LogoutIcon class="icon-xs" />
                        <NuxtLink class="text-regular-16px">
                            {{ t('header.logout') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
