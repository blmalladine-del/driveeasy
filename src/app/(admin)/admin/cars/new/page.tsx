import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/supabase/server';
import { CarForm } from '@/components/admin/CarForm';
import { createCar } from '@/actions/createCar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function NewCarPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  return (
    <div className="space-y-6">
      <div>
        <Button href="/admin/cars" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Cars
        </Button>
        <h1 className="text-2xl font-bold mt-2">Add New Car</h1>
        <p className="text-muted">Add a new vehicle to your fleet.</p>
      </div>
      <CarForm action={createCar} />
    </div>
  );
}
