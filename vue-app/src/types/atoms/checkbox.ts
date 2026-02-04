export interface BaseCheckboxProps {
  modelValue: boolean;
  id?: string;
  name?: string;
  value?: string | number;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  indeterminate?: boolean;
}
