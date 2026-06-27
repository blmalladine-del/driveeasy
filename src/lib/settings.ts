import { getSupabaseClient } from './supabase/server';
import { siteConfig } from '@/config/site';
import type { SiteSettings, SiteSettingsRow } from '@/types/settings';

function mapRowToSettings(row: SiteSettingsRow): SiteSettings {
  return {
    name: row.company_name || siteConfig.name,
    tagline: row.company_tagline || siteConfig.tagline,
    description: row.company_description || siteConfig.description,
    phone: row.phone || siteConfig.phone,
    whatsapp: row.whatsapp_number || siteConfig.whatsapp,
    email: row.email || siteConfig.email,
    address: row.business_address || siteConfig.address,
    city: row.city || siteConfig.city,
    workingHours: row.business_hours || siteConfig.workingHours,
    company_logo_url: row.company_logo_url || '',
    hero_title: row.hero_title || 'Rent Your Ideal Car Today',
    hero_subtitle: row.hero_subtitle || 'Explore our fleet of well-maintained vehicles at competitive rates.',
    primary_cta_text: row.primary_cta_text || 'Browse Our Cars',
    faq_contact_text: row.faq_contact_text || 'Have more questions? Contact us and we\'ll be happy to help.',
    default_pickup_location: row.default_pickup_location || '',
    security_deposit_note: row.security_deposit_note || 'A security deposit is required at pickup.',
    required_documents_note: row.required_documents_note || 'Valid driver\'s license, passport or national ID, and a credit card.',
    instagram_url: row.instagram_url || '',
    facebook_url: row.facebook_url || '',
    hero_image_url: row.hero_image_url || '',
  };
}

export function defaultSiteSettings(): SiteSettings {
  return {
    ...siteConfig,
    company_logo_url: '',
    hero_title: 'Rent Your Ideal Car Today',
    hero_subtitle: 'Explore our fleet of well-maintained vehicles at competitive rates.',
    primary_cta_text: 'Browse Our Cars',
    faq_contact_text: 'Have more questions? Contact us and we\'ll be happy to help.',
    default_pickup_location: '',
    security_deposit_note: 'A security deposit is required at pickup.',
    required_documents_note: 'Valid driver\'s license, passport or national ID, and a credit card.',
    instagram_url: '',
    facebook_url: '',
    hero_image_url: '',
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      return defaultSiteSettings();
    }

    return mapRowToSettings(data as unknown as SiteSettingsRow);
  } catch {
    return defaultSiteSettings();
  }
}
