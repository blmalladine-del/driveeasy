export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

export function getCarPlaceholderGradient(brand: string, model: string): string {
  const gradients = [
    'from-slate-800 to-slate-600',
    'from-blue-900 to-blue-700',
    'from-gray-900 to-gray-700',
    'from-zinc-800 to-zinc-600',
    'from-neutral-800 to-neutral-600',
    'from-stone-800 to-stone-600',
    'from-slate-900 to-slate-700',
  ];
  const index = (brand.length + model.length) % gradients.length;
  return gradients[index];
}
