import React from 'react';
import { DistributionParams } from '../types';

interface FormulaDisplayProps {
  params: DistributionParams;
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ params }) => {
  const { mean, stdDev } = params;
  
  // Prepare values for display (rounded for cleanliness)
  const variance = (stdDev * stdDev).toFixed(2);
  const sigmaDisplay = stdDev.toFixed(1);
  const meanDisplay = mean.toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center space-y-4 h-full">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">概率密度函数 (PDF)</h3>
      <div className="text-xl md:text-2xl font-serif text-slate-800 overflow-x-auto max-w-full p-2">
        <div className="flex items-center space-x-2">
          <span className="italic">f(x)</span>
          <span>=</span>
          <div className="flex flex-col items-center mx-1">
            <span className="border-b border-slate-800 w-full text-center px-1">1</span>
            <span>{sigmaDisplay}<span className="mx-0.5">√</span><span className="overline">2π</span></span>
          </div>
          <div className="flex items-start">
            <span className="italic text-lg">e</span>
            <div className="flex flex-col text-xs -mt-2 ml-1">
              <div className="flex items-center">
                <span>-</span>
                <div className="flex flex-col items-center mx-1">
                  <span className="border-b border-slate-800 w-full text-center px-1">
                    (x - {meanDisplay})<sup>2</sup>
                  </span>
                  <span>
                    2 &middot; {variance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 text-center">
        公式实时展示当前 μ (均值) 和 σ (标准差) 的代入值
      </p>
    </div>
  );
};