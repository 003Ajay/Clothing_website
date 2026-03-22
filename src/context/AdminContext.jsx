import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../data/products';

const AdminContext = createContext();

const ADMIN_CREDENTIALS = { username: 'admin', password: 'porterboat@2025' };

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('pb_admin_auth') === 'true';
  });

  // Products stored in localStorage so admin changes persist
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pb_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('pb_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Fake orders for demo
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('pb_orders');
    return saved ? JSON.parse(saved) : [
      { id: 'ORD-001', customer: 'Rahul Sharma', email: 'rahul@email.com', date: '2026-03-15', items: 2, total: 2998, status: 'Delivered', city: 'Mumbai' },
      { id: 'ORD-002', customer: 'Arjun Mehta', email: 'arjun@email.com', date: '2026-03-16', items: 1, total: 1499, status: 'Shipped', city: 'Delhi' },
      { id: 'ORD-003', customer: 'Vikram Singh', email: 'vikram@email.com', date: '2026-03-17', items: 3, total: 4797, status: 'Processing', city: 'Bengaluru' },
      { id: 'ORD-004', customer: 'Dev Patel', email: 'dev@email.com', date: '2026-03-17', items: 1, total: 2499, status: 'Pending', city: 'Pune' },
    ];
  });

  useEffect(() => { localStorage.setItem('pb_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('pb_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('pb_orders', JSON.stringify(orders)); }, [orders]);

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('pb_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('pb_admin_auth');
    setIsAuthenticated(false);
  };

  // Product CRUD
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `p${Date.now()}`,
      slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category CRUD
  const addCategory = (category) => {
    const newCat = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '_'),
      slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (id, updates) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      products, addProduct, updateProduct, deleteProduct,
      categories, addCategory, updateCategory, deleteCategory,
      orders, addOrder, updateOrderStatus,
      totalRevenue,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
