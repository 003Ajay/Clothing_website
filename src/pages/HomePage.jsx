import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';


const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
  hidden: {},
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const HomePage = () => {
  const { products, categories } = useAdmin();
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const bestSellers = products.filter(p => p.bestSeller);

  const displayCategories = React.useMemo(() => {
    if (categories.length === 0) return [];
    return [...categories, ...categories, ...categories];
  }, [categories]);

  // Detect active index based on center position
  const updateActiveIndex = React.useCallback(() => {
    if (!scrollRef.current || categories.length === 0) return;
    const parent = scrollRef.current;
    const items = parent.querySelectorAll('.grid-scroll');
    const containerCenter = parent.scrollLeft + (parent.offsetWidth / 2);

    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, idx) => {
      const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, [categories]);

  // Teleport to middle on mount and resize
  const centerMiddleSet = React.useCallback(() => {
    if (scrollRef.current && categories.length > 0) {
      const parent = scrollRef.current;
      const items = parent.querySelectorAll('.grid-scroll');
      const middleIndex = categories.length; // Start of second set
      const targetItem = items[middleIndex];
      if (targetItem) {
        const scrollAmount = targetItem.offsetLeft - (parent.offsetWidth / 2) + (targetItem.offsetWidth / 2);
        parent.scrollLeft = scrollAmount;
        setActiveIndex(middleIndex);
      }
    }
  }, [categories]);

  React.useEffect(() => {
    const timer = setTimeout(centerMiddleSet, 100);
    window.addEventListener('resize', centerMiddleSet);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', centerMiddleSet);
    };
  }, [centerMiddleSet]);

  // Silent teleport on scroll
  const handleScroll = () => {
    if (!scrollRef.current || categories.length === 0) return;
    const parent = scrollRef.current;
    const { scrollLeft, scrollWidth, offsetWidth } = parent;

    // Update active index as we scroll
    updateActiveIndex();

    const items = parent.querySelectorAll('.grid-scroll');
    if (items.length < categories.length * 2) return;

    // Calculate the distance between identical items in consecutive sets
    const setOffset = items[categories.length].offsetLeft - items[0].offsetLeft;

    if (scrollLeft <= 30) {
      // Near start, jump to same spot in set 2
      parent.scrollLeft = scrollLeft + setOffset;
    } else if (scrollLeft >= (scrollWidth - offsetWidth - 30)) {
      // Near end, jump to same spot in set 2
      parent.scrollLeft = scrollLeft - setOffset;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current && categories.length > 0) {
      const parent = scrollRef.current;
      const items = parent.querySelectorAll('.grid-scroll');

      const containerCenter = parent.offsetWidth / 2;
      const currentCenter = parent.scrollLeft + containerCenter;

      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, idx) => {
        const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
        const distance = Math.abs(currentCenter - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      const targetIndex = direction === 'left' ? closestIndex - 1 : closestIndex + 1;
      if (targetIndex >= 0 && targetIndex < items.length) {
        const targetItem = items[targetIndex];
        const targetScrollLeft = targetItem.offsetLeft - containerCenter + (targetItem.offsetWidth / 2);
        parent.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      }
    }
  };

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section
        aria-label="Hero Banner"
        style={{
          position: 'relative', height: '100vh', width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', background: '#000',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2000"
            alt="Porter & Boat lifestyle hero – men's premium clothing"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="ambient-glow" style={{ top: '20%', left: '20%', background: '#fff' }} />
        <div className="ambient-glow" style={{ bottom: '10%', right: '10%', background: '#fff' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0.4, 1] }}
          style={{
            position: 'relative', zIndex: 2, textAlign: 'center',
            color: '#fff', padding: '0 24px', maxWidth: 900,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', marginBottom: 24, letterSpacing: '0.2em', color: '#fff' }}
          >
            Series 01 // Now Live
          </motion.p>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(44px,10vw,120px)', lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: 40 }}>
            MOVE<br />DIFFERENT
          </h1>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/category/all"
              className="gs-btn"
              style={{ padding: '16px 48px', fontSize: 14, background: '#fff', color: '#000' }}
            >
              Shop The Capsule
            </Link>
            <Link
              to="/category/gym-wear"
              className="gs-btn gs-btn-outline"
              style={{ borderColor: '#fff', color: '#fff', padding: '16px 48px', fontSize: 14 }}
            >
              View Collection
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── DYNAMIC MARQUEE ───────────── */}
      <section style={{ background: '#fff', color: '#000', overflow: 'hidden', padding: '12px 0', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap' }} className="animate-marquee">
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 60, paddingRight: 60, fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span>240 GSM Heavyweight Cotton</span>
              <span style={{ width: 4, height: 4, background: '#000', borderRadius: '50%' }} />
              <span>Next-Day Shipping India</span>
              <span style={{ width: 4, height: 4, background: '#000', borderRadius: '50%' }} />
              <span>Performance Tested Mobility</span>
              <span style={{ width: 4, height: 4, background: '#000', borderRadius: '50%' }} />
              <span>Series 01 // Limited Drop</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 25s linear infinite; width: fit-content; }
        `}</style>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────── */}
      <section aria-labelledby="categories-heading" style={{ padding: '48px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>The Lineup</motion.p>
          <motion.h2 variants={fadeUp} id="categories-heading" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Shop By Series
          </motion.h2>
        </motion.div>

        <div style={{ position: 'relative', width: '100%' }}>
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 44, height: 44,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
              zIndex: 10, background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 44, height: 44,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
            }}
          >
            <ChevronRight size={20} />
          </button>

          <motion.div
            ref={scrollRef}
            onScroll={handleScroll}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            style={{
              display: 'flex', 
              gap: 20, 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory',
              padding: '60px 0', 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollPadding: '0 25%', // Helps snapping to center
              position: 'relative'
            }}
          >
            <style>{`.grid-scroll::-webkit-scrollbar { display: none; }`}</style>

            {displayCategories.map((cat, idx) => (
              <motion.div
                key={`${cat.id}-${idx}`}
                data-index={idx}
                variants={fadeUp}
                className="grid-scroll"
                animate={{
                  scale: activeIndex === idx ? 1.1 : 0.9,
                  opacity: activeIndex === idx ? 1 : 0.45,
                  filter: activeIndex === idx ? 'grayscale(0%)' : 'grayscale(30%)',
                  z: activeIndex === idx ? 20 : 0
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  flex: '0 0 auto',
                  width: 'clamp(240px, 30vw, 360px)',
                  scrollSnapAlign: 'center',
                  cursor: 'pointer',
                  willChange: 'transform, opacity',
                  position: 'relative'
                }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  style={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '3/4',
                    borderRadius: 12,
                    boxShadow: activeIndex === idx ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.1)',
                    transition: 'box-shadow 0.4s ease'
                  }}
                  aria-label={`Shop ${cat.name}`}
                >
                  <img
                    src={cat.image}
                    alt={`${cat.name} for men – Porter & Boat`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: activeIndex === idx ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' : 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 24,
                    transition: 'background 0.4s ease'
                  }}>
                    <div style={{ color: '#fff' }}>
                      <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: 4 }}>Signature</p>
                      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(20px, 3vw, 28px)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{cat.name}</h3>
                      <div style={{ height: 2, width: 40, background: '#fff', marginTop: 12 }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── BEST SELLERS ─────────────────────────────── */}
      <section aria-labelledby="bestsellers-heading" style={{ padding: '48px 24px 56px', background: '#f9fafb', maxWidth: '100%' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}
          >
            <div>
              <motion.p variants={fadeUp} style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>Community Picks</motion.p>
              <motion.h2 variants={fadeUp} id="bestsellers-heading" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                Trending Now
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link to="/category/oversized-tshirts" style={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '2px solid black', paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View All <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            className="grid-ecommerce"
          >
            {bestSellers.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── THE BENTO EDIT ───────── */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 900, color: '#333', textTransform: 'uppercase', letterSpacing: '0.2rem', marginBottom: '0.75rem' }}>Lifestyle</p>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>The Performance Edit</h2>
        </div>
        
        {/* Responsive Grid System: 1 column on mobile, Bento on desktop */}
        <div className="bento-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.25rem' 
        }}>
          {/* Main Slot */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', height: '100%', minHeight: '30rem' }} className="bento-main">
            <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gym Session" />
            <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', color: '#fff' }}>
              <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>Built For Intensity</h3>
              <Link to="/category/gym-wear" className="gs-btn" style={{ background: '#fff', color: '#000' }}>Core Collection</Link>
            </div>
          </div>
          
          {/* Side Slots Container */}
          <div style={{ display: 'grid', gap: '1.25rem' }} className="bento-side-container">
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', background: '#121212', minHeight: '15rem' }}>
              <img src="https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1200" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Oversized Fit" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1.25rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>Oversized Series<br />Available Now</h4>
              </div>
            </div>
            
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', background: '#121212', minHeight: '15rem' }}>
              <div style={{ position: 'absolute', inset: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ color: '#888', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Spec Highlight</p>
                <h4 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem' }}>240 GSM HEAVYWEIGHT COTTON</h4>
                <Link to="/category/oversized-tshirts" style={{ color: '#fff', fontWeight: 800, fontSize: '0.8125rem', textDecoration: 'underline' }}>View Specs</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop styling to force Bento look */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1024px) {
            .bento-grid {
              grid-template-columns: repeat(12, 1fr) !important;
              grid-template-rows: repeat(2, 400px) !important;
            }
            .bento-main {
              grid-column: span 8 !important;
              grid-row: span 2 !important;
            }
            .bento-side-container {
              grid-column: span 4 !important;
              display: contents !important;
            }
          }
        `}} />
      </section>

      <section style={{ padding: '120px 24px', background: '#fafafa', color: '#000', overflow: 'hidden', position: 'relative' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, boxShadow: '0 40px 100px rgba(0,0,0,0.05)' }}>
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200" style={{ width: '100%', display:'block' }} alt="Signature Tee" />
            </div>
          </motion.div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 900, color: '#999', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 24 }}>The Signature Series</p>
            <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 32 }}>
              CRAFTED FOR<br />THE MODERN<br />SILHOUETTE
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#666', marginBottom: 48, maxWidth: 500 }}>
              We believe in the purity of form and the integrity of materials. Our Signature collection is the result of meticulous craft, balancing structured 240 GSM cotton with an effortless, contemporary fit.
            </p>
            <div style={{ display: 'flex', gap: 40 }}>
              <div>
                <p style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>100%</p>
                <p style={{ fontSize: 10, fontWeight: 900, color: '#999', textTransform: 'uppercase' }}>Combed Cotton</p>
              </div>
              <div>
                <p style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>240+</p>
                <p style={{ fontSize: 10, fontWeight: 900, color: '#999', textTransform: 'uppercase' }}>GSM Weight</p>
              </div>
              <div>
                <p style={{ fontSize: 32, fontWeight: 900, color: '#000' }}>ZERO</p>
                <p style={{ fontSize: 10, fontWeight: 900, color: '#999', textTransform: 'uppercase' }}>Shrinkage Proof</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─────────── */}
      <section style={{ padding: '120px 24px', background: '#000', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #fff 0%, transparent 70%)', opacity: 0.05 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p style={{ fontSize: 12, fontWeight: 900, color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Prime Access</p>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 48, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: 16, color: '#fff' }}>UNVEIL THE NEXT DROP</h2>
          <p style={{ fontSize: 15, color: '#aaa', marginBottom: 48, lineHeight: 1.6 }}>Step into the inner circle. Be first to access limited series releases and exclusive community rewards.</p>
          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: 16, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <input
              type="email"
              placeholder="MEMBERS@PORTERBOAT.COM"
              style={{ padding: '16px 24px', background: 'transparent', border: 'none', color: '#fff', fontSize: 14, minWidth: 300, outline: 'none', fontWeight: 800 }}
            />
            <button className="gs-btn" style={{ borderRadius: 12, background: '#fff', color: '#000' }}>Join Now</button>
          </div>
        </motion.div>
      </section>

      {/* ─── KEYWORD-RICH SEO SECTION ─────────────────── */}
      <section aria-label="Why Porter and Boat" style={{ padding: '48px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(24px,3vw,36px)', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 24 }}>
            Premium Men's Oversized T-Shirts &amp; Gym Wear in India
          </h2>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.9 }}>
            Porter &amp; Boat is India's destination for men who demand more from their clothing. Our <strong>oversized t-shirts for men</strong> are crafted from 240 GSM heavyweight cotton — thick, structured, and built to last. Our <strong>gym t-shirts</strong> use moisture-wicking performance fabrics for maximum performance. Whether you're hitting the gym, catching a flight, or hitting the streets — our <strong>premium men's casual wear</strong> is built to move with you.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
