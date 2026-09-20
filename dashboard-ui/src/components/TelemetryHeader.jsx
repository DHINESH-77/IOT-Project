import React from 'react';
import { Radio, Cpu, HardDrive, Clock, RefreshCw } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';

const TelemetryHeader = () => {
  const { activeSchemes, LIMIT, isSyncing, syncTerminal, lastSyncTime } = useScheme();

  return (
    <div className="mb-8">
      {/* Title & Primary Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Hardware Terminal Overview
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Node Active
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Real-time digital twin mirror and field telemetry for the physical Gram Seva public kiosk.
          </p>
        </div>

        {/* Quick Sync & Status Action */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block font-mono">Last Flash Sync</span>
            <span className="text-xs text-slate-300 font-bold">{lastSyncTime}</span>
          </div>
          <button
            onClick={syncTerminal}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/30 border border-indigo-400/30 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Force Sync Flash'}</span>
          </button>
        </div>
      </div>

      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
        
        {/* Metric 1: Signal Strength */}
        <div className="bg-[#111726]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Wireless RSSI
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono">-54 dBm</span>
              <span className="text-[11px] text-emerald-400 font-bold">Strong</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Free Heap RAM */}
        <div className="bg-[#111726]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Free SRAM Heap
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono">142 KB</span>
              <span className="text-[11px] text-emerald-400 font-bold">Nominal</span>
            </div>
          </div>
        </div>

        {/* Metric 3: EEPROM Slots Active */}
        <div className="bg-[#111726]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Terminal Memory
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono">
                {activeSchemes.length} / {LIMIT} Slots
              </span>
              <span className="text-[11px] text-amber-400 font-bold">Synced</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Continuous Uptime */}
        <div className="bg-[#111726]/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Terminal Uptime
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono">14h 22m</span>
              <span className="text-[11px] text-emerald-400 font-bold">0 faults</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TelemetryHeader;
