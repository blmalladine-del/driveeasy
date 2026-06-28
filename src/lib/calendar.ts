import { createAuthClient } from '@/lib/supabase/server';

export type CalendarEventType = 'booking' | 'unavailability';

export interface CalendarEvent {
  id: string;
  type: CalendarEventType;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  status?: string;
  reason?: string;
  link: string;
}

interface RawBooking {
  id: string;
  car_name: string;
  full_name: string;
  pickup_date: string;
  return_date: string;
  status: string;
}

interface RawCar {
  id: string;
  brand: string;
  model: string;
  unavailable_from: string | null;
  unavailable_until: string | null;
  unavailability_reason: string | null;
}

async function safeQuery<T>(fn: () => Promise<{ data: T | null; error: any }>): Promise<T | null> {
  try {
    const { data, error } = await fn();
    if (error) {
      console.warn('[Calendar] Query error:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Calendar] Query threw:', err);
    return null;
  }
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const supabase = await createAuthClient();

  const [bookingsData, carsData] = await Promise.all([
    safeQuery<RawBooking[]>(async () =>
      await supabase
        .from('booking_requests')
        .select('id, car_name, full_name, pickup_date, return_date, status')
        .order('pickup_date', { ascending: false })
        .limit(500),
    ),
    safeQuery<RawCar[]>(async () =>
      await supabase
        .from('cars')
        .select('id, brand, model, unavailable_from, unavailable_until, unavailability_reason')
        .not('unavailable_from', 'is', null)
        .not('unavailable_until', 'is', null)
        .limit(500),
    ),
  ]);

  const events: CalendarEvent[] = [];

  if (bookingsData) {
    for (const b of bookingsData) {
      events.push({
        id: b.id,
        type: 'booking',
        title: b.car_name,
        subtitle: b.full_name,
        startDate: b.pickup_date,
        endDate: b.return_date,
        status: b.status,
        link: `/admin/bookings/${b.id}`,
      });
    }
  }

  if (carsData) {
    for (const c of carsData) {
      events.push({
        id: `unavail-${c.id}`,
        type: 'unavailability',
        title: `${c.brand} ${c.model}`,
        subtitle: c.unavailability_reason ?? 'No reason given',
        startDate: c.unavailable_from!,
        endDate: c.unavailable_until!,
        reason: c.unavailability_reason ?? undefined,
        link: `/admin/cars/${c.id}/edit`,
      });
    }
  }

  events.sort((a, b) => {
    const dateCmp = b.startDate.localeCompare(a.startDate);
    if (dateCmp !== 0) return dateCmp;
    return a.type === 'unavailability' ? -1 : 1;
  });

  return events;
}
