import { getSiteSettings } from '@/lib/settings';
import { SettingsForm } from '@/components/admin/SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted">Manage your business information, contact details, homepage content, and rental policies.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
