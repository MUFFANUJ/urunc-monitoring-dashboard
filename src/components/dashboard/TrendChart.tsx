import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DailyStats } from '@/types/ci';
import { format, parseISO } from 'date-fns';

interface TrendChartProps {
  data: DailyStats[];
}

const TrendChart = ({ data }: TrendChartProps) => {
  const formattedData = data.map((item) => ({
    ...item,
    dateFormatted: format(parseISO(item.date), 'MMM d'),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 min-w-[160px]">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-success flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success" />
                Success
              </span>
              <span className="text-sm font-medium">{payload[0]?.value}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-destructive flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                Failed
              </span>
              <span className="text-sm font-medium">{payload[1]?.value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Test Results Trend</h3>
        <p className="text-sm text-muted-foreground">Last 7 days overview</p>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="failureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="dateFormatted"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="success"
              name="Passed"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#successGradient)"
            />
            <Area
              type="monotone"
              dataKey="failure"
              name="Failed"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#failureGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
