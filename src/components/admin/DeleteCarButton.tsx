'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';
import { deleteCar } from '@/actions/deleteCar';

interface DeleteCarButtonProps {
  carId: string;
  carName: string;
}

export function DeleteCarButton({ carId, carName }: DeleteCarButtonProps) {
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  if (confirm) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted mr-1">Sure?</span>
        <Button
          size="sm"
          variant="ghost"
          disabled={deleting}
          onClick={async () => {
            setDeleting(true);
            const result = await deleteCar(carId);
            if (result?.error) {
              setDeleting(false);
              setConfirm(false);
            }
          }}
          className="text-red-600 hover:bg-red-50"
        >
          Yes
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={deleting}
          onClick={() => setConfirm(false)}
        >
          No
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setConfirm(true)}
      className="text-red-500 hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
