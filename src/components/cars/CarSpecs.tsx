import type { Car as CarType } from '@/types/car';
import { Calendar, Car, Gauge, Fuel, Users, Warehouse } from 'lucide-react';

interface CarSpecsProps {
  car: CarType;
}

const specItems = (car: CarType) => [
  { icon: Calendar, label: 'Year', value: car.year.toString() },
  { icon: Gauge, label: 'Transmission', value: car.transmission },
  { icon: Fuel, label: 'Fuel', value: car.fuel_type },
  { icon: Users, label: 'Seats', value: car.seats.toString() },
  { icon: Car, label: 'Doors', value: car.doors.toString() },
  { icon: Warehouse, label: 'Category', value: car.category },
];

export function CarSpecs({ car }: CarSpecsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {specItems(car).map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-1.5 rounded-lg bg-surface p-4 text-center"
        >
          <item.icon className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted">{item.label}</span>
          <span className="text-sm font-semibold capitalize">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
