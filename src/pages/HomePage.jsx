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
  const [activeId, setActiveId] = React.useState(null);
  const bestSellers = products.filter(p => p.bestSeller);

  const displayCategories = React.useMemo(() => {
    if (categories.length === 0) return [];
    return [...categories, ...categories, ...categories];
  }, [categories]);

  // Observer to find the center item
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveId(entry.target.dataset.id);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.5, rootMargin: '0px -25% 0px -25%' }
    );

    const items = scrollRef.current?.querySelectorAll('.grid-scroll');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [displayCategories]);

  // Teleport to middle on mount
  React.useEffect(() => {
    if (scrollRef.current && categories.length > 0) {
      const parent = scrollRef.current;
      const items = parent.querySelectorAll('.grid-scroll');
      const middleIndex = categories.length; // Start of second set
      const targetItem = items[middleIndex];
      if (targetItem) {
        const scrollAmount = targetItem.offsetLeft - (parent.offsetWidth / 2) + (targetItem.offsetWidth / 2);
        parent.scrollLeft = scrollAmount;
        setActiveId(categories[0].id);
      }
    }
  }, [categories]);

  // Silent teleport on scroll
  const handleScroll = () => {
    if (!scrollRef.current || categories.length === 0) return;
    const parent = scrollRef.current;
    const { scrollLeft, scrollWidth, offsetWidth } = parent;

    // Boundary thresholds (1/3 and 2/3 of content)
    const singleSetWidth = scrollWidth / 3;
    
    if (scrollLeft <= 50) {
      // Near start, jump to same spot in set 2
      parent.scrollLeft = scrollLeft + singleSetWidth;
    } else if (scrollLeft >= (scrollWidth - offsetWidth - 50)) {
      // Near end, jump to same spot in set 2
      parent.scrollLeft = scrollLeft - singleSetWidth;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current && categories.length > 0) {
      const parent = scrollRef.current;
      const items = parent.querySelectorAll('.grid-scroll');
      
      let closestIndex = 0;
      let minDistance = Infinity;
      const center = parent.scrollLeft + (parent.offsetWidth / 2);

      items.forEach((item, idx) => {
        const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
        const distance = Math.abs(center - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      const nextIndex = direction === 'left' ? closestIndex - 1 : closestIndex + 1;
      const targetItem = items[nextIndex];
      
      if (targetItem) {
        const scrollAmount = targetItem.offsetLeft - (parent.offsetWidth / 2) + (targetItem.offsetWidth / 2);
        parent.scrollTo({ left: scrollAmount, behavior: 'smooth' });
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
        <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }}>
          <img
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=2000"
            alt="Porter & Boat lifestyle hero – men's premium clothing"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'relative', zIndex: 2, textAlign: 'center',
            color: '#fff', padding: '0 24px', maxWidth: 900,
          }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 0.7, letterSpacing: '0.2em' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', marginBottom: 24 }}
          >
            Porter &amp; Boat — Premium Men's Clothing India
          </motion.p>
          <h1 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(36px,7vw,88px)', lineHeight: 1.05, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: 40 }}>
            Built For Men<br />Who Move Different
          </h1>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/category/oversized-tshirts"
              style={{
                background: '#fff', color: '#000', padding: '14px 36px',
                fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              Shop Now <ArrowRight size={14} />
            </Link>
            <Link
              to="/category/gym-wear"
              style={{
                border: '1px solid rgba(255,255,255,0.6)', color: '#fff', padding: '14px 36px',
                fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em',
              }}
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          Scroll
        </motion.div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────── */}
      <section aria-labelledby="categories-heading" style={{ padding: '48px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 12 }}>Collections</motion.p>
          <motion.h2 variants={fadeUp} id="categories-heading" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            Shop by Category
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
              display: 'flex', gap: 20, overflowX: 'auto', scrollSnapType: 'x mandatory',
              padding: '60px 0', scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            <style>{`.grid-scroll::-webkit-scrollbar { display: none; }`}</style>
            
            {displayCategories.map((cat, idx) => (
              <motion.div 
                key={`${cat.id}-${idx}`} 
                data-id={cat.id}
                variants={fadeUp} 
                className="grid-scroll"
                animate={{ 
                  scale: activeId === cat.id ? 1.15 : 0.85,
                  opacity: activeId === cat.id ? 1 : 0.4,
                  filter: activeId === cat.id ? 'grayscale(0%)' : 'grayscale(50%)'
                }}
                transition={{ duration: 0.5 }}
                style={{ 
                  flex: '0 0 auto', 
                  width: 'clamp(220px, 35vw, 380px)', 
                  scrollSnapAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', borderRadius: 8, boxShadow: activeId === cat.id ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.1)' }}
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
                  <div style={{ position: 'absolute', inset: 0, background: activeId === cat.id ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' : 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'flex-end', padding: 32, transition: '0.5s' }}>
                    <div style={{ color: '#fff' }}>
                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>Collection</p>
                      <h3 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 3vw, 32px)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{cat.name}</h3>
                      <p style={{ fontSize: 11, marginTop: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
                        Discover Collection →
                      </p>
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
              <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 8 }}>Featured</motion.p>
              <motion.h2 variants={fadeUp} id="bestsellers-heading" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(28px,4vw,48px)', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                Best Sellers
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

      {/* ─── BRAND STRIP ──────────────────────────────── */}
      <section aria-label="Brand Story" style={{ padding: '48px 24px', background: '#000', color: '#fff', textAlign: 'center' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 24 }}>
            Our Promise
          </p>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 'clamp(28px,5vw,64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1.05, maxWidth: 800, margin: '0 auto 40px' }}>
            Quality That Outlasts Every Trend
          </h2>
          <p style={{ fontSize: 14, color: '#9ca3af', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8 }}>
            Every piece is crafted from premium heavyweight cotton, designed with intentional fits and built to withstand the demands of your lifestyle.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {[['240+ GSM', 'Heavyweight Cotton'], ['100%', 'Premium Materials'], ['30-Day', 'Easy Returns']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 32, letterSpacing: '-0.03em' }}>{num}</p>
                <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{label}</p>
              </div>
            ))}
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
