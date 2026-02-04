import type { Size } from "../shared";
import type { BadgeVariant, BadgeSize, BadgeShape } from "../atoms/badge";
import type { AvatarSize } from "../atoms/avatar";

export interface ProfileCardProps {
  name: string;
  jobTitle?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  role?: string;
  roleVariant?: BadgeVariant;
  badgeSize?: BadgeSize;
  badgeShape?: BadgeShape;
  avatarSize?: AvatarSize;
  actionLabel?: string;
  buttonSize?: Size;
  centered?: boolean;
}
