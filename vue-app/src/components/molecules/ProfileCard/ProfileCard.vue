<script setup lang="ts">
import type { ProfileCardProps } from '../../../types/components';
import BaseAvatar from '../../atoms/Avatar/BaseAvatar.vue';
import BaseBadge from '../../atoms/Badge/BaseBadge.vue';
import BaseButton from '../../atoms/Button/BaseButton.vue';

const props = withDefaults(defineProps<ProfileCardProps>(), {
    jobTitle: '',
    roleVariant: 'neutral',
    actionLabel: 'Voir le profil',
    centered: false,
    avatarSize: 'lg',
    badgeSize: 'sm',
    badgeShape: 'pill',
    buttonSize: 'sm'
});

const emit = defineEmits<{
    (e: 'action'): void;
}>();
</script>

<template>
    <article class="profile-card" :class="{ 'profile-card--centered': centered }">

        <div class="profile-card__avatar-wrapper">
            <BaseAvatar :size="avatarSize" :src="avatarSrc" :alt="avatarAlt || name" :initials="name.charAt(0)" />
        </div>

        <div class="profile-card__content">

            <header class="profile-card__header">
                <h3 class="profile-card__name">
                    {{ name }}
                </h3>

                <BaseBadge v-if="role" :variant="roleVariant" :size="badgeSize" :shape="badgeShape">
                    {{ role }}
                </BaseBadge>
            </header>

            <p v-if="jobTitle" class="profile-card__job">
                {{ jobTitle }}
            </p>

            <div class="profile-card__actions">
                <BaseButton variant="primary" :size="buttonSize" full-width @click="emit('action')">
                    {{ actionLabel }}
                </BaseButton>
            </div>

        </div>

    </article>
</template>

<style scoped>
.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--color-background-primary);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.profile-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.profile-card__avatar-wrapper {
    margin-bottom: var(--spacing-4);
    flex-shrink: 0;
}

.profile-card__content {
    width: 100%;
}

.profile-card__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-2);
}

.profile-card__name {
    margin: 0;
    font-family: var(--font-family-heading);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
}

.profile-card__job {
    margin: 0 0 var(--spacing-4) 0;
    font-family: var(--font-family-body);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
}

.profile-card__actions {
    width: 100%;
}

@media (min-width: 640px) {
    .profile-card:not(.profile-card--centered) {
        flex-direction: row;
        align-items: flex-start;
        text-align: left;
        gap: var(--spacing-4);
    }

    .profile-card:not(.profile-card--centered) .profile-card__avatar-wrapper {
        margin-bottom: 0;
    }

    .profile-card:not(.profile-card--centered) .profile-card__header {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .profile-card:not(.profile-card--centered) .profile-card__actions {
        width: auto;
        margin-top: var(--spacing-2);
    }
}
</style>