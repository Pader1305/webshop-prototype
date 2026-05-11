// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
    css: ['~/assets/css/app.css'],
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    imports: {
        dirs: ['./types'],
    },
    i18n: {
        defaultLocale: 'de',
        strategy: 'prefix',
        locales: [
            { code: 'en', name: 'English', file: 'en.json' },
            { code: 'de', name: 'Deutsch', file: 'de.json' },
        ],
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: true,
            fallbackLocale: 'en',
        },
    },
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', 'nuxt-toast', '@nuxtjs/i18n'],
    vite: {
        plugins: [svgLoader(), tailwindcss()],
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
        },
    },
});
