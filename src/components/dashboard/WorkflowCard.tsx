import { Workflow } from '@/types/ci';
import StatusBadge from './StatusBadge';
import { Clock, PlayCircle, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface WorkflowCardProps {
  workflow: Workflow;
  delay?: number;
}

const WorkflowCard = ({ workflow, delay = 0 }: WorkflowCardProps) => {
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressBarColor = (rate: number) => {
    if (rate >= 90) return 'bg-success';
    if (rate >= 70) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div
      className="glass-card p-5 hover:scale-[1.02] transition-all duration-300 animate-fade-in cursor-pointer group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {workflow.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {workflow.description}
          </p>
        </div>
        {workflow.lastRun && (
          <StatusBadge status={workflow.lastRun.status} size="sm" showIcon={false} />
        )}
      </div>

      <div className="space-y-3">
        {/* Success Rate Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Success Rate
            </span>
            <span className={cn('font-medium', getSuccessRateColor(workflow.successRate))}>
              {workflow.successRate.toFixed(1)}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                getProgressBarColor(workflow.successRate)
              )}
              style={{ width: `${workflow.successRate}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{workflow.totalRuns} runs</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{workflow.schedule}</span>
          </div>
        </div>

        {workflow.lastRun && (
          <p className="text-xs text-muted-foreground">
            Last run {formatDistanceToNow(workflow.lastRun.startedAt, { addSuffix: true })}
          </p>
        )}
      </div>
    </div>
  );
};

export default WorkflowCard;
