'use client';

import { LogOut } from 'lucide-react';
import { adminLogout } from '@/actions/adminLogout';

export function AdminHeader({ userName }: { userName: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <h2 className="text-lg font-semibold hidden md:block">Admin Panel</h2>

      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-muted">{userName}</span>
        <form action={adminLogout}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </form>
      </div>
    </header>
  );
}
