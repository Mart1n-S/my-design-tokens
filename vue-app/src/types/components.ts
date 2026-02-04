// Tailles autorisées
export type Size = "sm" | "md" | "lg";
// Variantes autorisées
export type Variant = "primary" | "secondary" | "tertiary" | "danger";

export interface BaseButtonProps {
  // Apparence
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;

  // Icônes
  icon?: string; // Nom de l'icône
  iconPosition?: "left" | "right"; // Position par rapport au texte
  iconOnly?: boolean;

  // États
  disabled?: boolean;
  loading?: boolean;

  // Polymorphisme
  as?: "button" | "a" | "router-link";

  // Attributs natifs
  href?: string;
  to?: string | object;
  type?: "button" | "submit" | "reset";
}

export interface BaseIconProps {
  name: string;
  size?: Size;
  color?: string;
}

export interface BaseInputProps {
  id?: string;
  modelValue: string | number;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  placeholder?: string;

  iconLeft?: string;
  iconRight?: string;
  iconSize?: Size;

  // États
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

export type ResizeOption = "none" | "vertical" | "horizontal" | "both";

export interface BaseTextareaProps {
  id?: string;
  modelValue: string;
  rows?: number | string;
  resize?: ResizeOption;
  placeholder?: string;
  maxlength?: number;

  // États visuels
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

export interface FormFieldProps {
  id: string;
  label: string;

  helpText?: string;
  errorMessage?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;

  showCount?: boolean;
  maxLength?: number;
  currentLength?: number;
}

// Badge
export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "rounded" | "pill";

export interface BaseBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
}

// Avatar
export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface BaseAvatarProps {
  src?: string;
  alt: string; // requis (sauf si décoratif)
  initials?: string; // fallback
  size?: AvatarSize;
  decorative?: boolean; // aria-hidden si décoratif
}

export interface BaseSwitchProps {
  id?: string;
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}

export interface ProfileCardProps {
  name: string;
  jobTitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  role?: string;
  roleVariant?: BadgeVariant;
  badgeSize?: BadgeSize;
  badgeShape?: BadgeShape;
  avatarSize?: AvatarSize;
  actionLabel?: string;
  buttonSize?: Size;
  centered?: boolean;
}

export interface ReviewCardProps {
  avatarSrc?: string;
  avatarAlt?: string;
  userName?: string;
  modelValue: string;
  id?: string;
  label?: string;
  placeholder?: string;
  buttonLabel?: string;
  showCount?: boolean;
  maxLength?: number;
  loading?: boolean;
}

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  closable?: boolean;
  icon?: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  trend?: string;
  trendType?: BadgeVariant;
}