'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Trading', path: '/trading' },
    { label: 'Bots', path: '/bots' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#1e293b', borderRight: '1px solid #334155', padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
          <h2 style={{ color: '#3b82f6', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>IntelliWave</h2>
        </div>
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', padding: '10px 20px', background: 'transparent', border: 'none', color: item.path === '/dashboard' ? '#3b82f6' : '#94a3b8', cursor: 'pointer', fontSize: '13px', textAlign: 'left' }}>
              {item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => { localStorage.clear(); router.push('/login'); }} style={{ padding: '10px 20px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '8px' }}>Dashboard</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Trading overview and performance</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Portfolio Value</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6', margin: '0 0 8px' }}>$12,450.00</p>
            <p style={{ color: '#10b981', fontSize: '13px', margin: 0 }}>+15.2% this month</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Active Bots</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', margin: '0 0 8px' }}>3</p>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>Running strategies</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Today P&L</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981', margin: '0 0 8px' }}>+$234.50</p>
            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>12 trades today</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px', fontSize: '14px' }}>Win Rate</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', margin: '0 0 8px' }}>68%</p>
            <p style={{ color: '#10b981', fontSize: '13px', margin: 0 }}>+5% vs last week</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <h3 style={{ color: 'white', marginBottom: '16px' }}>Recent Activity</h3>
            {['Trade opened: Volatility 75', 'Bot started: MA Crossover', 'Trade closed: +$45', 'Deposit: +$500'].map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '13px' }}>{item}</div>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
            <h3 style={{ color: 'white', marginBottom: '16px' }}>Market Overview</h3>
            {[{ name: 'Volatility 75', price: '1,234.56', change: '+1.25%' }, { name: 'Volatility 100', price: '5,678.90', change: '-0.45%' }, { name: 'Boom 300', price: '3,456.78', change: '+2.10%' }].map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155' }}>
                <span style={{ color: '#e2e8f0', fontSize: '13px' }}>{m.name}</span>
                <span style={{ color: m.change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '13px' }}>{m.price} ({m.change})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
