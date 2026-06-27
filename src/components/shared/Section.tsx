import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'white' | 'surface' | 'dark';
  id?: string;
}

const backgroundStyles = {
  white: 'bg-white',
  surface: 'bg-surface',
  dark: 'bg-black text-white',
};

export function Section({
  children,
  className,
  containerClassName,
  background = 'white',
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', backgroundStyles[background], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
