export const metadata = {
  title: 'IntelliWave ITIS | AI Trading Platform',
  description: 'Enterprise AI-Powered Trading Ecosystem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --primary: #3b82f6;
            --primary-dark: #2563eb;
            --accent: #8b5cf6;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --bg-primary: #0a0f1e;
            --bg-secondary: #111827;
            --bg-card: rgba(17, 25, 40, 0.75);
            --border: rgba(59, 130, 246, 0.15);
            --text-primary: #f1f5f9;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --glass: rgba(255, 255, 255, 0.03);
            --glass-border: rgba(255, 255, 255, 0.06);
            --shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
            --radius: 16px;
            --radius-sm: 10px;
            --transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: var(--bg-secondary); }
          ::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.3); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
          .glass {
            background: var(--glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
          }
          .glass-card {
            background: var(--bg-card);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            transition: all var(--transition);
          }
          .glass-card:hover {
            border-color: rgba(59, 130, 246, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            transform: translateY(-2px);
          }
          .gradient-text {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .gradient-border {
            position: relative;
            border-radius: var(--radius);
            background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15), rgba(6,182,212,0.15));
            padding: 1px;
          }
          .gradient-border > * {
            background: var(--bg-secondary);
            border-radius: calc(var(--radius) - 1px);
          }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 20px rgba(59,130,246,0.1); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.2); } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-glow { animation: pulse-glow 2s ease-in-out infinite; }
          .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
          .mono { font-family: 'JetBrains Mono', monospace; }
          .btn-primary {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all var(--transition);
            font-family: 'Inter', sans-serif;
          }
          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
          }
          .input-field {
            width: 100%;
            padding: 12px 16px;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(59, 130, 246, 0.2);
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            transition: all var(--transition);
            outline: none;
          }
          .input-field:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          .stat-value { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
          .stat-label { font-size: 13px; color: var(--text-secondary); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .badge-success { background: rgba(16,185,129,0.1); color: #10b981; }
          .badge-warning { background: rgba(245,158,11,0.1); color: #f59e0b; }
          .badge-info { background: rgba(59,130,246,0.1); color: #3b82f6; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
