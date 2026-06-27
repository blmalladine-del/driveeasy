import { Card } from '@/components/ui/Card';

interface Stat {
  label: string;
  value: number;
  color: string;
}

const colorMap: Record<string, string> = {
  blue: 'text-foreground',
  amber: 'text-foreground',
  green: 'text-foreground',
  gray: 'text-foreground',
};

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} padding="md">
          <p className="text-sm text-muted">{stat.label}</p>
          <p className={`mt-1 text-3xl font-bold ${colorMap[stat.color] || ''}`}>
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  );
}
