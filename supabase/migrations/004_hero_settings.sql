ALTER TABLE site_settings ADD COLUMN hero_image_url TEXT;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view hero_image_url"
  ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can update hero_image_url"
  ON site_settings
  FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM admin_users)
  )
  WITH CHECK (
    auth.uid() IN (SELECT id FROM admin_users)
  );
