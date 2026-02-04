export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface BaseAvatarProps {
  src?: string;
  alt: string; // requis (sauf si décoratif)
  initials?: string; // fallback
  size?: AvatarSize;
  decorative?: boolean; // aria-hidden si décoratif
}
