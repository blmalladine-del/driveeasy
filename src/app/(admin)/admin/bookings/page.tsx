import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { BookingTable } from '@/components/admin/BookingTable';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBookingsPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const supabase = await createAuthClient();

  const { data: bookings } = await supabase
    .from('booking_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Booking Requests</h1>
        <p className="text-muted">
          {bookings?.length ?? 0} total request{bookings?.length !== 1 ? 's' : ''}.
        </p>
      </div>

      <BookingTable bookings={bookings ?? []} />
    </div>
  );
}
