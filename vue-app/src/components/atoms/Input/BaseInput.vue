<script setup lang="ts">
import { computed, useSlots, ref } from 'vue';
import type { BaseInputProps } from '../../../types';
import BaseIcon from '../Icon/BaseIcon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseInputProps>(), {
    type: 'text',
    modelValue: '',
    error: false,
    disabled: false,
    readonly: false,
    required: false,
    iconSize: 'sm'
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};

const wrapperClasses = computed(() => [
    'input-wrapper',
    {
        'input-wrapper--error': props.error,
        'input-wrapper--disabled': props.disabled,
        'input-wrapper--readonly': props.readonly,
        'input-wrapper--has-icon-left': props.iconLeft || slots['icon-left'],
        'input-wrapper--has-icon-right': props.iconRight || slots['icon-right']
    }
]);
</script>

<template>
    <div :class="wrapperClasses" @click="inputRef?.focus()">

        <span v-if="iconLeft || $slots['icon-left']" class="input-addon input-addon--left">
            <slot name="icon-left">
                <BaseIcon v-if="iconLeft" :name="iconLeft" :size="iconSize" />
            </slot>
        </span>

        <input ref="inputRef" :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
            :readonly="readonly" :required="required" :aria-invalid="error" class="input-field" v-bind="$attrs"
            @input="handleInput" />

        <span v-if="iconRight || $slots['icon-right']" class="input-addon input-addon--right">
            <slot name="icon-right">
                <BaseIcon v-if="iconRight" :name="iconRight" :size="iconSize" />
            </slot>
        </span>

    </div>
</template>

<style scoped>
.input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    min-height: 44px;
    transition: border-color 0.2s, outline 0.2s, outline-offset 0.2s;
    cursor: text;
}

.input-field {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    padding: var(--spacing-2) var(--spacing-3);
    font-family: var(--font-family-body);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    width: 100%;
    min-width: 0;
}

.input-field::placeholder {
    color: var(--color-text-placeholder);
    opacity: 1;
}

.input-wrapper--has-icon-left .input-field {
    padding-left: var(--spacing-0);
}

.input-wrapper--has-icon-right .input-field {
    padding-right: var(--spacing-0);
}

.input-addon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    flex-shrink: 0;
    height: 100%;
    padding: 0 var(--spacing-2);
}

/* ETATS */
.input-wrapper:hover:not(.input-wrapper--disabled):not(.input-wrapper--readonly):not(.input-wrapper--error) {
    border-color: var(--color-primary-default);
}

.input-wrapper:focus-within {
    border-color: var(--color-primary-default);
    outline: 2px solid var(--color-action-focus);
    outline-offset: 2px;
    z-index: 10;
}

.input-wrapper--error {
    border-color: var(--color-status-error);
}

.input-wrapper--error:focus-within {
    border-color: var(--color-status-error);
    outline-color: var(--color-status-error);
}

.input-wrapper--disabled {
    background-color: var(--color-disabled-background);
    cursor: not-allowed;
    box-shadow: none;
}

.input-wrapper--disabled .input-field,
.input-wrapper--disabled .input-addon {
    color: var(--color-disabled-text);
    cursor: not-allowed;
}

.input-wrapper--readonly {
    background-color: var(--color-background-tertiary);
    cursor: default;
    box-shadow: none;
}

.input-wrapper--readonly .input-field {
    color: var(--color-text-secondary);
    cursor: default;
}

.input-wrapper--readonly:focus-within {
    border-color: var(--color-border-default);
}
</style>