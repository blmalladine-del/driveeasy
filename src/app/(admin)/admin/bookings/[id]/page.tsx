import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { AdminBookingDetail } from '@/components/admin/BookingDetail';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface BookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBookingDetailPage({ params }: BookingDetailPageProps) {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const { id } = await params;
  const supabase = await createAuthClient();

  const { data: booking } = await supabase
    .from('booking_requests')
    .select('*')
    .eq('id', id)
    .single();

  if (!booking) notFound();

  const bookingWithStrings = {
    ...booking,
    pickup_date: typeof booking.pickup_date === 'string' ? booking.pickup_date : String(booking.pickup_date),
    return_date: typeof booking.return_date === 'string' ? booking.return_date : String(booking.return_date),
    created_at: typeof booking.created_at === 'string' ? booking.created_at : String(booking.created_at),
    updated_at: typeof booking.updated_at === 'string' ? booking.updated_at : String(booking.updated_at),
    notes: booking.notes ?? '',
    admin_notes: booking.admin_notes ?? '',
    pickup_location: booking.pickup_location ?? '',
  };

  return (
    <div className="space-y-6">
      <div>
        <Button href="/admin/bookings" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Bookings
        </Button>
      </div>

      <AdminBookingDetail booking={bookingWithStrings} />
    </div>
  );
}
