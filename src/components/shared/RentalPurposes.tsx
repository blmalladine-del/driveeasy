'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Briefcase, Plane, Mountain } from 'lucide-react';

const purposes = [
  {
    id: 'wedding',
    cat: 'wedding',
    title: 'Wedding',
    icon: Heart,
    description: 'Arrive in style on your special day. Elegant vehicles for unforgettable moments.',
    image: '/images/rental-categories/wedding.jpg',
  },
  {
    id: 'family',
    cat: 'family-trips',
    title: 'Family Trips',
    icon: Users,
    description: 'Spacious and safe rides for the whole family. Comfort on every journey.',
    image: '/images/rental-categories/dat.jpg',
  },
  {
    id: 'business',
    cat: 'business-travel',
    title: 'Business Travel',
    icon: Briefcase,
    description: 'Professional transportation for corporate trips, meetings, and events.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  },
  {
    id: 'airport',
    cat: 'airport-pickup',
    title: 'Airport Pickup',
    icon: Plane,
    description: 'Timely, hassle-free airport transfers. We track your flight and adjust pickup accordingly.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  },
  {
    id: 'adventure',
    cat: 'weekend-escape',
    title: 'Weekend Escape',
    icon: Mountain,
    description: 'Get away from it all. City breaks, mountain drives, coastal cruises.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
];

interface RentalPurposesProps {
  heroImageUrl?: string | null;
  businessName: string;
}

export function RentalPurposes({ heroImageUrl, businessName }: RentalPurposesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="bg-black">
      {/* Desktop: cinematic 2-column split */}
      <div className="hidden md:grid md:grid-cols-[5.5fr_4.5fr] md:min-h-[800px] lg:min-h-[920px]">
        {/* Left: full-height image panel */}
        <div className="relative overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            activeId === null ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}>
            <img
              src="https://scene7.toyota.eu/is/image/toyotaeurope/gt86-driving-along-road-1920x1080?wid=1280&fit=fit,1&ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0"
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {purposes.map((p) => (
            <div
              key={p.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                activeId === p.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#111]">
                  <span className="select-none text-5xl font-black tracking-tighter text-white/[0.04]">
                    {businessName}
                  </span>
                </div>
              )}
            </div>
          ))}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-black via-black/60 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent z-20" />
        </div>

        {/* Right: editorial content */}
        <div className="flex flex-col justify-center px-10 lg:px-16 xl:px-20 py-24 lg:py-28">
          <div className="mb-4 flex items-center gap-3">
            <span className="block h-px w-6 bg-amber-400/50 shrink-0" />
            <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
              Occasion
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-white text-balance">
            Choose your<br /><span className="text-amber-400">journey</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/40 max-w-xs tracking-wide">
            Every moment deserves the right car on the road.
          </p>

          <div className="mt-10 space-y-1">
            {purposes.map((purpose) => {
              const isActive = activeId === purpose.id;
              return (
                <Link
                  key={purpose.id}
                  href={`/cars?category=${purpose.cat}`}
                  className={`group flex items-center gap-4 py-2.5 transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
                  onMouseEnter={() => setActiveId(purpose.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(purpose.id)}
                  onBlur={() => setActiveId(null)}
                >
                  <span className="flex items-center gap-3 shrink-0">
                    <purpose.icon className={`h-4 w-4 transition-colors duration-300 ${
                      isActive ? 'text-amber-400' : 'text-white/30 group-hover:text-white/50'
                    }`} />
                    <span className="text-lg lg:text-xl font-medium tracking-wide">
                      {purpose.title}
                    </span>
                  </span>
                  <span
                    className={`h-px flex-1 transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-400/50'
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: full-width image, stacked content */}
      <div className="md:hidden">
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3]">
            <img
              src={purposes[0].image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
        </div>

        <div className="px-6 pb-16 pt-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="block h-px w-5 bg-amber-400/50 shrink-0" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
              Occasion
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white">
            Choose your <span className="text-amber-400">journey</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/40">
            Every moment deserves the right car on the road.
          </p>

          <div className="mt-8 space-y-0">
            {purposes.map((purpose) => (
              <Link
                key={purpose.id}
                href={`/cars?category=${purpose.cat}`}
                className="block border-t border-white/[0.06] py-4 text-base font-medium text-white/50 transition-colors hover:text-white/80 active:text-white"
              >
                {purpose.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
