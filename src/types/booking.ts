export type BookingStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'rejected';

export interface BookingFormData {
  car_id: string;
  car_name: string;
  full_name: string;
  email: string;
  phone: string;
  pickup_date: string;
  return_date: string;
  pickup_location?: string;
  notes?: string;
}
