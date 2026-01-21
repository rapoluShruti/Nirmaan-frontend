import { AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import { getDelayedTasks } from './dummyData';

export function DelayedTasks() {
  const delayedTasks = getDelayedTasks();

  if (delayedTasks.length === 0) {
    return (
      <div className="dashboard-section">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          Delayed Tasks
        </h2>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-completed/10 border border-completed/20">
          <div className="h-10 w-10 rounded-full bg-completed/20 flex items-center justify-center">
            <span className="text-lg">✓</span>
          </div>
          <div>
            <p className="font-medium text-completed">All on Track!</p>
            <p className="text-sm text-muted-foreground">No delayed tasks today</p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date();

  return (
    <div className="dashboard-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Delayed Tasks
        </h2>
        <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
          {delayedTasks.length} overdue
        </span>
      </div>

      <div className="space-y-3">
        {delayedTasks.map(task => {
          const endDate = new Date(task.endDate);
          const daysLate = Math.floor((today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div
              key={task.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-xs font-medium">
                    {task.category}
                  </span>
                </div>
                <p className="text-sm font-medium mt-0.5 truncate">{task.description}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {endDate.toLocaleDateString()}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="text-destructive font-medium">{daysLate} day{daysLate !== 1 ? 's' : ''} late</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="status-badge status-blocked">
                  {task.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
