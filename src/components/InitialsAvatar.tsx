import { useMemo } from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gradients = [
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
  'from-amber-500 to-orange-600',
];

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-base',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-28 h-28 text-3xl',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getGradientIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % gradients.length;
}

export function InitialsAvatar({ name, size = 'md', className = '' }: InitialsAvatarProps) {
  const initials = useMemo(() => getInitials(name), [name]);
  const gradient = useMemo(() => gradients[getGradientIndex(name)], [name]);

  return (
    <div
      className={`
        ${sizeClasses[size]}
        bg-gradient-to-br ${gradient}
        rounded-full flex items-center justify-center
        font-semibold text-white
        select-none shrink-0
        ${className}
      `}
    >
      {initials}
    </div>
  );
}
