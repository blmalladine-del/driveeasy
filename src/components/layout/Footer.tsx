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
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.04] text-center text-sm text-white/30">
          &copy; {currentYear} {settings.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
