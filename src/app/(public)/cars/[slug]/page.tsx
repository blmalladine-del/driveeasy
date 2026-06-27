import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/shared/Section';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/Button';
import { CarHero } from '@/components/cars/CarHero';
import { BookingForm } from '@/components/booking/BookingForm';
import { getSupabaseClient } from '@/lib/supabase/server';
import { getSiteSettings } from '@/lib/settings';
import { formatCurrency } from '@/lib/utils';
import { Gauge, Users, Fuel, Calendar, Car, Warehouse } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getCar(slug: string) {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('cars')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCar(slug);
  if (!car) return { title: 'Car Not Found' };

  return {
    title: `${car.brand} ${car.model} ${car.year}`,
    description: car.description || `Rent a ${car.brand} ${car.model} from ${formatCurrency(car.daily_rate)}/day.`,
  };
}

const fullSpecs = (car: any) => [
  { icon: Calendar, label: 'Year', value: car.year.toString() },
  { icon: Gauge, label: 'Transmission', value: car.transmission },
  { icon: Fuel, label: 'Fuel', value: car.fuel_type },
  { icon: Users, label: 'Seats', value: car.seats.toString() },
  { icon: Car, label: 'Doors', value: car.doors.toString() },
  { icon: Warehouse, label: 'Category', value: car.category },
];

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getCar(slug);
  const settings = await getSiteSettings();

  if (!car) {
    notFound();
  }

  return (
    <>
      <CarHero car={car} phone={settings.phone} />

      {/* Details: About, Specs, Features, Policies */}
      <Section background="dark">
        <Container className="max-w-4xl">
          {car.description && (
            <div className="mb-16">
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                  About
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-white mb-4">
                About This Vehicle
              </h2>
              <p className="text-base leading-relaxed text-white/50 max-w-2xl">
                {car.description}
              </p>
            </div>
          )}

          <div className="mb-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                Specs
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-white mb-6">
              Full Specifications
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fullSpecs(car).map((spec) => (
                <div key={spec.label} className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <spec.icon className="h-5 w-5 text-amber-400/70 shrink-0" />
                  <div>
                    <p className="text-xs text-white/50">{spec.label}</p>
                    <p className="text-sm font-semibold text-white capitalize">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                Policies
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-white mb-6">
              Rental Information
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
              <div className="flex items-center gap-2.5 text-sm">
                <span className="h-1 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-white/50">Security deposit: {car.security_deposit ? formatCurrency(car.security_deposit) : 'Varies'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span className="h-1 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-white/50">Free cancellation up to 48 hours before pickup</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span className="h-1 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-white/50">Valid driver&apos;s license and credit card required</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span className="h-1 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-white/50">Minimum rental age: 21 (25 for luxury/sports)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span className="h-1 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-white/50">Full-to-full fuel policy</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Booking section — after vehicle details */}
      <section id="booking" className="bg-black py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                  Booking
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white text-balance">
                Request this vehicle
              </h2>
              <p className="mt-3 text-white/40 max-w-md mx-auto text-sm leading-relaxed">
                Fill in your details and we&apos;ll confirm availability within 24 hours.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm text-muted">{car.brand} {car.model}</p>
                  <p className="text-xs text-muted">{car.year} &middot; {car.transmission}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-amber-400">{formatCurrency(car.daily_rate)}</p>
                  <p className="text-xs text-muted">per day</p>
                </div>
              </div>
              <BookingForm car={car} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
