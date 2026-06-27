import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { CarForm } from '@/components/admin/CarForm';
import { updateCar } from '@/actions/updateCar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

interface EditCarPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCarPage({ params }: EditCarPageProps) {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const { id } = await params;
  const supabase = await createAuthClient();

  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single();

  if (!car) notFound();

  const updateCarBound = updateCar.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Button href="/admin/cars" variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Cars
        </Button>
        <h1 className="text-2xl font-bold mt-2">Edit Car</h1>
        <p className="text-muted">{car.brand} {car.model}</p>
      </div>
      <CarForm action={updateCarBound} car={car} />
    </div>
  );
}
