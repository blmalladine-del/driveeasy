'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { carFormSchema } from '@/lib/validators';
import type { CarFormState } from '@/lib/validators';
import { revalidatePath } from 'next/cache';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

async function uploadImage(supabase: Awaited<ReturnType<typeof createAuthClient>>, file: File): Promise<string | null> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `cars/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('car-images')
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: { publicUrl } } = supabase.storage
    .from('car-images')
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function createCar(
  prevState: CarFormState,
  formData: FormData,
): Promise<CarFormState> {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated.' };

  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single();
  if (!admin) return { success: false, error: 'Admin access required.' };

  const rentalCategories = formData.getAll('rental_categories');

  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key !== 'image' && key !== 'existing_image_url' && key !== 'rental_categories') {
      raw[key] = value;
    }
  }
  raw.rental_categories = rentalCategories;

  const result = carFormSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const file = formData.get('image') as File | null;
  let imageUrl: string | null = null;

  if (file && file.size > 0) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: `Invalid file type "${file.type}". Accepted: JPEG, PNG, WebP, AVIF.` };
    }
    try {
      imageUrl = await uploadImage(supabase, file);
    } catch (uploadErr) {
      return { success: false, error: uploadErr instanceof Error ? uploadErr.message : 'Upload failed' };
    }
  }

  const features = result.data.features
    ? result.data.features.split(',').map((f) => f.trim()).filter(Boolean)
    : [];

  const isAvailable = result.data.is_available;
  const unavailableFrom = isAvailable ? null : (result.data.unavailable_from || null);
  const unavailableUntil = isAvailable ? null : (result.data.unavailable_until || null);
  const unavailabilityReason = isAvailable ? null : (result.data.unavailability_reason || null);

  const { error } = await supabase.from('cars').insert({
    slug: result.data.slug,
    brand: result.data.brand,
    model: result.data.model,
    year: result.data.year,
    category: result.data.category,
    transmission: result.data.transmission,
    fuel_type: result.data.fuel_type,
    seats: result.data.seats,
    doors: result.data.doors,
    daily_rate: result.data.daily_rate,
    security_deposit: result.data.security_deposit || null,
    image_url: imageUrl,
    description: result.data.description || null,
    features,
    color: result.data.color || null,
    license_plate: result.data.license_plate || null,
    rental_categories: result.data.rental_categories,
    is_featured: result.data.is_featured,
    is_available: isAvailable,
    unavailable_from: unavailableFrom,
    unavailable_until: unavailableUntil,
    unavailability_reason: unavailabilityReason,
  });

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'A car with this slug already exists.' };
    }
    return { success: false, error: error.message };
  }

    revalidatePath('/admin/cars');
    revalidatePath('/cars');
    revalidatePath('/');

    return { success: true };
}
