'use server';

import { getSupabaseClient } from '@/lib/supabase/server';
import { bookingFormSchema } from '@/lib/validators';
import type { BookingFormState } from '@/lib/validators';

export async function submitBooking(
  prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const raw = {
    full_name: formData.get('full_name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    car_id: formData.get('car_id') as string,
    car_name: formData.get('car_name') as string,
    pickup_date: formData.get('pickup_date') as string,
    return_date: formData.get('return_date') as string,
    pickup_location: (formData.get('pickup_location') as string) || '',
    notes: (formData.get('notes') as string) || '',
  };

  const result = bookingFormSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      error: 'Please fix the errors below.',
      fieldErrors,
    };
  }

  try {
    const supabase = getSupabaseClient();

    // Check if the car is available before accepting the booking
    const { data: car, error: carError } = await supabase
      .from('cars')
      .select('is_available, unavailable_until')
      .eq('id', result.data.car_id)
      .maybeSingle();

    if (carError) {
      console.error('Error checking car availability:', carError);
      return {
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.',
      };
    }

    if (!car) {
      return {
        success: false,
        error: 'The selected car no longer exists. Please choose another vehicle.',
      };
    }

    if (!car.is_available) {
      const message = car.unavailable_until
        ? `This car is currently unavailable until ${car.unavailable_until}. Please choose another vehicle or contact us.`
        : 'This car is currently unavailable. Please choose another vehicle or contact us.';
      return { success: false, error: message };
    }

    const { error } = await supabase.from('booking_requests').insert({
      car_id: result.data.car_id,
      car_name: result.data.car_name,
      full_name: result.data.full_name,
      email: result.data.email,
      phone: result.data.phone,
      pickup_date: result.data.pickup_date,
      return_date: result.data.return_date,
      pickup_location: result.data.pickup_location || null,
      notes: result.data.notes || null,
      status: 'new',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Booking submission error:', err);
    return {
      success: false,
      error: 'Unable to submit your request. Please check your connection and try again.',
    };
  }
}
