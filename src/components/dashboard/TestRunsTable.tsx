import { TestRun } from '@/types/ci';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow, format } from 'date-fns';
import { GitBranch, Clock, User, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestRunsTableProps {
  runs: TestRun[];
}

const formatDuration = (seconds: number) => {
  if (seconds === 0) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
};

const TestRunsTable = ({ runs }: TestRunsTableProps) => {
  return (
    <div className="glass-card animate-fade-in overflow-hidden" style={{ animationDelay: '300ms' }}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Test Runs</h3>
        <p className="text-sm text-muted-foreground">Latest workflow executions across all pipelines</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Workflow
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Branch
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Duration
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Tests
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Started
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run, index) => (
              <tr
                key={run.id}
                className={cn(
                  'border-b border-border/50 hover:bg-muted/30 transition-colors duration-200',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{run.workflowName}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate max-w-[200px]">
                      {run.commit}: {run.commitMessage}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={run.status} size="sm" />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GitBranch className="w-4 h-4" />
                    <span className="font-mono">{run.branch}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(run.duration)}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-success">{run.testsPassed} passed</span>
                    {run.testsFailed > 0 && (
                      <span className="text-destructive">{run.testsFailed} failed</span>
                    )}
                    {run.testsSkipped > 0 && (
                      <span className="text-muted-foreground">{run.testsSkipped} skipped</span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(run.startedAt, { addSuffix: true })}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{run.triggeredBy}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 rounded-lg hover:bg-accent transition-colors duration-200 text-muted-foreground hover:text-foreground">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestRunsTable;
