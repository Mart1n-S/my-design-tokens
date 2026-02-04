export type BadgeVariant = "neutral" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md";
export type BadgeShape = "rounded" | "pill";

export interface BaseBadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
}
