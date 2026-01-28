import { TestRun, Workflow, Notification, DailyStats, Job, JobRun, RunResult } from '@/types/ci';

export const mockTestRuns: TestRun[] = [
  {
    id: 'run-001',
    workflowName: 'Nightly Integration Tests',
    branch: 'main',
    commit: 'a1b2c3d',
    commitMessage: 'feat: add container runtime support',
    status: 'success',
    duration: 1847,
    startedAt: new Date('2026-01-28T02:00:00'),
    completedAt: new Date('2026-01-28T02:30:47'),
    triggeredBy: 'schedule',
    testsPassed: 245,
    testsFailed: 0,
    testsSkipped: 3,
  },
  {
    id: 'run-002',
    workflowName: 'Unit Tests',
    branch: 'feature/seccomp-support',
    commit: 'e4f5g6h',
    commitMessage: 'fix: seccomp profile loading',
    status: 'failure',
    duration: 423,
    startedAt: new Date('2026-01-28T01:15:00'),
    completedAt: new Date('2026-01-28T01:22:03'),
    triggeredBy: 'push',
    testsPassed: 189,
    testsFailed: 4,
    testsSkipped: 0,
  },
  {
    id: 'run-003',
    workflowName: 'E2E Tests',
    branch: 'main',
    commit: 'i7j8k9l',
    commitMessage: 'docs: update installation guide',
    status: 'running',
    duration: 0,
    startedAt: new Date('2026-01-28T03:45:00'),
    triggeredBy: 'manual',
    testsPassed: 67,
    testsFailed: 0,
    testsSkipped: 0,
  },
  {
    id: 'run-004',
    workflowName: 'Nightly Integration Tests',
    branch: 'main',
    commit: 'm0n1o2p',
    commitMessage: 'chore: bump dependencies',
    status: 'success',
    duration: 1923,
    startedAt: new Date('2026-01-27T02:00:00'),
    completedAt: new Date('2026-01-27T02:32:03'),
    triggeredBy: 'schedule',
    testsPassed: 243,
    testsFailed: 0,
    testsSkipped: 5,
  },
  {
    id: 'run-005',
    workflowName: 'Security Scan',
    branch: 'main',
    commit: 'q3r4s5t',
    commitMessage: 'sec: update vulnerable deps',
    status: 'success',
    duration: 312,
    startedAt: new Date('2026-01-27T14:20:00'),
    completedAt: new Date('2026-01-27T14:25:12'),
    triggeredBy: 'push',
    testsPassed: 42,
    testsFailed: 0,
    testsSkipped: 0,
  },
  {
    id: 'run-006',
    workflowName: 'Nightly Integration Tests',
    branch: 'main',
    commit: 'u6v7w8x',
    commitMessage: 'feat: add wasm runtime',
    status: 'failure',
    duration: 1654,
    startedAt: new Date('2026-01-26T02:00:00'),
    completedAt: new Date('2026-01-26T02:27:34'),
    triggeredBy: 'schedule',
    testsPassed: 238,
    testsFailed: 7,
    testsSkipped: 3,
  },
  {
    id: 'run-007',
    workflowName: 'Unit Tests',
    branch: 'main',
    commit: 'y9z0a1b',
    commitMessage: 'refactor: optimize memory allocation',
    status: 'success',
    duration: 398,
    startedAt: new Date('2026-01-26T10:15:00'),
    completedAt: new Date('2026-01-26T10:21:38'),
    triggeredBy: 'push',
    testsPassed: 193,
    testsFailed: 0,
    testsSkipped: 0,
  },
  {
    id: 'run-008',
    workflowName: 'E2E Tests',
    branch: 'develop',
    commit: 'c2d3e4f',
    commitMessage: 'test: add kubernetes integration tests',
    status: 'pending',
    duration: 0,
    startedAt: new Date('2026-01-28T04:00:00'),
    triggeredBy: 'schedule',
    testsPassed: 0,
    testsFailed: 0,
    testsSkipped: 0,
  },
];

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf-001',
    name: 'CI Workflow',
    description: 'Full integration test suite running against all supported runtimes',
    schedule: '0 2 * * *',
    successRate: 85.7,
    totalRuns: 28,
    lastRun: mockTestRuns[0],
  },
  {
    id: 'wf-002',
    name: 'Nightly Tests',
    description: 'Core unit tests for urunc components',
    schedule: 'on push',
    successRate: 94.2,
    totalRuns: 156,
    lastRun: mockTestRuns[1],
  },
  {
    id: 'wf-003',
    name: 'E2E Tests',
    description: 'End-to-end tests with Kubernetes and containerd',
    schedule: '0 */6 * * *',
    successRate: 78.4,
    totalRuns: 89,
    lastRun: mockTestRuns[2],
  },
];

const generateJobRuns = (pattern: RunResult[]): JobRun[] => {
  return pattern.map((result, i) => ({
    id: `run-${i}`,
    result,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    duration: result === 'skip' ? 0 : Math.floor(Math.random() * 300) + 30,
    logs: result === 'fail' 
      ? `Error: Test failed at step ${Math.floor(Math.random() * 5) + 1}
      
FAILED: test_container_runtime_initialization
  Expected: container to start successfully
  Actual: received timeout error after 30s
  
Stack trace:
  at ContainerRuntime.init (src/runtime/container.go:142)
  at TestSuite.runTests (src/test/suite.go:87)
  at main.run (src/main.go:23)

Exit code: 1
Duration: ${Math.floor(Math.random() * 60) + 10}s`
      : result === 'pass'
      ? `✓ All tests passed successfully

Test Results:
  ✓ test_container_creation (2.3s)
  ✓ test_runtime_initialization (1.8s)
  ✓ test_memory_allocation (0.9s)
  ✓ test_process_isolation (3.1s)
  ✓ test_network_setup (2.7s)

Total: 5 tests passed
Duration: ${Math.floor(Math.random() * 60) + 10}s
Exit code: 0`
      : `⊘ Test skipped

Reason: Dependency condition not met
Skipped by: workflow configuration
Duration: 0s`,
  }));
};

