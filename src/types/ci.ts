export type TestStatus = 'success' | 'failure' | 'running' | 'pending' | 'skip';

export type RunResult = 'pass' | 'fail' | 'skip';

export interface TestRun {
  id: string;
  workflowName: string;
  branch: string;
  commit: string;
  commitMessage: string;
  status: TestStatus;
  duration: number; // in seconds
  startedAt: Date;
  completedAt?: Date;
  triggeredBy: string;
  testsPassed: number;
  testsFailed: number;
  testsSkipped: number;
}

export interface JobRun {
  id: string;
  result: RunResult;
  date: Date;
  duration: number;
  logs?: string;
}

export interface Job {
  id: string;
  name: string;
  workflowId: string;
  passRate: number;
  lastRuns: JobRun[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  schedule: string;
  lastRun?: TestRun;
  successRate: number;
  totalRuns: number;
}

export interface Notification {
  id: string;
  type: 'failure' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  workflowId?: string;
  runId?: string;
}

export interface DailyStats {
  date: string;
  success: number;
  failure: number;
  total: number;
}

export interface MetricData {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}
