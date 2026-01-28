import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'success' | 'destructive' | 'warning';
  delay?: number;
}

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'default',
  delay = 0,
}: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    if (variant === 'destructive') {
      return trend === 'down' ? 'text-success' : 'text-destructive';
    }
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCardClass = () => {
    switch (variant) {
      case 'success':
        return 'glass-card-success';
      case 'destructive':
        return 'glass-card-destructive';
      default:
        return 'glass-card';
    }
  };

  const getIconBgClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'destructive':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-foreground';
    }
  };

  return (
    <div
      className={cn(
        getCardClass(),
        'p-6 animate-fade-in hover:shadow-md transition-shadow duration-300'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg', getIconBgClass())}>
          {icon}
        </div>
        {trend && trendValue && (
          <div className={cn('flex items-center gap-1 text-sm font-medium', getTrendColor())}>
            {getTrendIcon()}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="metric-value">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
