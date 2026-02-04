<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AlertProps } from '../../../types';
import BaseIcon from '../../atoms/Icon/BaseIcon.vue';
import BaseButton from '../../atoms/Button/BaseButton.vue';

const props = withDefaults(defineProps<AlertProps>(), {
    variant: 'info',
    closable: false,
    description: ''
});

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isVisible = ref(true);

const defaultIcon = computed(() => {
    switch (props.variant) {
        case 'success': return 'check';
        case 'warning': return 'warning';
        case 'error': return 'close';
        default: return 'info';
    }
});

const handleClose = () => {
    isVisible.value = false;
    emit('close');
};
</script>

<template>
    <div v-if="isVisible" class="alert" :class="`alert--${variant}`" role="alert">
        <div class="alert__icon">
            <BaseIcon :name="icon || defaultIcon" size="md" />
        </div>

        <div class="alert__content">
            <h4 class="alert__title">{{ title }}</h4>
            <p v-if="description" class="alert__desc">{{ description }}</p>
        </div>

        <div v-if="closable" class="alert__close">
            <BaseButton variant="tertiary" size="md" icon="close" icon-only aria-label="Fermer" @click="handleClose"
                class="close-btn" />
        </div>
    </div>
</template>

<style scoped>
.alert {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    margin-bottom: var(--spacing-4);
    font-family: var(--font-family-body);
}

.alert__icon {
    flex-shrink: 0;
    margin-top: 2px;
}

.alert__content {
    flex: 1;
    min-width: 0;
}

.alert__title {
    margin: 0;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-base);
    line-height: 1.4;
}

.alert__desc {
    margin: var(--spacing-1) 0 0 0;
    font-size: var(--font-size-sm);
    opacity: 0.9;
    line-height: 1.5;
}

.alert__close {
    flex-shrink: 0;
    margin-top: -4px;
}

/* --- VARIANTES --- */

/* INFO */
.alert--info {
    background-color: var(--color-alert-info-background);
    border-color: var(--color-alert-info-border);
    color: var(--color-alert-info-text);
}

.alert--info :deep(.base-icon) {
    color: var(--color-alert-info-text);
}

.alert--info .close-btn {
    --btn-color: var(--color-alert-info-text);
    --btn-hover-bg: var(--color-alert-info-button-hover);
    --btn-active-bg: var(--color-alert-info-button-active);
}

/* SUCCESS */
.alert--success {
    background-color: var(--color-alert-success-background);
    border-color: var(--color-alert-success-border);
    color: var(--color-alert-success-text);
}

.alert--success :deep(.base-icon) {
    color: var(--color-alert-success-text);
}

.alert--success .close-btn {
    --btn-color: var(--color-alert-success-text);
    --btn-hover-bg: var(--color-alert-success-button-hover);
    --btn-active-bg: var(--color-alert-success-button-active);
}

/* WARNING */
.alert--warning {
    background-color: var(--color-alert-warning-background);
    border-color: var(--color-alert-warning-border);
    color: var(--color-alert-warning-text);
}

.alert--warning :deep(.base-icon) {
    color: var(--color-alert-warning-text);
}

.alert--warning .close-btn {
    --btn-color: var(--color-alert-warning-text);
    --btn-hover-bg: var(--color-alert-warning-button-hover);
    --btn-active-bg: var(--color-alert-warning-button-active);
}

/* ERROR */
.alert--error {
    background-color: var(--color-alert-error-background);
    border-color: var(--color-alert-error-border);
    color: var(--color-alert-error-text);
}

.alert--error :deep(.base-icon) {
    color: var(--color-alert-error-text);
}

.alert--error .close-btn {
    --btn-color: var(--color-alert-error-text);
    --btn-hover-bg: var(--color-alert-error-button-hover);
    --btn-active-bg: var(--color-alert-error-button-active);
}
</style>