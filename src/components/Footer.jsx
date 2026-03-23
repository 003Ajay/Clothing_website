import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Features', to: '/features' },
        { label: 'Works', to: '/works' },
        { label: 'Career', to: '/career' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Customer Support', to: '/support' },
        { label: 'Delivery Details', to: '/delivery' },
        { label: 'Terms & Conditions', to: '/terms' },
        { label: 'Privacy Policy', to: '/privacy' },
      ],
    },
    {
      title: 'FAQ',
      links: [
        { label: 'Account', to: '/account' },
        { label: 'Manage Deliveries', to: '/manage-deliveries' },
        { label: 'Orders', to: '/orders' },
        { label: 'Payments', to: '/payments' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Free eBooks', to: '/ebooks' },
        { label: 'Development Tutorial', to: '/tutorials' },
        { label: 'How to - Blog', to: '/blog' },
        { label: 'YouTube Playlist', to: '/youtube' },
      ],
    },
  ];

  return (
    <footer style={{ background: '#f8f8f8', padding: '100px 0 40px', borderTop: '1px solid #eee' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) repeat(4, 1fr)', gap: 40, paddingBottom: 80 }} className="footer-grid">
          
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 900, fontSize: 28, letterSpacing: '-0.03em', color: '#000', textDecoration: 'none', display: 'block', marginBottom: 24 }}>
              PORTER & BOAT
            </Link>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, maxWidth: 260, marginBottom: 32 }}>
              We have clothes that suit your style and which you're proud to wear. From women to men.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', transition: '0.2s' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {sections.map(section => (
            <div key={section.title}>
              <h3 style={{ fontSize: 13, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>{section.title}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} style={{ fontSize: 13, color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} 
                      onMouseEnter={e => e.target.style.color = '#000'}
                      onMouseLeave={e => e.target.style.color = '#666'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div style={{ padding: '40px 0 0', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <p style={{ fontSize: 12, color: '#999' }}>Porter & Boat © 2000-2024. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
             {['visa', 'mastercard', 'googlepay', 'applepay', 'paypal'].map(p => (
               <div key={p} style={{ width: 44, height: 28, background: '#fff', border: '1px solid #eee', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#eee', textTransform: 'uppercase' }}>
                 {p}
               </div>
             ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 60px !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
