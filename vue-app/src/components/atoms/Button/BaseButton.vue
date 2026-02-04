<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BaseButtonProps } from '../../../types';
import BaseIcon from '../Icon/BaseIcon.vue';

const props = withDefaults(defineProps<BaseButtonProps>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    as: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    iconPosition: 'left',
    iconOnly: false
});

const classes = computed(() => [
    'btn',
    `btn--${props.variant}`,
    `btn--${props.size}`,
    {
        'btn--full-width': props.fullWidth,
        'btn--loading': props.loading,
        'btn--disabled': props.disabled && props.as !== 'button',
        'btn--icon-only': props.iconOnly
    }
]);

const ariaDisabled = computed(() => props.disabled || props.loading ? 'true' : undefined);

const slots = useSlots();
const hasLeftIcon = computed(() => (props.icon && props.iconPosition === 'left') || !!slots['icon-left']);
const hasRightIcon = computed(() => (props.icon && props.iconPosition === 'right') || !!slots['icon-right']);
</script>

<template>
    <component :is="as" :class="classes" :type="as === 'button' ? type : undefined"
        :disabled="as === 'button' ? (disabled || loading) : undefined" :aria-disabled="ariaDisabled"
        :aria-busy="loading ? 'true' : undefined" :href="href" :to="to">

        <span v-if="loading" class="btn__spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25"></circle>
                <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
            </svg>
        </span>

        <span class="btn__content" :class="{ 'btn__content--hidden': loading }">

            <template v-if="iconOnly">
                <slot name="icon-left">
                    <BaseIcon v-if="icon" :name="icon" :size="size" />
                </slot>
            </template>

            <template v-else>
                <span v-if="hasLeftIcon" class="btn__icon-wrapper">
                    <slot name="icon-left">
                        <BaseIcon v-if="icon" :name="icon" :size="size" />
                    </slot>
                </span>

                <span class="btn__text">
                    <slot />
                </span>

                <span v-if="hasRightIcon" class="btn__icon-wrapper">
                    <slot name="icon-right">
                        <BaseIcon v-if="icon" :name="icon" :size="size" />
                    </slot>
                </span>
            </template>

        </span>
    </component>
</template>

<style scoped>
/* Base et layout */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: var(--font-family-body);
    font-weight: var(--font-weight-medium);
    line-height: 1;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    text-decoration: none;
    box-sizing: border-box;
}

.btn--full-width {
    width: 100%;
    display: flex;
}

.btn__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: var(--spacing-2);
}

.btn__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
}

.btn__text {
    display: flex;
    align-items: center;
}


/* Sizes */

.btn--sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--font-size-sm);
    height: 32px;
}

.btn--sm .btn__content {
    gap: var(--spacing-1);
}

.btn--md {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-base);
    gap: var(--spacing-2);
    height: 40px;
}

.btn--lg {
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-lg);
    gap: var(--spacing-2);
    height: 48px;
}

/* Button icon */
.btn--icon-only {
    padding: 0;
    aspect-ratio: 1;
    border-radius: var(--radius-full);
}

/* Tailles fixes pour les boutons icônes */
/* Small (24px) */
.btn--sm.btn--icon-only {
    width: var(--spacing-6);
    height: var(--spacing-6);
}

/* Medium (32px) */
.btn--md.btn--icon-only {
    width: var(--spacing-8);
    height: var(--spacing-8);
}

/* Large (48px) */
.btn--lg.btn--icon-only {
    width: var(--spacing-12);
    height: var(--spacing-12);
}

/* Focus Visible */
.btn:focus-visible {
    outline: 2px solid var(--color-action-focus);
    outline-offset: 2px;
    z-index: 10;
}


/** Variants */

/* Primary */
.btn--primary {
    background-color: var(--color-button-primary-background);
    color: var(--color-button-primary-text);
    border-color: var(--color-button-primary-border);
}

.btn--primary:hover:not(:disabled) {
    background-color: var(--color-button-primary-hover-background);
    color: var(--color-button-primary-hover-text);
    border-color: var(--color-button-primary-hover-border);
}

.btn--primary:active:not(:disabled) {
    background-color: var(--color-button-primary-active-background);
    color: var(--color-button-primary-active-text);
    border-color: var(--color-button-primary-active-border);
}

/* Secondary */
.btn--secondary {
    background-color: var(--color-button-secondary-background);
    color: var(--color-button-secondary-text);
    border-color: var(--color-button-secondary-border);
}

.btn--secondary:hover:not(:disabled) {
    background-color: var(--color-button-secondary-hover-background);
    color: var(--color-button-secondary-hover-text);
    border-color: var(--color-button-secondary-hover-border);
}

.btn--secondary:active:not(:disabled) {
    background-color: var(--color-button-secondary-active-background);
    color: var(--color-button-secondary-active-text);
    border-color: var(--color-button-secondary-active-border);
}

/* Tertiary */
.btn--tertiary {
    --btn-color: var(--color-button-tertiary-text);
    --btn-hover-bg: var(--color-button-tertiary-hover-background);
    --btn-active-bg: var(--color-button-tertiary-active-background);

    background-color: transparent;
    color: var(--btn-color);
    border-color: var(--color-button-tertiary-border);
}

.btn--tertiary:hover:not(:disabled) {
    background-color: var(--btn-hover-bg);
    color: var(--color-button-tertiary-hover-text);
    border-color: var(--color-button-tertiary-hover-border);
}

.btn--tertiary:active:not(:disabled) {
    background-color: var(--btn-active-bg);
    color: var(--color-button-tertiary-active-text);
    border-color: var(--color-button-tertiary-active-border);
}

/* Danger */
.btn--danger {
    background-color: var(--color-button-danger-background);
    color: var(--color-button-danger-text);
    border-color: var(--color-button-danger-border);
}

.btn--danger:hover:not(:disabled) {
    background-color: var(--color-button-danger-hover-background);
    color: var(--color-button-danger-hover-text);
    border-color: var(--color-button-danger-hover-border);
}

.btn--danger:active:not(:disabled) {
    background-color: var(--color-button-danger-active-background);
    color: var(--color-button-danger-active-text);
    border-color: var(--color-button-danger-active-border);
}

.btn--danger:focus-visible {
    outline-color: var(--color-button-danger-background);
}

/* Etats globaux */

/* Disabled */
.btn:disabled,
.btn--disabled {
    opacity: 1;
    cursor: not-allowed !important;
    background-color: var(--color-disabled-background);
    color: var(--color-disabled-text);
    border-color: transparent;
    box-shadow: none;
}

/* Exception pour Secondary/Tertiary disabled */
.btn--secondary:disabled,
.btn--tertiary:disabled {
    background-color: transparent;
    border-color: var(--color-disabled-background);
    color: var(--color-disabled-text);
}

.btn--tertiary:disabled {
    border-color: transparent;
}

/* Loading */
.btn--loading {
    cursor: wait !important;
}

.btn__content--hidden {
    opacity: 0;
}

.btn__spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.2em;
    height: 1.2em;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>