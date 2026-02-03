<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { BaseAvatarProps } from '../../../types/components';

const props = withDefaults(defineProps<BaseAvatarProps>(), {
  size: 'md',
  decorative: false
});

const hasError = ref(false);

watch(() => props.src, () => {
  hasError.value = false;
});

const classes = computed(() => [
  'avatar',
  `avatar--${props.size}`
]);

const ariaHidden = computed(() => props.decorative ? 'true' : undefined);
// Si décoratif, alt vide, sinon on utilise le alt fourni
const altText = computed(() => props.decorative ? '' : props.alt);

// Calcul des initiales (Fallback)
const initialsText = computed(() => {
  if (props.initials) return props.initials;
  // Si pas d'initiales, on prend la 1ère lettre du Alt
  return props.alt ? props.alt.charAt(0).toUpperCase() : '?';
});

const onError = () => {
  hasError.value = true;
};
</script>

<template>
  <div :class="classes">

    <img v-if="props.src && !hasError" :src="props.src" :alt="altText" :aria-hidden="ariaHidden" class="avatar__img"
      @error="onError" />

    <div v-else class="avatar__fallback" :aria-hidden="props.decorative ? 'true' : 'false'">
      <span class="avatar__initials">
        {{ initialsText }}
      </span>
    </div>

  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--color-avatar-background);
  color: var(--color-avatar-text);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-full);
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
  user-select: none;
}

/* Tailles & Typo */

/* Small (24px) */
.avatar--sm {
  width: var(--spacing-6);
  height: var(--spacing-6);
  font-size: var(--font-size-xs);
}

/* Medium (32px) */
.avatar--md {
  width: var(--spacing-8);
  height: var(--spacing-8);
  font-size: var(--font-size-sm);
}

/* Large (48px) */
.avatar--lg {
  width: var(--spacing-12);
  height: var(--spacing-12);
  font-size: var(--font-size-base);
}

/* Contenu */
.avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>