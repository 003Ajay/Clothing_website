import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAdmin } from '../../context/AdminContext';

const InputStyle = { width: '100%', padding: '10px 14px', background: '#0f0f0f', border: '1px solid #2a2a2a', color: '#fff', fontSize: 14, borderRadius: 6, fontFamily: 'Inter,sans-serif', outline: 'none' };
const LabelStyle = { display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#555', marginBottom: 8 };

const EMPTY_CAT = { name: '', image: '' };

const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_CAT);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);

  const openAdd = () => { setForm(EMPTY_CAT); setEditingId(null); setShowForm(true); };
  const openEdit = (cat) => { setForm(cat); setEditingId(cat.id); setShowForm(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editingId) updateCategory(editingId, form);
    else addCategory(form);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout title="Categories">
      {saved && (
        <div style={{ marginBottom: 20, background: '#052e16', border: '1px solid #166534', borderRadius: 6, padding: '12px 18px', color: '#22c55e', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={16} /> Category saved!
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: '#000', padding: '10px 20px', borderRadius: 6, fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
          <Plus size={15} /> Add Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {categories.map(cat => (
          <div key={cat.id} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'relative', aspectRatio: '2/1', background: '#1a1a1a' }}>
              {cat.image && <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-end', padding: 16 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Collection</p>
                  <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 16, color: '#fff', textTransform: 'uppercase' }}>{cat.name}</h3>
                </div>
              </div>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: 11, color: '#555', fontFamily: 'monospace' }}>/{cat.slug}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(cat)} style={{ padding: '8px', background: '#1e1e1e', borderRadius: 6, cursor: 'pointer', color: '#aaa' }}><Pencil size={13} /></button>
                <button onClick={() => setDeleteConfirm(cat.id)} style={{ padding: '8px', background: '#1e0000', borderRadius: 6, cursor: 'pointer', color: '#ff5555' }}><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={() => setShowForm(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
          <div style={{ position: 'relative', background: '#111', border: '1px solid #2a2a2a', borderRadius: 10, padding: 32, width: '100%', maxWidth: 480 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase' }}>{editingId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowForm(false)} style={{ color: '#555', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={LabelStyle}>Category Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Oversized T-Shirts" style={InputStyle} />
              </div>
              <div>
                <label style={LabelStyle}>Cover Image URL</label>
                <input value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))} placeholder="https://images.unsplash.com/..." style={InputStyle} />
                {form.image && <img src={form.image} alt="preview" style={{ marginTop: 10, width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, background: '#1a1a1a' }} onError={e => { e.target.style.display = 'none'; }} />}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowForm(false)} style={{ padding: '11px 24px', border: '1px solid #2a2a2a', borderRadius: 6, color: '#888', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '11px 28px', background: '#fff', color: '#000', borderRadius: 6, fontWeight: 900, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>{editingId ? 'Save Changes' : 'Create Category'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={() => setDeleteConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
          <div style={{ position: 'relative', background: '#111', border: '1px solid #2a2a2a', borderRadius: 10, padding: 32, maxWidth: 360, width: '100%', textAlign: 'center' }}>
            <Trash2 size={28} color="#ff5555" style={{ margin: '0 auto 14px' }} />
            <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, marginBottom: 8, textTransform: 'uppercase' }}>Delete Category?</h3>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>All products in this category will lose their association.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '12px', border: '1px solid #2a2a2a', borderRadius: 6, color: '#888', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => { deleteCategory(deleteConfirm); setDeleteConfirm(null); }} style={{ flex: 1, padding: '12px', background: '#ff3333', color: '#fff', borderRadius: 6, fontWeight: 900, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCategories;
