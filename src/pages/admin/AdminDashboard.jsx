import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, ShoppingBag, Tag, ArrowUpRight, Circle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';

const STATUS_COLOR = {
  Delivered: '#22c55e',
  Shipped: '#3b82f6',
  Processing: '#f59e0b',
  Pending: '#6b7280',
};

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div style={{
    background: '#111', border: '1px solid #1e1e1e', borderRadius: 12,
    padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  }}>
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555', marginBottom: 12 }}>{label}</p>
      <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 32, color: '#fff', marginBottom: 4 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#444', fontWeight: 500 }}>{sub}</p>}
    </div>
    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${color}20` }}>
      <Icon size={20} color={color} />
    </div>
  </div>
);

const AdminDashboard = () => {
  const { products, categories, orders, totalRevenue } = useAdmin();
  const recentOrders = [...orders].slice(0, 5);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 20,
        marginBottom: 32,
      }}>
        <StatCard icon={TrendingUp} label="Total Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} sub="Lifetime earnings" color="#22c55e" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={orders.length} sub={`${pendingOrders} awaiting fulfillment`} color="#3b82f6" />
        <StatCard icon={Package} label="Products" value={products.length} sub="Available in store" color="#f59e0b" />
        <StatCard icon={Tag} label="Categories" value={categories.length} sub="Active collections" color="#a855f7" />
      </div>

      {/* Two Column Layout for Desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {/* Recent Orders Section */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>Recent Orders</h2>
            <Link to="/admin/orders" style={{ fontSize: 12, color: '#555', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: 400 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr', gap: 16, padding: '16px 24px', borderBottom: '1px solid #1a1a1a', background: '#161616' }}>
                {['Customer', 'Date', 'Total', 'Status'].map(h => (
                  <p key={h} style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444' }}>{h}</p>
                ))}
              </div>
              {recentOrders.map(order => (
                <div key={order.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr', gap: 16, padding: '18px 24px', borderBottom: '1px solid #141414', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#ddd' }}>{order.customer}</p>
                    <p style={{ fontSize: 11, color: '#444', fontFamily: 'monospace', marginTop: 2 }}>{order.id}</p>
                  </div>
                  <p style={{ fontSize: 12, color: '#666', fontWeight: 500 }}>{order.date}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>₹{order.total.toLocaleString('en-IN')}</p>
                  <div style={{ display: 'flex' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800,
                      color: STATUS_COLOR[order.status] || '#888', padding: '4px 10px', borderRadius: 20,
                      background: `${STATUS_COLOR[order.status] || '#888'}10`,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      border: `1px solid ${STATUS_COLOR[order.status] || '#888'}20`,
                    }}>
                      <Circle size={6} fill={STATUS_COLOR[order.status]} color="transparent" />
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20, color: '#fff' }}>Store Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Add New Product', to: '/admin/products', desc: 'Create a new listing in your store.', color: '#f59e0b' },
                { label: 'Manage Categories', to: '/admin/categories', desc: 'Add or edit collections and navigation.', color: '#a855f7' },
                { label: 'Fulfill Orders', to: '/admin/orders', desc: 'Check and update pending order status.', color: '#3b82f6' },
                { label: 'View Front Store', to: '/', desc: 'Open the customer-facing website.', color: '#fff', target: '_blank' },
              ].map(({ label, to, desc, color, target }) => (
                <Link key={label} to={to} target={target} style={{
                  display: 'block', padding: '16px 20px', background: '#161616', borderRadius: 10,
                  border: '1px solid #1e1e1e', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative', overflow: 'hidden',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#1e1e1e';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#fff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {label} <ArrowUpRight size={14} style={{ opacity: 0.3 }} />
                  </p>
                  <p style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>{desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #161616 0%, #0a0a0a 100%)', border: '1px solid #222', borderRadius: 12, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#555', marginBottom: 12 }}>Admin Profile</p>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 4 }}>PorterBoat Master Admin</h3>
              <p style={{ fontSize: 12, color: '#666' }}>Last Login: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
