import { Calendar, Users, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Image } from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  Completed: {
    icon: CheckCircle2,
    className: 'status-completed',
  },
  'In Progress': {
    icon: Clock,
    className: 'status-in-progress',
  },
  Blocked: {
    icon: AlertTriangle,
    className: 'status-blocked',
  },
};

const priorityConfig = {
  High: 'priority-high',
  Medium: 'priority-medium',
  Low: 'priority-low',
};

export function TaskCard({ task, isDelayed }) {
  const StatusIcon = statusConfig[task.status].icon;
  const endDate = new Date(task.endDate);
  const formattedDate = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'bg-card rounded-xl border border-border/50 p-4 transition-all duration-300 hover:shadow-md hover:border-border animate-fade-in',
        priorityConfig[task.priority],
        isDelayed && 'ring-2 ring-destructive/30'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-secondary text-xs font-medium">
              {task.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {task.id}
            </span>
            {task.waitingForApproval && (
              <span className="status-badge status-approval">
                <ShieldCheck className="h-3 w-3" />
                Awaiting Approval
              </span>
            )}
            {isDelayed && (
              <span className="status-badge status-blocked">
                <AlertTriangle className="h-3 w-3" />
                Delayed
              </span>
            )}
          </div>
          <p className="mt-2 font-medium text-sm">{task.description}</p>
          
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{task.assignedWorkers.length} worker{task.assignedWorkers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        
        <span className={cn('status-badge', statusConfig[task.status].className)}>
          <StatusIcon className="h-3.5 w-3.5" />
          {task.status}
        </span>
      </div>

      {/* Workers */}
      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {task.assignedWorkers.map((worker, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full bg-secondary/50 text-xs"
            >
              {worker}
            </span>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className="mt-3 flex gap-3">
        {task.beforePhoto && (
          <div className="relative group">
            <img
              src={task.beforePhoto}
              alt="Before"
              className="w-20 h-14 object-cover rounded-lg border border-border/50"
            />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-foreground/80 text-background text-[10px] rounded font-medium">
              Before
            </span>
          </div>
        )}
        {task.afterPhoto ? (
          <div className="relative group">
            <img
              src={task.afterPhoto}
              alt="After"
              className="w-20 h-14 object-cover rounded-lg border border-border/50"
            />
            <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-completed/90 text-completed-foreground text-[10px] rounded font-medium">
              After
            </span>
          </div>
        ) : task.beforePhoto ? (
          <div className="w-20 h-14 rounded-lg border border-dashed border-border flex items-center justify-center bg-secondary/30">
            <Image className="h-4 w-4 text-muted-foreground" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
