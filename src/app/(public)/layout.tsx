import { getSiteSettings } from '@/lib/settings';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header phone={settings.phone} />
      <main className="flex-1 bg-black">{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton variant="floating" whatsapp={settings.whatsapp} />
    </>
  );
}
