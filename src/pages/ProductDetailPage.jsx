import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const RESPONSIVE_CSS = `
  @media (max-width: 1024px) {
    .pdp-grid { 
      grid-template-columns: 1fr !important; 
      gap: 32px !important; 
      padding: 0 16px 40px !important;
    }
    .pdp-sticky { 
      position: static !important; 
      width: 100% !important;
    }
    .pdp-gallery {
      margin-bottom: 0 !important;
    }
    .breadcrumb-nav {
      padding: 12px 16px !important;
      flex-wrap: wrap !important;
    }
  }
  @media (max-width: 480px) {
    .pdp-grid {
      gap: 24px !important;
    }
    .pdp-title {
      font-size: 20px !important;
    }
  }
`;

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products } = useAdmin();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug);
  const related = products.filter(p => p.id !== product?.id && p.category === product?.category);

  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

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

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    navigate('/checkout');
  };

  return (
    <main style={{ paddingTop: 80 }}>
      <style>{RESPONSIVE_CSS}</style>
      {/* Breadcrumb */}
      <nav 
        aria-label="breadcrumb" 
        className="breadcrumb-nav"
        style={{ maxWidth: 1440, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', width: '100%', overflow: 'hidden' }}
      >
        <Link to="/" style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}-tshirts`} style={{ color: '#9ca3af', whiteSpace: 'nowrap' }}>Collection</Link>
        <span>/</span>
        <span style={{ color: '#111', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div 
        className="pdp-grid"
        style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'start', width: '100%', overflowX: 'hidden' }}
      >

        {/* ─ Left: Gallery ─ */}
        <div className="pdp-gallery">
          {/* Main image */}
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', background: '#f9fafb', marginBottom: 12 }}>
            <motion.img
              key={activeImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              src={images[activeImg]}
              alt={`${product.name} – view ${activeImg + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveImg(i => (i + 1) % images.length)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 10 }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ flex: 1, aspectRatio: '1/1', overflow: 'hidden', border: activeImg === i ? '2px solid #000' : '2px solid transparent', opacity: activeImg === i ? 1 : 0.6 }}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* ─ Right: Details ─ */}
        <div className="pdp-sticky" style={{ position: 'sticky', top: 100 }}>
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#000" color="#000" />)}
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', marginLeft: 4 }}>4.9 (128 reviews)</span>
          </div>

          <h1 
            className="pdp-title"
            style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(20px,2.5vw,30px)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}
          >
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <span style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 28 }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 14, color: '#9ca3af', textDecoration: 'line-through' }}>
              ₹{(product.price * 1.4).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
            <span style={{ background: '#000', color: '#fff', fontSize: 10, fontWeight: 900, padding: '4px 8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>30% OFF</span>
          </div>

          {/* Size Selector */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Size: <strong>{selectedSize}</strong>
              </span>
              <button style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #9ca3af', color: '#9ca3af' }}>
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '12px 16px', border: `2px solid ${selectedSize === s ? '#000' : '#e5e7eb'}`,
                    background: selectedSize === s ? '#000' : '#fff',
                    color: selectedSize === s ? '#fff' : '#111',
                    fontWeight: 900, fontSize: 12, textTransform: 'uppercase', cursor: 'pointer', minWidth: 52, transition: 'all 0.2s',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>Quantity</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid #000' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '10px 16px', fontWeight: 900, fontSize: 18, cursor: 'pointer' }}>−</button>
              <span style={{ padding: '10px 20px', fontWeight: 900, fontSize: 14, minWidth: 50, textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '10px 16px', fontWeight: 900, fontSize: 18, cursor: 'pointer' }}>+</button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            <button
              onClick={handleAddToCart}
              style={{
                background: '#fff', color: '#000', border: '2px solid #000', padding: '16px',
                fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              style={{
                background: '#000', color: '#fff', border: '2px solid #000', padding: '16px',
                fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#111'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#000'; }}
            >
              <Zap size={16} /> Buy Now
            </button>
          </div>

          {/* Trust */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', borderTop: '1px solid #f3f4f6', paddingTop: 24, marginBottom: 32 }}>
            {['🔒 Secure Checkout', '↩ 30-Day Returns', '🚚 Free Shipping ₹999+'].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.05em' }}>{b}</span>
            ))}
          </div>

          {/* Tabs: Description / Details */}
          <div>
            <div style={{ display: 'flex', borderBottom: '2px solid #f3f4f6', marginBottom: 24 }}>
              {['description', 'details'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 24px', fontWeight: 900, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer',
                    borderBottom: activeTab === tab ? '2px solid #000' : '2px solid transparent',
                    marginBottom: -2,
                    color: activeTab === tab ? '#000' : '#9ca3af',
                  }}
                >
                  {tab === 'description' ? 'Description' : 'Product Details'}
                </button>
              ))}
            </div>
            {activeTab === 'description' ? (
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.9 }}>{product.description}</p>
            ) : (
              <dl style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px' }}>
                {[['Fabric', product.fabrics], ['Fit', product.fit], ['Wash Care', product.care], ['Made in', 'India']].map(([k, v]) => (
                  <div key={k}>
                    <dt style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', marginBottom: 4 }}>{k}</dt>
                    <dd style={{ fontSize: 13, fontWeight: 600 }}>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" style={{ padding: '64px 24px', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1440, margin: '0 auto' }}>
            <h2 id="related-heading" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(22px,3vw,36px)', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 40 }}>
              You May Also Like
            </h2>
            <div style={{ display: 'flex', gap: 32, overflowX: 'auto', paddingBottom: 16 }}>
              {related.map(p => (
                <div key={p.id} style={{ minWidth: 280, maxWidth: 320, flex: '0 0 auto' }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetailPage;
