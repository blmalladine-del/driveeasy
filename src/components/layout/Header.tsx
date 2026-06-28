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
  instagram_url?: string;
  tiktok_url?: string;
  facebook_url?: string;
}

export function Header({ phone = '+1 (555) 123-4567', instagram_url, tiktok_url, facebook_url }: HeaderProps) {
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
            <div className="ml-auto flex items-center gap-4">
              {instagram_url && (
                <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {tiktok_url && (
                <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              )}
              {facebook_url && (
                <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
            </div>
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
              <div className="flex items-center gap-4">
                {instagram_url && (
                  <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
                {tiktok_url && (
                  <a href={tiktok_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="TikTok">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                )}
                {facebook_url && (
                  <a href={facebook_url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-all hover:scale-110" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
              </div>
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
