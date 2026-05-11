import * as yup from 'yup';

export function useLoginSchema() {
    const { t } = useI18n();

    return yup.object({
        email: yup.string().email(t('validation.emailInvalid')).required(t('validation.emailRequired')),
        password: yup.string().required(t('validation.passwordRequired')),
    });
}

export function useRegisterSchema() {
    const { t } = useI18n();

    return yup.object({
        email: yup.string().email(t('validation.emailInvalid')).required(t('validation.emailRequired')),
        password: yup.string().required(t('validation.passwordRequired')).min(6, t('validation.passwordMin')),
        forename: yup.string().required(t('validation.forenameRequired')),
        surname: yup.string().required(t('validation.surnameRequired')),
    });
}
