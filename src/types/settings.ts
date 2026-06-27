import type { SiteConfig } from './common';

export interface SiteSettings extends SiteConfig {
  company_logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  primary_cta_text: string;
  faq_contact_text: string;
  default_pickup_location: string;
  security_deposit_note: string;
  required_documents_note: string;
  instagram_url: string;
  facebook_url: string;
  hero_image_url: string;
}

export interface SiteSettingsRow {
  company_name: string;
  company_tagline: string;
  company_description: string;
  company_logo_url: string;
  business_address: string;
  city: string;
  business_hours: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  instagram_url: string;
  facebook_url: string;
  hero_title: string;
  hero_subtitle: string;
  primary_cta_text: string;
  faq_contact_text: string;
  default_pickup_location: string;
  security_deposit_note: string;
  required_documents_note: string;
  hero_image_url: string;
}

export interface SiteSettingsFormData {
  company_name: string;
  company_tagline: string;
  company_description: string;
  company_logo_url: string;
  business_address: string;
  city: string;
  business_hours: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  instagram_url: string;
  facebook_url: string;
  hero_title: string;
  hero_subtitle: string;
  primary_cta_text: string;
  faq_contact_text: string;
  default_pickup_location: string;
  security_deposit_note: string;
  required_documents_note: string;
  hero_image_url: string;
}
