import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Users } from 'lucide-react';
import { getWorkerStats, workers } from './dummyData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function WorkerAttendanceChart() {
  const stats = getWorkerStats();

  // Group by role
  const roleStats = workers.reduce((acc, worker) => {
    if (!acc[worker.role]) {
      acc[worker.role] = { present: 0, absent: 0 };
    }
    if (worker.present) {
      acc[worker.role].present++;
    } else {
      acc[worker.role].absent++;
    }
    return acc;
  }, {});

  const roles = Object.keys(roleStats);

  const data = {
    labels: roles,
    datasets: [
      {
        label: 'Present',
        data: roles.map(role => roleStats[role].present),
        backgroundColor: 'hsl(142, 71%, 45%)',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Absent',
        data: roles.map(role => roleStats[role].absent),
        backgroundColor: 'hsl(0, 84%, 60%)',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    scales: {
      x: {
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
      y: {
        grid: {
          color: 'hsl(220, 13%, 91%)',
        },
        ticks: {
          stepSize: 1,
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
    },
  };

  const attendanceRate = ((stats.present / stats.total) * 100).toFixed(0);

  return (
    <div className="dashboard-section h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          Worker Attendance
        </h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-completed/10">
          <span className="text-sm font-medium text-completed">{attendanceRate}%</span>
          <span className="text-xs text-muted-foreground">rate</span>
        </div>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-completed/10">
          <div className="h-10 w-10 rounded-full bg-completed/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-completed" />
          </div>
          <div>
            <p className="text-xl font-bold text-completed">{stats.present}</p>
            <p className="text-xs text-muted-foreground">Present Today</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10">
          <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-xl font-bold text-destructive">{stats.absent}</p>
            <p className="text-xs text-muted-foreground">Absent Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
