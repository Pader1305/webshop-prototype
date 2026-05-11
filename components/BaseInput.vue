<script setup lang="ts">
import EyeOpenSvg from 'assets/icons/EyeOpenSvg.svg';
import EyeShutSvg from 'assets/icons/EyeShutSvg.svg';

const props = defineProps<{
    name: string;
    label: string;
    type?: string;
    autocomplete?: string;
    modelValue: string;
    error?: string;
}>();

const passwordVisible = ref(false);

const showPassword = () => {
    passwordVisible.value = true;
};

const hidePassword = () => {
    passwordVisible.value = false;
};

const computedType = computed(() => {
    if (props.type !== 'password') {
        return props.type;
    }
    return passwordVisible.value ? 'text' : 'password';
});

const model = defineModel<string>();
</script>

<template>
    <div
        class="input-container flex flex-col p-[0.5rem] w-[19rem] h-[3.25rem] border-[0.0625rem] border-secondary-90 mt-[1rem]"
    >
        <label class="text-left text-regular-10px text-secondary-70" for="{{props.label}}">{{ props.label }}</label>
        <div class="flex justify-between items-center">
            <input
                :id="name"
                v-model="model"
                :type="computedType"
                class="text-left text-regular-14px text-secondary-40 flex-1"
                :name="name"
                :value="modelValue"
                :autocomplete="autocomplete"
            />
            <div
                v-if="props.type === 'password'"
                @mousedown="showPassword"
                @mouseup="hidePassword"
                @touchstart="showPassword"
                @touchend="hidePassword"
            >
                <EyeShutSvg class="w-4" v-if="passwordVisible" />
                <EyeOpenSvg class="w-4" v-else />
            </div>
        </div>
    </div>
    <span v-if="error" class="w-[19rem] text-left text-regular-10px text-error-50 mt-[0.75rem]">{{ error }}</span>
</template>

<style scoped></style>
