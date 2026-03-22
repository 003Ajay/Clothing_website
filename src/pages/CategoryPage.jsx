import React, { useState, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const FITS = ['Oversized', 'Regular', 'Athletic'];

const FilterPanel = ({ selectedSizes, toggleSize, selectedFits, toggleFit, priceRange, setPriceRange }) => (
  <aside style={{ minWidth: 220, flexShrink: 0 }}>
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Size</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => toggleSize(s)}
            style={{
              padding: '8px 14px', border: `1px solid ${selectedSizes.includes(s) ? '#000' : '#e5e7eb'}`,
              background: selectedSizes.includes(s) ? '#000' : '#fff',
              color: selectedSizes.includes(s) ? '#fff' : '#111',
              fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>

    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Fit</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FITS.map(f => (
          <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            <input type="checkbox" checked={selectedFits.includes(f)} onChange={() => toggleFit(f)} style={{ width: 16, height: 16 }} />
            {f}
          </label>
        ))}
      </div>
    </div>

    <div>
      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
        Price: ₹{priceRange[0]} – ₹{priceRange[1]}
      </h3>
      <input
        type="range" min={0} max={5000} step={100}
        value={priceRange[1]}
        onChange={e => setPriceRange([0, Number(e.target.value)])}
        style={{ width: '100%', accentColor: '#000' }}
      />
    </div>
  </aside>
);

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.toLowerCase();

  const { products: allProducts, categories } = useAdmin();
  const category = categories.find(c => c.slug === slug);

  const [sortBy, setSortBy] = useState('default');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const catId = category?.id;
  const products = useMemo(() => {
    let filtered = catId ? allProducts.filter(p => p.category === catId) : allProducts;
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
      );
    }
    
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortBy === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortBy === 'new') filtered = [...filtered].reverse();

    return filtered;
  }, [catId, sortBy, priceRange, allProducts, searchTerm]);

  const pageTitle = category ? `${category.name} for Men | Porter & Boat` : 'All Products | Porter & Boat';
  const pageDesc = category
    ? `Shop premium ${category.name.toLowerCase()} at Porter & Boat. High-quality men's clothing designed for gym, travel and street. Free shipping above ₹999.`
    : 'Shop all premium men\'s clothing at Porter & Boat.';

  const toggleSize = s => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleFit = f => setSelectedFits(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  return (
    <>
      {/* Dynamic SEO Title */}
      <title>{pageTitle}</title>

      <main style={{ paddingTop: 80 }}>
        {/* Category Hero */}
        {category && (
          <div style={{ position: 'relative', height: 450, overflow: 'hidden' }}>
            <img
              src={category.image}
              alt={`${category.name} – Premium Men's ${category.name} India`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
              <nav aria-label="breadcrumb" style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
                <span>/</span>
                <span style={{ color: '#fff' }}>{category.name}</span>
              </nav>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.03em', textAlign: 'center' }}
              >
                {category.name}
              </motion.h1>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>{products.length} products</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: '1px solid #e5e7eb', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ padding: '10px 40px 10px 16px', border: '1px solid #e5e7eb', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', appearance: 'none', cursor: 'pointer', minWidth: 180 }}
              >
                <option value="default">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="new">New Arrivals</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px', display: 'flex', gap: showFilters ? 48 : 0 }}>
          {/* Desktop Filters Side Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, width: 0, marginRight: -48 }}
                animate={{ opacity: 1, width: 220, marginRight: 0 }}
                exit={{ opacity: 0, width: 0, marginRight: -48 }}
                style={{ overflow: 'hidden' }}
                // Show on desktop (>1024px), hide on mobile
                className="md-hidden lg-block"
              >
                <FilterPanel 
                  selectedSizes={selectedSizes} toggleSize={toggleSize}
                  selectedFits={selectedFits} toggleFit={toggleFit}
                  priceRange={priceRange} setPriceRange={setPriceRange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                <p style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>No products found</p>
              </div>
            ) : (
              <div className="grid-ecommerce">
                {products.map(product => (
                  <motion.div key={product.id} layout>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer (Exclusive for mobile/tablet < 1024px) */}
        <AnimatePresence>
          {showFilters && (
            <div className="lg-hidden">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)} 
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} 
              />
              <motion.div 
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '85%', maxWidth: 320, background: '#fff', padding: 32, overflowY: 'auto', zIndex: 201 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filters</h2>
                  <button onClick={() => setShowFilters(false)}><X size={20} /></button>
                </div>
                <FilterPanel 
                  selectedSizes={selectedSizes} toggleSize={toggleSize}
                  selectedFits={selectedFits} toggleFit={toggleFit}
                  priceRange={priceRange} setPriceRange={setPriceRange}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default CategoryPage;
