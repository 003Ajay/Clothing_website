import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3 / 4', background: '#f5f5f5' }}
        className="product-card-img-wrapper"
      >
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
            className="product-thumb"
          />
        </Link>

        {/* Overlay removed, let badge handle it */}

        {/* Heavy Gauge Badge */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 8,
          fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
          padding: '4px 6px', borderRadius: 2, backdropFilter: 'blur(4px)',
          zIndex: 5
        }}>
          Premium Heavy Gauge Fabric
        </div>

        {product.bestSeller && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: '#fff', color: '#000', fontSize: 9,
            fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '4px 8px', borderRadius: 2, zIndex: 10
          }}>
            Best Seller
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '4px 2px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', flex: 1 }}>
            <h3 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.8125rem',
              textTransform: 'none', letterSpacing: '0.01em', lineHeight: 1.3,
              color: '#000', marginBottom: 2,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h3>
          </Link>
          
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: '#000', transition: 'transform 0.2s'
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={18}
              fill={isWishlisted ? "#000" : "none"}
              stroke="#000"
              strokeWidth={1.5}
            />
          </button>
        </div>

        <p style={{ fontSize: '0.6875rem', color: '#6b7280', textTransform: 'capitalize', marginBottom: 6 }}>
          {product.category?.replace('-', ' ')}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
          <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && (
            <span style={{ fontSize: '0.75rem', color: '#999', textDecoration: 'line-through' }}>
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>

      <style>{`
        .product-card-img-wrapper:hover .product-thumb { transform: scale(1.04); }
      `}</style>
    </motion.article>
  );
};

export default ProductCard;
