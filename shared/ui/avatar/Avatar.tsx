import clsx from 'clsx';

import placeholderAvatar from '@/assets/illustrations/avatar-placeholder.png';

import s from './Avatar.module.scss';

type AvatarSize = 's' | 'm' | 'l';

type Props = {
  alt?: string;
  className?: string;
  size?: AvatarSize;
  url?: string | null;
};

const sizeClass: Record<AvatarSize, string> = {
  s: s.sizeS,
  m: s.sizeM,
  l: s.sizeL,
};

export function Avatar({ alt = 'avatar', className, size = 'm', url }: Props) {
  return (
    <img
      src={url || placeholderAvatar.src}
      alt={alt}
      className={clsx(s.avatar, sizeClass[size], className)}
    />
  );
}
