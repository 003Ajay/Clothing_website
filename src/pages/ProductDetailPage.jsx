import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, ChevronLeft, ChevronRight, Star, Heart, Share2, Ruler, MessageSquare } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const RESPONSIVE_CSS = `
  @media (max-width: 1024px) {
    .pdp-grid { 
      grid-template-columns: 1fr !important; 
      gap: 0 !important; 
    }
    .pdp-sticky { 
      position: static !important; 
      width: 100% !important; 
      padding: 24px 20px !important; 
      box-sizing: border-box !important;
    }
    .pdp-size-grid {
      display: flex !important;
      flex-wrap: wrap !important;
    }
    .pdp-size-grid > button {
      flex: 1 0 25% !important;
      border: 1px solid #e5e7eb !important;
    }
    .pdp-size-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 12px !important;
    }
    .pdp-title {
      font-size: 24px !important;
      line-height: 1.2 !important;
      overflow-wrap: break-word !important;
      word-wrap: break-word !important;
      width: 100% !important;
      display: block !important;
    }
    .pdp-price-row {
      gap: 12px !important;
      flex-wrap: wrap !important;
    }
    .pdp-size-grid > button {
      flex: 1 0 33.33% !important;
      border: 1px solid #e5e7eb !important;
    }
    .pdp-add-btn-desktop {
      display: none !important;
    }
    .pdp-mobile-bar {
      display: flex !important;
    }
    .desktop-chat {
      display: none !important;
    }
  }
  .thumb-scroll::-webkit-scrollbar { display: none; }
  .pdp-size-btn:hover:not(:disabled) { border-color: #000 !important; }
  .pdp-add-btn:active { transform: scale(0.98); }
  
  /* Gymshark Style Scrollbar Hider */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products } = useAdmin();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug);
  const related = products.filter(p => p.id !== product?.id && p.category === product?.category);

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', padding: '160px 24px' }}>
        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 32, textTransform: 'uppercase' }}>Product Not Found</h1>
        <Link to="/" style={{ display: 'inline-block', marginTop: 24, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '2px solid black', paddingBottom: 2 }}>
          Back to Home
        </Link>
      </main>
    );
  }

  // Dummy gallery and variants for UI demonstration matching the mockup
  const images = [product.image, product.image, product.image, product.image, product.image, product.image, product.image];
  const variants = [
    { name: 'Iron Blue', color: '#4a6fa5', img: product.image, filter: 'hue-rotate(180deg) brightness(0.8)' },
    { name: 'Burnt Orange', color: '#c44d29', img: product.image, filter: 'hue-rotate(20deg) saturate(1.2)' },
    { name: 'Sage Green', color: '#7a8d7a', img: product.image, filter: 'hue-rotate(90deg) saturate(0.5)' },
    { name: 'Obsidian Black', color: '#1a1a1a', img: product.image },
    { name: 'Burgundy', color: '#6b1a1a', img: product.image, filter: 'hue-rotate(330deg) saturate(1.2)' },
    { name: 'Teal', color: '#1a6b6b', img: product.image, filter: 'hue-rotate(150deg)' },
  ];
  const [activeVariant, setActiveVariant] = useState(variants[0]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, 1, selectedSize);
  };

  return (
    <main style={{ background: '#fff', minHeight: '100vh', paddingTop: 0, overflowX: 'hidden' }}>
      <style>{RESPONSIVE_CSS}</style>
      
      {/* 1. Promo Bar (Pinned below fixed Navbar for visibility) */}
      <div style={{ 
        marginTop: 70,
        background: '#f5f5f5', 
        color: '#000', 
        padding: '12px 16px', 
        textAlign: 'center', 
        fontSize: 12, 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 12, 
        borderBottom: '1px solid #eee',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        15% Student Discount 🎓
        <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #000', borderRadius: '50%', cursor: 'pointer' }}>
          <div style={{ width: 4, height: 4, background: '#000', borderRadius: '1px' }} />
        </div>
      </div>

      <div style={{ paddingBottom: 80 }}>
        {/* Product Layout Grid */}
        <div className="pdp-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) 0.7fr', alignItems: 'start', width: '100%' }}>
          
          {/* ─ Left: Gallery Column ─ */}
          <div className="pdp-gallery-container" style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', background: '#f5f5f5', overflow: 'hidden' }}>
              <motion.img
                key={`${activeImg}-${activeVariant.name}`}
                src={images[activeImg]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: activeVariant.filter }}
              />
              
              {/* Carousel Indicators (Dots) */}
              <div className="pdp-carousel-dots" style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
                {images.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImg(i)}
                    style={{ 
                      width: activeImg === i ? 24 : 6, 
                      height: 6, 
                      borderRadius: 3, 
                      background: activeImg === i ? '#000' : 'rgba(0,0,0,0.15)', 
                      transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      padding: 0
                    }}
                  />
                ))}
              </div>

              {/* Arrow Nav (Desktop) */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'between', padding: '0 20px' }} className="lg-flex">
                 <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImg(p => (p - 1 + images.length) % images.length); }} 
                  style={{ pointerEvents: 'auto', background: '#fff', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer', transition: '0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                 > 
                  <ChevronLeft size={18} /> 
                 </button>
                 <div style={{ flex: 1 }} />
                 <button 
                  onClick={(e) => { e.stopPropagation(); setActiveImg(p => (p + 1) % images.length); }} 
                  style={{ pointerEvents: 'auto', background: '#fff', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer', transition: '0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                 > 
                  <ChevronRight size={18} /> 
                 </button>
              </div>
            </div>
          </div>

          {/* ─ Right: Details Column ─ */}
          <div className="pdp-sticky" style={{ position: 'sticky', top: 20, padding: '40px 48px' }}>
            
            {/* Promo Tag */}
            <div style={{ display: 'inline-block', background: '#f5f5f5', padding: '6px 14px', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 20, borderRadius: 2 }}>
              30% OFF | SAVE US$18
            </div>

            <h1 
              className="pdp-title"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}
            >
              {product.name}
            </h1>

            <div className="pdp-price-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <span style={{ fontSize: 18, fontWeight: 900 }}>US${(product.price / 30).toFixed(0)}</span>
              <span style={{ fontSize: 18, color: '#f43f5e', textDecoration: 'line-through', fontWeight: 800 }}>US${((product.price / 30) * 1.4).toFixed(0)}</span>
            </div>

            {/* Interaction Row (Rating, Wishlist, Share) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
              <div style={{ background: '#f5f5f5', padding: '10px 18px', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 900 }}>
                <Star size={16} fill="#000" strokeWidth={0} /> 3.4 <span style={{ color: '#6b7280', fontWeight: 500 }}>(9)</span>
              </div>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                style={{ width: 44, height: 44, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isWishlisted ? '#f43f5e' : '#000', cursor: 'pointer' }}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2} />
              </button>
              <button style={{ width: 44, height: 44, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Share2 size={20} />
              </button>
            </div>

            {/* Color/Variant Selection */}
            <div style={{ marginBottom: 40 }}>
              <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 8 }}>
                {variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(v)}
                    style={{ 
                      flex: '0 0 76px', 
                      height: 94, 
                      borderRadius: 2, 
                      overflow: 'hidden', 
                      border: activeVariant.name === v.name ? '2.5px solid #000' : '2.5px solid transparent',
                      padding: 1,
                      background: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={v.img} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.filter }} />
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{activeVariant.name}</p>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: 40 }}>
              <div className="pdp-size-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 800 }}>Select a size</p>
                <button style={{ fontSize: 12, fontWeight: 900, textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="pdp-size-grid" style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                {SIZES.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      flex: 1,
                      padding: '16px 0',
                      borderRight: '1px solid #e5e7eb',
                      background: selectedSize === s ? '#f5f5f5' : '#fff',
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: '0.2s',
                      outline: selectedSize === s ? '1px solid #000' : 'none',
                      zIndex: selectedSize === s ? 1 : 0
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button (Desktop only) */}
            <div className="pdp-add-btn-desktop">
              <button
                onClick={handleAddToCart}
                className="pdp-add-btn"
                style={{
                  width: '100%',
                  background: '#000',
                  color: '#fff',
                  padding: '20px',
                  borderRadius: 40,
                  fontSize: 14,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 40,
                  cursor: 'pointer',
                }}
              >
                Add to Bag
              </button>
            </div>

            {/* Benefits Row */}
            <div style={{ background: '#f9fafb', padding: '24px', borderRadius: 4, textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 900, textDecoration: 'underline', marginBottom: 6, cursor: 'pointer' }}>Unlock Access to Exclusive Rewards & Benefits</p>
              <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Purchasing this product earns 336XP</p>
            </div>

            {/* Accordion List (Simulated) */}
            <div style={{ marginTop: 40, borderTop: '1px solid #eee' }}>
              {['Description', 'Build & Materials', 'Features & Delivery'].map((item, i) => (
                <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase' }}>{item}</span>
                  <ChevronRight size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <section style={{ marginTop: 100, padding: '0 20px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 900, textTransform: 'uppercase', marginBottom: 40 }}>You May Also Like</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
                {related.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ─ Mobile Sticky Bottom Bar ─ */}
      <div className="pdp-mobile-bar" style={{ 
        display: 'none', 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        width: '100%', 
        background: '#fff', 
        padding: '16px 20px', 
        borderTop: '1px solid #eee', 
        zIndex: 1000, 
        alignItems: 'center', 
        gap: 12,
        boxSizing: 'border-box'
      }}>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: '#000',
            color: '#fff',
            padding: '18px',
            borderRadius: 40,
            fontSize: 14,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer'
          }}
        >
          Add to Bag
        </button>
        <button style={{ 
          width: 58, 
          height: 58, 
          borderRadius: '50%', 
          background: '#000', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0,
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          <MessageSquare size={24} />
        </button>
      </div>

      {/* Floating Chat Bubble (Desktop) */}
      <div className="desktop-chat" style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100 }}>
        <button style={{ width: 64, height: 64, borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', cursor: 'pointer' }}>
          <MessageSquare size={28} />
        </button>
      </div>
    </main>
  );
};

export default ProductDetailPage;
