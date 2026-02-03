<script setup lang="ts">
import { computed } from 'vue';
import type { FormFieldProps } from '../../../types/components';

const props = defineProps<FormFieldProps>();

const helpId = computed(() => props.helpText ? `${props.id}-help` : undefined);
const errorId = computed(() => props.errorMessage ? `${props.id}-error` : undefined);

const describedBy = computed(() => {
    const ids = [];
    if (props.errorMessage) ids.push(errorId.value);
    if (props.helpText) ids.push(helpId.value);
    return ids.join(' ');
});

// Calcul pour savoir si on dépasse la limite
const isLimitReached = computed(() => {
    return (props.maxLength && props.currentLength) ? props.currentLength > props.maxLength : false;
});
</script>

<template>
    <div class="form-field">

        <div class="form-field__header">

            <label :for="id" class="form-field__label" :class="{
                'form-field__label--error': error,
                'form-field__label--disabled': disabled
            }">
                {{ label }}
                <span v-if="required" class="required-mark" aria-hidden="true">*</span>
            </label>

            <span v-if="showCount && maxLength !== undefined" class="form-field__counter"
                :class="{ 'form-field__counter--limit': isLimitReached, 'form-field__counter--disabled': disabled }">
                {{ currentLength || 0 }} / {{ maxLength }}
            </span>
        </div>

        <div class="form-field__input-wrapper">
            <slot :describedBy="describedBy" />
        </div>

        <div class="form-field__footer">
            <span v-if="error && errorMessage" :id="errorId" class="form-field__message form-field__message--error"
                role="alert">
                {{ errorMessage }}
            </span>
            <span v-else-if="helpText" :id="helpId" class="form-field__message form-field__message--help">
                {{ helpText }}
            </span>
        </div>
    </div>
</template>

<style scoped>
.form-field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    width: 100%;
    font-family: var(--font-family-body);
}

.form-field__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.form-field__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    line-height: 1.4;
    transition: color 0.2s;
}

/* Compteur */
.form-field__counter {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-variant-numeric: tabular-nums;
    margin-left: var(--spacing-2);
}

.form-field__counter--limit {
    color: var(--color-status-error);
    font-weight: bold;
}

.form-field__counter--disabled {
    color: var(--color-disabled-text);
}

/* Etats label */
.form-field__label--error {
    color: var(--color-status-error);
}

.form-field__label--disabled {
    color: var(--color-disabled-text);
    cursor: not-allowed;
}

.required-mark {
    color: var(--color-status-error);
    margin-left: var(--spacing-1);
}

/* footer */
.form-field__footer {
    min-height: 1.2em;
}

.form-field__message {
    font-size: var(--font-size-xs);
    line-height: 1.4;
    display: block;
}

.form-field__message--help {
    color: var(--color-text-secondary);
}

.form-field__message--error {
    color: var(--color-status-error);
    font-weight: var(--font-weight-medium);
}
</style>