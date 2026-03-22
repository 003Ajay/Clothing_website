import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const OrderSuccessPage = () => (
  <main style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', padding: '120px 24px' }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: 'center', maxWidth: 520, width: '100%', background: '#fff', padding: 64, border: '1px solid #e5e7eb' }}
    >
      <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
        <CheckCircle2 size={40} color="#16a34a" />
      </div>
      <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 28, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 16 }}>
        Order Confirmed!
      </h1>
      <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 40 }}>
        Thank you for shopping with Porter &amp; Boat. Your order has been placed successfully. You will receive a confirmation email shortly.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ background: '#000', color: '#fff', padding: '14px 32px', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Continue Shopping <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  </main>
);

export default OrderSuccessPage;
