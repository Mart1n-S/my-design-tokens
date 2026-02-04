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
