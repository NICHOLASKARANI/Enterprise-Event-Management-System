'use client';
import Sidebar from '@/components/dashboard/Sidebar';

export default function TradingPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Trading Terminal</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Execute trades and manage positions</p>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155', textAlign: 'center', color: '#94a3b8' }}>
          Trading interface loading... Connect your Deriv account to start trading.
        </div>
      </div>
    </div>
  );
}
