import React, { useState } from 'react';
import { Activity, Clock, Terminal, Filter } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';

const LiveEventStream = () => {
  const { events } = useScheme();
  const [filterType, setFilterType] = useState('ALL');

  const filteredEvents = events.filter(e => {
    if (filterType === 'ALL') return true;
    if (filterType === 'SCHEMES') return e.type.includes('SCHEME') || e.type.includes('PRINT') || e.type.includes('CATEGORY');
    if (filterType === 'SYSTEM') return e.type.includes('SYNC') || e.type.includes('BOOT') || e.type.includes('HEARTBEAT');
    return true;
  });

  const getEventBadge = (type) => {
    switch (type) {
      case 'SCHEME_VIEW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">VIEW SCHEME</span>;
      case 'PRINT_TOKEN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">PRINT SLIP</span>;
      case 'OTA_SYNC_SUCCESS':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">OTA SYNC</span>;
      case 'SYS_REBOOT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">REBOOT</span>;
      case 'ADMIN_OVERRIDE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">OLED MIRROR</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">KEYPRESS</span>;
    }
  };

  return (
    <div className="bg-[#111726]/90 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="text-base font-extrabold text-white tracking-tight">Live Terminal Keystrokes</h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time physical button stream received from hardware over MQTT.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'SCHEMES', 'SYSTEM'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors text-[11px] cursor-pointer ${
                filterType === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Events Stream List */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5">
                {getEventBadge(evt.type)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                    {evt.target}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {evt.key}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug truncate">
                  {evt.detail}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 whitespace-nowrap">
                <Clock className="w-3 h-3 text-slate-500" />
                {evt.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          Channel: /esp32/kiosk/events
        </span>
        <span className="text-emerald-400 text-[11px] font-bold">Live Synced</span>
      </div>
    </div>
  );
};

export default LiveEventStream;
