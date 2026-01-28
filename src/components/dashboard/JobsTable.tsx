import { useState, useMemo } from 'react';
import { Job, Workflow } from '@/types/ci';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import JobDetailsPanel from './JobDetailsPanel';

interface JobsTableProps {
  jobs: Job[];
  workflows: Workflow[];
}

const RunIndicator = ({ result }: { result: 'pass' | 'fail' | 'skip' }) => {
  const colorClass = {
    pass: 'text-success font-medium',
    fail: 'text-destructive font-medium',
    skip: 'text-skip',
  }[result];

  const label = {
    pass: 'Pass',
    fail: 'Fail',
    skip: 'Skip',
  }[result];

  return <span className={cn('text-sm', colorClass)}>{label}</span>;
};

const JobsTable = ({ jobs, workflows }: JobsTableProps) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedRunIndex, setSelectedRunIndex] = useState<number>(0);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesWorkflow = selectedWorkflow === 'all' || job.workflowId === selectedWorkflow;
      const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesWorkflow && matchesSearch;
    });
  }, [jobs, selectedWorkflow, searchQuery]);

  const handleJobClick = (jobId: string) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
      setSelectedRunIndex(0);
    }
  };

  const selectedJob = expandedJobId ? jobs.find(j => j.id === expandedJobId) : null;

  return (
    <div className="glass-card animate-fade-in overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Workflow Dashboard</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Select Workflow:</span>
            <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select workflow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workflows</SelectItem>
                {workflows.map(wf => (
                  <SelectItem key={wf.id} value={wf.id}>{wf.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Search Jobs:</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by job name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[220px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Job Name
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground w-[120px]">
                Pass Rate
              </th>
              <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">
                Last 10 Runs
              </th>
              <th className="w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <>
                <tr
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                  className={cn(
                    'border-b border-border/50 hover:bg-muted/30 transition-colors duration-200 cursor-pointer',
                    expandedJobId === job.id && 'bg-muted/40'
                  )}
                >
                  <td className="py-4 px-6">
                    <span className="text-primary hover:underline font-medium">
                      {job.name}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm">{job.passRate.toFixed(2)}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 flex-wrap">
                      {job.lastRuns.slice(0, 10).map((run, i) => (
                        <RunIndicator key={run.id + i} result={run.result} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {expandedJobId === job.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </td>
                </tr>
                {expandedJobId === job.id && selectedJob && (
                  <tr key={`${job.id}-details`}>
                    <td colSpan={4} className="p-0">
                      <JobDetailsPanel
                        job={selectedJob}
                        selectedRunIndex={selectedRunIndex}
                        onSelectRun={setSelectedRunIndex}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        
        {filteredJobs.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No jobs found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsTable;
