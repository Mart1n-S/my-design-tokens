<script setup lang="ts">
import type { StatCardProps } from '../../../types';
import BaseIcon from '../../atoms/Icon/BaseIcon.vue';
import BaseBadge from '../../atoms/Badge/BaseBadge.vue';

// On utilise les valeurs par défaut
const props = withDefaults(defineProps<StatCardProps>(), {
    trendType: 'neutral',
    icon: undefined,
    trend: undefined
});
</script>

<template>
    <div class="stat-card">

        <div class="stat-card__header">
            <span class="stat-card__label">{{ label }}</span>
            <div v-if="icon" class="stat-card__icon">
                <BaseIcon :name="icon" size="md" />
            </div>
        </div>

        <div class="stat-card__body">
            <span class="stat-card__value">{{ value }}</span>

            <div v-if="trend" class="stat-card__badge">
                <BaseBadge :variant="trendType" size="sm" shape="pill">
                    {{ trend }}
                </BaseBadge>
            </div>
        </div>

    </div>
</template>

<style scoped>
.stat-card {
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    min-width: 200px;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.stat-card:hover {
    border-color: var(--color-border-default);
    box-shadow: var(--shadow-md);
}

.stat-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-1);
}

.stat-card__label {
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-card__icon {
    color: var(--color-text-placeholder);
}

.stat-card__body {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-3);
    flex-wrap: wrap;
}

.stat-card__value {
    font-family: var(--font-family-heading);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    line-height: var(--font-line-height-tight);
}

.stat-card__badge {
    display: flex;
    align-items: center;
}
</style>