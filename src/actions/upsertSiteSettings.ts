'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { siteSettingsFormSchema } from '@/lib/validators';
import { revalidatePath } from 'next/cache';

export async function upsertSiteSettings(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const raw: Record<string, string> = {};
  const fields = [
    'company_name', 'company_tagline', 'company_description', 'company_logo_url',
    'business_address', 'city', 'business_hours', 'phone', 'whatsapp_number',
    'email', 'instagram_url', 'facebook_url', 'hero_title', 'hero_subtitle',
    'primary_cta_text', 'faq_contact_text', 'default_pickup_location',
    'security_deposit_note', 'required_documents_note', 'hero_image_url',
  ];
  for (const field of fields) {
    const value = formData.get(field);
    raw[field] = typeof value === 'string' ? value : '';
  }

  const supabase = await createAuthClient();
  if (!supabase) {
    return { error: 'Auth client not available' };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated.' };

  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single();
  if (!admin) return { error: 'Admin access required.' };

  const parsed = siteSettingsFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .limit(1)
    .single();
  const { error } = await supabase.from('site_settings').upsert(
    { ...parsed.data, id: existing?.id ?? undefined },
    { onConflict: 'id' },
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin/settings');

  return { success: true };
}
