import { HardHat, Calendar, RefreshCw } from 'lucide-react';

export function DashboardHeader() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-accent/30">
            <HardHat className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Project Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-0.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </button>
      </div>
    </header>
  );
}
