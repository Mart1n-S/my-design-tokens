<script setup lang="ts">
import { ref, computed } from 'vue';
import type { BaseAvatarProps } from '../../../types/components';

const props = withDefaults(defineProps<BaseAvatarProps>(), {
  size: 'md',
  shape: 'circle',
  decorative: false
});

const hasError = ref(false);

const sizePx = computed(() => {
  switch (props.size) {
    case 'sm': return 24;
    case 'md': return 32;
    case 'lg': return 40;
    case 'xl': return 56;
    default: return 32;
  }
});

const classes = computed(() => [
  'avatar',
  `avatar--${props.size}`,
  `avatar--${props.shape}`
]);

const ariaHidden = computed(() => props.decorative ? 'true' : undefined);
const altText = computed(() => props.decorative ? '' : props.alt);

const onError = () => {
  hasError.value = true;
};
</script>

<template>
  <div :class="classes" :style="{ width: sizePx + 'px', height: sizePx + 'px' }">
    <img
      v-if="props.src && !hasError"
      :src="props.src"
      :alt="altText"
      :aria-hidden="ariaHidden"
      class="avatar__img"
      @error="onError"
    />
    <div v-else class="avatar__fallback" :aria-hidden="props.decorative ? 'true' : 'false'">
      <span class="avatar__initials">{{ props.initials || (props.alt ? props.alt.charAt(0).toUpperCase() : '') }}</span>
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
  background-color: var(--color-background-tertiary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
}

.avatar--circle { border-radius: 9999px; }
.avatar--square { border-radius: var(--radius-md); }

.avatar__img { width: 100%; height: 100%; object-fit: cover; }

.avatar__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
}

/* Optional size-specific font tuning */
.avatar--sm .avatar__initials { font-size: 12px; }
.avatar--md .avatar__initials { font-size: 14px; }
.avatar--lg .avatar__initials { font-size: 16px; }
.avatar--xl .avatar__initials { font-size: 18px; }
</style>
