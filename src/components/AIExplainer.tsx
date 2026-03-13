import React, { useState } from 'react';
import { explainDistribution } from '../services/geminiService';
import { DistributionParams } from '../types';

interface AIExplainerProps {
  params: DistributionParams;
}

export const AIExplainer: React.FC<AIExplainerProps> = ({ params }) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5');
  const [apiKey, setApiKey] = useState<string>('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const handleExplain = async () => {
    setLoading(true);
    setExplanation(null);
    try {
      const text = await explainDistribution(params.mean, params.stdDev, selectedModel, apiKey);
      setExplanation(text);
    } catch (err) {
      setExplanation("系统错误，无法完成分析。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-500">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6.97 15.03a.75.75 0 10-1.06-1.06 1.5 1.5 0 01-2.12 0 .75.75 0 11-1.06 1.06 3 3 0 004.24 0zM12.75 5.25a.75.75 0 00-1.06-1.06 3 3 0 000 4.24.75.75 0 101.06-1.06 1.5 1.5 0 010-2.12zm-3 0a.75.75 0 00-1.06 1.06 1.5 1.5 0 010 2.12.75.75 0 101.06 1.06 3 3 0 000-4.24z" clipRule="evenodd" />
            </svg>
            AI 智能分析
          </h3>
          <p className="text-xs text-indigo-700/60 mt-1">
            μ={params.mean}, σ={params.stdDev}
          </p>
        </div>
        
        <div className="flex flex-col gap-2 w-full sm:w-auto">
             <div className="flex gap-2">
                <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="text-sm border-indigo-200 rounded-md px-2 py-1.5 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none border"
                >
                    <option value="gemini-2.5">Gemini 2.5</option>
                    <option value="deepseek">DeepSeek</option>
                </select>
                 <button
                  onClick={handleExplain}
                  disabled={loading}
                  className={`px-4 py-1.5 rounded-lg font-medium text-sm text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap ${
                    loading 
                      ? 'bg-indigo-300 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {loading ? '分析中...' : '生成解释'}
                </button>
             </div>
             
             <input 
                type="password" 
                placeholder={selectedModel === 'deepseek' ? "输入 DeepSeek API Key (必填)" : "输入 API Key (可选)"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full text-xs px-2 py-1.5 border border-indigo-200 rounded-md focus:outline-none focus:border-indigo-400 bg-white/80 placeholder-slate-400"
             />
        </div>
      </div>

      <div className="flex-1 min-h-[100px] relative">
        {loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                 <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
             </div>
        )}
        
        {explanation ? (
          <div className="p-4 bg-white/80 border border-indigo-100 rounded-lg text-slate-700 leading-relaxed text-sm animate-fade-in h-full overflow-y-auto max-h-[200px] md:max-h-none shadow-inner custom-scrollbar">
            {explanation}
          </div>
        ) : (
           <div className="h-full flex items-center justify-center text-slate-400 text-sm italic border-2 border-dashed border-indigo-100 rounded-lg p-4">
              点击“生成解释”获取当前参数的智能分析
           </div>
        )}
      </div>
    </div>
  );
};