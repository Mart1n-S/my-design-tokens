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
export type AvatarSize = "sm" | "md" | "lg";

export interface BaseAvatarProps {
  src?: string;
  alt: string; // requis (sauf si décoratif)
  initials?: string; // fallback
  size?: AvatarSize;
  decorative?: boolean; // aria-hidden si décoratif
}