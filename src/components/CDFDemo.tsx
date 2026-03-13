import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CDFDemo: React.FC = () => {
  const [range, setRange] = useState<{ start: number; end: number }>({
    start: -1,
    end: 1,
  });

  const data = useMemo(() => {
    const points = [];
    const start = -4;
    const end = 4;
    const step = 0.05;

    for (let x = start; x <= end; x += step) {
      // Standard Normal Distribution (mean=0, stdDev=1)
      const exponent = -0.5 * Math.pow(x, 2);
      const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
      
      // Check if x is within the selected range for shading
      const isInRange = x >= range.start && x <= range.end;
      
      points.push({ 
        x: Number(x.toFixed(2)), 
        y,
        shadedY: isInRange ? y : 0
      });
    }
    return points;
  }, [range]);

  // Simple approximation for the integral (trapezoidal rule or just sum of small steps)
  const probability = useMemo(() => {
    let sum = 0;
    const step = 0.01;
    for (let x = range.start; x <= range.end; x += step) {
      const exponent = -0.5 * Math.pow(x, 2);
      const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(exponent);
      sum += y * step;
    }
    return Math.min(Math.max(sum, 0), 1).toFixed(4);
  }, [range]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Left: Controls & Formula */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            标准正态分布函数：区间概率
          </h3>
          <p className="text-sm text-slate-500">
            设定区间 [a, b]，计算变量落在该范围内的概率。
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">区间起点 (a)</label>
              <input 
                type="range" 
                min="-4" 
                max="4" 
                step="0.01" 
                value={range.start}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setRange(prev => ({ ...prev, start: Math.min(val, prev.end) }));
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="text-center font-mono text-indigo-600 font-bold">{range.start.toFixed(2)}</div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">区间终点 (b)</label>
              <input 
                type="range" 
                min="-4" 
                max="4" 
                step="0.01" 
                value={range.end}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setRange(prev => ({ ...prev, end: Math.max(val, prev.start) }));
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="text-center font-mono text-indigo-600 font-bold">{range.end.toFixed(2)}</div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
            <div className="text-center space-y-2">
              <div className="text-xs text-slate-400 uppercase font-semibold">概率积分公式</div>
              <div className="text-lg md:text-xl font-serif text-slate-700 flex items-center justify-center gap-2">
                <span>P({range.start.toFixed(2)} ≤ Z ≤ {range.end.toFixed(2)}) =</span>
                <div className="relative flex items-center">
                  <span className="text-3xl font-light">∫</span>
                  <div className="flex flex-col text-[10px] -ml-1 mr-1">
                    <span className="leading-none">{range.end.toFixed(2)}</span>
                    <span className="mt-2 leading-none">{range.start.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-center">
                      <span className="border-b border-slate-700 px-1 text-sm">1</span>
                      <span className="text-sm">√2π</span>
                    </div>
                    <span className="text-sm italic">e</span>
                    <sup className="text-[10px] -ml-1">-z²/2</sup>
                    <span className="text-sm ml-1 italic">dz</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">计算结果:</span>
              <span className="text-2xl font-bold text-indigo-600 font-mono">{probability}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Area Visualization */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">概率：密度函数积分面积 (Z ~ N(0,1))</h3>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-indigo-500/30 border border-indigo-500 rounded-sm"></div>
             <span className="text-xs text-slate-400">所选区间面积</span>
          </div>
        </div>
        
        <div className="flex-grow h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={[-4, 4]} 
                ticks={[-4, -3, -2, -1, 0, 1, 2, 3, 4]}
                stroke="#94a3b8"
                tick={{fontSize: 11}}
              />
              <YAxis hide domain={[0, 0.45]} />
              <Tooltip 
                formatter={(value: number) => [value.toFixed(4), 'Density']}
                labelFormatter={(label) => `z: ${label}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              {/* Base Curve */}
              <Area 
                type="monotone" 
                dataKey="y" 
                stroke="#cbd5e1" 
                fill="transparent" 
                strokeWidth={1}
                isAnimationActive={false}
              />
              {/* Shaded Area with enhanced animation */}
              <Area 
                type="monotone" 
                dataKey="shadedY" 
                stroke="#6366f1" 
                fill="#6366f1" 
                fillOpacity={0.4}
                strokeWidth={2}
                animationDuration={600}
                animationEasing="ease-in-out"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 text-center italic">
          注：标准正态分布的均值为 0，标准差为 1。图中阴影部分代表变量落入区间 [a, b] 的概率。
        </p>
      </div>
    </div>
  );
};
