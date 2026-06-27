import { CheckCircle } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Happy Renters' },
  { value: '4.9', label: 'Average Rating' },
  { value: '50+', label: 'Premium Vehicles' },
  { value: '98%', label: 'Would Rent Again' },
];

const highlights = [
  'Professional well-maintained fleet',
  'Transparent pay-as-you-go pricing',
  'Responsive 24/7 support team',
  'Flexible pickup and drop-off options',
  'Free cancellation up to 48 hours',
  'No hidden fees or surprise charges',
];

interface AboutSectionProps {
  businessName: string;
}

export function AboutSection({ businessName }: AboutSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-[1px] bg-gradient-to-b from-transparent via-amber-500/15 to-transparent md:block" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl text-balance">
            Drive with confidence
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          {/* Left: Narrative */}
          <div className="md:col-span-3">
            <p className="text-lg leading-relaxed tracking-wide text-white/80">
              {businessName} delivers premium car rental experiences with a focus on transparency,
              quality, and personal service. Every vehicle in our fleet is meticulously maintained
              and inspected before each rental — because we believe the drive should be as smooth
              as the booking.
            </p>
            <p className="mt-5 text-base leading-relaxed tracking-wide text-white/50">
              No hidden fees, no fine print, no runaround. From airport pickups to weekend escapes,
              we work with you to find the right car at the right price. Our team is available
              around the clock, and every booking is backed by a satisfaction guarantee.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                  <CheckCircle className="h-4 w-4 shrink-0 text-amber-400/70" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center"
                >
                  <p className="text-3xl font-bold text-amber-400 md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
