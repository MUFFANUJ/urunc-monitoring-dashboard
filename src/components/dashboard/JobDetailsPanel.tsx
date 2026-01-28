import { Job } from '@/types/ci';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Clock, Calendar, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JobDetailsPanelProps {
  job: Job;
  selectedRunIndex: number;
  onSelectRun: (index: number) => void;
}

const JobDetailsPanel = ({ job, selectedRunIndex, onSelectRun }: JobDetailsPanelProps) => {
  const selectedRun = job.lastRuns[selectedRunIndex];

  const getResultBadgeClass = (result: 'pass' | 'fail' | 'skip') => {
    switch (result) {
      case 'pass':
        return 'bg-success/10 text-success border-success/20';
      case 'fail':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'skip':
        return 'bg-skip/10 text-skip border-skip/20';
    }
  };

  return (
    <div className="bg-muted/20 border-t border-border animate-fade-in">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Run History Selector */}
          <div className="lg:w-64 shrink-0">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Run History
            </h4>
            <div className="space-y-1">
              {job.lastRuns.slice(0, 10).map((run, index) => (
                <button
                  key={run.id + index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRun(index);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                    selectedRunIndex === index
                      ? 'bg-primary/10 text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span className="font-mono text-xs">
                    {format(run.date, 'MMM d, HH:mm')}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium border',
                      getResultBadgeClass(run.result)
                    )}
                  >
                    {run.result.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Log Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Log Output
              </h4>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedRun.duration}s
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded font-medium border',
                    getResultBadgeClass(selectedRun.result)
                  )}
                >
                  {selectedRun.result.toUpperCase()}
                </span>
              </div>
            </div>
            
            <ScrollArea className="h-[250px] rounded-md border border-border bg-card">
              <pre className="p-4 text-xs font-mono text-foreground whitespace-pre-wrap">
                {selectedRun.logs || 'No log output available for this run.'}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPanel;
