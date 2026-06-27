import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Phone, ArrowRight, Gauge, Users, Fuel, Calendar } from 'lucide-react';
import type { Car } from '@/types/car';
import { formatCurrency, getCarPlaceholderGradient } from '@/lib/utils';

interface CarHeroProps {
  car: Car;
  phone: string;
}

const quickSpecs = (car: Car) => [
  { icon: Gauge, value: car.transmission },
  { icon: Users, value: `${car.seats} seats` },
  { icon: Fuel, value: car.fuel_type },
  { icon: Calendar, value: car.year.toString() },
];

export function CarHero({ car, phone }: CarHeroProps) {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="pt-4 pb-2">
          <Link
            href="/cars"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to fleet
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.8fr_1fr] md:min-h-[560px] lg:min-h-[640px]">
        {/* Left: Image — bleeds to left edge */}
        <div className="relative overflow-hidden">
          {car.image_url ? (
            <Image
              src={car.image_url}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className={`flex h-full items-center justify-center bg-gradient-to-br ${getCarPlaceholderGradient(car.brand, car.model)}`}>
              <span className="select-none text-5xl font-black tracking-tighter text-white/[0.04] md:text-7xl">
                {car.brand} {car.model}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#050505] via-[#050505]/30 to-transparent z-10" />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center px-6 md:pl-8 lg:pl-12 xl:pl-16 md:pr-12 xl:pr-16 py-12 lg:py-16">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
              <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                {car.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white text-balance">
              {car.brand} {car.model}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl lg:text-4xl font-bold text-amber-400">
                {formatCurrency(car.daily_rate)}
              </span>
              <span className="text-white/40 text-sm">/ day</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {quickSpecs(car).map((spec) => (
                <div key={spec.value} className="flex items-center gap-2.5 text-white/40">
                  <spec.icon className="h-5 w-5 text-amber-400/45 shrink-0" />
                  <span className="capitalize text-base">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href="#booking"
                size="lg"
                className="!bg-amber-400 !text-amber-950 shadow-2xl shadow-amber-400/10 border border-amber-400/20 hover:!bg-amber-300"
              >
                Send Booking Request <ArrowRight className="h-5 w-5" />
              </Button>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-transparent px-7 py-3 text-sm font-semibold text-amber-400/80 transition-all hover:bg-amber-400/10 hover:border-amber-400/50 hover:text-amber-300"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </div>
          </div>
        </div>
    </section>
  );
}
