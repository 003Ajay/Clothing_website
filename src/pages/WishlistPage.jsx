import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div style={{ paddingTop: 120, minHeight: '80vh', maxWidth: 1440, margin: '0 auto', padding: '120px 40px' }}>
      <header style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 40, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Your Wishlist
        </h1>
        <p style={{ color: '#666', fontWeight: 500 }}>
          {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
        </p>
      </header>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ display: 'inline-flex', padding: 24, background: '#f5f5f5', borderRadius: '50%', marginBottom: 24 }}>
            <Heart size={48} strokeWidth={1} />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Your wishlist is empty</p>
          <Link 
            to="/category/all" 
            style={{ 
              display: 'inline-block', padding: '16px 32px', background: '#000', color: '#fff', 
              fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: 0
            }}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid-ecommerce">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
