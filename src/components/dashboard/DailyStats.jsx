import { CalendarDays, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getTaskStats } from './dummyData';
import { StatCard } from './StatCard';

export function DailyStats() {
  const stats = getTaskStats();

  return (
    <div className="dashboard-section">
      <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-accent" />
        Daily Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={<CalendarDays className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          subtitle={`${((stats.completed / stats.total) * 100).toFixed(0)}% done`}
          icon={<CheckCircle2 className="h-6 w-6" />}
          variant="success"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={<Clock className="h-6 w-6" />}
          variant="accent"
        />
        <StatCard
          title="Blocked"
          value={stats.blocked}
          subtitle={stats.blocked > 0 ? 'Needs attention' : 'All clear'}
          icon={<AlertTriangle className="h-6 w-6" />}
          variant={stats.blocked > 0 ? 'danger' : 'default'}
        />
      </div>
      
      {stats.waitingApproval > 0 && (
        <div className="mt-4 p-4 rounded-lg bg-approval/10 border border-approval/20 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-approval animate-pulse-soft" />
          <span className="text-sm">
            <span className="font-semibold text-approval">{stats.waitingApproval}</span>
            <span className="text-muted-foreground"> task{stats.waitingApproval !== 1 ? 's' : ''} waiting for approval</span>
          </span>
        </div>
      )}
    </div>
  );
}
