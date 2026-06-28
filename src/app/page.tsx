import Image from 'next/image';
import { Section } from '@/components/shared/Section';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/Button';
import { BrandsMarquee } from '@/components/shared/BrandsMarquee';
import { FeaturedCars } from '@/components/shared/FeaturedCars';
import { RentalPurposes } from '@/components/shared/RentalPurposes';
import { AboutSection } from '@/components/shared/AboutSection';
import { TestimonialsSection } from '@/components/shared/TestimonialsSection';
import { MapSection } from '@/components/shared/MapSection';
import { Reveal } from '@/components/shared/Reveal';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { getSupabaseClient } from '@/lib/supabase/server';
import { getSiteSettings } from '@/lib/settings';
import { faqItems } from '@/config/faq';
import { CheckCircle, Shield, Clock, ArrowRight, Phone } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = getSupabaseClient();
  const settings = await getSiteSettings();

  const { data: featuredCars } = await supabase
    .from('cars')
    .select('*')
    .eq('is_featured', true)
    .eq('is_available', true)
    .limit(6);

  const previewFaq = faqItems.slice(0, 3);

  return (
    <>
      <Header phone={settings.phone} />
      <main className="flex-1 bg-black">
        {/* ─── Hero ─── */}
        <section className="relative min-h-[600px] overflow-hidden bg-[#050505] md:min-h-[90vh]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="pointer-events-none absolute -right-40 top-0 h-full w-1/2 bg-gradient-to-l from-amber-400/2 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-amber-400/25 to-transparent md:block" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[55vw] overflow-hidden md:block">
            <div className="relative h-full w-full">
              {settings.hero_image_url ? (
                <Image
                  src={settings.hero_image_url}
                  alt=""
                  fill
                  sizes="55vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#111]">
                  <span className="select-none text-5xl font-black tracking-tighter text-white/[0.04] md:text-7xl">
                    {settings.name}
                  </span>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <Container className="relative z-20 flex min-h-[inherit] items-center py-16 md:py-0 md:!pl-4 lg:!pl-6">
            <div className="w-full md:py-28 lg:py-32 md:mr-auto">
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-6 bg-amber-400/50" />
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-amber-400/70">
                  Premium Car Rental
                </span>
              </div>

              <h1 className="max-w-lg text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.85] tracking-[-0.03em] text-white text-balance">
                A better drive<br />
                starts before<br />
                the road
              </h1>

              <div className="mt-16 flex flex-wrap gap-4">
                <Button
                  href="/cars"
                  size="lg"
                  className="!bg-amber-400 !text-amber-950 shadow-2xl shadow-amber-400/10 border border-amber-400/20 hover:!bg-amber-300"
                >
                  Browse Our Fleet <ArrowRight className="h-5 w-5" />
                </Button>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-transparent px-7 py-3 text-sm font-semibold text-amber-400/80 transition-all hover:bg-amber-400/10 hover:border-amber-400/50 hover:text-amber-300"
                >
                  <Phone className="h-4 w-4" />
                  {settings.phone}
                </a>
              </div>

              <div className="mt-8 flex items-center gap-5">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 transition-all hover:scale-110 hover:text-white"
                    aria-label="Instagram"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
                {settings.tiktok_url && (
                  <a
                    href={settings.tiktok_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 transition-all hover:scale-110 hover:text-white"
                    aria-label="TikTok"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 transition-all hover:scale-110 hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                )}
              </div>

              <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3">
                <div className="flex items-center gap-2.5 text-[15px] text-white/40">
                  <Shield className="h-4 w-4 text-amber-400/45" />
                  Transparent Pricing
                </div>
                <div className="flex items-center gap-2.5 text-[15px] text-white/40">
                  <CheckCircle className="h-4 w-4 text-amber-400/45" />
                  Easy Booking
                </div>
                <div className="flex items-center gap-2.5 text-[15px] text-white/40">
                  <Clock className="h-4 w-4 text-amber-400/45" />
                  24/7 Support
                </div>
              </div>
            </div>
          </Container>

          <div className="relative z-10 block md:hidden">
            <Container className="pb-16 pt-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080808]">
                <div className="relative aspect-[16/9]">
                  {settings.hero_image_url ? (
                    <Image
                      src={settings.hero_image_url}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#111]">
                      <span className="select-none text-3xl font-black tracking-tighter text-white/[0.04]">
                        {settings.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </Container>
          </div>
        </section>

        <BrandsMarquee />

        <Reveal className="bg-black">
          <FeaturedCars cars={featuredCars ?? []} />
        </Reveal>

        <RentalPurposes heroImageUrl={settings.hero_image_url} businessName={settings.name} />

        <section className="bg-black py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="grid gap-14 md:grid-cols-2 md:gap-20 lg:gap-24">
              <div>
                <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white text-balance lg:text-6xl xl:text-7xl">
                  What you book<br />is what you get
                </h2>
                <p className="mt-5 max-w-sm text-base leading-relaxed tracking-wide text-white/50">
                  The car you reserve is the car waiting for you — at the rate we confirmed, ready when you arrive.
                </p>
              </div>

              <div className="flex flex-col gap-8 md:justify-center">
                <div>
                  <span className="mb-3 block h-px w-8 bg-amber-400/50" />
                  <p className="font-medium text-white">Clear pricing</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    What we quote is what you pay. No add-ons, no surprises.
                  </p>
                </div>
                <div>
                  <span className="mb-3 block h-px w-8 bg-amber-400/50" />
                  <p className="font-medium text-white">Ready before you arrive</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    Every car is inspected, cleaned, and prepared before your pickup.
                  </p>
                </div>
                <div>
                  <span className="mb-3 block h-px w-8 bg-amber-400/50" />
                  <p className="font-medium text-white">A simple handoff</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    A quick confirmation and you're on the road — no paperwork runaround.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutSection businessName={settings.name} />

        <TestimonialsSection />

        <Section background="white">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold text-foreground md:text-6xl text-balance">Frequently Asked Questions</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted">
                Quick answers to common questions.
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-3">
              {previewFaq.map((faq) => (
                <details
                  key={faq.question}
                  className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:text-amber-400 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="ml-4 text-muted transition-transform group-open:rotate-45 group-open:text-amber-400">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="8" y1="2" x2="8" y2="14" />
                        <line x1="2" y1="8" x2="14" y2="8" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4 text-sm text-muted">Have more questions? We're happy to help.</p>
              <Button href="/faq" variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-50">
                View All FAQs <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Section>

        <MapSection settings={settings} />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton variant="floating" whatsapp={settings.whatsapp} />
    </>
  );
}
