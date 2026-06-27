import { redirect } from 'next/navigation';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { StatsCards } from '@/components/admin/StatsCards';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookingStatusBadge } from '@/components/admin/BookingStatusBadge';
import { ArrowRight, Database } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const supabase = await createAuthClient();

    const { data: bookings } = await supabase
      .from('booking_requests')
      .select('status');

    if (!bookings) return null;

    const total = bookings.length;
    const newCount = bookings.filter((b) => b.status === 'new').length;
    const contacted = bookings.filter((b) => b.status === 'contacted').length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;

    const { data: recent } = await supabase
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    return { total, pending: newCount, confirmed, completed: confirmed, recent: recent ?? [] };
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const stats = await getStats();

  if (!stats) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Card padding="lg" className="max-w-md text-center">
          <Database className="mx-auto h-12 w-12 text-muted" />
          <h2 className="mt-4 text-xl font-bold">Supabase Not Connected</h2>
          <p className="mt-2 text-sm text-muted">
            Set up your <code className="text-primary">.env.local</code> with Supabase credentials and
            run the migration to see booking data here.
          </p>
          <ol className="mt-4 text-left text-sm text-muted space-y-2">
            <li>1. Copy <code className="text-primary">.env.example</code> to <code className="text-primary">.env.local</code></li>
            <li>2. Fill in your Supabase URL and anon key</li>
            <li>3. Run the SQL migration in Supabase SQL Editor</li>
            <li>4. Create an admin user</li>
            <li>5. Restart the dev server</li>
          </ol>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted">Overview of your booking requests.</p>
      </div>

      <StatsCards
        stats={[
          { label: 'Total Bookings', value: stats.total, color: 'blue' },
          { label: 'Pending Requests', value: stats.pending, color: 'amber' },
          { label: 'Confirmed', value: stats.confirmed, color: 'green' },
          { label: 'Completed', value: stats.completed, color: 'green' },
        ]}
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Booking Requests</h2>
          <Button href="/admin/bookings" variant="ghost" size="sm">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {stats.recent.length > 0 ? (
          <div className="space-y-3">
            {stats.recent.map((booking) => (
              <Card key={booking.id} padding="md">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{booking.full_name}</p>
                    <p className="text-sm text-muted truncate">{booking.car_name}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <BookingStatusBadge status={booking.status} />
                    <Button
                      href={`/admin/bookings/${booking.id}`}
                      variant="ghost"
                      size="sm"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card padding="lg" className="text-center">
            <p className="text-muted">No booking requests yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
