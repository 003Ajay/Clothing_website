import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('pb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const isExist = prev.find(p => p.id === product.id);
      if (isExist) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some(p => p.id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
