'use client';

import { useState, useRef, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { ImageUp, X, AlertTriangle } from 'lucide-react';
import type { CarFormState } from '@/lib/validators';
import type { Car } from '@/types/car';
import { RENTAL_CATEGORIES, RENTAL_CATEGORY_LABELS } from '@/config/categories';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'truck', label: 'Truck' },
  { value: 'van', label: 'Van' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'sports', label: 'Sports' },
];

const transmissions = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

const fuelTypes = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
];

const boolOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

interface CarFormProps {
  action: (prevState: CarFormState, formData: FormData) => Promise<CarFormState>;
  car?: Car;
}

export function CarForm({ action, car }: CarFormProps) {
  const [state, setState] = useState<CarFormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showUnavailable, setShowUnavailable] = useState(
    car ? !car.is_available : false
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Ensure file from ref is explicitly included
    if (fileInputRef.current?.files?.[0]) {
      formData.set('image', fileInputRef.current.files[0]);
    }

    startTransition(async () => {
      const result = await action(state ?? { success: false }, formData);
      if (result.success) {
        router.refresh();
        router.push('/admin/cars');
      } else {
        setState(result);
      }
    });
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  }

  function clearFile() {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const fieldErrors = state?.fieldErrors ?? {};

  const currentImage = preview || (car?.image_url ?? null);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
      {state?.error && !state?.fieldErrors && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state?.error}
        </div>
      )}

      <input type="hidden" name="existing_image_url" value={car?.image_url ?? ''} />

      {/* Basic Info */}
      <Card padding="lg">
        <h2 className="text-lg font-bold mb-6">Basic Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Brand"
            name="brand"
            defaultValue={car?.brand}
            required
            error={fieldErrors.brand?.[0]}
          />
          <Input
            label="Model"
            name="model"
            defaultValue={car?.model}
            required
            error={fieldErrors.model?.[0]}
          />
          <Input
            label="Year"
            name="year"
            type="number"
            defaultValue={car?.year?.toString()}
            required
            error={fieldErrors.year?.[0]}
          />
          <Input
            label="Slug"
            name="slug"
            defaultValue={car?.slug}
            required
            placeholder="e.g. toyota-corolla-2023"
            error={fieldErrors.slug?.[0]}
          />
          <Select
            label="Category"
            name="category"
            defaultValue={car?.category}
            options={categories}
            required
            error={fieldErrors.category?.[0]}
          />
          <Select
            label="Transmission"
            name="transmission"
            defaultValue={car?.transmission}
            options={transmissions}
            required
            error={fieldErrors.transmission?.[0]}
          />
          <Select
            label="Fuel Type"
            name="fuel_type"
            defaultValue={car?.fuel_type}
            options={fuelTypes}
            required
            error={fieldErrors.fuel_type?.[0]}
          />
          <Input
            label="Color"
            name="color"
            defaultValue={car?.color ?? ''}
            error={fieldErrors.color?.[0]}
          />
        </div>
      </Card>

      {/* Capacity & Pricing */}
      <Card padding="lg">
        <h2 className="text-lg font-bold mb-6">Capacity & Pricing</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Seats"
            name="seats"
            type="number"
            defaultValue={car?.seats?.toString()}
            required
            error={fieldErrors.seats?.[0]}
          />
          <Input
            label="Doors"
            name="doors"
            type="number"
            defaultValue={car?.doors?.toString()}
            required
            error={fieldErrors.doors?.[0]}
          />
          <Input
            label="Daily Rate ($)"
            name="daily_rate"
            type="number"
            step="0.01"
            defaultValue={car?.daily_rate?.toString()}
            required
            error={fieldErrors.daily_rate?.[0]}
          />
          <Input
            label="Security Deposit ($)"
            name="security_deposit"
            type="number"
            step="0.01"
            defaultValue={car?.security_deposit?.toString() ?? ''}
            error={fieldErrors.security_deposit?.[0]}
          />
          <Input
            label="License Plate"
            name="license_plate"
            defaultValue={car?.license_plate ?? ''}
            error={fieldErrors.license_plate?.[0]}
          />
        </div>
      </Card>

      {/* Details */}
      <Card padding="lg">
        <h2 className="text-lg font-bold mb-6">Details</h2>
        <div className="space-y-5">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">Car Image</label>

            {currentImage ? (
              <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-surface">
                <img
                  src={currentImage}
                  alt="Car preview"
                  className="aspect-video w-full object-cover"
                />
                {preview && (
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex aspect-video w-full max-w-md items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface">
                <div className="text-center">
                  <ImageUp className="mx-auto h-8 w-8 text-muted" />
                  <p className="mt-1 text-sm text-muted">No image</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface">
                {currentImage ? 'Change Image' : 'Choose Image'}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {fileName && <span className="text-sm text-muted truncate max-w-[200px]">{fileName}</span>}
            </div>
          </div>

          <Textarea
            label="Description"
            name="description"
            defaultValue={car?.description ?? ''}
            placeholder="Describe the vehicle..."
            error={fieldErrors.description?.[0]}
          />
          <Textarea
            label="Features (comma-separated)"
            name="features"
            defaultValue={car?.features?.join(', ') ?? ''}
            placeholder="Bluetooth, Backup Camera, Cruise Control"
            error={fieldErrors.features?.[0]}
          />
        </div>
      </Card>

      {/* Rental Categories */}
      <Card padding="lg">
        <h2 className="text-lg font-bold mb-6">Rental Categories</h2>
        <p className="text-sm text-muted mb-4">Select one or more rental use-cases for this vehicle.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RENTAL_CATEGORIES.map((cat) => {
            const isChecked = car?.rental_categories?.includes(cat) ?? false;
            return (
              <label
                key={cat}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-colors',
                  'has-[:checked]:border-primary has-[:checked]:bg-primary-light',
                  'border-border bg-white hover:border-primary/50',
                )}>
                    <input
                      type="checkbox"
                      name="rental_categories"
                      value={cat}
                      defaultChecked={isChecked}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-foreground">
                  {RENTAL_CATEGORY_LABELS[cat]}
                </span>
              </label>
            );
          })}
        </div>
        {fieldErrors.rental_categories?.[0] && (
          <p className="mt-2 text-sm text-red-600">{fieldErrors.rental_categories[0]}</p>
        )}
      </Card>

      {/* Status */}
      <Card padding="lg">
        <h2 className="text-lg font-bold mb-6">Status</h2>
        <div className="space-y-6">
          {/* Featured */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Featured"
              name="is_featured"
              defaultValue={car?.is_featured?.toString() ?? 'false'}
              options={boolOptions}
              error={fieldErrors.is_featured?.[0]}
            />
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">Availability</label>
            <div className="flex gap-3">
              {[
                { value: 'true', label: 'Available', description: 'Car can be booked' },
                { value: 'false', label: 'Unavailable', description: 'Car cannot be booked' },
              ].map((option) => {
                const defaultAvailable = car?.is_available?.toString() ?? 'true';
                return (
                  <label
                    key={option.value}
                    className={cn(
                      'flex flex-1 cursor-pointer rounded-lg border-2 p-4 transition-colors',
                      'has-[:checked]:border-primary has-[:checked]:bg-primary-light',
                  'border-border bg-white hover:border-primary/50',
                    )}>
                    <input
                      type="radio"
                      name="is_available"
                      value={option.value}
                      defaultChecked={defaultAvailable === option.value}
                      onChange={(e) => setShowUnavailable(e.target.value === 'false')}
                      className="sr-only"
                    />
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted">{option.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Unavailable details */}
            {showUnavailable && (
              <div className="space-y-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4"
            >
              <div className="flex items-start gap-2 text-sm text-yellow-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Fill in the details below when marking a car as unavailable.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Unavailable From (optional)"
                  name="unavailable_from"
                  type="date"
                  defaultValue={car?.unavailable_from ?? ''}
                  error={fieldErrors.unavailable_from?.[0]}
                />
                <Input
                  label="Unavailable Until (optional)"
                  name="unavailable_until"
                  type="date"
                  defaultValue={car?.unavailable_until ?? ''}
                  error={fieldErrors.unavailable_until?.[0]}
                />
              </div>
              <Input
                label="Reason (optional)"
                name="unavailability_reason"
                placeholder="e.g. rented, maintenance, reserved manually"
                defaultValue={car?.unavailability_reason ?? ''}
                error={fieldErrors.unavailability_reason?.[0]}
              />
            </div>)}
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? <Spinner size="sm" /> : null}
          {isPending ? 'Saving...' : car ? 'Update Car' : 'Create Car'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push('/admin/cars')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
