import React from 'react';
import AdminNavbar from '../components/AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col bg-dot-pattern">
      <AdminNavbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
      
      {/* Admin Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910] py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Gram Seva Kiosk OS · Admin Authority Node #01</span>
          <span className="font-mono text-slate-400 text-[11px]">ESP32-S3 WROOM · Firmware v2.4.1</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
