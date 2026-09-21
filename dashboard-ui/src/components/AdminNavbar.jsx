import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Cpu, LayoutDashboard, Database, RefreshCw, LogOut, ArrowLeft, Shield } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const { isSyncing, syncTerminal } = useScheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#090D16]/95 border-b border-slate-800/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Admin Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-md shadow-black/40 p-1.5">
              <img src="/crivera-logo.png" alt="CRIVERA Logo" className="w-full h-full object-contain filter drop-shadow-xs" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white">Gram Seva</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-950/80 text-indigo-300 border border-indigo-700/50 rounded-full">
                  Admin OS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">IoT Edge Kiosk &amp; Scheme Hub</p>
            </div>
          </div>

          {/* Navigation Segmented Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Terminal &amp; Telemetry</span>
            </NavLink>

            <NavLink
              to="/admin/schemes"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`
              }
            >
              <Database className="w-4 h-4" />
              <span>Scheme Manager</span>
            </NavLink>
          </nav>

          {/* Hardware Connection Badge & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-300 font-bold text-[11px]">ESP32 ONLINE</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-[11px] font-mono">-54 dBm</span>
            </div>

            <button
              onClick={syncTerminal}
              disabled={isSyncing}
              title="Push database changes to physical terminal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-700 transition-all shadow-sm active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden lg:inline">{isSyncing ? 'Syncing...' : 'Sync'}</span>
            </button>

            <button
              onClick={handleLogout}
              title="Sign out and return to Public Citizen Portal"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-600 border border-rose-800/60 transition-all shadow-sm active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-center p-2 border-t border-slate-800/80 gap-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`
            }
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Telemetry</span>
          </NavLink>
          <NavLink
            to="/admin/schemes"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`
            }
          >
            <Database className="w-3.5 h-3.5" />
            <span>Schemes</span>
          </NavLink>
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;
