import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  setDoc
} from 'firebase/firestore';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES as INITIAL_CATEGORIES } from '../data/products';

const AdminContext = createContext();

const ADMIN_CREDENTIALS = { username: 'admin', password: 'porterboat@2025' };

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('pb_admin_auth') === 'true';
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Live Sync Products & Categories from Firestore
  useEffect(() => {
    const qProducts = query(collection(db, 'products'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    });

    const qCategories = query(collection(db, 'categories'));
    const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    });

    const qOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
    const unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeOrders();
    };
  }, []);

  // 2. Initial Seeding (If Firestore is empty)
  useEffect(() => {
    const seed = async () => {
      const prodSnap = await getDocs(collection(db, 'products'));
      if (prodSnap.empty) {
        console.log("Seeding initial products to Firebase...");
        for (const p of INITIAL_PRODUCTS) {
          await setDoc(doc(db, 'products', p.id), p);
        }
      }
      const catSnap = await getDocs(collection(db, 'categories'));
      if (catSnap.empty) {
        console.log("Seeding initial categories to Firebase...");
        for (const c of INITIAL_CATEGORIES) {
          await setDoc(doc(db, 'categories', c.id), c);
        }
      }
    };
    seed();
  }, []);

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
  const addProduct = async (product) => {
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProduct = { ...product, slug };
    const docRef = await addDoc(collection(db, 'products'), newProduct);
    return { id: docRef.id, ...newProduct };
  };

  const updateProduct = async (id, updates) => {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, updates);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const addCategory = async (category) => {
    const id = category.name.toLowerCase().replace(/\s+/g, '_');
    const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await setDoc(doc(db, 'categories', id), { ...category, id, slug });
  };

  const updateCategory = async (id, updates) => {
    await updateDoc(doc(db, 'categories', id), updates);
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
  };

  const addOrder = async (order) => {
    const newOrder = {
      ...order,
      orderId: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'Pending',
    };
    await addDoc(collection(db, 'orders'), newOrder);
  };

  const updateOrderStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status });
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  return (
    <AdminContext.Provider value={{
      isAuthenticated, login, logout,
      products, addProduct, updateProduct, deleteProduct,
      categories, addCategory, updateCategory, deleteCategory,
      orders, addOrder, updateOrderStatus,
      totalRevenue, loading
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
