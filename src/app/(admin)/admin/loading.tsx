import { Spinner } from '@/components/ui/Spinner';

export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <Spinner size="lg" />
    </div>
  );
}
