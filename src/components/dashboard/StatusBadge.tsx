import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, Loader2, Clock, SkipForward } from 'lucide-react';
import { TestStatus } from '@/types/ci';

interface StatusBadgeProps {
  status: TestStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge = ({ status, showIcon = true, size = 'md' }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          label: 'Success',
          className: 'status-success',
          icon: <CheckCircle2 className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />,
        };
      case 'failure':
        return {
          label: 'Failed',
          className: 'status-failure',
          icon: <XCircle className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />,
        };
      case 'running':
        return {
          label: 'Running',
          className: 'status-running',
          icon: <Loader2 className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4', 'animate-spin')} />,
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'status-pending',
          icon: <Clock className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />,
        };
      case 'skip':
        return {
          label: 'Skipped',
          className: 'status-skip',
          icon: <SkipForward className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />,
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-md',
        config.className,
        sizeClasses[size]
      )}
    >
      {showIcon && config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;
