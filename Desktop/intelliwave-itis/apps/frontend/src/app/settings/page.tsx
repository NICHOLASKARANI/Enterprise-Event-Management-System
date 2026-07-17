'use client';
import Sidebar from '@/components/dashboard/Sidebar';

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '32px', color: 'white' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Manage your account and preferences</p>
        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
          <p style={{ color: '#94a3b8' }}>Account settings will appear here.</p>
        </div>
      </div>
    </div>
  );
}
