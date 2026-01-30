import React, { useState } from 'react';
import { DistributionChart } from './components/DistributionChart';
import { Controls } from './components/Controls';
import { FormulaDisplay } from './components/FormulaDisplay';
import { AIExplainer } from './components/AIExplainer';
import { DistributionParams } from './types';

function App() {
  const [params, setParams] = useState<DistributionParams>({
    mean: 0,
    stdDev: 1
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            正态分布可视化 (Normal Distribution)
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            通过交互式调整均值 (μ) 和标准差 (σ)，直观理解高斯分布的形态变化。
          </p>
        </header>

        {/* Top Section: Controls (Left) & Chart (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Controls & Note */}
          <div className="space-y-6">
            <Controls params={params} setParams={setParams} />
            
            {/* Educational Note */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-sm text-blue-800 space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                小知识
              </h4>
              <ul className="list-disc list-inside space-y-1 opacity-80">
                <li><b>均值 (μ)</b> 决定曲线的中心位置。</li>
                <li><b>标准差 (σ)</b> 决定曲线的“胖瘦”和陡峭程度。</li>
                <li>σ 越大，曲线越扁平，数据越分散。</li>
                <li>总面积（概率之和）永远为 1。</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
               <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <h2 className="font-semibold text-slate-700">概率密度曲线</h2>
                 <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded border">X轴: [-10, 10]</span>
               </div>
               <DistributionChart params={params} />
            </div>
          </div>

        </div>

        {/* Bottom Section: AI Analysis & Formula */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <AIExplainer params={params} />
           <FormulaDisplay params={params} />
        </div>

      </div>
    </div>
  );
}

export default App;