import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { categories } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000, 
        transition: 'all 0.3s', 
        background: '#fff', 
        height: 72,
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div 
        style={{ 
          maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 24px', 
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', 
          alignItems: 'center' 
        }}
      >
        
        {/* Left: Desktop Nav */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-desktop">
          <Link to="/category/all" style={{ fontSize: 13, fontWeight: 700, color: '#000', textDecoration:'none' }}>Shop <ChevronDown size={14} style={{ display:'inline', marginLeft:4, verticalAlign:'middle' }} /></Link>
          <Link to="/about" style={{ fontSize: 13, fontWeight: 700, color: '#666', textDecoration:'none' }}>About</Link>
          <Link to="/faq" style={{ fontSize: 13, fontWeight: 700, color: '#666', textDecoration:'none' }}>FAQs</Link>
        </div>

        {/* Mobile Toggle (Left) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ padding: 8, display: 'none', cursor: 'pointer', color: '#000', background: 'none', border: 'none' }}
          className="nav-mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center: Logo */}
        <Link to="/" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 24, letterSpacing: '-0.04em', color: '#000', textDecoration:'none', textAlign:'center', display:'block' }}>
          PORTER & BOAT
        </Link>

        {/* Right: Icons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
          <button style={{ padding: 8, cursor: 'pointer', color: '#000', background: 'none', border: 'none' }} className="nav-icon"><Search size={22} strokeWidth={1.5} /></button>
          <Link to="/wishlist" style={{ padding: 8, position: 'relative', color: '#000', textDecoration:'none' }} className="nav-icon">
            <Heart size={22} strokeWidth={1.5} />
            {wishlist.length > 0 && <span style={{ position: 'absolute', top: 6, right: 6, background: '#000', color: '#fff', fontSize: 8, width: 14, height: 14, borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900 }}>{wishlist.length}</span>}
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ padding: 8, position: 'relative', cursor: 'pointer', color: '#000', background: 'none', border: 'none' }}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && <span style={{ position: 'absolute', top: 6, right: 6, background: '#000', color: '#fff', fontSize: 8, width: 14, height: 14, borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900 }}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 1900, padding: 32, display:'flex', flexDirection:'column', gap: 24 }}>
          {categories.map(cat => (
            <Link key={cat.id} to={`/category/${cat.slug}`} style={{ fontSize: 24, fontWeight: 800, color: '#000', textDecoration:'none' }}>{cat.name}</Link>
          ))}
          <Link to="/about" style={{ fontSize: 24, fontWeight: 800, color: '#000', textDecoration:'none' }}>About Us</Link>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '16px 0' }} />
          <Link to="/login" style={{ fontSize: 18, fontWeight: 700, color: '#666', textDecoration:'none', display:'flex', gap: 12, alignItems:'center' }}><User size={20} /> My Account</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
          .nav-icon { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
