<script setup lang="ts">
import { computed } from 'vue';
import type { BaseSwitchProps } from '../../../types';

const props = withDefaults(defineProps<BaseSwitchProps>(), {
    modelValue: false,
    disabled: false
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
};

const wrapperClasses = computed(() => [
    'switch-wrapper',
    {
        'switch-wrapper--disabled': props.disabled
    }
]);
</script>

<template>
    <label :class="wrapperClasses" :for="id">
        <div class="switch-track">
            <input :id="id" type="checkbox" role="switch" class="switch__input" :checked="modelValue"
                :disabled="disabled" :aria-checked="modelValue" @change="handleChange" />
            <span class="switch__slider"></span>
        </div>

        <span v-if="label" class="switch__label">
            {{ label }}
        </span>

    </label>
</template>

<style scoped>
/* Le conteneur principal */
.switch-wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-3);
    cursor: pointer;
    user-select: none;
    min-height: 24px;
}

.switch-track {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
    box-sizing: border-box;
}

/* Input caché */
.switch__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
}

/* Fond coloré (TRACK) */
.switch__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-switch-track-off);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Le rond (KNOB) */
.switch__slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: var(--color-switch-knob);
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    box-shadow: var(--shadow-sm);
}

/* Etat checked (ON) */
.switch__input:checked+.switch__slider {
    background-color: var(--color-switch-track-on);
    border-color: var(--color-switch-track-on);
}

/* Déplacement du rond */
.switch__input:checked+.switch__slider:before {
    transform: translateX(20px);
}

/* Etat disabled */
.switch-wrapper--disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

/* Focus Visible */
.switch__input:focus-visible+.switch__slider {
    box-shadow: 0 0 0 2px var(--color-background-primary), 0 0 0 4px var(--color-action-focus);
}

/* Label */
.switch__label {
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    line-height: 1.5;
}
</style>