'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/Button';
import { mainNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  phone?: string;
}

export function Header({ phone = '+1 (555) 123-4567' }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[#050505]">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo dark />

          <nav className="hidden md:flex items-center gap-10">
            {mainNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[15px] font-medium transition-colors hover:text-white',
                  pathname === link.href ? 'text-white' : 'text-white/60',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-[15px] font-medium text-white/60 hover:text-white transition-colors"
            >
              {phone}
            </a>
            <Button href="/cars" size="md" className="!bg-amber-400 !text-amber-950 hover:!bg-amber-300 shadow-none">
              Browse Cars
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="md:hidden bg-[#050505]">
          <Container className="py-4 space-y-4">
            <nav className="flex flex-col gap-3">
              {mainNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-white',
                    pathname === link.href ? 'text-white' : 'text-white/60',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pt-2 border-t border-white/[0.06]">
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {phone}
              </a>
              <Button href="/cars" size="sm" className="w-full !bg-amber-400 !text-amber-950 hover:!bg-amber-300 shadow-none">
                Browse Cars
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
