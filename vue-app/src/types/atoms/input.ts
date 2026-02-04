import type { Size } from "../shared";

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
