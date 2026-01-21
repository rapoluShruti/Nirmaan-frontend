import { DashboardHeader } from './DashboardHeader';
import { BudgetOverview } from './BudgetOverview';
import { DailyStats } from './DailyStats';
import { TaskStatusChart } from './TaskStatusChart';
import { WorkerAttendanceChart } from './WorkerAttendanceChart';
import { DelayedTasks } from './DelayedTasks';
import { TasksList } from './TasksList';
import { ExtraCharts } from './ExtraCharts';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        {/* Daily Stats */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <DailyStats />
        </section>

        {/* Budget Overview */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <BudgetOverview />
        </section>

        {/* Charts Row */}
        <section className="mb-8 grid gap-6 lg:grid-cols-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <TaskStatusChart />
          <WorkerAttendanceChart />
        </section>

        {/* Delayed Tasks */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.25s' }}>
          <DelayedTasks />
        </section>

        {/* Extra Charts */}
        <section className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ExtraCharts />
        </section>

        {/* Tasks List */}
        <section className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
          <TasksList />
        </section>
      </div>
    </div>
  );
};

export default Index;
