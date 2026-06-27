import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireAdmin, createAuthClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DeleteCarButton } from '@/components/admin/DeleteCarButton';
import { AvailabilityToggle } from '@/components/admin/AvailabilityToggle';
import { Plus, Pencil } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getRentalCategoryLabel } from '@/config/categories';

export const dynamic = 'force-dynamic';

export default async function AdminCarsPage() {
  const admin = await requireAdmin();
  if (!admin) redirect('/admin/login');

  const supabase = await createAuthClient();
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .order('brand', { ascending: true })
    .order('model', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cars</h1>
          <p className="text-muted">
            {cars?.length ?? 0} car{cars?.length !== 1 ? 's' : ''} in fleet.
          </p>
        </div>
        <Button href="/admin/cars/new">
          <Plus className="h-4 w-4" />
          Add Car
        </Button>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-4 py-3 font-medium text-muted">Car</th>
                <th className="px-4 py-3 font-medium text-muted hidden sm:table-cell">Year</th>
                <th className="px-4 py-3 font-medium text-muted hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium text-muted hidden xl:table-cell">Categories</th>
                <th className="px-4 py-3 font-medium text-muted hidden lg:table-cell">Rate</th>
                <th className="px-4 py-3 font-medium text-muted">Available</th>
                <th className="px-4 py-3 font-medium text-muted">Featured</th>
                <th className="px-4 py-3 font-medium text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!cars || cars.length === 0) ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted">
                    No cars yet. Click &quot;Add Car&quot; to create one.
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id} className="border-b border-border last:border-b-0 hover:bg-surface/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded bg-gradient-to-br from-slate-700 to-slate-500 text-xs font-bold text-white">
                          {car.image_url ? (
                            <img src={car.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <>{car.brand[0]}{car.model[0]}</>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{car.brand} {car.model}</p>
                          <p className="text-xs text-muted truncate">{car.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted">{car.year}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant="accent">{car.category}</Badge>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {car.rental_categories && car.rental_categories.length > 0
                          ? car.rental_categories.map((cat: string) => (
                              <span
                                key={cat}
                                className="inline-flex items-center rounded-full border border-primary/20 bg-primary-light/50 px-2 py-0.5 text-[11px] font-medium text-primary-dark"
                              >
                                {getRentalCategoryLabel(cat)}
                              </span>
                            ))
                          : <span className="text-[11px] text-muted">&mdash;</span>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell font-medium">
                      {formatCurrency(car.daily_rate)}<span className="text-muted font-normal">/day</span>
                    </td>
                    <td className="px-4 py-3">
                      {car.is_available ? (
                        <Badge variant="success">Available</Badge>
                      ) : (
                        <span title={car.unavailability_reason ?? undefined}>
                          <Badge variant="warning">Unavailable</Badge>
                        </span>
                      )}
                      {!car.is_available && car.unavailability_reason && (
                        <p className="mt-0.5 max-w-[120px] truncate text-[11px] text-muted" title={car.unavailability_reason}>
                          {car.unavailability_reason}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={car.is_featured ? 'default' : 'muted'}>
                        {car.is_featured ? 'Yes' : 'No'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <AvailabilityToggle
                          carId={car.id}
                          isAvailable={car.is_available}
                          unavailableFrom={car.unavailable_from}
                          unavailableUntil={car.unavailable_until}
                          unavailabilityReason={car.unavailability_reason}
                        />
                        <Button href={`/admin/cars/${car.id}/edit`} variant="ghost" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DeleteCarButton carId={car.id} carName={`${car.brand} ${car.model}`} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
