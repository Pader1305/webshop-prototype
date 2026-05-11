import { ref, onMounted, onUnmounted } from 'vue';

export function useViewport() {
    const isDesktop = ref(false);
    const burgerMenuActive = ref(false);

    let mediaQuery: MediaQueryList | null = null;

    const update = () => {
        if (!mediaQuery) {
            return;
        }
        isDesktop.value = mediaQuery.matches;
        burgerMenuActive.value = mediaQuery.matches;
    };

    const toggleBurgermenu = () => {
        burgerMenuActive.value = !burgerMenuActive.value;
    };

    onMounted(() => {
        if (typeof window !== 'undefined') {
            mediaQuery = window.matchMedia('(min-width: 1024px)');
            update();
            mediaQuery.addEventListener('change', update);
        }
    });

    onUnmounted(() => {
        if (mediaQuery) {
            mediaQuery.removeEventListener('change', update);
        }
    });

    return { isDesktop, burgerMenuActive, toggleBurgermenu };
}
