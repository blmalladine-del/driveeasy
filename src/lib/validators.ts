import { z } from 'zod';
import { RENTAL_CATEGORIES } from '@/config/categories';

export const carCategoryEnum = z.enum(['sedan', 'suv', 'hatchback', 'truck', 'van', 'luxury', 'sports']);
export const transmissionEnum = z.enum(['automatic', 'manual']);
export const fuelTypeEnum = z.enum(['gasoline', 'diesel', 'electric', 'hybrid']);

export const rentalCategoryEnum = z.enum(RENTAL_CATEGORIES);

export const carFormSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with letters, numbers, and hyphens only'),
  brand: z.string().min(1, 'Brand is required').max(100),
  model: z.string().min(1, 'Model is required').max(100),
  year: z.coerce.number().int().min(2000, 'Year must be 2000 or later').max(2030, 'Year seems too far in the future'),
  category: carCategoryEnum,
  transmission: transmissionEnum,
  fuel_type: fuelTypeEnum,
  seats: z.coerce.number().int().min(1, 'At least 1 seat required').max(20, 'Too many seats'),
  doors: z.coerce.number().int().min(1, 'At least 1 door required').max(10, 'Too many doors'),
  daily_rate: z.coerce.number().positive('Daily rate must be positive').max(99999, 'Rate seems too high'),
  security_deposit: z.coerce.number().min(0, 'Deposit cannot be negative').max(999999).optional().default(0),
  image_url: z.string().url('Must be a valid URL').or(z.literal('')).optional().default(''),
  description: z.string().max(2000).optional().default(''),
  features: z.string().optional().default(''),
  color: z.string().max(50).optional().default(''),
  license_plate: z.string().max(20).optional().default(''),
  is_featured: z.coerce.boolean().optional().default(false),
  is_available: z.coerce.boolean().optional().default(true),
  unavailable_from: z.string().optional().default(''),
  unavailable_until: z.string().optional().default(''),
  unavailability_reason: z.string().max(200, 'Reason must be 200 characters or less').optional().default(''),
  rental_categories: z.array(rentalCategoryEnum).optional().default([]),
});

export type CarFormValues = z.infer<typeof carFormSchema>;

export type CarFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export const bookingFormSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Name must be 100 characters or less'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-+()]+$/, 'Please enter a valid phone number'),
  car_id: z.string().min(1, 'Car selection is required'),
  car_name: z.string().min(1, 'Car name is required'),
  pickup_date: z
    .string()
    .min(1, 'Pickup date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Pickup date must be a valid date'),
  return_date: z
    .string()
    .min(1, 'Return date is required')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Return date must be a valid date'),
  pickup_location: z.string().max(200, 'Location must be 200 characters or less').optional().default(''),
  notes: z.string().max(1000, 'Notes must be 1000 characters or less').optional().default(''),
}).refine(
  (data) => !data.pickup_date || !data.return_date || data.return_date >= data.pickup_date,
  {
    message: 'Return date must be on or after pickup date',
    path: ['return_date'],
  }
).refine(
  (data) => !data.pickup_date || data.pickup_date >= new Date().toISOString().split('T')[0],
  {
    message: 'Pickup date must be today or later',
    path: ['pickup_date'],
  }
);

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export type BookingFormState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export const siteSettingsFormSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  company_tagline: z.string().min(1, 'Tagline is required'),
  company_description: z.string().min(1, 'Description is required'),
  company_logo_url: z.string(),
  business_address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  business_hours: z.string().min(1, 'Hours are required'),
  phone: z.string().min(1, 'Phone is required'),
  whatsapp_number: z.string().min(1, 'WhatsApp number is required'),
  email: z.string().email('Invalid email'),
  instagram_url: z.string(),
  facebook_url: z.string(),
  tiktok_url: z.string(),
  hero_title: z.string().min(1, 'Hero title is required'),
  hero_subtitle: z.string().min(1, 'Hero subtitle is required'),
  primary_cta_text: z.string().min(1, 'CTA text is required'),
  faq_contact_text: z.string().min(1, 'FAQ contact text is required'),
  default_pickup_location: z.string(),
  security_deposit_note: z.string().min(1, 'Security deposit note is required'),
  required_documents_note: z.string().min(1, 'Required documents note is required'),
  hero_image_url: z.string().optional().default(''),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsFormSchema>;
