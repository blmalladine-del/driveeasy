import type { Metadata } from 'next';
import { CarsPageClient } from '@/components/cars/CarsPageClient';
import { getSupabaseClient } from '@/lib/supabase/server';
import { getSiteSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: 'Our Fleet',
    description: `Browse our fleet of well-maintained vehicles at ${settings.name}. Find the perfect car for your trip.`,
  };
}

interface CarsPageProps {
  searchParams?: Promise<{ category?: string }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const initialCategory = params?.category || null;

  const supabase = getSupabaseClient();
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .order('brand', { ascending: true })
    .order('model', { ascending: true })
    .limit(100);

  return (
    <>
      <section className="bg-black pb-32 pt-16 md:pt-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-10 flex items-center gap-3">
            <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
              Fleet
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white text-balance max-w-3xl">
            Find the right car
            <br />
            for the drive ahead.
          </h1>

          <p className="mt-5 text-[17px] leading-relaxed text-white/40 max-w-xl">
            Choose from {cars?.length ?? 0} well-maintained vehicles for your next trip.
          </p>
        </div>

        <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-14 md:mt-20">
          <CarsPageClient cars={cars ?? []} initialCategory={initialCategory} />
        </div>
      </section>
    </>
  );
}
