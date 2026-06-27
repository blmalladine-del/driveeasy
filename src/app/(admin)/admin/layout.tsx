import { AdminHeader } from '@/components/layout/AdminHeader';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { requireAdmin } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let admin = null;
  try {
    admin = await requireAdmin();
  } catch {
    // Supabase not configured
  }

  if (!admin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex">
        <AdminSidebar />
      </div>
      <div className="flex flex-1 flex-col">
        <AdminHeader userName={admin.full_name} />
        <main className="flex-1 bg-surface p-6">{children}</main>
      </div>
    </div>
  );
}
