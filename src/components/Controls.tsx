import React from 'react';
import { DistributionParams } from '../types';

interface ControlsProps {
  params: DistributionParams;
  setParams: React.Dispatch<React.SetStateAction<DistributionParams>>;
}

export const Controls: React.FC<ControlsProps> = ({ params, setParams }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">参数控制 (Parameters)</h3>
      
      {/* Mean Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="mean" className="text-sm font-medium text-slate-700">
            均值 (Mean, μ)
          </label>
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-sm font-mono font-bold">
            {params.mean.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          id="mean"
          name="mean"
          min="-5"
          max="5"
          step="0.1"
          value={params.mean}
          onChange={handleChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>-5.0</span>
          <span>中心偏移</span>
          <span>5.0</span>
        </div>
      </div>

      {/* StdDev Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="stdDev" className="text-sm font-medium text-slate-700">
            标准差 (Std Dev, σ)
          </label>
          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-sm font-mono font-bold">
            {params.stdDev.toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          id="stdDev"
          name="stdDev"
          min="0.2"
          max="5"
          step="0.1"
          value={params.stdDev}
          onChange={handleChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 hover:accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>0.2 (Sharp)</span>
          <span>形状变化</span>
          <span>5.0 (Flat)</span>
        </div>
      </div>
    </div>
  );
};
