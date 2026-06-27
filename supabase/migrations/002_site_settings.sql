CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT '',
  company_tagline TEXT DEFAULT '',
  company_description TEXT DEFAULT '',
  company_logo_url TEXT DEFAULT '',
  business_address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  business_hours TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  whatsapp_number TEXT DEFAULT '',
  email TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  facebook_url TEXT DEFAULT '',
  hero_title TEXT DEFAULT 'Rent Your Ideal Car Today',
  hero_subtitle TEXT DEFAULT 'Explore our fleet of well-maintained vehicles at competitive rates.',
  primary_cta_text TEXT DEFAULT 'Browse Our Cars',
  faq_contact_text TEXT DEFAULT 'Have more questions? Contact us and we''ll be happy to help.',
  default_pickup_location TEXT DEFAULT '',
  security_deposit_note TEXT DEFAULT 'A security deposit is required at pickup. It will be fully refunded upon return of the vehicle in the same condition.',
  required_documents_note TEXT DEFAULT 'Valid driver''s license, passport or national ID, and a credit card for the security deposit.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO site_settings (company_name, company_tagline, company_description, business_address, city, business_hours, phone, whatsapp_number, email, hero_title, hero_subtitle, primary_cta_text, faq_contact_text)
VALUES (
  'DriveEasy Rentals',
  'Reliable cars, effortless booking.',
  'DriveEasy Rentals offers a modern fleet of well-maintained vehicles at competitive rates. Book online and drive away with confidence.',
  '123 Main Street, Suite 100',
  'Miami, FL 33101',
  'Mon – Sun, 8:00 AM – 8:00 PM',
  '+1 (555) 123-4567',
  '15551234567',
  'hello@driveeasyrentals.com',
  'Rent Your Ideal Car Today',
  'Explore our fleet of well-maintained vehicles at competitive rates.',
  'Browse Our Cars',
  'Have more questions? Contact us and we''ll be happy to help.'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admin can read/write
CREATE POLICY "admins_all_site_settings"
ON site_settings
FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Public can read
CREATE POLICY "public_read_site_settings"
ON site_settings
FOR SELECT
TO anon, authenticated
USING (true);
