'use server';

import { createAuthClient } from '@/lib/supabase/server';

export async function adminLogin(
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  try {
    const supabase = await createAuthClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        return { error: 'Invalid email or password.' };
      }
      return { error: 'Login failed. Please try again.' };
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'Authentication failed.' };
    }

    const { data: admin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!admin) {
      await supabase.auth.signOut();
      return { error: 'You do not have admin access.' };
    }

    return { success: true };
  } catch {
    return { error: 'Connection error. Please try again.' };
  }
}
