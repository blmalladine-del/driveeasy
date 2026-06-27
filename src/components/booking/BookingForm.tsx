'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { submitBooking } from '@/actions/submitBooking';
import type { Car } from '@/types/car';
import { formatCurrency } from '@/lib/utils';
import type { BookingFormState } from '@/lib/validators';

interface BookingFormProps {
  car: Car;
}

const initialState: BookingFormState = {
  success: false,
};

export function BookingForm({ car }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(submitBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <Card padding="lg" className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Booking Request Sent!</h3>
        <p className="text-muted">
          We&apos;ll review your request for the {car.brand} {car.model} and contact you within 24 hours.
        </p>
      </Card>
    );
  }

  if (!car.is_available) {
    return (
      <Card padding="lg" className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
          <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Currently Unavailable</h3>
        <p className="text-muted">
          This vehicle is not available for booking at this time.
          {car.unavailable_until && <> We expect it to be available after <strong>{car.unavailable_until}</strong>.</>}
        </p>
        {car.unavailability_reason && (
          <p className="text-sm text-muted italic">Reason: {car.unavailability_reason}</p>
        )}
      </Card>
    );
  }

  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="rounded-xl bg-surface p-4 mb-2">
        <p className="text-sm text-muted">You are booking:</p>
        <p className="font-semibold">{car.brand} {car.model}</p>
        <p className="text-primary font-bold">{formatCurrency(car.daily_rate)} / day</p>
      </div>

      <input type="hidden" name="car_id" value={car.id} />
      <input type="hidden" name="car_name" value={`${car.brand} ${car.model}`} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="full_name"
          required
          error={fieldErrors.full_name?.[0]}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          error={fieldErrors.email?.[0]}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          required
          error={fieldErrors.phone?.[0]}
        />
        <Input
          label="Pickup Location"
          name="pickup_location"
          error={fieldErrors.pickup_location?.[0]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Pickup Date"
          name="pickup_date"
          type="date"
          required
          error={fieldErrors.pickup_date?.[0]}
        />
        <Input
          label="Return Date"
          name="return_date"
          type="date"
          required
          error={fieldErrors.return_date?.[0]}
        />
      </div>

      <Textarea
        label="Notes or Special Requests"
        name="notes"
        placeholder="Any special requirements..."
        error={fieldErrors.notes?.[0]}
      />

      {state.error && !state.fieldErrors && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? <Spinner size="sm" /> : null}
        {isPending ? 'Sending Request...' : 'Send Booking Request'}
      </Button>

      <p className="text-xs text-center text-muted">
        We&apos;ll respond within 24 hours. No payment is required at this stage.
      </p>
    </form>
  );
}
