<script setup lang="ts">
import type { BaseBadgeProps } from '../../../types/components';

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
  shape: 'rounded'
});
</script>

<template>
  <span
    class="badge"
    :class="[
      `badge--${props.variant}`,
      `badge--${props.size}`,
      `badge--${props.shape}`
    ]"
    role="status"
  >
    <span class="badge__icon" aria-hidden="true">
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
  gap: var(--spacing-2);
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-medium);
  line-height: 1;
}

/* Sizes */
.badge--sm {
  padding: 2px var(--spacing-2);
  font-size: var(--font-size-xs);
}

.badge--md {
  padding: 4px var(--spacing-3);
  font-size: var(--font-size-sm);
}

/* Shape */
.badge--rounded { border-radius: var(--radius-md); }
.badge--pill { border-radius: 9999px; }

.badge__icon:empty { display: none; }

/* Variants (fond/texte/bordure) */
.badge--neutral {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  border-color: var(--color-gray-200);
}

.badge--success {
  background-color: var(--color-green-50);
  color: var(--color-green-700);
  border-color: var(--color-green-200);
}

.badge--warning {
  background-color: var(--color-orange-50);
  color: var(--color-orange-800);
  border-color: var(--color-orange-200);
}

.badge--error {
  background-color: var(--color-red-50);
  color: var(--color-red-700);
  border-color: var(--color-red-200);
}

.badge--info {
  background-color: var(--color-blue-50);
  color: var(--color-blue-700);
  border-color: var(--color-blue-200);
}
</style>
