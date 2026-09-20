import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-100 flex flex-col">
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
