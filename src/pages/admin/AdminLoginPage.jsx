import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

const AdminLoginPage = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const ok = login(form.username, form.password);
    setLoading(false);
    if (ok) navigate('/admin');
    else setError('Invalid credentials. Try admin / porterboat@2025');
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
            PORTER <span style={{ color: '#666' }}>&</span> BOAT
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#161616', border: '1px solid #222', padding: 40, borderRadius: 8 }}>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 22, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 8 }}>Sign In</h1>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 32 }}>Access the Porter & Boat admin dashboard</p>

          {error && (
            <div style={{ background: '#1a0000', border: '1px solid #cc3333', borderRadius: 4, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 8 }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
              <input
                type="text" required autoComplete="username"
                value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                placeholder="admin"
                style={{
                  width: '100%', padding: '12px 16px 12px 44px',
                  background: '#0f0f0f', border: '1px solid #2a2a2a',
                  color: '#fff', fontSize: 14, borderRadius: 4, outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = '#555'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
              <input
                type={showPw ? 'text' : 'password'} required autoComplete="current-password"
                value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••••"
                style={{
                  width: '100%', padding: '12px 44px 12px 44px',
                  background: '#0f0f0f', border: '1px solid #2a2a2a',
                  color: '#fff', fontSize: 14, borderRadius: 4, outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
                onFocus={e => e.target.style.borderColor = '#555'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
              <button
                type="button" onClick={() => setShowPw(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', cursor: 'pointer' }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', background: loading ? '#333' : '#fff', color: '#000',
              fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
              borderRadius: 4, cursor: loading ? 'not-allowed' : 'pointer', border: 'none',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: '#444' }}>
            Default: admin / porterboat@2025
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
