import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Shop: [
      { label: 'Oversized T-Shirts', to: '/category/oversized-tshirts' },
      { label: 'Gym Wear', to: '/category/gym-wear' },
      { label: 'Casual Wear', to: '/category/casual-wear' },
      { label: 'Travel Wear', to: '/category/travel-wear' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'Careers', to: '/careers' },
    ],
    Support: [
      { label: 'FAQs', to: '/faq' },
      { label: 'Returns & Exchange', to: '/returns' },
      { label: 'Shipping Policy', to: '/shipping' },
      { label: 'Track Order', to: '/track-order' },
    ],
    Legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
    ],
  };

  return (
    <footer style={{ background: '#111', color: '#fff', padding: '64px 0 0', width: '100%', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { 
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid { 
            display: none !important;
          }
          .footer-brand {
             width: 100% !important;
             display: flex !important;
             flex-direction: column !important;
             align-items: center !important;
             padding-bottom: 0 !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1.5rem !important;
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px' }}>
        {/* Top: Brand + Links */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <div className="footer-brand" style={{ paddingBottom: '1.5rem' }}>
            <Link to="/" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: '1.375rem', letterSpacing: '-0.05em', display: 'block', marginBottom: '1rem' }}>
              PORTER <span style={{ color: '#6b7280' }}>&</span> BOAT
            </Link>
            <p style={{ fontSize: '0.8125rem', color: '#9ca3af', lineHeight: 1.7, maxWidth: 260, marginBottom: '1.5rem' }}>
              Premium men's clothing designed for the modern lifestyle. Gym. Travel. Street.
            </p>
            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['🔒 Secure Payment', '↩ Easy Returns', '🚚 Free Shipping ₹999+', '🏆 Premium Quality'].map(b => (
                <span key={b} style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em' }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>
                {title}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} style={{ fontSize: 13, color: '#9ca3af', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#fff'}
                      onMouseLeave={e => e.target.style.color = '#9ca3af'}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap', gap: 16 }}>
          <div className="mobile-footer-logo" style={{ display: 'none' }}>
            <Link to="/" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 18, letterSpacing: '-0.05em', color: '#fff', textDecoration: 'none' }}>
              PORTER & BOAT
            </Link>
          </div>
          <p style={{ fontSize: 12, color: '#6b7280' }}>
            © {year} Porter & Boat. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[Instagram, Twitter, Youtube, Mail].map((Icon, i) => (
              <a key={i} href="#" style={{ color: '#6b7280', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
