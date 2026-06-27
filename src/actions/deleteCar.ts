'use server';

import { createAuthClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteCar(carId: string): Promise<{ error?: string }> {
  try {
    const supabase = await createAuthClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not authenticated.' };

    const { data: admin } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();
    if (!admin) return { error: 'Admin access required.' };

    const { error } = await supabase.from('cars').delete().eq('id', carId);

    if (error) return { error: error.message };

    revalidatePath('/admin/cars');
    revalidatePath('/cars');
    revalidatePath('/');

    redirect('/admin/cars');
  } catch (err) {
    if (err instanceof Error && err.message === 'NEXT_REDIRECT') throw err;
    return { error: err instanceof Error ? err.message : 'Failed to delete car.' };
  }
}
