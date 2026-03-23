import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { UserProvider, useUser } from './context/UserContext';

// Storefront
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';

// Admin
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';

const AdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

// Protect user routes
const UserRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const StoreFront = () => (
  <>
    <Navbar />
    <CartDrawer />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/category/all" element={<CategoryPage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <Footer />
  </>
);

import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <AdminProvider>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
              <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

              {/* Storefront Routes */}
              <Route path="/*" element={<StoreFront />} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </AdminProvider>
  );
}

export default App;
