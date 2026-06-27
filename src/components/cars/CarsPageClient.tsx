'use client';

import { useState } from 'react';
import type { Car } from '@/types/car';
import { CarGrid } from '@/components/cars/CarGrid';
import { RENTAL_CATEGORIES, RENTAL_CATEGORY_LABELS } from '@/config/categories';
import type { RentalCategory } from '@/config/categories';
import { cn } from '@/lib/utils';

interface CarsPageClientProps {
  cars: Car[];
  initialCategory?: string | null;
}

const ALL = 'all' as const;
type FilterKey = typeof ALL | RentalCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: ALL, label: 'All Cars' },
  ...RENTAL_CATEGORIES.map((cat) => ({ key: cat as FilterKey, label: RENTAL_CATEGORY_LABELS[cat] })),
];

function isValidCategory(key: string): key is FilterKey {
  return key === ALL || (RENTAL_CATEGORIES as readonly string[]).includes(key);
}

export function CarsPageClient({ cars, initialCategory }: CarsPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>(
    initialCategory && isValidCategory(initialCategory) ? initialCategory : ALL,
  );

  const filteredCars = activeFilter === ALL
    ? cars
    : cars.filter((car) => car.rental_categories?.includes(activeFilter));

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={cn(
              'rounded-full border px-6 py-2.5 text-[15px] font-medium tracking-wide transition-all',
              activeFilter === filter.key
                ? 'border-amber-400/60 bg-amber-400/5 text-amber-400'
                : 'border-white/10 text-white/40 hover:border-amber-400/30 hover:text-amber-300',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredCars.length === 0 ? (
        <p className="py-16 text-center text-white/30">No cars match this category.</p>
      ) : (
        <CarGrid cars={filteredCars} />
      )}
    </div>
  );
}
