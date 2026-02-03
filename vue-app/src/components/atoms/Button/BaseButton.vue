<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BaseButtonProps } from '../../../types/components';
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
                <BaseIcon v-if="icon" :name="icon" :size="size" />
                <slot v-else />
            </template>

            <template v-else>
                <span v-if="hasLeftIcon" class="btn__icon btn__icon--left">
                    <slot name="icon-left">
                        <BaseIcon v-if="icon" :name="icon" :size="size" />
                    </slot>
                </span>

                <slot />

                <span v-if="hasRightIcon" class="btn__icon btn__icon--right">
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
    line-height: 1.5;
    white-space: nowrap;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    text-decoration: none;
}

.btn--full-width {
    width: 100%;
    display: flex;
}

/* Focus */
.btn:focus-visible {
    outline: 2px solid var(--color-action-focus);
    outline-offset: 2px;
    z-index: 10;
}

/* Sizes */
.btn--sm {
    padding: var(--spacing-1) var(--spacing-3);
    font-size: var(--font-size-sm);
    gap: var(--spacing-1);
}

.btn--md {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-base);
    gap: var(--spacing-2);
}

.btn--lg {
    padding: var(--spacing-3) var(--spacing-6);
    font-size: var(--font-size-lg);
    gap: var(--spacing-2);
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


/** Variants */

/* Primary */
.btn--primary {
    background-color: var(--color-primary-default);
    color: var(--color-text-inverse);
    border-color: var(--color-primary-default);
}

.btn--primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
}

.btn--primary:active:not(:disabled) {
    background-color: var(--color-primary-active);
    border-color: var(--color-primary-active);
}

/* Secondary */
.btn--secondary {
    background-color: var(--color-white);
    color: var(--color-primary-constant);
    border-color: var(--color-primary-constant);
}

.btn--secondary:hover:not(:disabled) {
    background-color: var(--color-primary-surface-hover);
    color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
}

.btn--secondary:active:not(:disabled) {
    background-color: var(--color-primary-surface-active);
    color: var(--color-primary-active);
    border-color: var(--color-primary-active);
}

/* Tertiary */
.btn--tertiary {
    background-color: transparent;
    color: var(--color-primary-default);
}

.btn--tertiary:hover:not(:disabled) {
    background-color: var(--color-primary-surface-hover);
    color: var(--color-primary-hover);
}

.btn--tertiary:active:not(:disabled) {
    background-color: var(--color-primary-surface-active);
    color: var(--color-primary-active);
}

/* Danger */
.btn--danger {
    background-color: var(--color-danger-default);
    color: var(--color-white);
    border-color: var(--color-danger-default);
}

.btn--danger:hover:not(:disabled) {
    background-color: var(--color-danger-hover);
    border-color: var(--color-danger-hover);
}

.btn--danger:active:not(:disabled) {
    background-color: var(--color-danger-active);
    border-color: var(--color-danger-active);
}

.btn--danger:focus-visible {
    outline-color: var(--color-danger-focus);
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

/* Exception pour Secondary/Tertiary disabled (éviter le pavé gris) */
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
    visibility: hidden;
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

/* Utilities */
.btn__icon--left {
    margin-right: 0.5em;
}

.btn__icon--right {
    margin-left: 0.5em;
}

.btn__content:empty+.btn__icon {
    margin: 0;
}

@keyframes spin {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>