import Link from 'next/link';
import type { Car } from '@/types/car';
import { CarCard } from '@/components/cars/CarCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedCarsProps {
  cars: Car[];
}

export function FeaturedCars({ cars }: FeaturedCarsProps) {
  if (cars.length === 0) return null;

  return (
    <section className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 md:mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl text-balance">
              Featured Vehicles
            </h2>
            <p className="mt-3 max-w-lg text-white/40">
              Hand-picked for every trip, from city drives to weekend getaways.
            </p>
          </div>
          <Link
            href="/cars"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300 sm:inline-flex"
          >
            View All Cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* All cards equal size */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.slice(0, 6).map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* Mobile: View all link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/30 px-6 py-3 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-400/10 hover:border-amber-400/50"
          >
            View All Cars <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
