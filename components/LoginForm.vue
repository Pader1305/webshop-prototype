<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { useLoginSchema } from '~/utils/validation/authSchema';

const authStore = useAuthStore();
const router = useRouter();
const { t } = useLanguageSwitcher();
const localePath = useLocalePath();

const { handleSubmit } = useForm({
    validationSchema: useLoginSchema(),
});

const { value: email, errorMessage: emailError } = useField<string>('email');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const onSubmit = handleSubmit(async (values, actions) => {
    const result = await authStore.loginUser(email.value, password.value);
    if (result !== true) {
        actions.setFieldError('password', result);
    } else {
        await router.push(localePath('/shop'));
    }
});
</script>

<template>
    <form class="flex flex-col h-screen justify-center items-center" @submit.prevent="onSubmit">
        <h1 class="text-bold-30px text-secondary-40 font-bold leading-[2.5rem] tracking-[0em]">
            {{ t('login.title') }}
        </h1>

        <BaseInput v-model="email" name="email" :label="t('login.email')" autocomplete="email" :error="emailError" />

        <BaseInput
            v-model="password"
            name="password"
            type="password"
            :label="t('login.password')"
            autocomplete="current-password"
            :error="passwordError"
        />

        <input
            class="mt-8 w-[19.4375rem] h-[2.1875rem] bg-secondary-50 text-primary-100 text-regular-14 border border-secondary-50 rounded-[3px]"
            type="submit"
            :value="t('login.submit')"
        />

        <div class="mt-[2.625rem] flex flex-col items-center">
            <h2 class="text-bold-30px text-secondary-40 font-bold leading-[2.5rem] tracking-[0em]">
                {{ t('login.registerPrompt') }}
            </h2>
            <NuxtLink :to="localePath('register')">
                <button
                    class="mt-2 w-[19.4375rem] h-[2.1875rem] bg-secondary-95 text-secondary-40 text-regular-14 border border-secondary-95 rounded-[3px]"
                >
                    {{ t('login.registerButton') }}
                </button>
            </NuxtLink>
        </div>
    </form>
</template>

<style scoped></style>
