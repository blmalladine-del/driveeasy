import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { SiteSettings } from '@/types/settings';

interface ContactInfoProps {
  variant?: 'column' | 'row';
  showIcon?: boolean;
  settings: SiteSettings;
}

export function ContactInfo({ variant = 'column', showIcon = true, settings }: ContactInfoProps) {
  const items = [
    { icon: Phone, label: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: `${settings.address}, ${settings.city}` },
    { icon: Clock, label: settings.workingHours },
  ];

  const containerClass = variant === 'row'
    ? 'flex flex-wrap gap-x-6 gap-y-2'
    : 'space-y-3';

  return (
    <div className={containerClass}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm">
          {showIcon && <item.icon className="h-4 w-4 shrink-0 text-amber-400/60" />}
          {item.href ? (
            <a href={item.href} className="text-white/60 transition-colors hover:text-amber-400">
              {item.label}
            </a>
          ) : (
            <span className="text-white/60">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
