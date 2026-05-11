<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useRegisterSchema } from '~/utils/validation/authSchema';

const authStore = useAuthStore();
const router = useRouter();
const { t, localePath } = useLanguageSwitcher();

const { handleSubmit } = useForm({
    validationSchema: useRegisterSchema(),
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: forename, errorMessage: forenameError } = useField<string>('forename');
const { value: surname, errorMessage: surnameError } = useField<string>('surname');

const onSubmit = handleSubmit(async (values, actions) => {
    const registerResult = await authStore.register(email.value, password.value, forename.value, surname.value);
    if (registerResult !== true) {
        actions.setFieldError('password', registerResult);
        return;
    }
    const result = await authStore.loginUser(email.value, password.value);
    if (result !== true) {
        actions.setFieldError('password', result);
    } else {
        await router.push('/shop');
    }
});
</script>

<template>
    <form class="flex flex-col h-screen justify-center items-center" @submit.prevent="onSubmit">
        <h1 class="text-bold-30px text-secondary-40 font-bold leading-[2.5rem] tracking-[0em]">
            {{ t('register.title') }}
        </h1>
        <BaseInput
            v-model="forename"
            name="forename"
            :label="t('register.forename')"
            autocomplete="given-name"
            :error="forenameError"
        />
        <BaseInput
            v-model="surname"
            name="surname"
            :label="t('register.surname')"
            autocomplete="family-name"
            :error="surnameError"
        />
        <BaseInput v-model="email" name="email" :label="t('register.email')" autocomplete="email" :error="emailError" />
        <BaseInput
            v-model="password"
            name="password"
            :label="t('register.password')"
            type="password"
            autocomplete="new-password"
            :error="passwordError"
        />
        <input
            class="mt-[2rem] w-[19.4375rem] h-[2.1875rem] bg-secondary-50 text-primary-100 text-regular-14 border border-secondary-50 rounded-[3px]"
            type="submit"
            :value="t('register.submit')"
        />
        <span class="mt-[0.625rem] text-regular-12px">
            {{ t('register.accountExists') }}
            <NuxtLink :to="localePath('login')" class="text-regular-12px underline text-secondary-40">
                {{ t('register.toLogin') }}
            </NuxtLink>
        </span>
    </form>
</template>

<style scoped></style>
