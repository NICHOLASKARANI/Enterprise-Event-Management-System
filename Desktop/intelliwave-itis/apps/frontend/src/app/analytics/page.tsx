'use client';
import Sidebar from '@/components/dashboard/Sidebar';

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Analytics</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Performance metrics and insights</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <h3 style={{ marginBottom: '16px' }}>Win/Loss Ratio</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Chart Area</div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <h3 style={{ marginBottom: '16px' }}>Equity Curve</h3>
            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Chart Area</div>
          </div>
        </div>
      </div>
    </div>
  );
}
