import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // 设置base路径，必须与GitHub仓库名匹配
      // 请将'normal-distribution-lab'替换为您的实际仓库名
      base: '/normal-distribution-lab/',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
        open: true, // 自动在浏览器打开
      },
      
      plugins: [react()],
      
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'), // 修改为指向src目录
        }
      },
      
      // 生产构建配置
      build: {
        outDir: 'dist', // 构建输出目录
        emptyOutDir: true, // 构建前清空目录
        // 可以在此添加代码分割等优化配置
      }
    };
});