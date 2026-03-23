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

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 34, height: 34, borderRadius: '50%',
            background: '#fff', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease', zIndex: 10
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            fill={isWishlisted ? "#000" : "none"}
            stroke={isWishlisted ? "#000" : "#000"}
            strokeWidth={1.5}
          />
        </button>

        {product.bestSeller && (
          <span style={{
            position: 'absolute', top: 12, left: 12,
            background: '#fff', color: '#000', fontSize: 9,
            fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '4px 8px', borderRadius: 2
          }}>
            Best Seller
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '0 0.125rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.75rem',
            textTransform: 'none', letterSpacing: '0.01em', lineHeight: 1.4,
            color: '#000', marginBottom: '0.25rem',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden', height: '2.8rem' 
          }}>
            {product.name}
          </h3>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.8125rem' }}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && (
            <span style={{ fontSize: '0.6875rem', color: '#999', textDecoration: 'line-through' }}>
              ₹{product.oldPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product, 1, 'L')}
          style={{
            width: '100%',
            padding: '0.75rem 0',
            background: '#000',
            color: '#fff',
            fontSize: '0.6875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            border: 'none',
            transition: 'background 0.2s',
            marginTop: 'auto',
            borderRadius: '0.25rem'
          }}
          className="gs-add-btn"
        >
          <ShoppingBag size={14} /> Add To Cart
        </button>
      </div>

      <style>{`
        .product-card-img-wrapper:hover .product-thumb { transform: scale(1.04); }
      `}</style>
    </motion.article>
  );
};

export default ProductCard;
