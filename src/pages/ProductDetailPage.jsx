import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, ChevronLeft, ChevronRight, Star, Heart, Share2, Ruler, MessageSquare, ArrowLeft, Search } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
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
      padding: 2rem 1.25rem !important; 
      box-sizing: border-box !important;
    }
    .pdp-size-grid {
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
    }
    .pdp-size-header {
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
    }
    .pdp-title {
      font-size: 1.5rem !important;
      line-height: 1.2 !important;
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

  @media (max-width: 640px) {
    .pdp-size-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }

  .thumb-scroll::-webkit-scrollbar { display: none; }
  .pdp-size-btn:hover:not(:disabled) { border-color: #000 !important; }
  .pdp-add-btn:active { transform: scale(0.98); }
  
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
      
      {/* 1. Mobile Header (Back | Logo | Icons) */}
      <header className="catalog-header lg-hidden" style={{ top: 0, position: 'fixed' }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', padding:0, cursor:'pointer' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ flex:1, display:'flex', justifyContent:'center' }}>
          <img src="/logo.svg" alt="Porter & Boat" style={{ height: 28 }} />
        </div>
        <div style={{ display:'flex', gap: 16, alignItems:'center' }}>
          <Search size={22} />
          <Heart size={22} />
          <ShoppingBag size={22} onClick={() => setIsCartOpen(true)} />
        </div>
      </header>

      <div style={{ paddingTop: 56, paddingBottom: 100 }}>
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
              
              <div className="pdp-carousel-dots" style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
                {images.slice(0, 5).map((_, i) => (
                  <div 
                    key={i} 
                    style={{ 
                      width: activeImg === i ? 20 : 6, 
                      height: 6, 
                      borderRadius: 3, 
                      background: activeImg === i ? '#000' : 'rgba(0,0,0,0.2)', 
                      transition: '0.3s'
                    }}
                  />
                ))}
              </div>

              {/* Gauge Badge */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10,
                fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '6px 10px', borderRadius: 2, backdropFilter: 'blur(4px)'
              }}>
                Premium Heavy Gauge Fabric
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
            <div style={{ display: 'inline-block', background: '#f5f5f5', padding: '0.375rem 0.875rem', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem', borderRadius: 2 }}>
              30% OFF | SAVE ₹1,200
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
              <h1 
                className="pdp-title"
                style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 800, textTransform: 'none', color: '#333', flex: 1 }}
              >
                {product.name}
              </h1>
              <button style={{ background: 'none', border:'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 900, fontSize: 11, textTransform: 'uppercase', cursor: 'pointer' }}>
                <Share2 size={16} /> Share
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#999', marginBottom: 16 }}>{product.category?.replace('-', ' ')}</p>

            <div className="pdp-price-row" style={{ marginBottom: 2 }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <p style={{ fontSize: 11, color: '#999', marginBottom: 24 }}>Price incl. of all taxes</p>

            {/* Interaction Row (Rating, Wishlist, Share) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ background: '#f5f5f5', padding: '0.625rem 1.125rem', borderRadius: 30, display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 900 }}>
                <Star size={16} fill="#000" strokeWidth={0} /> 4.8 <span style={{ color: '#6b7280', fontWeight: 500 }}>(42)</span>
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
            <div style={{ marginBottom: 32 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 16 }}>
                 <p style={{ fontSize: 13, fontWeight: 800 }}>Please select a size. <span style={{ color:'#000', textDecoration:'underline', marginLeft: 8, cursor:'pointer' }}>SIZE CHART</span></p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '12px 0',
                      border: `1.5px solid ${selectedSize === s ? '#000' : '#eee'}`,
                      background: '#fff',
                      fontWeight: 800,
                      fontSize: 12,
                      borderRadius: 4,
                      cursor: 'pointer',
                      color: s === 'XXS' ? '#ccc' : '#000',
                      textDecoration: s === 'XXS' ? 'line-through' : 'none'
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 12, marginTop: 16, fontWeight: 700 }}>
                Size not available? <span style={{ color:'#000', textDecoration:'underline', cursor:'pointer' }}>Notify Me</span>
              </p>
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
          <section style={{ marginTop: '6rem', padding: '0 1.25rem' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2.5rem' }}>You May Also Like</h2>
              <div className="grid-ecommerce">
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
        padding: '12px 16px', 
        borderTop: '1px solid #eee', 
        zIndex: 1000, 
        alignItems: 'center', 
        gap: 12,
        boxSizing: 'border-box'
      }}>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          style={{
            flex: 0.4,
            height: 48,
            background: '#fff',
            border: '1.5px solid #eee',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase'
          }}
        >
          <Heart size={18} fill={isWishlisted ? "#000" : "none"} /> WISHLIST
        </button>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 0.6,
            height: 48,
            background: '#e11d48', // High-contrast Red
            color: '#fff',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ADD TO CART
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
