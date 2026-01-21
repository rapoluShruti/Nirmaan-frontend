import { ClipboardList, Filter } from 'lucide-react';
import { useState } from 'react';
import { tasks, getDelayedTasks } from './dummyData';
import { TaskCard } from './TaskCard';
import { cn } from '../../lib/utils';

export function TasksList() {
  const [filter, setFilter] = useState('all');
  const delayedTaskIds = getDelayedTasks().map(t => t.id);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.status === 'Completed';
      case 'in-progress':
        return task.status === 'In Progress';
      case 'blocked':
        return task.status === 'Blocked';
      case 'approval':
        return task.waitingForApproval;
      default:
        return true;
    }
  });

  const filterButtons = [
    { key: 'all', label: 'All', count: tasks.length },
    { key: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'Completed').length },
    { key: 'in-progress', label: 'In Progress', count: tasks.filter(t => t.status === 'In Progress').length },
    { key: 'blocked', label: 'Blocked', count: tasks.filter(t => t.status === 'Blocked').length },
    { key: 'approval', label: 'Awaiting Approval', count: tasks.filter(t => t.waitingForApproval).length },
  ];

  return (
    <div className="dashboard-section">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-accent" />
          All Tasks
        </h2>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Filter
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-border/50">
        {filterButtons.map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
              filter === btn.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            {btn.label}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-background/20 text-xs">
              {btn.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4 md:grid-cols-2 max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            isDelayed={delayedTaskIds.includes(task.id)}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="col-span-2 py-12 text-center text-muted-foreground">
            No tasks found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
