<script setup lang="ts">
import { computed } from 'vue';
import type { BaseIconProps } from '../../types/components';

// Import des tokens générés
import { Spacing4, Spacing6, Spacing8 } from '../../styles/tokens';

// Import des icônes de la librairie Lucide
// On utilise des alias (as IconName) pour garder un code cohérent
import {
    // Actions
    X as IconClose,
    Check as IconCheck,
    Plus as IconPlus,
    Trash2 as IconTrash,
    Edit2 as IconEdit,
    Search as IconSearch,
    Settings as IconSettings,

    // Feedback / Status
    Loader2 as IconLoading,
    AlertTriangle as IconWarning,
    Info as IconInfo,

    // User / Social
    User as IconUser,
    Mail as IconMail,
    Heart as IconHeart,

    // Navigation
    Menu as IconMenu,
    ChevronDown as IconChevronDown,
    ArrowRight as IconArrowRight,
    LogOut as IconLogOut,

    // Theme
    Moon as IconMoon,
    Sun as IconSun,
    Eye as IconEye

} from 'lucide-vue-next';

const props = withDefaults(defineProps<BaseIconProps>(), {
    size: 'md',
    color: 'currentColor'
});

// Mapping String -> Composant
const iconMap: Record<string, any> = {
    // Actions
    'close': IconClose,
    'check': IconCheck,
    'plus': IconPlus,
    'trash': IconTrash,
    'edit': IconEdit,
    'search': IconSearch,
    'settings': IconSettings,

    // Feedback
    'loading': IconLoading,
    'warning': IconWarning,
    'info': IconInfo,

    // User
    'user': IconUser,
    'mail': IconMail,
    'heart': IconHeart,

    // Navigation
    'menu': IconMenu,
    'chevron-down': IconChevronDown,
    'arrow-right': IconArrowRight,
    'logout': IconLogOut,
    'eye': IconEye,

    // Theme
    'moon': IconMoon,
    'sun': IconSun
};

// Récupération du composant (Info par défaut si nom inconnu)
const iconComponent = computed(() => iconMap[props.name] || IconInfo);

// Conversion Tokens -> Nombres pour Lucide
const sizePx = computed(() => {
    const parse = (token: string) => parseInt(token, 10);
    switch (props.size) {
        case 'sm': return parse(Spacing4);
        case 'md': return parse(Spacing6);
        case 'lg': return parse(Spacing8);
        default: return parse(Spacing6);
    }
});
</script>

<template>
    <component :is="iconComponent" :size="sizePx" :color="color"
        :class="['base-icon', { 'spin': name === 'loading' }]" />
</template>

<style scoped>
.base-icon {
    vertical-align: middle;
    transition: color 0.2s;
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>