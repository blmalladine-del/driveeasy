'use client';

import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { BookingStatusBadge } from '@/components/admin/BookingStatusBadge';
import { updateBookingStatus } from '@/actions/updateBookingStatus';
import { Spinner } from '@/components/ui/Spinner';

interface Booking {
  id: string;
  car_name: string;
  full_name: string;
  email: string;
  phone: string;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  notes: string;
  status: string;
  admin_notes: string;
  created_at: string;
  updated_at: string;
}

const STATUS_OPTIONS = ['new', 'contacted', 'confirmed', 'completed', 'rejected'] as const;

export function AdminBookingDetail({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStatusChange(newStatus: string) {
    setIsUpdating(true);
    setError(null);
    const result = await updateBookingStatus(booking.id, newStatus as any);
    if (result.success) {
      setStatus(newStatus);
    } else {
      setError(result.error || 'Failed to update status.');
    }
    setIsUpdating(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main booking info */}
      <div className="lg:col-span-2 space-y-6">
        <Card padding="lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{booking.full_name}</h1>
              <p className="text-muted">{booking.car_name}</p>
            </div>
            <BookingStatusBadge status={status} className="text-sm px-3 py-1" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow label="Email" value={booking.email} />
            <InfoRow label="Phone" value={booking.phone} />
            <InfoRow label="Pickup Date" value={booking.pickup_date} />
            <InfoRow label="Return Date" value={booking.return_date} />
            <InfoRow label="Pickup Location" value={booking.pickup_location || 'Not specified'} />
            <InfoRow label="Requested On" value={new Date(booking.created_at).toLocaleString()} />
          </div>

          {booking.notes && (
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-medium text-muted mb-2">Notes from Customer</h3>
              <p className="text-sm">{booking.notes}</p>
            </div>
          )}
        </Card>
      </div>

      {/* Sidebar - Status Update */}
      <div className="space-y-6">
        <Card padding="lg">
          <h2 className="font-bold mb-4">Update Status</h2>
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleStatusChange(option)}
                disabled={isUpdating || status === option}
                className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  status === option
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-border text-muted hover:border-gray-300 hover:text-foreground'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{option}</span>
                  {isUpdating && status === option && <Spinner size="sm" />}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="font-bold mb-2">Quick Actions</h2>
          <div className="space-y-2">
            <a
              href={`tel:${booking.phone}`}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Call {booking.full_name.split(' ')[0]}
            </a>
            <a
              href={`mailto:${booking.email}`}
              className="flex w-full items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Send Email
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
