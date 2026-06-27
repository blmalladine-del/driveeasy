'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'rejected';

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
) {
  try {
    const supabase = await createAuthClient();

    const { error } = await supabase
      .from('booking_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (error) {
      return { error: 'Failed to update status.' };
    }

    revalidatePath('/admin/bookings');
    revalidatePath(`/admin/bookings/${bookingId}`);
    revalidatePath('/admin');

    return { success: true };
  } catch {
    return { error: 'Connection error.' };
  }
}
