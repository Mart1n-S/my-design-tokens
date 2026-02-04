import type { BadgeVariant } from "../atoms/badge";

export interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  trend?: string;
  trendType?: BadgeVariant;
}
