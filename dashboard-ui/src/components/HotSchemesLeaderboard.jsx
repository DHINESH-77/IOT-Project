import React from 'react';
import { Flame, Eye, ArrowUpRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';

const HotSchemesLeaderboard = () => {
  const { schemes, selectedScheme, loadSchemeOntoOled } = useScheme();

  // Sort by clicks descending
  const sortedSchemes = [...schemes].sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  const maxClicks = Math.max(...sortedSchemes.map(s => s.clicks), 1);
  const totalClicks = sortedSchemes.reduce((acc, curr) => acc + curr.clicks, 0);

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-black text-xs flex items-center justify-center shadow-md shadow-amber-500/30">
          1
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-md shadow-slate-400/20">
          2
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-amber-200 font-black text-xs flex items-center justify-center shadow-md shadow-amber-900/30">
          3
        </span>
      );
    }
    return (
      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
        {rank}
      </span>
    );
  };

  const getCategoryColor = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'agriculture':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-800/60';
      case 'housing':
        return 'bg-amber-950/70 text-amber-300 border-amber-800/60';
      case 'education':
        return 'bg-indigo-950/70 text-indigo-300 border-indigo-800/60';
      case 'health':
        return 'bg-rose-950/70 text-rose-300 border-rose-800/60';
      default:
        return 'bg-sky-950/70 text-sky-300 border-sky-800/60';
    }
  };

  return (
    <div className="bg-[#111726]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-4 h-4" />
            </span>
            <h3 className="text-base font-extrabold text-white tracking-tight">Hot Schemes Leaderboard</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
              Citizen Demand
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Physical button click frequency measured live at the village terminal.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 font-medium">Total Touches</span>
          <p className="text-lg font-black text-white font-mono">{totalClicks.toLocaleString()}</p>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {sortedSchemes.map((scheme, index) => {
          const isCurrentlyActiveOnTwin = selectedScheme?.id === scheme.id;
          const percentage = Math.round((scheme.clicks / maxClicks) * 100);

          return (
            <div
              key={scheme.id}
              className={`p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden group ${
                isCurrentlyActiveOnTwin
                  ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              {/* Subtle fill bar background */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                {/* Left: Rank & Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {getRankBadge(index + 1)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                        {scheme.titleEn}
                      </span>
                      {isCurrentlyActiveOnTwin && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                          <CheckCircle2 className="w-2.5 h-2.5" /> On OLED
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(scheme.category)}`}>
                        {scheme.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {scheme.clicks} physical clicks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Inspect Button */}
                <button
                  onClick={() => loadSchemeOntoOled(scheme)}
                  title="Directly project this scheme onto the OLED screen"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all duration-200 active:scale-95 shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Inspect on OLED</span>
                </button>
              </div>

              {/* Mini visual volume bar */}
              <div className="relative mt-2.5 w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                      : index === 1
                      ? 'bg-gradient-to-r from-indigo-400 to-sky-400'
                      : 'bg-slate-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          PM Kisan inquiries up +34% this week
        </span>
        <span className="text-[11px] font-mono text-slate-500">Auto-synced from SPIFFS</span>
      </div>
    </div>
  );
};

export default HotSchemesLeaderboard;
