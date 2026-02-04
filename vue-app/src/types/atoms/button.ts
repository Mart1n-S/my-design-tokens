import type { Size, Variant } from "../shared";

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
