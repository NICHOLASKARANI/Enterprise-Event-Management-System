'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try API login
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      window.location.href = '/dashboard';
    } catch {
      // Fallback: demo credentials
      if (email === 'demo@intelliwave.com' && password === 'demo123') {
        localStorage.setItem('accessToken', 'demo-token');
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials. Use demo@intelliwave.com / demo123');
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Arial' }}>
      <div style={{ background: '#1e293b', borderRadius: '16px', padding: '40px', width: '380px', border: '1px solid #334155' }}>
        <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>IntelliWave ITIS</h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '24px', fontSize: '14px' }}>Sign in to your account</p>
        
        {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px', textAlign: 'center', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px' }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ width: '100%', padding: '12px', marginBottom: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ width: '100%', padding: '12px', marginBottom: '20px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', boxSizing: 'border-box' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? '#2563eb' : '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
          No account? <Link href="/register" style={{ color: '#3b82f6' }}>Sign Up</Link>
        </p>
        <p style={{ color: '#64748b', textAlign: 'center', marginTop: '8px', fontSize: '12px' }}>Demo: demo@intelliwave.com / demo123</p>
      </div>
    </div>
  );
}