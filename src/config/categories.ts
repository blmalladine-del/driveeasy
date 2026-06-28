export const RENTAL_CATEGORIES = [
  'wedding',
  'family-trips',
  'business-travel',
  'airport-pickup',
  'weekend-escape',
  'sport',
] as const;

export type RentalCategory = (typeof RENTAL_CATEGORIES)[number];

export const RENTAL_CATEGORY_LABELS: Record<RentalCategory, string> = {
  'wedding': 'Wedding',
  'family-trips': 'Family Trips',
  'business-travel': 'Business Travel',
  'airport-pickup': 'Airport Pickup',
  'weekend-escape': 'Weekend Escape',
  'sport': 'Sport',
};

export function getRentalCategoryLabel(category: string): string {
  return RENTAL_CATEGORY_LABELS[category as RentalCategory] || category;
}
