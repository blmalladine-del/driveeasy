-- Add rental_categories array column to cars table
ALTER TABLE cars ADD COLUMN IF NOT EXISTS rental_categories TEXT[] NOT NULL DEFAULT '{}';

-- Allow public SELECT (already enabled via existing RLS, but ensure column is accessible)
-- Existing RLS policies on cars table already allow public SELECT and admin-only INSERT/UPDATE/DELETE
-- No policy changes needed — the new column is covered by the existing `allow_all` policies

-- Grant usage so existing RLS policies apply to the new column
GRANT ALL ON cars TO authenticated;
GRANT SELECT ON cars TO anon;
