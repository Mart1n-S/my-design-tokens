export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  closable?: boolean;
  icon?: string;
}
