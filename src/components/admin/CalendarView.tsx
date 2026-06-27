'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CalendarEvent } from '@/lib/calendar';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Calendar, User, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  events: CalendarEvent[];
  cars: { id: string; name: string }[];
}

type FilterStatus = '' | 'new' | 'contacted' | 'confirmed' | 'rejected';

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'rejected', label: 'Rejected' },
];

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDateLabel(startDate: string, endDate: string): string {
  if (startDate === endDate) return formatDate(startDate);
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'new': return 'border-l-blue-500';
    case 'contacted': return 'border-l-amber-500';
    case 'confirmed': return 'border-l-green-500';
    case 'rejected': return 'border-l-gray-400';
    default: return 'border-l-gray-400';
  }
}

export function CalendarView({ events, cars }: CalendarViewProps) {
  const [carFilter, setCarFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('');

  const carOptions = [
    { value: '', label: 'All Cars' },
    ...cars.map((c) => ({ value: c.name, label: c.name })),
  ];

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (carFilter && !e.title.toLowerCase().includes(carFilter.toLowerCase())) return false;
      if (statusFilter && e.type === 'booking' && e.status !== statusFilter) return false;
      return true;
    });
  }, [events, carFilter, statusFilter]);

  const groups = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of filtered) {
      const key = formatMonth(e.startDate);
      const arr = map.get(key) || [];
      arr.push(e);
      map.set(key, arr);
    }
    const sorted = Array.from(map.entries()).sort((a, b) => {
      return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    });
    return sorted;
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-wrap gap-4">
          <div className="w-48">
            <Select
              label="Car"
              name="car"
              value={carFilter}
              onChange={(e) => setCarFilter(e.target.value)}
              options={carOptions}
            />
          </div>
          <div className="w-48">
            <Select
              label="Status"
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              options={statusOptions}
            />
          </div>
        </div>
      </Card>

      {/* Timeline */}
      {groups.length === 0 ? (
        <Card padding="lg" className="text-center">
          <Calendar className="mx-auto h-10 w-10 text-muted" />
          <p className="mt-3 text-muted">No events found for the selected filters.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {groups.map(([month, monthEvents]) => (
            <section key={month}>
              <h2 className="mb-4 text-lg font-bold text-foreground">{month}</h2>
              <div className="flex flex-wrap gap-3">
                {monthEvents.map((event) => (
                  <Link
                    key={`${event.type}-${event.id}`}
                    href={event.link}
                    className={cn(
                      'group flex w-[calc(50%-0.375rem)] flex-col rounded-lg border border-border bg-white transition-shadow hover:shadow-md lg:w-[calc(33.333%-0.5rem)]',
                      event.type === 'booking'
                        ? getStatusColor(event.status ?? '')
                        : 'border-l-yellow-500',
                      'border-l-4',
                    )}
                  >
                    <div className="flex flex-col gap-3 p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                            event.type === 'booking'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-yellow-100 text-yellow-600',
                          )}
                        >
                          {event.type === 'booking' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                              {event.title}
                            </span>
                            {event.type === 'booking' && event.status && (
                              <Badge variant={
                                event.status === 'confirmed' ? 'success' :
                                event.status === 'contacted' ? 'warning' :
                                event.status === 'new' ? 'default' : 'muted'
                              }>
                                {event.status}
                              </Badge>
                            )}
                            {event.type === 'unavailability' && (
                              <Badge variant="warning">Unavailable</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="truncate text-xs text-muted">
                        {event.type === 'booking' ? (
                          <>{event.subtitle} &middot; {getDateLabel(event.startDate, event.endDate)}</>
                        ) : (
                          <>{getDateLabel(event.startDate, event.endDate)} &middot; {event.subtitle}</>
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
