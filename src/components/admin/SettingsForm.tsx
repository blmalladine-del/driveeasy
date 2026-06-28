'use client';

import { useEffect, useActionState, useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { upsertSiteSettings } from '@/actions/upsertSiteSettings';
import { createClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/types/settings';

interface SettingsFormProps {
  settings: SiteSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState(upsertSiteSettings, null);
  useEffect(() => {
    if (state) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state]);

  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [heroUploading, setHeroUploading] = useState(false);
  const [heroUrl, setHeroUrl] = useState(settings.hero_image_url);
  const [heroUploadError, setHeroUploadError] = useState<string | null>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);


  async function handleHeroFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setHeroUploadError(null);
    setHeroUploading(true);

    if (heroPreview) URL.revokeObjectURL(heroPreview);
    setHeroPreview(URL.createObjectURL(file));

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.type)) {
      setHeroUploadError('Invalid file type. Accepted: JPEG, PNG, WebP, AVIF.');
      setHeroUploading(false);
      return;
    }

    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `hero/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('car-images')
        .upload(fileName, file, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw new Error(uploadError.message);

      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(fileName);

      setHeroUrl(publicUrl);
    } catch (err) {
      setHeroUploadError(err instanceof Error ? err.message : 'Upload failed');
      setHeroPreview(null);
    } finally {
      setHeroUploading(false);
    }
  }

  const showHeroPreview = heroPreview || heroUrl;

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Settings saved successfully.
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Company Information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input id="company_name" name="company_name" defaultValue={settings.name} required />
          </div>

        </div>
        <div className="space-y-2">
          <Label htmlFor="company_tagline">Tagline</Label>
          <Input id="company_tagline" name="company_tagline" defaultValue={settings.tagline} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company_description">Description</Label>
          <Textarea id="company_description" name="company_description" defaultValue={settings.description} required />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Contact Information</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={settings.phone} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
            <Input id="whatsapp_number" name="whatsapp_number" defaultValue={settings.whatsapp} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={settings.email} required />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Social Media</legend>
        <p className="text-sm text-muted">Links will appear as icons on the homepage hero section.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input id="instagram_url" name="instagram_url" defaultValue={settings.instagram_url} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok_url">TikTok URL</Label>
            <Input id="tiktok_url" name="tiktok_url" defaultValue={settings.tiktok_url} placeholder="https://tiktok.com/..." />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook_url">Facebook URL</Label>
          <Input id="facebook_url" name="facebook_url" defaultValue={settings.facebook_url} placeholder="https://facebook.com/..." />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Location & Hours</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business_address">Address</Label>
            <Input id="business_address" name="business_address" defaultValue={settings.address} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={settings.city} required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business_hours">Working Hours</Label>
            <Input id="business_hours" name="business_hours" defaultValue={settings.workingHours} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="default_pickup_location">Default Pickup Location</Label>
            <Input id="default_pickup_location" name="default_pickup_location" defaultValue={settings.default_pickup_location} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Homepage Content</legend>

        {/* Hero Image */}
        <div className="space-y-3">
          <Label>Hero Image</Label>
          {heroUploading ? (
            <div className="flex aspect-[21/9] w-full max-w-lg items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">
              <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-2 text-sm text-muted">Uploading...</p>
              </div>
            </div>
          ) : showHeroPreview ? (
            <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-surface">
              <img
                src={showHeroPreview}
                alt="Hero preview"
                className="aspect-[21/9] w-full object-cover"
              />
              <div className="absolute right-2 top-2 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => { setHeroPreview(null); setHeroUrl(''); if (heroFileRef.current) heroFileRef.current.value = ''; }}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex aspect-[21/9] w-full max-w-lg items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                <p className="mt-1 text-sm text-muted">No hero image</p>
              </div>
            </div>
          )}
          {heroUploadError && (
            <p className="text-sm text-red-600">{heroUploadError}</p>
          )}
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface">
              {showHeroPreview ? 'Change Image' : 'Upload Image'}
              <input
                ref={heroFileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleHeroFileChange}
                className="hidden"
              />
            </label>
            {!showHeroPreview && (
              <span className="text-xs text-muted">Recommended: 1920×800px, JPEG/PNG/WebP</span>
            )}
          </div>
        </div>

        <input type="hidden" name="hero_image_url" value={heroUrl} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Hero Title</Label>
            <Input id="hero_title" name="hero_title" defaultValue={settings.hero_title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input id="hero_subtitle" name="hero_subtitle" defaultValue={settings.hero_subtitle} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary_cta_text">Primary CTA Text</Label>
          <Input id="primary_cta_text" name="primary_cta_text" defaultValue={settings.primary_cta_text} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="faq_contact_text">FAQ Contact Text</Label>
          <Input id="faq_contact_text" name="faq_contact_text" defaultValue={settings.faq_contact_text} required />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-foreground">Rental Policies</legend>
        <div className="space-y-2">
          <Label htmlFor="security_deposit_note">Security Deposit Note</Label>
          <Textarea id="security_deposit_note" name="security_deposit_note" defaultValue={settings.security_deposit_note} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="required_documents_note">Required Documents Note</Label>
          <Textarea id="required_documents_note" name="required_documents_note" defaultValue={settings.required_documents_note} required />
        </div>
      </fieldset>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  );
}
