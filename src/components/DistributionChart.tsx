import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { DistributionParams, ChartDataPoint } from '../types';

interface DistributionChartProps {
  params: DistributionParams;
}

export const DistributionChart: React.FC<DistributionChartProps> = ({ params }) => {
  const { mean, stdDev } = params;

  const data = useMemo(() => {
    const points: ChartDataPoint[] = [];
    // Fixed range from -10 to 10 to allow users to see the curve move visually
    // Otherwise if axes scale automatically, the curve looks static.
    const start = -10;
    const end = 10;
    const step = 0.1;

    for (let x = start; x <= end; x += step) {
      // Normal Distribution PDF formula
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      points.push({ x: Number(x.toFixed(1)), y });
    }
    return points;
  }, [mean, stdDev]);

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-10, 10]} 
            tickCount={11}
            stroke="#64748b"
            tick={{fontSize: 12}}
          />
          <YAxis 
            domain={[0, 'auto']} 
            stroke="#64748b"
            tick={{fontSize: 12}}
            label={{ value: 'Probability Density', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
          />
          <Tooltip 
            formatter={(value: number) => [value.toFixed(4), 'Density']}
            labelFormatter={(label) => `x: ${label}`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <ReferenceLine x={mean} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'μ', fill: '#ef4444' }} />
          <Area 
            type="monotone" 
            dataKey="y" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorY)" 
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
