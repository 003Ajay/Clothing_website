import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:200 }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            style={{
              position: 'fixed', top: 0, right: 0, height: '100vh',
              width: '100%', maxWidth: '460px', background: '#fff',
              zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 40px rgba(0,0,0,0.15)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <h2 style={{ fontFamily:'Outfit,sans-serif', fontWeight:900, fontSize:14, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  Your Bag
                </h2>
                <p style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={{ 
                  padding: 10, 
                  borderRadius: '50%', 
                  background: '#f5f5f5', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Close Cart"
                onMouseEnter={e => e.currentTarget.style.background = '#eee'}
                onMouseLeave={e => e.currentTarget.style.background = '#f5f5f5'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex:1, overflowY:'auto', padding:'16px 24px' }}>
              {cart.length === 0 ? (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:16, color:'#9ca3af' }}>
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p style={{ fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', fontSize:13 }}>Your bag is empty</p>
                  <button onClick={() => setIsCartOpen(false)} style={{ borderBottom:'1px solid black', paddingBottom:2, fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {cart.map(item => (
                    <div key={`${item.id}-${item.selectedSize}`} style={{ display:'flex', gap:16 }}>
                      <img src={item.image} alt={item.name} style={{ width:90, height:110, objectFit:'cover', flexShrink:0 }} />
                      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                        <div>
                          <p style={{ fontWeight:700, fontSize:13, textTransform:'uppercase', letterSpacing:'-0.01em', lineHeight:1.3 }}>{item.name}</p>
                          <p style={{ fontSize:12, color:'#6b7280', marginTop:4 }}>Size: {item.selectedSize}</p>
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div style={{ display:'flex', alignItems:'center', border:'1px solid #e5e7eb' }}>
                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} style={{ padding:'6px 10px' }}><Minus size={12}/></button>
                            <span style={{ padding:'6px 12px', fontSize:13, fontWeight:700 }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} style={{ padding:'6px 10px' }}><Plus size={12}/></button>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                            <span style={{ fontWeight:900, fontSize:14 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            <button onClick={() => removeFromCart(item.id, item.selectedSize)} style={{ color:'#9ca3af', padding:4 }}><X size={14}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding:'24px', borderTop:'1px solid #f3f4f6' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
                  <span style={{ fontWeight:700, fontSize:13, textTransform:'uppercase', letterSpacing:'0.05em' }}>Total</span>
                  <span style={{ fontWeight:900, fontSize:18 }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <p style={{ fontSize:11, color:'#9ca3af', marginBottom:16, textAlign:'center' }}>Shipping & taxes calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                    background:'black', color:'white', padding:'14px', width:'100%',
                    fontWeight:900, fontSize:13, textTransform:'uppercase', letterSpacing:'0.1em',
                    borderRadius: 2, marginBottom: 8
                  }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'transparent', color: 'black', padding: '14px', width: '100%',
                    fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em',
                    border: '1px solid #eee', cursor: 'pointer', borderRadius: 2
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
