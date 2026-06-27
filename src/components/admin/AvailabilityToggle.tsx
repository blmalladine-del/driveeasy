'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { updateCarAvailability } from '@/actions/updateCarAvailability';
import { X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilityToggleProps {
  carId: string;
  isAvailable: boolean;
  unavailableFrom: string | null;
  unavailableUntil: string | null;
  unavailabilityReason: string | null;
}

export function AvailabilityToggle({
  carId,
  isAvailable,
  unavailableFrom,
  unavailableUntil,
  unavailabilityReason,
}: AvailabilityToggleProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const btn = btnRef.current;
    const popover = popoverRef.current;
    if (!btn || !popover) return;

    const rect = btn.getBoundingClientRect();
    const popHeight = popover.offsetHeight;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceAbove >= popHeight + 8) {
      setPopoverStyle({
        position: 'fixed',
        left: Math.max(8, rect.right - 288),
        top: rect.top - popHeight - 8,
        zIndex: 50,
      });
    } else {
      setPopoverStyle({
        position: 'fixed',
        left: Math.max(8, rect.right - 288),
        top: rect.bottom + 8,
        zIndex: 50,
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close]);

  function handleToggle(isAvail: boolean) {
    const formData = new FormData();
    formData.set('is_available', isAvail ? 'true' : 'false');

    if (!isAvail) {
      formData.set('unavailable_from', '');
      formData.set('unavailable_until', '');
      formData.set('unavailability_reason', '');
    }

    startTransition(async () => {
      const result = await updateCarAvailability(carId, formData);
      if (result.success) {
        close();
        router.refresh();
      } else {
        setError(result.error ?? 'Failed to update availability');
      }
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    formData.set('is_available', 'false');

    startTransition(async () => {
      const result = await updateCarAvailability(carId, formData);
      if (result.success) {
        close();
        router.refresh();
      } else {
        setError(result.error ?? 'Failed to update availability');
      }
    });
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => { setOpen(!open); setError(null); }}
        disabled={isPending}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
          isAvailable
            ? 'text-primary hover:bg-primary-light'
            : 'text-green-600 hover:bg-green-50',
        )}
      >
        {isPending ? <Spinner size="sm" /> : (isAvailable ? 'Mark Unavailable' : 'Mark Available')}
      </button>

      {open && (
        <div ref={popoverRef} style={popoverStyle} className="w-72 rounded-lg border border-border bg-white p-4 shadow-lg">
          {error && (
            <div className="mb-3 rounded bg-red-50 p-2 text-xs text-red-700">{error}</div>
          )}

          {isAvailable ? (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <p className="text-sm font-medium">Mark as Unavailable</p>
              <div className="flex items-start gap-2 text-xs text-yellow-700 bg-yellow-50 rounded p-2">
                <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                <span>Optionally set dates and reason, or toggle immediately.</span>
              </div>
              <Input label="From (optional)" name="unavailable_from" type="date" />
              <Input label="Until (optional)" name="unavailable_until" type="date" />
              <Input label="Reason (optional)" name="unavailability_reason" placeholder="e.g. maintenance, rented" />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
                >
                  {isPending ? <Spinner size="sm" /> : null}
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium">Mark as Available?</p>
              <p className="text-xs text-muted">This will clear any unavailability dates and reason.</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggle(true)}
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
                >
                  {isPending ? <Spinner size="sm" /> : null}
                  Yes, Make Available
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
