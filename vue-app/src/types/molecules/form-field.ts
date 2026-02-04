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
