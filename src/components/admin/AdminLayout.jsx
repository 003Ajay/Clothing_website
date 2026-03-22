import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Tag, ShoppingBag,
  LogOut, ExternalLink, ChevronRight, Menu, X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const NAV = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/categories', icon: Tag, label: 'Categories' },
  { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
];

const AdminLayout = ({ children, title }) => {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter,sans-serif', background: '#0a0a0a', color: '#fff' }}>
      {/* Sidebar - Desktop */}
      <aside style={{
        width: 240, flexShrink: 0, background: '#111', borderRight: '1px solid #1e1e1e',
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }} className="admin-sidebar hidden lg-flex">
        {/* Brand */}
        <div style={{ padding: '28px 24px', borderBottom: '1px solid #1e1e1e' }}>
          <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 16, letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fff' }}>
            PORTER <span style={{ color: '#444' }}>&</span> BOAT
          </p>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {NAV.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 6, marginBottom: 2,
                background: active ? '#1e1e1e' : 'transparent',
                color: active ? '#fff' : '#666',
                fontWeight: active ? 700 : 500, fontSize: 13,
                transition: 'all 0.15s',
              }}>
                <Icon size={16} />
                {label}
                {active && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 6,
            color: '#666', fontWeight: 500, fontSize: 13,
          }}>
            <ExternalLink size={15} /> View Store
          </a>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 6,
            color: '#ff5555', fontWeight: 600, fontSize: 13, width: '100%', cursor: 'pointer',
            textAlign: 'left',
          }}>
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          padding: '16px 20px', borderBottom: '1px solid #1e1e1e', background: '#111',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ padding: 8, color: '#888', display: 'flex' }}
              className="lg-hidden"
            >
              <Menu size={22} />
            </button>
            <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
              {title}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link to="/" target="_blank" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#555' }} className="hidden sm-block">Live View</Link>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: '#fff' }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          />
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 280, background: '#111',
            display: 'flex', flexDirection: 'column', boxShadow: '20px 0 40px rgba(0,0,0,0.5)',
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 16, textTransform: 'uppercase' }}>ADMIN</p>
                <p style={{ fontSize: 10, color: '#555', fontWeight: 700, textTransform: 'uppercase' }}>Porter & Boat</p>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#888' }}><X size={20} /></button>
            </div>
            <nav style={{ padding: 16, flex: 1 }}>
              {NAV.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path} to={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 6,
                    color: location.pathname === path ? '#fff' : '#666',
                    background: location.pathname === path ? '#1e1e1e' : 'transparent',
                    fontSize: 14, fontWeight: 600, marginBottom: 4,
                  }}
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </nav>
            <div style={{ padding: 16, borderTop: '1px solid #1e1e1e' }}>
              <button onClick={handleLogout} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 6, color: '#ff5555',
                fontSize: 14, fontWeight: 700, width: '100%',
              }}>
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
