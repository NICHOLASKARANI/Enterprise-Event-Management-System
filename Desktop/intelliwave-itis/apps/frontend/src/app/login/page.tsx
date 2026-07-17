'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'demo@intelliwave.com' && password === 'demo123') {
      const token = 'demo-jwt-' + Date.now();
      document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify({ email, username: 'demo', role: 'USER', firstName: 'Alex', lastName: 'Trader' }));
      setTimeout(() => { window.location.href = '/dashboard'; }, 150);
    } else {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-30%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 6s ease-in-out infinite reverse' }} />
      
      {/* Grid Pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Login Card */}
      <div className="glass-card" style={{ width: '440px', padding: '48px', position: 'relative', zIndex: 1, animation: 'slideUp 0.6s ease-out' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 8px 32px rgba(59,130,246,0.3)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>
            <span className="gradient-text">IntelliWave</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 400 }}>Enterprise AI Trading Platform</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: '#ef4444', fontSize: '13px', fontWeight: 500 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
            <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="demo@intelliwave.com" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Authenticating...' : 'Sign In to Platform'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
          Demo credentials: <span className="mono" style={{ color: 'var(--text-secondary)' }}>demo@intelliwave.com</span> / <span className="mono" style={{ color: 'var(--text-secondary)' }}>demo123</span>
        </div>
      </div>
    </div>
  );
}
