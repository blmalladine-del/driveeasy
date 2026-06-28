import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { ContactInfo } from '@/components/shared/ContactInfo';
import { mainNavigation } from '@/config/navigation';
import type { SiteSettings } from '@/types/settings';

interface FooterProps {
  settings: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.04] bg-black">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo dark />
            <p className="text-sm text-white/40 leading-relaxed">
              {settings.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {mainNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-amber-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Contact
            </h3>
            <ContactInfo variant="column" showIcon settings={settings} />
            <div className="flex items-center gap-4 pt-2">
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-amber-400 transition-all hover:scale-110" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {settings.tiktok_url && (
                <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-amber-400 transition-all hover:scale-110" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
              )}
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-amber-400 transition-all hover:scale-110" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.04] text-center text-sm text-white/30">
          &copy; {currentYear} {settings.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
