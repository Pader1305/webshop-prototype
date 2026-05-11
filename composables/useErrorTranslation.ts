import { useI18n } from 'vue-i18n';

export function useErrorTranslator() {
    const { t } = useI18n();

    function translateError(message?: string): string {
        if (!message) return t('errors.default');

        const key = `errors.${message}`;
        const translated = t(key);

        if (translated === key) {
            return t('errors.default');
        }

        return translated;
    }

    return { translateError };
}
