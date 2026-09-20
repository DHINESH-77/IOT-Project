import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const initialSchemes = [
  { id: 1, title: 'PM Kisan Samman Nidhi', category: 'Agriculture', active: true },
  { id: 2, title: 'Pradhan Mantri Awas Yojana', category: 'Housing', active: true },
  { id: 3, title: 'Mahatma Gandhi NREGA', category: 'Welfare', active: true },
  { id: 4, title: 'Soil Health Card', category: 'Agriculture', active: false },
  { id: 5, title: 'Jal Jeevan Mission', category: 'Welfare', active: false },
  { id: 6, title: 'National Social Assistance', category: 'Welfare', active: true },
  { id: 7, title: 'Kisan Credit Card', category: 'Agriculture', active: false },
  { id: 8, title: 'Fasal Bima Yojana', category: 'Agriculture', active: false },
];

const categories = ['All', 'Agriculture', 'Housing', 'Welfare'];

const SchemeManager = () => {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [filter, setFilter] = useState('All');

  const activeCount = schemes.filter(s => s.active).length;
  const LIMIT = 8;

  const toggleScheme = (id) => {
    setSchemes(prev => prev.map(s => {
      if (s.id === id) {
        if (!s.active && activeCount >= LIMIT) return s;
        return { ...s, active: !s.active };
      }
      return s;
    }));
  };

  const filteredSchemes = filter === 'All' ? schemes : schemes.filter(s => s.category === filter);

  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Header Area */}
      <div className="p-6 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight mb-1">Scheme Working Set</h2>
          <p className="text-sm text-slate-400">Manage the active schemes currently synced to the physical terminal.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500/50">
          <Plus size={18} />
          Add New Scheme
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="px-6 pb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={twMerge(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                filter === cat
                  ? "bg-white text-black"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            className="w-full bg-[#141414] border border-white/10 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Hardware Limit Indicator */}
      <div className="px-6 py-3 bg-[#141414] border-y border-white/10 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">ESP32 Memory Limit Status</span>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={twMerge("h-full rounded-full transition-all duration-300", activeCount >= LIMIT ? "bg-rose-500" : "bg-emerald-500")}
              style={{ width: `${(activeCount / LIMIT) * 100}%` }}
            />
          </div>
          <span className={twMerge("text-sm font-bold", activeCount >= LIMIT ? "text-rose-400" : "text-emerald-400")}>
            {activeCount} / {LIMIT}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="text-slate-400 sticky top-0 bg-[#0f0f0f] z-10 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Scheme Title</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Category</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Terminal Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSchemes.map((scheme) => {
              const isDisabled = !scheme.active && activeCount >= LIMIT;

              return (
                <tr key={scheme.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-slate-200 font-medium">{scheme.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-slate-400 text-sm">
                      {scheme.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleScheme(scheme.id)}
                      disabled={isDisabled}
                      className={twMerge(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0f0f0f]",
                        scheme.active ? "bg-emerald-500" : "bg-white/20",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <span
                        className={twMerge(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          scheme.active ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchemeManager;
