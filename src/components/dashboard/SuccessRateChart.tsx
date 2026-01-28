import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SuccessRateChartProps {
  successRate: number;
}

const SuccessRateChart = ({ successRate }: SuccessRateChartProps) => {
  const data = [
    { name: 'Success', value: successRate },
    { name: 'Failure', value: 100 - successRate },
  ];

  const COLORS = ['hsl(var(--success))', 'hsl(var(--destructive))'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3">
          <p className="text-sm font-medium">
            {payload[0].name}: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Overall Success Rate</h3>
        <p className="text-sm text-muted-foreground">All workflows combined</p>
      </div>

      <div className="h-[200px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{successRate.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Passed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-sm text-muted-foreground">Failed</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessRateChart;
