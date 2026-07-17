'use client';
import Sidebar from '@/components/dashboard/Sidebar';

export default function BotsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Trading Bots</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Manage your automated trading strategies</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {['MA Crossover', 'RSI Scalper', 'Grid Master'].map((name, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '12px', padding: '20px', border: '1px solid #334155' }}>
              <h3 style={{ marginBottom: '8px' }}>{name}</h3>
              <p style={{ color: '#10b981', fontSize: '14px' }}>Active</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button style={{ padding: '8px 16px', background: '#3b82f6', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>Start</button>
                <button style={{ padding: '8px 16px', background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontSize: '12px' }}>Stop</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
