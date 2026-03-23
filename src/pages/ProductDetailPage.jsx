import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Share2, 
  ChevronRight, 
  ChevronDown, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products } = useAdmin();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find(p => p.slug === slug);
  const related = products.filter(p => p.id !== product?.id && p.category === product?.category);

  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImg, setActiveImg] = useState(0);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <main style={{ paddingTop: 120, textAlign: 'center', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900 }}>Product Not Found</h1>
        <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Back to Home</Link>
      </main>
    );
  }

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart(product, 1, selectedSize);
  };

  const ratings = {
    average: 4.5,
    count: 50,
    bars: [
      { stars: 5, percent: 80 },
      { stars: 4, percent: 15 },
      { stars: 3, percent: 3 },
      { stars: 2, percent: 1 },
      { stars: 1, percent: 1 },
    ]
  };

  return (
    <main style={{ background: '#fff', paddingTop: 100, paddingBottom: 100 }}>
      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 20px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666' }}>
        <Link to="/" style={{ color: '#666' }}>Home</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#000', fontWeight: 600 }}>Product details</span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: 60 }} className="pdp-main-grid">
        
        {/* Left: Product Images */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#f8f8f8', aspectRatio: '4/5' }}>
            <img src={images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            {/* Pagination Lines */}
            <div style={{ position: 'absolute', top: 20, left: 0, right: 0, display: 'flex', gap: 6, padding: '0 20px' }}>
              {images.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 2, background: activeImg === i ? '#fff' : 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
              ))}
            </div>
          </div>
          
          {/* Thumbnails Row */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            {images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                style={{ 
                  width: 80, height: 100, borderRadius: 8, overflow: 'hidden', 
                  border: activeImg === i ? '2px solid #000' : '2px solid transparent',
                  padding: 0, background: '#f5f5f5'
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div style={{ position: 'sticky', top: 120 }}>
          <span style={{ background: '#f5f5f5', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Men Fashion</span>
          
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>{product.name}</h1>
          <p style={{ fontSize: 24, fontWeight: 800, marginBottom: 20 }}>₹{product.price.toLocaleString('en-IN')}</p>

          {/* Delivery Banner */}
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <Clock size={18} color="#64748b" />
            <p style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>
              Order in <span style={{ fontWeight: 800, color: '#000' }}>02:30:25</span> to get next day delivery
            </p>
          </div>

          {/* Size Select */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Select Size</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: 54, height: 54, borderRadius: '50%', border: '1px solid #eee',
                    background: selectedSize === s ? '#000' : '#fff',
                    color: selectedSize === s ? '#fff' : '#000',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: '0.2s'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            <button 
              onClick={handleAddToCart}
              style={{ flex: 1, background: '#000', color: '#fff', height: 56, borderRadius: 28, fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
            <button 
              onClick={() => toggleWishlist(product)}
              style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid #eee', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Heart size={20} fill={isWishlisted ? "#000" : "none"} />
            </button>
          </div>

          {/* Accordions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { id: 'description', title: 'Description & Fit', content: product.description || 'Premium loose-fit hoodie made from medium-weight cotton-blend fabric.' },
              { id: 'shipping', title: 'Shipping', content: 'Free standard shipping on orders over ₹999. Guaranteed delivery within 3-5 days.' }
            ].map(item => (
              <div key={item.id} style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
                <button 
                  onClick={() => setActiveTab(activeTab === item.id ? '' : item.id)}
                  style={{ width: '100%', padding: '20px 24px', background: '#fff', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{item.title}</span>
                  <ChevronDown size={18} style={{ transform: activeTab === item.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                </button>
                <AnimatePresence>
                  {activeTab === item.id && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 24px 20px', fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <section style={{ maxWidth: 1200, margin: '100px auto 0', padding: '0 24px' }}>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 40 }}>Rating & Reviews</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 1.5fr', gap: 60, alignItems: 'start' }} className="reviews-grid">
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 80, fontWeight: 900, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>4,5<span style={{ fontSize: 24, color: '#999', fontWeight: 500 }}> / 5</span></p>
              <p style={{ fontSize: 13, color: '#999', fontWeight: 600, marginTop: 12 }}>({ratings.count} New Reviews)</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ratings.bars.map(bar => (
                <div key={bar.stars} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                   <span style={{ fontSize: 12, fontWeight: 700, width: 20 }}>{bar.stars} ★</span>
                   <div style={{ flex: 1, height: 4, background: '#f0f0f0', borderRadius: 2 }}>
                      <div style={{ width: `${bar.percent}%`, height: '100%', background: '#000', borderRadius: 2 }} />
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div style={{ border: '1px solid #eee', borderRadius: 16, padding: 32, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#eee', overflow:'hidden' }}>
                    <img src="https://i.pravatar.cc/150?u=alex" alt="Alex" />
                </div>
                <div>
                   <p style={{ fontSize: 14, fontWeight: 800 }}>Alex Mathio</p>
                   <div style={{ display: 'flex', color: '#000', marginTop: 2 }}>
                     {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#000" />)}
                   </div>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#999' }}>13 Oct 2024</span>
            </div>
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 16 }}>
              "Porter & Boat's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world."
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ position:'absolute', right: -24, top: '50%', width: 48, height: 48, borderRadius: '50%', background: '#fff', border:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <ChevronRight size={20} />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      {related.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '140px auto 0', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 60 }}>You might also like</h2>
          <div className="grid-ecommerce">
            {related.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .pdp-main-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
};

export default ProductDetailPage;
