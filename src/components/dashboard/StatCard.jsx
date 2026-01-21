import { cn } from '../../lib/utils';

const variantStyles = {
  default: 'bg-card',
  accent: 'bg-accent/10 border-accent/20',
  success: 'bg-completed/10 border-completed/20',
  warning: 'bg-warning/10 border-warning/20',
  danger: 'bg-destructive/10 border-destructive/20',
};

const iconVariantStyles = {
  default: 'bg-secondary text-foreground',
  accent: 'bg-accent/20 text-accent',
  success: 'bg-completed/20 text-completed',
  warning: 'bg-warning/20 text-warning',
  danger: 'bg-destructive/20 text-destructive',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}) {
  return (
    <div
      className={cn(
        'stat-card animate-fade-in',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-completed' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            iconVariantStyles[variant]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
