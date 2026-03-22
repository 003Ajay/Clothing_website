import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Lock, MapPin, CreditCard, User, Truck, Receipt, ArrowLeft, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const RESPONSIVE_CSS = `
  @media (max-width: 1024px) {
    .checkout-grid { 
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    .order-summary-container {
      position: static !important;
      width: 100% !important;
    }
    .checkout-header {
      padding: 40px 16px 20px !important;
    }
  }
  @media (max-width: 768px) {
    .checkout-steps {
      margin-bottom: 24px !important;
    }
    .checkout-step-text {
      display: none !important;
    }
  }
`;

const CheckoutPage = () => {
  const { cart, cartTotal, setIsCartOpen, clearCart } = useCart();
  const { addOrder } = useAdmin();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'cod',
  });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const TAX = Math.round(cartTotal * 0.05);
  const SHIPPING = cartTotal >= 999 ? 0 : 99;
  const TOTAL = cartTotal + TAX + SHIPPING;

  const handleSubmit = e => {
    e.preventDefault();
    if (step < 3) {
      setStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      addOrder({
        customer: `${form.firstName} ${form.lastName}`,
        email: form.email,
        total: TOTAL,
        items: cart.reduce((sum, i) => sum + i.quantity, 0),
        city: form.city,
      });
      clearCart();
      navigate('/order-success');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1px solid #e5e7eb', fontSize: 14,
    fontFamily: 'Inter,sans-serif', outline: 'none', borderRadius: 2,
    background: '#fff',
  };

  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, color: '#374151' };

  if (cart.length === 0) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', padding: '160px 24px' }}>
        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 28, textTransform: 'uppercase', marginBottom: 24 }}>Your Cart is Empty</h1>
        <Link to="/" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13, borderBottom: '2px solid black', paddingBottom: 2 }}>
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: 80, minHeight: '100vh', background: '#f9fafb' }}>
      <style>{RESPONSIVE_CSS}</style>
      <div className="checkout-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'start' }}>

        {/* ─ Left: Form ─ */}
        <div>
          {/* Steps */}
          <div className="checkout-steps" style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
            {['Contact', 'Shipping', 'Payment'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  opacity: step >= i + 1 ? 1 : 0.4, flex: 1,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step > i + 1 ? '#000' : step === i + 1 ? '#000' : '#e5e7eb',
                    color: step >= i + 1 ? '#fff' : '#9ca3af',
                    fontSize: 11, fontWeight: 900, flexShrink: 0,
                  }}>{step > i + 1 ? '✓' : i + 1}</div>
                  <span className="checkout-step-text" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s}</span>
                  {i < 2 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? '#000' : '#e5e7eb', margin: '0 12px' }} />}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#fff', padding: 32, border: '1px solid #e5e7eb', borderRadius: 4 }}>
                <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 28 }}>Contact Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input name="firstName" required value={form.firstName} onChange={handleChange} style={inputStyle} placeholder="Rahul" />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input name="lastName" required value={form.lastName} onChange={handleChange} style={inputStyle} placeholder="Sharma" />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="rahul@example.com" />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#fff', padding: 32, border: '1px solid #e5e7eb', borderRadius: 4 }}>
                <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 28 }}>Shipping Address</h2>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Street Address</label>
                  <input name="address" required value={form.address} onChange={handleChange} style={inputStyle} placeholder="123 Main Street, Apt 4B" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input name="city" required value={form.city} onChange={handleChange} style={inputStyle} placeholder="Mumbai" />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input name="state" required value={form.state} onChange={handleChange} style={inputStyle} placeholder="Maharashtra" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>PIN Code</label>
                  <input name="pincode" required value={form.pincode} onChange={handleChange} style={inputStyle} placeholder="400001" />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: '#fff', padding: 32, border: '1px solid #e5e7eb', borderRadius: 4 }}>
                <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 28 }}>Payment Method</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                    { value: 'upi', label: 'UPI / PhonePe / GPay', desc: 'Secure instant payment' },
                    { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                        border: `2px solid ${form.paymentMethod === opt.value ? '#000' : '#e5e7eb'}`,
                        cursor: 'pointer', background: form.paymentMethod === opt.value ? '#f9fafb' : '#fff', transition: 'all 0.2s',
                        borderRadius: 4,
                      }}
                    >
                      <input type="radio" name="paymentMethod" value={opt.value} checked={form.paymentMethod === opt.value} onChange={handleChange} style={{ accentColor: '#000', width: 18, height: 18 }} />
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{opt.label}</p>
                        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
              {step > 1 ? (
                <button type="button" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer', color: '#6b7280' }}>
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280' }}>
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              )}
              <button type="submit" style={{ background: '#000', color: '#fff', padding: '16px 48px', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', borderRadius: 2 }}>
                {step === 3 ? 'Complete Order' : 'Continue to next step'}
              </button>
            </div>
          </form>
        </div>

        {/* ─ Right: Order Summary ─ */}
        <div className="order-summary-container" style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px 24px', borderRadius: 4 }}>
            <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24 }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24, borderBottom: '1px solid #f3f4f6', paddingBottom: 24 }}>
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: 64, height: 80, objectFit: 'cover', borderRadius: 2 }} />
                    <span style={{ position: 'absolute', top: -8, right: -8, background: '#000', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, border: '2px solid #fff' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginTop: 4 }}>Size: {item.selectedSize}</p>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: 13 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[['Subtotal', `₹${cartTotal.toLocaleString('en-IN')}`], ['GST (5%)', `₹${TAX.toLocaleString('en-IN')}`], ['Shipping', SHIPPING === 0 ? 'FREE' : `₹${SHIPPING}`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6b7280', fontWeight: 700 }}>
                  <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</span>
                  <span style={{ color: v === 'FREE' ? '#22c55e' : '#111' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #000', paddingTop: 20 }}>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 11 }}>Total Amount</span>
              <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 24 }}>₹{TOTAL.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32, padding: '20px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 4 }}>
              {[[ShieldCheck, 'Secured Transaction'], [Truck, 'Tracked Shipping'], [RotateCcw, '30-Day Easy Returns']].map(([Icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, fontWeight: 800, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <Icon size={16} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
