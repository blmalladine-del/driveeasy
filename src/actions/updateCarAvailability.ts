'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateCarAvailability(
  carId: string,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated.' };

  const { data: admin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single();
  if (!admin) return { success: false, error: 'Admin access required.' };

  const isAvailable = formData.get('is_available') === 'true';
  const unavailableFrom = isAvailable ? null : (formData.get('unavailable_from') as string) || null;
  const unavailableUntil = isAvailable ? null : (formData.get('unavailable_until') as string) || null;
  const unavailabilityReason = isAvailable ? null : (formData.get('unavailability_reason') as string) || null;

  const { error } = await supabase
    .from('cars')
    .update({
      is_available: isAvailable,
      unavailable_from: unavailableFrom,
      unavailable_until: unavailableUntil,
      unavailability_reason: unavailabilityReason,
      updated_at: new Date().toISOString(),
    })
    .eq('id', carId);

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/cars');
  revalidatePath('/cars');
  revalidatePath('/');

  return { success: true };
}
