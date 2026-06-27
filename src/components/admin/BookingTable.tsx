import Link from 'next/link';
import { BookingStatusBadge } from '@/components/admin/BookingStatusBadge';

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  car_name: string;
  pickup_date: string;
  return_date: string;
  status: string;
  created_at: string;
}

export function BookingTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-12 text-center">
        <p className="text-muted">No booking requests yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="px-4 py-3 text-left font-medium text-muted">Customer</th>
            <th className="px-4 py-3 text-left font-medium text-muted hidden md:table-cell">Phone</th>
            <th className="px-4 py-3 text-left font-medium text-muted hidden lg:table-cell">Email</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Car</th>
            <th className="px-4 py-3 text-left font-medium text-muted hidden sm:table-cell">Pickup</th>
            <th className="px-4 py-3 text-left font-medium text-muted hidden sm:table-cell">Return</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Status</th>
            <th className="px-4 py-3 text-left font-medium text-muted hidden lg:table-cell">Created</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-surface/50">
              <td className="px-4 py-3 font-medium">{booking.full_name}</td>
              <td className="px-4 py-3 text-muted hidden md:table-cell">{booking.phone}</td>
              <td className="px-4 py-3 text-muted hidden lg:table-cell">{booking.email}</td>
              <td className="px-4 py-3 text-muted">{booking.car_name}</td>
              <td className="px-4 py-3 text-muted hidden sm:table-cell">{booking.pickup_date}</td>
              <td className="px-4 py-3 text-muted hidden sm:table-cell">{booking.return_date}</td>
              <td className="px-4 py-3">
                <BookingStatusBadge status={booking.status} />
              </td>
              <td className="px-4 py-3 text-muted hidden lg:table-cell">
                {new Date(booking.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/bookings/${booking.id}`}
                  className="text-primary hover:underline text-xs font-medium"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
