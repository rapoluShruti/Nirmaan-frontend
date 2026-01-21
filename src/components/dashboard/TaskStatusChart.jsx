import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PieChart } from 'lucide-react';
import { getTaskStats } from './dummyData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function TaskStatusChart() {
  const stats = getTaskStats();

  const data = {
    labels: ['Completed', 'In Progress', 'Blocked'],
    datasets: [
      {
        data: [stats.completed, stats.inProgress, stats.blocked],
        backgroundColor: [
          'hsl(142, 71%, 45%)',
          'hsl(217, 91%, 60%)',
          'hsl(0, 72%, 51%)',
        ],
        borderColor: [
          'hsl(142, 71%, 40%)',
          'hsl(217, 91%, 55%)',
          'hsl(0, 72%, 46%)',
        ],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 11%)',
        titleFont: {
          family: 'Inter',
          size: 13,
        },
        bodyFont: {
          family: 'Inter',
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="dashboard-section h-full">
      <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
        <PieChart className="h-5 w-5 text-accent" />
        Task Status
      </h2>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 rounded-lg bg-completed/10">
          <p className="text-lg font-bold text-completed">{stats.completed}</p>
          <p className="text-xs text-muted-foreground">Done</p>
        </div>
        <div className="p-2 rounded-lg bg-in-progress/10">
          <p className="text-lg font-bold text-in-progress">{stats.inProgress}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </div>
        <div className="p-2 rounded-lg bg-blocked/10">
          <p className="text-lg font-bold text-blocked">{stats.blocked}</p>
          <p className="text-xs text-muted-foreground">Blocked</p>
        </div>
      </div>
    </div>
  );
}
