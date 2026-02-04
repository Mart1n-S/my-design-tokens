export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  size?: ModalSize;
  inline?: boolean;
}
