export type CarCategory = 'sedan' | 'suv' | 'hatchback' | 'truck' | 'van' | 'luxury' | 'sports';
export type Transmission = 'automatic' | 'manual';
export type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid';

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: CarCategory;
  transmission: Transmission;
  fuel_type: FuelType;
  seats: number;
  doors: number;
  daily_rate: number;
  security_deposit: number | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  description: string | null;
  features: string[];
  color: string | null;
  license_plate: string | null;
  is_featured: boolean;
  rental_categories: string[];
  is_available: boolean;
  unavailable_from: string | null;
  unavailable_until: string | null;
  unavailability_reason: string | null;
  created_at?: string;
  updated_at?: string;
}
