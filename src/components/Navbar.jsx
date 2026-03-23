import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAdmin } from '../context/AdminContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { categories } = useAdmin();
  const { user, isAuthenticated, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsExploreOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/category/all?search=${searchQuery}`);
    }
  };

  // Map gender categories or use dynamic categories
  // For now, using dynamic categories from context to ensure they work
  const mainNavCategories = categories.slice(0, 3);

  const exploreMenu = {
    womensGuides: {
      title: 'Style Guides',
      items: ['Leggings Guide', 'Find Your Fit', 'Seasonal Trends', 'Community Favorites']
    },
    womensClothing: {
      title: 'Womens',
      items: ['Best Sellers', 'New Arrivals', 'Essentials', 'Activewear', 'Loungewear']
    },
    mensClothing: {
      title: 'Mens',
      items: ['Best Sellers', 'New Arrivals', 'Oversized Series', 'Gym Wear', 'Essentials']
    },
    findOutMore: {
      title: 'Community',
      items: ['Your Edit', 'Member Rewards', 'P&B Collective', 'The Blog']
    }
  };

  return (
    <>
      <nav
        onMouseLeave={() => setIsExploreOpen(false)}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: '#fff',
          borderBottom: isExploreOpen || isSearchOpen ? 'none' : '1px solid #f0f0f0',
          color: '#000',
          height: 70,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          className="navbar-container"
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            width: '100%',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            position: 'relative',
            height: '100%'
          }}
        >

          {/* Left: Nav Links / Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }} className="desktop-nav">
              {mainNavCategories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  style={{
                    fontSize: 14, fontWeight: 600, color: '#000', transition: 'color 0.2s', position: 'relative', textDecoration: 'none'
                  }}
                  onMouseEnter={() => setIsExploreOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/category/all"
                onMouseEnter={() => setIsExploreOpen(true)}
                style={{
                  fontSize: 14, fontWeight: 600, color: '#000', cursor: 'pointer',
                  padding: '24px 0', position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none'
                }}
              >
                Explore
                {isExploreOpen && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: 18, left: 0, right: 0, height: 2, background: '#000' }}
                  />
                )}
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ padding: '8px 8px 8px 0', display: 'none', cursor: 'pointer', color: '#000', background: 'none', border: 'none' }}
              className="mobile-toggle"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              to="/"
              style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 900, 
                fontSize: 'clamp(1.125rem, 4vw, 1.375rem)',
                letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#000', whiteSpace: 'nowrap', textDecoration: 'none'
              }}
            >
              PORTER & BOAT
            </Link>
          </div>

          {/* Right: Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{ padding: 8, cursor: 'pointer', color: '#000', background: 'none', border: 'none' }} aria-label="Search"
            >
              {isSearchOpen ? <X size={22} strokeWidth={1.5} /> : <Search size={22} strokeWidth={1.5} />}
            </button>
            <Link
              to="/wishlist"
              className="icon-hide-mobile"
              style={{ padding: 8, cursor: 'pointer', color: '#000', position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Wishlist"
            >
              <Heart size={22} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  background: 'var(--color-black)', color: '#fff', borderRadius: '50%',
                  width: 14, height: 14, fontSize: 8, fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="icon-hide-mobile"
              style={{ padding: 8, cursor: 'pointer', color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
              aria-label="Account"
            >
              <User size={22} strokeWidth={1.5} />
              {isAuthenticated && (
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{user.name.split(' ')[0]}</span>
              )}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{ padding: 8, cursor: 'pointer', color: '#000', position: 'relative', background: 'none', border: 'none' }}
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4,
                  background: 'var(--color-black)', color: '#fff', borderRadius: '50%',
                  width: 15, height: 15, fontSize: 9, fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Explore Mega Menu */}
        <AnimatePresence>
          {isExploreOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: '100%', left: 0, width: '100%',
                background: '#fff', borderTop: '1px solid #f0f0f0',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                padding: '60px 40px 80px', pointerEvents: 'auto',
                maxHeight: 'calc(100vh - 70px)', overflowY: 'auto'
              }}
            >
              <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {/* Column 1 */}
                <div>
                  <h3 style={{ fontSize: 11, fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>{exploreMenu.womensGuides.title}</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, listStyle: 'none', padding: 0 }}>
                    {exploreMenu.womensGuides.items.map(item => (
                      <li key={item}><Link to="/category/all" style={{ fontSize: 14, color: '#333', fontWeight: 500, textDecoration: 'none' }}>{item}</Link></li>
                    ))}
                  </ul>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 style={{ fontSize: 11, fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>{exploreMenu.womensClothing.title}</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, listStyle: 'none', padding: 0 }}>
                    {exploreMenu.womensClothing.items.map(item => (
                      <li key={item}><Link to="/category/all" style={{ fontSize: 14, color: '#333', fontWeight: 500, textDecoration: 'none' }}>{item}</Link></li>
                    ))}
                  </ul>
                </div>

                {/* Column 3 */}
                <div>
                  <h3 style={{ fontSize: 11, fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>{exploreMenu.mensClothing.title}</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, listStyle: 'none', padding: 0 }}>
                    {exploreMenu.mensClothing.items.map(item => (
                      <li key={item}><Link to="/category/all" style={{ fontSize: 14, color: '#333', fontWeight: 500, textDecoration: 'none' }}>{item}</Link></li>
                    ))}
                  </ul>
                </div>

                {/* Column 4 */}
                <div>
                  <h3 style={{ fontSize: 11, fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>{exploreMenu.findOutMore.title}</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, listStyle: 'none', padding: 0 }}>
                    {exploreMenu.findOutMore.items.map(item => (
                      <li key={item}><Link to="/category/all" style={{ fontSize: 14, color: '#333', fontWeight: 500, textDecoration: 'none' }}>{item}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Search Bar (Slide down) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 80, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                position: 'absolute', top: '100%', left: 0, width: '100%',
                background: '#fff', borderTop: '1px solid #f0f0f0',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', padding: '0 40px'
              }}
            >
              <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: 600, position: 'relative' }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 0', fontSize: 18,
                    border: 'none', borderBottom: '1px solid #000',
                    outline: 'none', fontFamily: 'Outfit, sans-serif',
                    background: 'transparent'
                  }}
                />
                <button type="submit" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', background: 'none', border: 'none' }}>
                  <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{
                position: 'fixed', top: 70, left: 0, bottom: 0, width: '100%',
                background: '#fff', zIndex: 1900, padding: '40px 24px',
                display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto'
              }}
            >
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  style={{ fontSize: 20, fontWeight: 700, color: '#000', textDecoration: 'none', textTransform: 'uppercase' }}
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                to="/category/all"
                style={{ fontSize: 20, fontWeight: 700, color: '#000', textDecoration: 'none', textTransform: 'uppercase' }}
              >
                Explore All
              </Link>
              <div style={{ marginTop: 'auto', borderTop: '1px solid #f0f0f0', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Link to="/wishlist" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 600, color: '#333', textDecoration: 'none' }}>
                  <Heart size={20} /> Wishlist ({wishlist.length})
                </Link>
                <Link
                  to="/login"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 600, color: '#333', textDecoration: 'none' }}
                >
                  <User size={20} /> {isAuthenticated ? `Profile (${user.name})` : 'Account'}
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    style={{ textAlign: 'left', fontSize: 14, fontWeight: 600, color: '#888', background: 'none', border: 'none', padding: 0 }}
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .navbar-container { padding: 0 20px !important; }
        }
        @media (max-width: 480px) {
          .navbar-container { padding: 0 15px !important; }
          .icon-hide-mobile { display: none !important; }
        }
      `}</style>
      </nav>
    </>
  );
};

export default Navbar;