const calculatePassRate = (runs: JobRun[]): number => {
  const validRuns = runs.filter(r => r.result !== 'skip');
  if (validRuns.length === 0) return 0;
  const passed = validRuns.filter(r => r.result === 'pass').length;
  return (passed / validRuns.length) * 100;
};

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    name: 'Lint code / lint (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['fail', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-002',
    name: 'Unit tests / unit-test (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-003',
    name: 'Build / build (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-004',
    name: 'Lint Files & commits / Lint Commit Messages (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'fail', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-005',
    name: 'Build / build (arm64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'fail', 'pass', 'pass']),
  },
  {
    id: 'job-006',
    name: 'Lint Files & commits / Check License Headers (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-007',
    name: 'Lint Files & commits / Spell Check Repo (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['fail', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass']),
  },
  {
    id: 'job-008',
    name: 'E2E test / VM test (amd64)',
    workflowId: 'wf-001',
    passRate: 0,
    lastRuns: generateJobRuns(['pass', 'pass', 'pass', 'pass', 'fail', 'fail', 'fail', 'fail', 'pass', 'pass']),
  },
  {
    id: 'job-009',
    name: 'Build',
    workflowId: 'wf-002',
    passRate: 0,
    lastRuns: generateJobRuns(['skip', 'skip', 'skip', 'skip', 'skip']),
  },
  {
    id: 'job-010',
    name: 'Unit tests',
    workflowId: 'wf-002',
    passRate: 0,
    lastRuns: generateJobRuns(['skip', 'skip', 'skip', 'skip', 'skip']),
  },
  {
    id: 'job-011',
    name: 'Lint Files & commits',
    workflowId: 'wf-002',
    passRate: 0,
    lastRuns: generateJobRuns(['skip']),
  },
  {
    id: 'job-012',
    name: 'Lint code',
    workflowId: 'wf-002',
    passRate: 0,
    lastRuns: generateJobRuns(['skip']),
  },
  {
    id: 'job-013',
    name: 'E2E test',
    workflowId: 'wf-002',
    passRate: 0,
    lastRuns: generateJobRuns(['skip', 'skip', 'skip', 'skip', 'skip', 'skip', 'fail']),
  },
];

// Calculate pass rates
mockJobs.forEach(job => {
  job.passRate = calculatePassRate(job.lastRuns);
});

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'failure',
    title: 'Nightly Tests Failed',
    message: 'Nightly Integration Tests failed on main branch. 7 tests failed in wasm runtime module.',
    timestamp: new Date('2026-01-26T02:27:34'),
    read: false,
    workflowId: 'wf-001',
    runId: 'run-006',
  },
  {
    id: 'notif-002',
    type: 'failure',
    title: 'Unit Tests Failed',
    message: 'Unit Tests failed on feature/seccomp-support. 4 tests failed in seccomp profile loader.',
    timestamp: new Date('2026-01-28T01:22:03'),
    read: false,
    workflowId: 'wf-002',
    runId: 'run-002',
  },
  {
    id: 'notif-003',
    type: 'warning',
    title: 'E2E Tests Running Long',
    message: 'E2E Tests have been running for over 45 minutes. Consider investigating.',
    timestamp: new Date('2026-01-28T04:30:00'),
    read: true,
    workflowId: 'wf-003',
    runId: 'run-003',
  },
  {
    id: 'notif-004',
    type: 'success',
    title: 'All Nightly Tests Passed',
    message: 'Nightly Integration Tests completed successfully. 245 tests passed.',
    timestamp: new Date('2026-01-28T02:30:47'),
    read: true,
    workflowId: 'wf-001',
    runId: 'run-001',
  },
  {
    id: 'notif-005',
    type: 'info',
    title: 'New Workflow Added',
    message: 'Performance benchmarks workflow has been added to the CI pipeline.',
    timestamp: new Date('2026-01-25T14:00:00'),
    read: true,
  },
];

export const mockDailyStats: DailyStats[] = [
  { date: '2026-01-22', success: 12, failure: 2, total: 14 },
  { date: '2026-01-23', success: 15, failure: 1, total: 16 },
  { date: '2026-01-24', success: 14, failure: 3, total: 17 },
  { date: '2026-01-25', success: 18, failure: 0, total: 18 },
  { date: '2026-01-26', success: 11, failure: 4, total: 15 },
  { date: '2026-01-27', success: 16, failure: 1, total: 17 },
  { date: '2026-01-28', success: 8, failure: 2, total: 10 },
];

export const getMetrics = () => {
  const totalRuns = mockTestRuns.length;
  const successRuns = mockTestRuns.filter(r => r.status === 'success').length;
  const failureRuns = mockTestRuns.filter(r => r.status === 'failure').length;
  const successRate = ((successRuns / totalRuns) * 100).toFixed(1);
  const avgDuration = mockTestRuns
    .filter(r => r.duration > 0)
    .reduce((acc, r) => acc + r.duration, 0) / mockTestRuns.filter(r => r.duration > 0).length;

  return {
    successRate: `${successRate}%`,
    totalRuns,
    failures: failureRuns,
    avgDuration: Math.round(avgDuration),
  };
};
