<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import type { ModalProps } from '../../../types';
import BaseButton from '../../atoms/Button/BaseButton.vue';

const props = withDefaults(defineProps<ModalProps>(), {
    isOpen: false,
    title: '',
    size: 'md',
    inline: false
});

const emit = defineEmits<{
    (e: 'close'): void;
}>();

// --- Références & A11Y ---
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
const modalRef = ref<HTMLElement | null>(null);

const handleClose = () => {
    emit('close');
};

// Gestion de la fermeture avec la touche Echap
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
        handleClose();
    }
};

// --- Focus Management ---
// Dès que la modale s'ouvre, on force le focus sur le conteneur
// pour permettre la navigation clavier immédiate (Tab)
watch(() => props.isOpen, async (isOpened) => {
    if (isOpened) {
        await nextTick();
        if (modalRef.value) {
            modalRef.value.focus();
        }
    }
});

onMounted(() => document.addEventListener('keydown', handleKeydown));
onUnmounted(() => document.removeEventListener('keydown', handleKeydown));
</script>

<template>
    <Teleport to="body" :disabled="inline">

        <transition name="fade">
            <div v-if="isOpen" class="modal-backdrop" :class="{ 'modal-backdrop--inline': inline }" @click="handleClose"
                role="dialog" aria-modal="true" :aria-labelledby="titleId">

                <div ref="modalRef" class="modal-container" :class="[`modal--${size}`]" @click.stop tabindex="-1">

                    <div class="modal__header">
                        <h3 :id="titleId" class="modal__title">{{ title }}</h3>

                        <BaseButton variant="tertiary" size="md" icon="close" icon-only aria-label="Fermer"
                            @click="handleClose" />
                    </div>

                    <div class="modal__content">
                        <slot />
                    </div>

                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </transition>

    </Teleport>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: var(--spacing-4);
    box-sizing: border-box;
}

.modal-backdrop--inline {
    position: relative;
    background-color: transparent;
    z-index: 1;
    padding: 0;
    display: block;
    height: auto;
}

.modal-container {
    background-color: var(--color-background-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease, opacity 0.3s ease;
    outline: none;
}

.modal-backdrop--inline .modal-container {
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border-default);
}

.modal--sm {
    max-width: 400px;
}

.modal--md {
    max-width: 600px;
}

.modal--lg {
    max-width: 900px;
}

.modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4) var(--spacing-6);
    border-bottom: 1px solid var(--color-border-default);
}

.modal__title {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-family-heading);
}

.modal__content {
    padding: var(--spacing-6);
    overflow-y: auto;
    font-family: var(--font-family-body);
    color: var(--color-text-secondary);
    line-height: 1.6;
}

.modal__footer {
    padding: var(--spacing-4) var(--spacing-6);
    border-top: 1px solid var(--color-border-default);
    background-color: var(--color-background-secondary);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-3);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active .modal-container {
    animation: modal-in 0.3s ease-out;
}

.fade-leave-active .modal-container {
    animation: modal-out 0.2s ease-in;
}

@keyframes modal-in {
    from {
        transform: translateY(20px) scale(0.95);
        opacity: 0;
    }

    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

@keyframes modal-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }

    to {
        transform: translateY(20px);
        opacity: 0;
    }
}
</style>