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