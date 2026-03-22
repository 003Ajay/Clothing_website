import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('porter_boat_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('porter_boat_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size = 'L') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return removeFromCart(productId, size);
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedSize === size) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen, cartTotal, cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
