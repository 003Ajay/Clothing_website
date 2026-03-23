import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Mail, Lock, ArrowRight, User, CheckCircle, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        // Mock validation for login
        if (formData.email && formData.password) {
          setIsSuccess(true);
          setTimeout(() => {
            login({ id: 1, name: 'Alex Carter', email: formData.email });
            navigate(from, { replace: true });
          }, 1500);
        } else {
          setError('Invalid credentials. Please try again.');
          setIsLoading(false);
        }
      } else {
        // Mock sign up
        if (formData.name && formData.email && formData.password) {
          setIsSuccess(true);
          setTimeout(() => {
            login({ id: 1, name: formData.name, email: formData.email });
            navigate(from, { replace: true });
          }, 1500);
        } else {
          setError('Please fill all fields to create your account.');
          setIsLoading(false);
        }
      }
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'url(/soft_fashion_bg.png) center center / cover no-repeat',
      color: '#121212',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Soft overlay for elegant feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.3)',
        backdropFilter: 'blur(30px)',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '7rem 1.5rem 2.5rem', 
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh'
      }}>
        
        {/* Header - Fashion Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 style={{ 
            fontFamily: 'Outfit, sans-serif', 
            fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            lineHeight: 1.1,
            color: '#000'
          }}>
            {isLogin ? 'Member Login' : 'Join the Label'}
          </h1>
          <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.625rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
            {isLogin ? 'Porter & Boat // Signature Edition' : 'Enter the inner circle'}
          </p>
        </motion.div>

        {/* Auth Card (Minimalist fashion card) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           style={{
             width: '100%',
             maxWidth: 440,
             background: 'rgba(255, 255, 255, 0.95)',
             borderRadius: 24,
             padding: 40,
             boxShadow: '0 40px 100px rgba(0,0,0,0.05)',
             border: '1px solid rgba(255,255,255,0.8)'
           }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 10 }}>Display Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Alex Carter"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      style={{
                        width: '100%',
                        background: '#f8f9fa',
                        border: '1.5px solid #eee',
                        borderRadius: 12,
                        padding: '16px 16px 16px 48px',
                        color: '#121212',
                        fontSize: 14,
                        fontWeight: 600,
                        outline: 'none',
                        transition: '0.3s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#000'}
                      onBlur={e => e.target.style.borderColor = '#eee'}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 10 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    background: '#f8f9fa',
                    border: '1.5px solid #eee',
                    borderRadius: 12,
                    padding: '16px 16px 16px 48px',
                    color: '#121212',
                    fontSize: 14,
                    fontWeight: 600,
                    outline: 'none',
                    transition: '0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#000'}
                  onBlur={e => e.target.style.borderColor = '#eee'}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888' }}>Secure PIN</label>
                {isLogin && <Link to="#" style={{ fontSize: 11, color: '#999', textDecoration: 'underline' }}>Lost PIN?</Link>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#ccc' }} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    background: '#f8f9fa',
                    border: '1.5px solid #eee',
                    borderRadius: 12,
                    padding: '16px 16px 16px 48px',
                    color: '#121212',
                    fontSize: 14,
                    fontWeight: 600,
                    outline: 'none',
                    transition: '0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#000'}
                  onBlur={e => e.target.style.borderColor = '#eee'}
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{
                background: 'rgba(255, 59, 48, 0.05)',
                border: '1px solid rgba(255, 59, 48, 0.1)',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: '#ff3b30',
                fontSize: 13,
                fontWeight: 600
              }}>
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <button 
              disabled={isLoading || isSuccess}
              style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                padding: '1.125rem',
                fontSize: '0.875rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '0.5rem',
                transition: '0.3s',
                opacity: (isLoading || isSuccess) ? 0.7 : 1,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.span 
                    key="success"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <CheckCircle size={18} /> Authenticating...
                  </motion.span>
                ) : isLoading ? (
                  <motion.div
                    key="loading"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#fff', borderRadius: '50%' }}
                  />
                ) : (
                  <motion.span 
                    key="default"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    {isLogin ? 'Enter Collection' : 'Register Member'} <ArrowRight size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center', borderTop: '1px solid #eee', paddingTop: 24 }}>
            <p style={{ color: '#888', fontSize: 13, fontWeight: 600 }}>
              {isLogin ? "New to the label?" : "Already a member?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                style={{ marginLeft: 8, color: '#000', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isLogin ? 'Sign Up' : 'Back to Login'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ marginTop: 40, color: '#666', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}
        >
          &copy; 2024 Porter & Boat // Signature Edition
        </motion.div>
      </div>

      {/* Right Design Panel (High-Fashion Style) */}
      <div style={{
        flex: 1.2,
        background: 'rgba(255, 255, 255, 1)',
        display: 'none',
        position: 'relative',
        overflow: 'hidden'
      }} className="lg-block">
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Main Design Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ width: '100%', maxWidth: 540, position: 'relative' }}
          >
            <img 
              src="/fashion_editorial_right_panel.png" 
              alt="Fashion Editorial Collection" 
              style={{ width: '100%', height: 'auto', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.03)' }} 
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ 
              color: '#000', 
              fontSize: 10, 
              fontWeight: 900, 
              textTransform: 'uppercase', 
              letterSpacing: '0.6em', 
              marginTop: 40,
              textAlign: 'center'
            }}
          >
            Porter & Boat // Exclusive Series
          </motion.p>
        </div>

        {/* Soft floating elements for high-end feel */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(245, 235, 225, 1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          zIndex: 0
        }} />
      </div>
    </div>
  );
};

export default LoginPage;
