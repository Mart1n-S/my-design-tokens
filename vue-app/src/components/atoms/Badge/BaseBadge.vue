<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BaseBadgeProps } from '../../../types/components';

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
  shape: 'rounded'
});

const slots = useSlots();

// Classes dynamiques
const classes = computed(() => [
  'badge',
  `badge--${props.variant}`,
  `badge--${props.size}`,
  `badge--${props.shape}`
]);

// On vérifie si le slot icon est utilisé pour ne pas afficher le span vide
const hasIcon = computed(() => !!slots.icon);
</script>

<template>
  <span :class="classes" role="status">

    <span v-if="hasIcon" class="badge__icon">
      <slot name="icon" />
    </span>

    <span class="badge__label">
      <slot />
    </span>

  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  border: 1px solid transparent;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

/* Sizes */
.badge--sm {
  padding: 2px var(--spacing-2);
  font-size: var(--font-size-xs);
  height: 20px;
}

.badge--md {
  padding: 3px var(--spacing-3);
  font-size: var(--font-size-sm);
  height: 24px;
}

/* Shapes */
.badge--rounded {
  border-radius: var(--radius-xs);
}

/* Pill : Rond parfait */
.badge--pill {
  border-radius: var(--radius-full);
}

/* Variants */
.badge--neutral {
  background-color: var(--color-badge-neutral-background);
  color: var(--color-badge-neutral-text);
  border-color: var(--color-badge-neutral-border);
}

.badge--success {
  background-color: var(--color-badge-success-background);
  color: var(--color-badge-success-text);
  border-color: var(--color-badge-success-border);
}

.badge--warning {
  background-color: var(--color-badge-warning-background);
  color: var(--color-badge-warning-text);
  border-color: var(--color-badge-warning-border);
}

.badge--error {
  background-color: var(--color-badge-error-background);
  color: var(--color-badge-error-text);
  border-color: var(--color-badge-error-border);
}

.badge--info {
  background-color: var(--color-badge-info-background);
  color: var(--color-badge-info-text);
  border-color: var(--color-badge-info-border);
}

/* Ajustement de l'icône */
.badge__icon {
  display: flex;
  align-items: center;
}
</style>