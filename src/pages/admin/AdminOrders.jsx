import React, { useState } from 'react';
import { Search, Circle, ChevronDown, ShoppingBag, MapPin, Receipt, Clock } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLOR = {
  Delivered: '#22c55e',
  Shipped: '#3b82f6',
  Processing: '#f59e0b',
  Pending: '#6b7280',
  Cancelled: '#ef4444',
};

const AdminOrders = () => {
  const { orders, updateOrderStatus, totalRevenue } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = orders.filter(o => {
    const matchSearch = String(o.customer || '').toLowerCase().includes(search.toLowerCase()) ||
      String(o.id || '').toLowerCase().includes(search.toLowerCase()) ||
      String(o.email || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Orders">
      {/* Quick Summary Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
        {['All', ...STATUS_OPTIONS].map(status => {
          const count = status === 'All' ? orders.length : orders.filter(o => o.status === status).length;
          const active = filterStatus === status;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '20px 24px', background: active ? '#1a1a1a' : '#0f0f0f',
                border: active ? `1px solid ${STATUS_COLOR[status] || '#fff'}40` : '1px solid #1e1e1e',
                borderRadius: 12, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                boxShadow: active ? '0 10px 20px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Circle size={8} fill={STATUS_COLOR[status] || '#fff'} color="transparent" />
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: active ? '#fff' : '#444' }}>{status}</p>
              </div>
              <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 32, marginTop: 12, color: STATUS_COLOR[status] || '#fff' }}>{count}</p>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer, email or order ref..."
            style={{ width: '100%', padding: '14px 16px 14px 52px', background: '#0a0a0a', border: '1px solid #222', color: '#fff', fontSize: 14, borderRadius: 10, outline: 'none' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, paddingLeft: 12 }} className="md-hidden lg-flex">
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#444', letterSpacing: '0.12em', marginBottom: 4 }}>Total Revenue</p>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 20, color: '#22c55e' }}>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#444', letterSpacing: '0.12em', marginBottom: 4 }}>Search Result</p>
            <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 20, color: '#fff' }}>{filtered.length} <span style={{ fontSize: 13, color: '#444' }}>orders</span></p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflowX: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ minWidth: 1000 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.2fr 1fr 1.2fr 1.5fr 150px', gap: 24, padding: '16px 28px', borderBottom: '1px solid #1e1e1e', background: '#161616' }}>
            {['Order Ref', 'Customer Details', 'Ship to', 'Qty', 'Order Date', 'Current Status', 'Action'].map(h => (
              <p key={h} style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#444' }}>{h}</p>
            ))}
          </div>

          {!filtered || filtered.length === 0 ? (
            <div style={{ padding: '100px 48px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <ShoppingBag size={32} color="#222" />
              </div>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, color: '#333', textTransform: 'uppercase' }}>No matching records</h3>
              <p style={{ fontSize: 14, color: '#222', marginTop: 8 }}>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            filtered.map(order => (
              <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr 1.2fr 1fr 1.2fr 1.5fr 150px', gap: 24, padding: '24px 28px', borderBottom: '1px solid #141414', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1a1a1a', padding: '6px 12px', borderRadius: 6, border: '1px solid #222', width: 'fit-content' }}>
                    <Receipt size={14} color="#666" />
                    <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#aaa', fontWeight: 800 }}>{order.id}</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{order.customer}</p>
                  <p style={{ fontSize: 11, color: '#444', marginTop: 4 }}>{order.email}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={13} color="#444" />
                    <p style={{ fontSize: 13, color: '#666', fontWeight: 700 }}>{order.city}</p>
                  </div>
                </div>
                <p style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>{order.items} <span style={{ fontSize: 10, color: '#444' }}>PCS</span></p>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={13} color="#444" />
                    <p style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>{order.date}</p>
                  </div>
                </div>
                <div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 10, fontWeight: 900, padding: '6px 12px', borderRadius: 20,
                    color: STATUS_COLOR[order.status] || '#888',
                    background: `${STATUS_COLOR[order.status] || '#888'}10`,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    border: `1px solid ${STATUS_COLOR[order.status] || '#888'}20`,
                  }}>
                    <Circle size={6} fill={STATUS_COLOR[order.status]} color="transparent" />
                    {order.status}
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      width: '100%', padding: '10px 32px 10px 14px', background: '#1a1a1a', border: '1px solid #2a2a2a',
                      color: '#bbb', fontSize: 12, borderRadius: 8, cursor: 'pointer',
                      appearance: 'none', fontFamily: 'Inter,sans-serif', fontWeight: 700,
                    }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#444' }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
