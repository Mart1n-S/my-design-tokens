<script setup lang="ts">
import { computed } from 'vue';
import type { BaseTextareaProps } from '../../../types/components';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<BaseTextareaProps>(), {
    rows: 3,
    resize: 'vertical',
    modelValue: '',
    error: false,
    disabled: false,
    readonly: false,
    required: false
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
};

const classes = computed(() => [
    'textarea-field',
    `resize--${props.resize}`,
    {
        'textarea-field--error': props.error,
        'textarea-field--disabled': props.disabled,
        'textarea-field--readonly': props.readonly
    }
]);
</script>

<template>
    <textarea :id="id" :value="modelValue" :rows="rows" :placeholder="placeholder" :maxlength="maxlength"
        :disabled="disabled" :readonly="readonly" :required="required" :aria-invalid="error" :class="classes"
        v-bind="$attrs" @input="handleInput"></textarea>
</template>

<style scoped>
.textarea-field {
    display: block;
    width: 100%;
    min-height: 80px;
    padding: var(--spacing-3);
    box-sizing: border-box;
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    background-color: var(--color-background-primary);
    color: var(--color-text-primary);
    font-family: inherit;
    font-size: var(--font-size-base);
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s, outline 0.2s, outline-offset 0.2s;
}

/* Hover */
.textarea-field:hover:not(:disabled):not(.textarea-field--readonly):not(.textarea-field--error) {
    border-color: var(--color-primary-default);
}

/* Focus */
.textarea-field:focus-visible,
.textarea-field:focus {
    outline: 2px solid var(--color-action-focus);
    outline-offset: 2px;
    border-color: var(--color-primary-default);
    z-index: 10;
}

/* Error */
.textarea-field--error {
    border-color: var(--color-status-error);
}

.textarea-field--error:focus-visible,
.textarea-field--error:focus {
    border-color: var(--color-status-error);
    outline-color: var(--color-status-error);
}

/* Disabled */
.textarea-field--disabled {
    background-color: var(--color-disabled-background);
    color: var(--color-disabled-text);
    cursor: not-allowed;
    opacity: 1;
    box-shadow: none;
    resize: none;
}

/* Readonly */
.textarea-field--readonly {
    background-color: var(--color-background-tertiary);
    color: var(--color-text-secondary);
    cursor: default;
    box-shadow: none;
    resize: none;
}

/* Focus sur Readonly : on garde l'outline pour l'accessibilité (on peut copier le texte), 
   mais on garde la bordure grise */
.textarea-field--readonly:focus,
.textarea-field--readonly:focus-visible {
    border-color: var(--color-border-default);
}

/* Resizes */
.resize--none {
    resize: none;
}

.resize--vertical {
    resize: vertical;
}

.resize--horizontal {
    resize: horizontal;
}

.resize--both {
    resize: both;
}

.textarea-field::placeholder {
    color: var(--color-text-placeholder);
    opacity: 1;
}
</style>