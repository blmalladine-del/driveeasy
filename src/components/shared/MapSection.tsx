import { Phone, Mail, MapPin, Clock, Navigation, ArrowRight } from 'lucide-react';
import type { SiteSettings } from '@/types/settings';

const mapQuery = (address: string, city: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address + ', ' + city)}&output=embed&z=15`;

interface MapSectionProps {
  settings: SiteSettings;
}

export function MapSection({ settings }: MapSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="block h-px w-5 bg-amber-400/50 shrink-0" />
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
            Location
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-5 md:gap-8">
          <div className="overflow-hidden rounded-xl border border-white/[0.06] md:col-span-3">
            <iframe
              src={mapQuery(settings.address, settings.city)}
              width="100%"
              height="100%"
              className="aspect-[16/9] w-full md:aspect-[3/2]"
              style={{ filter: 'grayscale(0.15) contrast(1.05)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business location"
            />
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
              <span className="flex items-center gap-2 text-xs text-white/30">
                <Navigation className="h-3 w-3" />
                {settings.city}
              </span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(settings.address + ', ' + settings.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-400/70 transition-colors hover:text-amber-400"
              >
                Get directions <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-amber-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-amber-400/70" />
                  {settings.phone}
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-amber-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-amber-400/70" />
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0 text-amber-400/70" />
                  <span>{settings.address}, {settings.city}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <Clock className="h-4 w-4 shrink-0 text-amber-400/70" />
                  <span>{settings.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
