import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { BarChart3, Package, Flag } from 'lucide-react';
import { getPriorityStats, materials } from './dummyData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function ExtraCharts() {
  const priorityStats = getPriorityStats();

  // Priority Doughnut
  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [priorityStats.high, priorityStats.medium, priorityStats.low],
        backgroundColor: [
          'hsl(0, 84%, 60%)',
          'hsl(38, 92%, 50%)',
          'hsl(220, 9%, 46%)',
        ],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const priorityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 11%)',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  // Material Bar Chart
  const materialData = {
    labels: materials.map(m => m.name),
    datasets: [
      {
        label: 'Issued',
        data: materials.map(m => m.issued),
        backgroundColor: 'hsl(25, 95%, 53%)',
        borderRadius: 4,
      },
      {
        label: 'Remaining',
        data: materials.map(m => m.remaining),
        backgroundColor: 'hsl(217, 91%, 60%)',
        borderRadius: 4,
      },
    ],
  };

  const materialOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'hsl(222, 47%, 11%)',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'hsl(220, 13%, 91%)',
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 10,
          },
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Priority Distribution */}
      <div className="dashboard-section">
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <Flag className="h-5 w-5 text-accent" />
          Tasks by Priority
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative h-36 w-36">
            <Doughnut data={priorityData} options={priorityOptions} />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-sm">High Priority</span>
              </div>
              <span className="font-bold text-destructive">{priorityStats.high}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-warning/10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-warning" />
                <span className="text-sm">Medium Priority</span>
              </div>
              <span className="font-bold text-warning">{priorityStats.medium}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-secondary">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-sm">Low Priority</span>
              </div>
              <span className="font-bold">{priorityStats.low}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Material Usage */}
      <div className="dashboard-section">
        <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
          <Package className="h-5 w-5 text-accent" />
          Material Inventory
        </h2>
        <div className="h-56">
          <Bar data={materialData} options={materialOptions} />
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="lg:col-span-2 grid gap-4 sm:grid-cols-3">
        {materials.slice(0, 3).map(material => {
          const usagePercent = ((material.issued / (material.issued + material.remaining)) * 100).toFixed(0);
          return (
            <div key={material.id} className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">{material.name}</span>
                <Package className="h-4 w-4 text-accent" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">{material.remaining}</p>
                  <p className="text-xs text-muted-foreground">{material.unit} remaining</p>
                </div>
                <span className="text-sm font-medium text-accent">{usagePercent}% used</span>
              </div>
              <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
