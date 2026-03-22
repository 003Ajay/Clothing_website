import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Check, Package } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';

const EMPTY_PRODUCT = {
  name: '', price: '', category: 'oversized', image: '',
  description: '', fabrics: '', fit: 'Oversized Fit', care: '', bestSeller: false,
};

const InputStyle = {
  width: '100%', padding: '12px 14px', background: '#0f0f0f',
  border: '1px solid #2a2a2a', color: '#fff', fontSize: 14,
  borderRadius: 8, fontFamily: 'Inter,sans-serif', outline: 'none',
  transition: 'border-color 0.2s',
};

const LabelStyle = {
  display: 'block', fontSize: 11, fontWeight: 800,
  textTransform: 'uppercase', letterSpacing: '0.12em', color: '#555', marginBottom: 8,
};

const AdminProducts = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY_PRODUCT); setEditingId(null); setShowForm(true); };

  const openEdit = (product) => {
    setForm({ ...product, price: String(product.price) });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.image) return;
    const data = { ...form, price: Number(form.price) };
    if (editingId) updateProduct(editingId, data);
    else addProduct(data);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const F = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <AdminLayout title="Products">
      {saved && (
        <div style={{ marginBottom: 20, background: '#052e16', border: '1px solid #166534', borderRadius: 8, padding: '14px 20px', color: '#22c55e', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Check size={18} /> Product successfully updated in store.
        </div>
      )}

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products by name or category..."
            style={{ ...InputStyle, paddingLeft: 48 }}
          />
        </div>
        <button onClick={openAdd} style={{
          display: 'flex', alignItems: 'center', gap: 10, background: '#fff', color: '#000',
          padding: '12px 24px', borderRadius: 8, fontWeight: 900, fontSize: 12,
          textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255,255,255,0.1)', flexShrink: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Plus size={18} strokeWidth={3} /> New Product
        </button>
      </div>

      {/* Product Table Container */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ minWidth: 800 }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '70px 2.5fr 1fr 1fr 1fr 100px', gap: 16, padding: '16px 24px', borderBottom: '1px solid #1e1e1e', background: '#161616' }}>
            {['Image', 'Product details', 'category', 'Price / inr', 'best seller', 'Actions'].map(h => (
              <p key={h} style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#444' }}>{h}</p>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '80px', textAlign: 'center', color: '#444' }}>
              <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.1 }} />
              <p style={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>No products match your search</p>
            </div>
          ) : (
            filtered.map(product => (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '70px 2.5fr 1fr 1fr 1fr 100px', gap: 16, padding: '18px 24px', borderBottom: '1px solid #141414', alignItems: 'center' }}>
                <div style={{ width: 48, height: 60, borderRadius: 6, overflow: 'hidden', background: '#1a1a1a', border: '1px solid #222' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#eee', lineHeight: 1.4 }}>{product.name}</p>
                  <p style={{ fontSize: 11, color: '#555', fontFamily: 'monospace', marginTop: 4 }}>{product.slug}</p>
                </div>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 800, background: '#1a1a1a', border: '1px solid #222', color: '#777', padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {product.category}
                  </span>
                </div>
                <p style={{ fontWeight: 900, fontSize: 15, color: '#fff' }}>₹{Number(product.price).toLocaleString('en-IN')}</p>
                <div>
                  {product.bestSeller
                    ? <span style={{ fontSize: 10, fontWeight: 800, color: '#f59e0b', background: '#f59e0b10', padding: '4px 12px', borderRadius: 20, border: '1px solid #f59e0b20', textTransform: 'uppercase' }}>Featured</span>
                    : <span style={{ fontSize: 11, color: '#333', fontWeight: 700 }}>—</span>
                  }
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(product)} style={{ padding: '10px', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: 8, cursor: 'pointer', color: '#666' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteConfirm(product.id)} style={{ padding: '10px', background: '#1e0000', border: '1px solid #330000', borderRadius: 8, cursor: 'pointer', color: '#774444' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff5555'} onMouseLeave={e => e.currentTarget.style.color = '#774444'}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setShowForm(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            style={{
              position: 'relative', background: '#0a0a0a', border: '1px solid #222', borderRadius: 16,
              width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', padding: 40,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 22, textTransform: 'uppercase', color: '#fff' }}>
                {editingId ? 'Update Listing' : 'Create New Listing'}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#444', cursor: 'pointer', background: '#1a1a1a', borderRadius: '50%', padding: 8 }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LabelStyle}>Product Headline *</label>
                <input value={form.name} onChange={F('name')} placeholder="e.g. PHANTOM OVERSIZED TEE | OBSIDIAN" style={InputStyle} />
              </div>

              <div>
                <label style={LabelStyle}>Market Price (₹) *</label>
                <input type="number" value={form.price} onChange={F('price')} placeholder="1499" style={InputStyle} />
              </div>

              <div>
                <label style={LabelStyle}>Collection *</label>
                <select value={form.category} onChange={F('category')} style={{ ...InputStyle, appearance: 'none', cursor: 'pointer' }}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LabelStyle}>Media Assets URL *</label>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <input value={form.image} onChange={F('image')} placeholder="Paste Unsplash or direct image URL..." style={InputStyle} />
                  {form.image && (
                    <div style={{ width: 80, height: 100, borderRadius: 8, overflow: 'hidden', flexShrink: 0, border: '2px solid #222' }}>
                      <img src={form.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = ''; }} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={LabelStyle}>Product Story / Description</label>
                <textarea value={form.description} onChange={F('description')} rows={4} placeholder="Tell the product story..." style={{ ...InputStyle, resize: 'none', lineHeight: 1.6 }} />
              </div>

              <div>
                <label style={LabelStyle}>Fabric Specification</label>
                <input value={form.fabrics} onChange={F('fabrics')} placeholder="e.g. 240 GSM Premium Heavyweight" style={InputStyle} />
              </div>

              <div>
                <label style={LabelStyle}>Fit Reference</label>
                <input value={form.fit} onChange={F('fit')} placeholder="e.g. Relaxed Master Fit" style={InputStyle} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#111', padding: '16px 20px', borderRadius: 10, border: '1px solid #222' }}>
                <input id="bestSeller" type="checkbox" checked={form.bestSeller} onChange={F('bestSeller')} style={{ width: 22, height: 22, accentColor: '#fff', cursor: 'pointer' }} />
                <label htmlFor="bestSeller" style={{ ...LabelStyle, margin: 0, cursor: 'pointer', color: '#888' }}>Move to Featured Collection</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 48, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowForm(false)} style={{ padding: '14px 32px', border: '1px solid #222', borderRadius: 10, color: '#555', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', cursor: 'pointer' }}>Discard</button>
              <button onClick={handleSave} style={{ padding: '14px 48px', background: '#fff', color: '#000', borderRadius: 10, fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}>{editingId ? 'Update Listing' : 'Publish Product'}</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Popup */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={() => setDeleteConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }} />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', background: '#0a0a0a', border: '1px solid #fecaca20', borderRadius: 20, padding: 48, maxWidth: 420, width: '100%', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ff000010', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid #ff000020' }}>
              <Trash2 size={32} color="#ff3333" />
            </div>
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 20, marginBottom: 12, textTransform: 'uppercase', color: '#fff' }}>Remove Listing?</h3>
            <p style={{ fontSize: 14, color: '#555', marginBottom: 40, lineHeight: 1.6 }}>This will permanently remove the product from the store catalog. This action cannot be reversed.</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '16px', border: '1px solid #222', borderRadius: 12, color: '#666', fontWeight: 800, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: '16px', background: '#ff3333', color: '#fff', borderRadius: 12, fontWeight: 900, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>Remove</button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
