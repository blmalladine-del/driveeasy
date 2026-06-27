import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    initials: 'SM',
    context: 'Family Trip',
    text: 'The booking was effortless and the car was spotless. We rented an SUV for a week-long family road trip and everything went perfectly. The team even called ahead to confirm our pickup time — that kind of service makes all the difference.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    initials: 'JR',
    context: 'Business Travel',
    text: 'I rent cars frequently for work and this was one of the smoothest experiences I have had. Fast response, transparent pricing, and the car was in excellent condition. Will definitely use again for my corporate travel needs.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    initials: 'PP',
    context: 'Wedding',
    text: 'We booked a luxury sedan for our wedding day and it was absolutely stunning. The car arrived early, perfectly cleaned, and the team went out of their way to make sure everything was just right. Highly recommend for special occasions.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl text-balance">
            What our clients say
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/40 leading-relaxed tracking-wide">
            Real feedback from people who have rented with us.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]"
            >
              {/* Rating */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < t.rating ? 'fill-amber-400 text-amber-400' : 'fill-none text-white/15'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-base leading-relaxed text-white/60 md:text-lg">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/10 text-xs font-semibold text-amber-400">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{t.name}</p>
                  <p className="text-xs text-white/30">{t.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
