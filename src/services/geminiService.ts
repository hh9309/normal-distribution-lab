import { GoogleGenAI } from "@google/genai";

export const explainDistribution = async (
  mean: number, 
  stdDev: number, 
  model: string, 
  userApiKey: string
): Promise<string> => {
  
  const prompt = `
      解释一下正态分布（Normal Distribution），当均值 (Mean, μ) 为 ${mean}，
      标准差 (Standard Deviation, σ) 为 ${stdDev} 时的几何意义和实际含义。
      
      请用通俗易懂的中文简短解释：
      1. 曲线的中心位置在哪里？
      2. 曲线的胖瘦/高低如何变化？
      3. 数据的离散程度如何？
      
      保持回答在 150 字以内。
    `;

  // Handle DeepSeek
  if (model === 'deepseek') {
    if (!userApiKey) {
      return "使用 DeepSeek 模型需要提供 API Key。";
    }

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userApiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "You are a helpful math tutor." },
            { role: "user", content: prompt }
          ],
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "未收到回复。";
    } catch (error: any) {
      console.error("DeepSeek API Error:", error);
      return `DeepSeek 请求失败: ${error.message}`;
    }
  }
  
  // Handle Gemini (Default)
  else {
    // For Gemini, use provided key or fallback to env var
    const apiKey = userApiKey || process.env.API_KEY;

    if (!apiKey) {
      return "未检测到 API Key。请在输入框中提供 Key，或配置环境变量。";
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      // Use standard flash model for 'gemini-2.5' selection
      const modelName = 'gemini-2.5-flash';

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      return response.text || "无法生成解释。";
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return `Gemini 请求失败: ${error.message}`;
    }
  }
};