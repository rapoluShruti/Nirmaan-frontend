import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { budgetData } from './dummyData';
import { StatCard } from './StatCard';

export function BudgetOverview() {
  const percentSpent = ((budgetData.spent / budgetData.total) * 100).toFixed(1);
  const percentRemaining = ((budgetData.remaining / budgetData.total) * 100).toFixed(1);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: budgetData.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="dashboard-section">
      <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
        <Wallet className="h-5 w-5 text-accent" />
        Budget Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Budget"
          value={formatCurrency(budgetData.total)}
          icon={<DollarSign className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Spent"
          value={formatCurrency(budgetData.spent)}
          subtitle={`${percentSpent}% utilized`}
          icon={<TrendingDown className="h-6 w-6" />}
          variant="warning"
        />
        <StatCard
          title="Remaining"
          value={formatCurrency(budgetData.remaining)}
          subtitle={`${percentRemaining}% available`}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="success"
        />
      </div>
      
      {/* Budget Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Budget Utilization</span>
          <span className="font-medium">{percentSpent}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-warning rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentSpent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
