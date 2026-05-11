export function useLanguageSwitcher() {
    const { locale, locales, setLocale, t } = useI18n();
    const localePath = useLocalePath();

    function handleLanguageSwitch() {
        setLocale(locale.value == 'en' ? 'de' : 'en');
    }

    const currentLocaleName = computed(() => {
        const current = locales.value.find(l => l.code === locale.value);
        return current?.name || locale.value;
    });

    return {
        handleLanguageSwitch,
        currentLocaleName,
        localePath,
        locale,
        t,
    };
}
