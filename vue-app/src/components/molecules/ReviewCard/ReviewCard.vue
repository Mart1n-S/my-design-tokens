<script setup lang="ts">
import { computed } from 'vue';
import type { ReviewCardProps } from '../../../types';
import BaseAvatar from '../../atoms/Avatar/BaseAvatar.vue';
import BaseButton from '../../atoms/Button/BaseButton.vue';
import BaseTextarea from '../../atoms/Textarea/BaseTextarea.vue';
import FormField from '../FormField/FormField.vue';

const props = withDefaults(defineProps<ReviewCardProps>(), {
    label: 'Votre avis',
    placeholder: 'Partagez votre expérience...',
    buttonLabel: 'Envoyer',
    loading: false,
    userName: '?',
    showCount: false
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'submit'): void;
}>();

const uniqueId = props.id || `review-${Math.random().toString(36).substr(2, 9)}`;

// Calcul pour le disabled
const isDisabled = computed(() => {
    return !props.modelValue || props.modelValue.trim().length === 0;
});

// Calcul de la longueur actuelle pour le FormField
const currentLen = computed(() => props.modelValue ? props.modelValue.length : 0);

const handleSubmit = () => {
    if (!isDisabled.value && !props.loading) {
        emit('submit');
    }
};
</script>

<template>
    <div class="review-card">

        <div class="review-card__avatar">
            <BaseAvatar size="md" :src="avatarSrc" :alt="avatarAlt || userName" :initials="userName.charAt(0)" />
        </div>

        <form class="review-card__form" @submit.prevent="handleSubmit">

            <FormField :id="uniqueId" :label="label" :show-count="showCount" :max-length="maxLength"
                :current-length="currentLen">
                <BaseTextarea :id="uniqueId" :model-value="modelValue"
                    @update:model-value="emit('update:modelValue', $event)" :placeholder="placeholder"
                    :disabled="loading" :maxlength="maxLength" rows="3" resize="vertical" />
            </FormField>

            <div class="review-card__actions">
                <BaseButton type="submit" variant="primary" :disabled="isDisabled" :loading="loading">
                    {{ buttonLabel }}
                </BaseButton>
            </div>

        </form>

    </div>
</template>

<style scoped>
.review-card {
    display: flex;
    gap: var(--spacing-4);
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-sm);
}

.review-card__avatar {
    flex-shrink: 0;
    padding-top: var(--spacing-1);
}

.review-card__form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    min-width: 0;
}

.review-card__actions {
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 480px) {
    .review-card {
        flex-direction: column;
    }
}
</style>