CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid());
$$;

DROP POLICY IF EXISTS "Admins can view booking requests" ON booking_requests;
DROP POLICY IF EXISTS "Admins can update booking requests" ON booking_requests;
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

CREATE POLICY "Admins can view booking requests" ON booking_requests FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update booking requests" ON booking_requests FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can view admin users" ON admin_users FOR SELECT USING (is_admin());
