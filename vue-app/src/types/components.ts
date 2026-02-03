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