import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import TrendChart from '@/components/dashboard/TrendChart';
import JobsTable from '@/components/dashboard/JobsTable';
import SuccessRateChart from '@/components/dashboard/SuccessRateChart';
import {
  mockWorkflows,
  mockNotifications,
  mockDailyStats,
  mockJobs,
  getMetrics,
} from '@/data/mockData';
import { Notification } from '@/types/ci';
import { Activity, CheckCircle2, XCircle, Clock } from 'lucide-react';

const Index = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const metrics = getMetrics();

  const handleNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Calculate overall success rate
  const totalSuccess = mockDailyStats.reduce((acc, d) => acc + d.success, 0);
  const totalRuns = mockDailyStats.reduce((acc, d) => acc + d.total, 0);
  const overallSuccessRate = (totalSuccess / totalRuns) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header
        notifications={notifications}
        onNotificationRead={handleNotificationRead}
        onAllNotificationsRead={handleAllNotificationsRead}
        onNotificationDismiss={handleNotificationDismiss}
      />

      <main className="px-8 py-6 space-y-8">
        {/* Hero Section */}
        <div className="space-y-2 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground">
            CI/CD Overview
          </h2>
          <p className="text-muted-foreground">
            Monitor nightly tests, track failures, and maintain project reliability
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Success Rate"
            value={metrics.successRate}
            subtitle="Last 7 days"
            icon={<CheckCircle2 className="w-6 h-6" />}
            trend="up"
            trendValue="+2.3%"
            variant="success"
            delay={0}
          />
          <MetricCard
            title="Total Runs"
            value={metrics.totalRuns}
            subtitle="This week"
            icon={<Activity className="w-6 h-6" />}
            trend="up"
            trendValue="+12"
            delay={50}
          />
          <MetricCard
            title="Failed Tests"
            value={metrics.failures}
            subtitle="Needs attention"
            icon={<XCircle className="w-6 h-6" />}
            trend="down"
            trendValue="-3"
            variant="destructive"
            delay={100}
          />
          <MetricCard
            title="Avg Duration"
            value={`${Math.floor(metrics.avgDuration / 60)}m`}
            subtitle="Per workflow run"
            icon={<Clock className="w-6 h-6" />}
            trend="neutral"
            trendValue="0%"
            delay={150}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendChart data={mockDailyStats} />
          </div>
          <div>
            <SuccessRateChart successRate={overallSuccessRate} />
          </div>
        </div>

        {/* Jobs Dashboard Table */}
        <JobsTable jobs={mockJobs} workflows={mockWorkflows} />

        {/* Footer */}
        <footer className="flex items-center justify-between pt-8 pb-4 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>CNCF urunc Project</span>
          </div>
          <p>Dashboard for CI Testing • 2026 Term 1</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
