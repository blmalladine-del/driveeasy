'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function adminLogout() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
