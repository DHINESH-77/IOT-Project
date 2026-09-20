import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 1. Loading state: Block rendering completely until cryptographic check completes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 selection:bg-slate-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-12 h-12">
            <div className="w-12 h-12 rounded-full border-2 border-slate-800 border-t-emerald-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-mono tracking-widest uppercase text-slate-300 font-semibold">
              CRIVERA Security Gate
            </p>
            <p className="text-xs font-mono text-slate-500 mt-1">
              Validating Cryptographic Session Credentials...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Divert to /admin/login and remember the attempted URL
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. Authenticated: Render protected route
  return children;
};

export default ProtectedRoute;
