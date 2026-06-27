-- Migration: 003_car_availability
-- Adds availability date range and reason columns to cars table.
-- Fixes RLS: public can SELECT all cars (so unavailable cars show on public site),
-- only admins can INSERT/UPDATE/DELETE.

-- 1. Add availability columns
ALTER TABLE cars
  ADD COLUMN IF NOT EXISTS unavailable_from DATE,
  ADD COLUMN IF NOT EXISTS unavailable_until DATE,
  ADD COLUMN IF NOT EXISTS unavailability_reason TEXT;

-- 2. Drop the restrictive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view cars" ON cars;

-- 3. Public can view all cars (available + unavailable)
CREATE POLICY "Anyone can view cars"
  ON cars FOR SELECT
  USING (true);

-- 4. Only authenticated admins can insert cars
CREATE POLICY "Admins can insert cars"
  ON cars FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- 5. Only authenticated admins can update cars
CREATE POLICY "Admins can update cars"
  ON cars FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- 6. Only authenticated admins can delete cars
CREATE POLICY "Admins can delete cars"
  ON cars FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );
