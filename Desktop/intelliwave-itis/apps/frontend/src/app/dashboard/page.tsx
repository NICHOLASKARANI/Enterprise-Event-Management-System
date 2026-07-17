'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: '◉', path: '/dashboard' },
    { label: 'Trading', icon: '◆', path: '/trading' },
    { label: 'Bots', icon: '⚙', path: '/bots' },
    { label: 'Analytics', icon: '◈', path: '/analytics' },
    { label: 'AI Assistant', icon: '✦', path: '/settings' },
    { label: 'Settings', icon: '◐', path: '/settings' },
  ];

  const stats = [
    { label: 'Portfolio Value', value: '$124,850.00', change: '+15.2%', color: '#3b82f6', icon: '◆' },
    { label: "Today's P&L", value: '+$2,345.50', change: '+2.1%', color: '#10b981', icon: '▲' },
    { label: 'Active Bots', value: '7', change: '3 profitable', color: '#8b5cf6', icon: '⚙' },
    { label: 'Win Rate', value: '71.4%', change: '+5.2%', color: '#f59e0b', icon: '◈' },
  ];

  const positions = [
    { symbol: 'Volatility 75', side: 'BUY', size: '$5,000', pnl: '+$234.50', pnlPercent: '+4.69%', status: 'active' },
    { symbol: 'Volatility 100', side: 'SELL', size: '$3,000', pnl: '-$89.00', pnlPercent: '-2.97%', status: 'active' },
    { symbol: 'Boom 300', side: 'BUY', size: '$2,500', pnl: '+$156.20', pnlPercent: '+6.25%', status: 'active' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Premium Sidebar */}
      <div style={{ width: '260px', background: 'rgba(17,25,40,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(59,130,246,0.3)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '18px' }}>I</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.3px' }}>IntelliWave</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>ITIS Platform</div>
            </div>
          </div>
        </div>
        
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(item => (
            <button key={item.path} onClick={() => router.push(item.path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 16px', background: item.path === '/dashboard' ? 'rgba(59,130,246,0.1)' : 'transparent', border: 'none', borderRadius: '10px', color: item.path === '/dashboard' ? '#3b82f6' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '13.5px', fontWeight: 500, marginBottom: '2px', transition: 'all 150ms', fontFamily: 'Inter' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: 'white' }}>AT</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>Alex Trader</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Professional</div>
            </div>
          </div>
          <button onClick={() => { localStorage.clear(); document.cookie = 'accessToken=; max-age=0'; router.push('/login'); }} style={{ width: '100%', padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#ef4444', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter' }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              {greeting}
            </p>
            <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>
              Trading <span className="gradient-text">Dashboard</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • Market Open
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-primary" style={{ fontSize: '12px', padding: '10px 18px' }}>+ New Trade</button>
            <button style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 18px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter' }}>Deposit</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '80px', color: stat.color, opacity: 0.05, fontWeight: 900 }}>{stat.icon}</div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value" style={{ color: stat.color, margin: '8px 0' }}>{stat.value}</p>
              <span className="badge badge-success">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Open Positions */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#3b82f6' }}>◆</span> Open Positions
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Symbol', 'Side', 'Size', 'P&L', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 8px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '14px 8px', fontWeight: 600, fontSize: '13px' }}>{pos.symbol}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <span className={`badge ${pos.side === 'BUY' ? 'badge-success' : 'badge-warning'}`}>{pos.side}</span>
                    </td>
                    <td style={{ padding: '14px 8px', fontSize: '13px', fontFamily: 'JetBrains Mono' }}>{pos.size}</td>
                    <td style={{ padding: '14px 8px', fontWeight: 600, fontSize: '13px', color: pos.pnl.startsWith('+') ? '#10b981' : '#ef4444', fontFamily: 'JetBrains Mono' }}>{pos.pnl}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Insights */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="gradient-text">✦</span> AI Market Insights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(59,130,246,0.05)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(59,130,246,0.1)' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#3b82f6' }}>Volatility 75 Analysis</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Strong bullish momentum detected. RSI at 62 indicates room for further upside. Consider long positions with ATR-based stops.</p>
              </div>
              <div style={{ background: 'rgba(139,92,246,0.05)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(139,92,246,0.1)' }}>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '6px', color: '#8b5cf6' }}>Risk Alert</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Portfolio drawdown at 8.2%. Current risk exposure is moderate. Consider reducing position sizes on correlated assets.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
