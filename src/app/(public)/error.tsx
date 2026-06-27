'use client';

import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
