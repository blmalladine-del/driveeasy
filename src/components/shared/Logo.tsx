import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export function Logo({ className, dark }: LogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-2 font-bold text-xl', className)}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={dark ? '#fbbf24' : '#2563eb'} />
        <path
          d="M8 20L10.5 12H21.5L24 20M12 16H20M14 22C14 22.5523 13.5523 23 13 23H11C10.4477 23 10 22.5523 10 22M22 22C22 22.5523 21.5523 23 21 23H19C18.4477 23 18 22.5523 18 22"
          stroke={dark ? '#0a0a0a' : '#fff'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={dark ? 'text-white' : 'text-foreground'}>DriveEasy</span>
    </Link>
  );
}
