import { cn } from '@/lib/utils';

interface BadgeProps {
  children: string;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'muted';
  className?: string;
}

const variantStyles = {
  default: 'bg-primary-light text-primary',
  accent: 'bg-accent-light text-accent-dark',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  muted: 'bg-gray-100 text-muted',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
