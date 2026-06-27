-- 1. Create tables
CREATE TABLE IF NOT EXISTS cars (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  brand         TEXT NOT NULL,
  model         TEXT NOT NULL,
  year          INTEGER NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('sedan','suv','hatchback','truck','van','luxury','sports')),
  transmission  TEXT NOT NULL CHECK (transmission IN ('automatic','manual')),
  fuel_type     TEXT NOT NULL CHECK (fuel_type IN ('gasoline','diesel','electric','hybrid')),
  seats         INTEGER NOT NULL,
  doors         INTEGER NOT NULL,
  daily_rate    DECIMAL(10,2) NOT NULL,
  security_deposit DECIMAL(10,2),
  image_url     TEXT,
  gallery_urls  TEXT[],
  description   TEXT,
  features      TEXT[],
  color         TEXT,
  license_plate TEXT,
  is_featured   BOOLEAN DEFAULT FALSE,
  is_available  BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS booking_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id          UUID REFERENCES cars(id) ON DELETE SET NULL,
  car_name        TEXT NOT NULL,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  pickup_date     DATE NOT NULL,
  return_date     DATE NOT NULL,
  pickup_location TEXT,
  notes           TEXT,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','confirmed','rejected')),
  admin_notes     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  TEXT NOT NULL,
  email      TEXT UNIQUE NOT NULL,
  role       TEXT DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_booking_status ON booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_booking_created ON booking_requests(created_at DESC);

-- 3. RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cars" ON cars FOR SELECT USING (is_available = TRUE);
CREATE POLICY "Anyone can create booking requests" ON booking_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view booking requests" ON booking_requests FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can update booking requests" ON booking_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));
CREATE POLICY "Admins can view admin users" ON admin_users FOR SELECT USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- 4. Seed cars
INSERT INTO cars (slug, brand, model, year, category, transmission, fuel_type, seats, doors, daily_rate, description, features, is_featured) VALUES
('toyota-corolla-2023', 'Toyota', 'Corolla', 2023, 'sedan', 'automatic', 'gasoline', 5, 4, 45, 'Fuel-efficient sedan.', ARRAY['Bluetooth','Backup Camera','Cruise Control'], true),
('honda-crv-2024', 'Honda', 'CR-V', 2024, 'suv', 'automatic', 'gasoline', 5, 5, 75, 'Spacious family SUV.', ARRAY['Apple CarPlay','AWD','Blind Spot Monitoring'], true),
('ford-mustang-2024', 'Ford', 'Mustang', 2024, 'sports', 'automatic', 'gasoline', 4, 2, 120, 'Iconic sports car.', ARRAY['V8 Engine','Leather Seats','Premium Sound'], true);

-- 5. Add admin user (make sure blm.alladine@gmail.com exists in Auth > Users first)
INSERT INTO admin_users (id, full_name, email, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'blm.alladine@gmail.com'),
  'alaeddine',
  'blm.alladine@gmail.com',
  'admin'
);
