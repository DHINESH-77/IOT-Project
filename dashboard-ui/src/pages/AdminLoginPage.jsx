import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const destination = location.state?.from?.pathname || '/admin/schemes';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify your officer email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-between text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      
      {/* Top Header Navigation */}
      <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 shrink-0 text-slate-900 transition-transform group-hover:scale-105"
            >
              <path d="M 80 20 A 45 45 0 1 0 80 80 L 60 65 A 20 20 0 1 1 60 35 Z" fill="#0F172A" />
              <circle cx="60" cy="50" r="16" fill="#0F172A" />
              <path d="M 55 42 L 67 50 L 55 58 Z" fill="#FFFFFF" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[15px] font-black tracking-[0.22em] text-slate-900 uppercase leading-none font-sans">
                CRIVERA
              </span>
              <span className="text-[8px] font-bold tracking-[0.25em] text-slate-400 uppercase mt-0.5 leading-none">
                SYSTEMS &amp; INFRASTRUCTURE
              </span>
            </div>
          </Link>

          {/* Return to Public Portal */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Portal</span>
          </Link>
        </div>
      </header>

      {/* Main Centered Authentication Form */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.06)] p-8 sm:p-10">
          
          {/* Icon Badge & Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center mx-auto mb-4 border border-slate-200/60 shadow-2xs">
              <Lock className="w-5 h-5 text-slate-800" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Officer Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Enter your official credentials to access the administrative console.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="admin-email" 
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Officer Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@crivera.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Verifying credentials...</span>
                ) : (
                  <span>Sign In to Console</span>
                )}
              </button>
            </div>

            {/* Quick Fill Credentials Helper */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@crivera.gov.in');
                  setPassword('admin123');
                }}
                className="w-full text-center py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Auto-fill credentials: <span className="font-semibold text-slate-900">admin@crivera.gov.in</span> • <span className="font-semibold text-slate-900">admin123</span>
              </button>
            </div>
          </form>

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="w-full py-4 border-t border-slate-200/70 bg-white text-center text-xs text-slate-400">
        <p>© 2026 CRIVERA Systems &amp; Infrastructure. Grassroots Public Welfare Delivery System.</p>
      </footer>

    </div>
  );
};

export default AdminLoginPage;
