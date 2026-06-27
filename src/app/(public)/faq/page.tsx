import type { Metadata } from 'next';
import { Section } from '@/components/shared/Section';
import { Container } from '@/components/shared/Container';
import { FaqAccordion } from '@/components/shared/FaqAccordion';
import { getSiteSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: 'FAQ',
    description: `Frequently asked questions about car rental with ${settings.name}.`,
  };
}

export default async function FaqPage() {
  const settings = await getSiteSettings();

  return (
    <Section background="surface">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-2 text-muted">
              Everything you need to know about renting with {settings.name}.
            </p>
          </div>

          <FaqAccordion />

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold">Still have questions?</h2>
            <p className="mt-1 text-sm text-muted">
              We&apos;re happy to help. Contact us directly.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="text-sm font-semibold text-amber-500 hover:underline"
              >
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="text-sm font-semibold text-amber-500 hover:underline"
              >
                {settings.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
