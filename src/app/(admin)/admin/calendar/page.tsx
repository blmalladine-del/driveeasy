import { redirect } from 'next/navigation';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { fetchCalendarEvents } from '@/lib/calendar';
import { CalendarView } from '@/components/admin/CalendarView';
import { CalendarDays } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminCalendarPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const supabase = await createAuthClient();
  const events = await fetchCalendarEvents();

  const { data: carsData } = await supabase
    .from('cars')
    .select('id, brand, model')
    .order('brand', { ascending: true })
    .order('model', { ascending: true });

  const cars = (carsData ?? []).map((c) => ({
    id: c.id,
    name: `${c.brand} ${c.model}`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Schedule / Calendar</h1>
          <p className="text-muted">
            {events.length} event{events.length !== 1 ? 's' : ''} — bookings and car unavailability periods.
          </p>
        </div>
      </div>

      <CalendarView events={events} cars={cars} />
    </div>
  );
}
