import { cn } from '@/lib/utils';

interface LabelProps {
  children: string;
  htmlFor?: string;
  className?: string;
  required?: boolean;
}

export function Label({ children, htmlFor, className, required }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-sm font-medium text-foreground', className)}
    >
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}
