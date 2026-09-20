import React from 'react';
import { ChevronUp, ChevronDown, Check, CornerDownLeft, RotateCcw, Power, Wifi, Cpu, CheckCircle2 } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';

const DigitalTwin = () => {
  const {
    activeSchemes,
    oledScreen,
    activeMenuIndex,
    selectedScheme,
    isSyncing,
    isRebooting,
    pressHardwareKey,
    rebootTerminal,
  } = useScheme();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Kiosk Hardware Enclosure (Centralized Large Hero) */}
      <div className="w-full max-w-3xl bg-gradient-to-b from-[#182030] via-[#101725] to-[#0D121D] rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-2xl shadow-black/80 relative overflow-hidden">
        
        {/* Hardware Chassis Ambient Accent Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Top Silkscreen Label & LED Status Array */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600 shadow-inner" title="Corner Bezel Screw" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-600 shadow-inner" title="Corner Bezel Screw" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold tracking-widest text-slate-300 uppercase">
                  GRAM SEVA HW-01
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                  ESP32-WROOM-32 (16MB SPIFFS)
                </span>
              </div>
            </div>
          </div>

          {/* Realistic Status LEDs */}
          <div className="flex items-center gap-4 bg-[#0A0E18] px-3.5 py-1.5 rounded-full border border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isRebooting ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'}`} />
              <span className="text-[10px] font-mono text-slate-400 font-semibold">PWR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400 font-semibold">LINK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-slate-700'}`} />
              <span className="text-[10px] font-mono text-slate-400 font-semibold">TX/RX</span>
            </div>
          </div>
        </div>

        {/* OLED SCREEN BEZEL */}
        <div className="w-full flex justify-center py-2">
          <div className="w-full max-w-xl bg-[#03060C] p-4 sm:p-5 rounded-2xl border-4 border-[#1E293B] shadow-[inset_0_2px_12px_rgba(0,0,0,0.95)]">
            
            {/* The Actual OLED Display (SSD1306 128x64 Emulation - Enlarged & Pixel-Crisp) */}
            <div className="oled-screen w-full h-56 sm:h-64 rounded-xl p-4 flex flex-col justify-between overflow-hidden select-none border border-cyan-900/40 relative">
              
              {isRebooting ? (
                /* Boot Sequence Screen */
                <div className="h-full flex flex-col items-center justify-center text-center font-mono space-y-2 z-20">
                  <Cpu className="w-8 h-8 text-cyan-400 animate-spin" />
                  <span className="oled-cyan-text text-sm font-bold tracking-wider">SYSTEM REBOOTING...</span>
                  <span className="text-xs text-cyan-500/70">MOUNTING SPIFFS / FS_INIT OK</span>
                  <span className="text-[10px] text-cyan-600/50">CONNECTING TO MQTT SERVER</span>
                </div>
              ) : isSyncing ? (
                /* Syncing OTA Screen */
                <div className="h-full flex flex-col items-center justify-center text-center font-mono space-y-2 z-20">
                  <RotateCcw className="w-8 h-8 text-amber-400 animate-spin" />
                  <span className="oled-yellow-text text-sm font-bold tracking-wider">UPDATING SCHEMES DB...</span>
                  <span className="text-xs text-amber-500/70">WRITING TO EEPROM SECTOR 0x30</span>
                  <span className="text-[10px] text-amber-600/50">CHECKSUM: 0x8F21 - VERIFIED</span>
                </div>
              ) : oledScreen === 'MENU' ? (
                /* Menu Screen Mode */
                <>
                  {/* Yellow Header Row (Authentic SSD1306 Dual-Color OLED) */}
                  <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 z-20">
                    <div className="flex items-center gap-2">
                      <span className="oled-yellow-text text-xs font-bold">GRAM SEVA</span>
                      <span className="text-[10px] text-amber-400/70 font-mono">v2.4</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-amber-400">
                      <span className="flex items-center gap-1">
                        <Wifi className="w-3 h-3" />
                        <span>WIFI:ON</span>
                      </span>
                      <span>12:30 PM</span>
                    </div>
                  </div>

                  {/* Cyan Schemes Scroll List */}
                  <div className="flex-1 py-3 font-mono text-xs sm:text-sm space-y-1.5 z-20 overflow-hidden">
                    {activeSchemes.slice(0, 4).map((scheme, idx) => {
                      const isSelected = activeMenuIndex === idx;
                      return (
                        <div
                          key={scheme.id}
                          className={`px-2.5 py-1 rounded transition-all duration-150 flex items-center justify-between ${
                            isSelected ? 'oled-highlight font-bold' : 'oled-cyan-text opacity-75 hover:opacity-100'
                          }`}
                        >
                          <div className="truncate flex items-center gap-2">
                            <span>{isSelected ? '>' : ' '}</span>
                            <span className="truncate">
                              {scheme.titleEn.length > 26 ? scheme.titleEn.substring(0, 24) + '...' : scheme.titleEn}
                            </span>
                          </div>
                          <span className={`text-[10px] uppercase font-mono px-1 rounded ${isSelected ? 'bg-black/30 text-slate-950 font-bold' : 'text-cyan-500/70'}`}>
                            {scheme.category.substring(0, 4)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Navigation Hint */}
                  <div className="border-t border-cyan-900/60 pt-1.5 flex items-center justify-between font-mono text-[10px] text-cyan-400/80 z-20">
                    <span>[▲/▼] Scroll</span>
                    <span>Item {activeMenuIndex + 1} of {activeSchemes.length}</span>
                    <span>[SELECT] Details</span>
                  </div>
                </>
              ) : oledScreen === 'DETAILS' ? (
                /* Scheme Details Screen Mode */
                <>
                  {/* Yellow Header */}
                  <div className="flex items-center justify-between border-b border-amber-500/40 pb-2 z-20">
                    <span className="oled-yellow-text text-xs font-bold uppercase truncate max-w-[280px]">
                      {selectedScheme?.category} &gt; DETAILS
                    </span>
                    <span className="font-mono text-[10px] text-amber-400 font-bold">{selectedScheme?.id}</span>
                  </div>

                  {/* Detail Body */}
                  <div className="flex-1 py-2 font-mono space-y-1.5 z-20 text-xs">
                    <div className="oled-cyan-text font-bold text-sm tracking-tight border-b border-cyan-900/30 pb-1 truncate">
                      {selectedScheme?.titleEn}
                    </div>
                    <div className="text-[11px] text-sky-200/90 leading-tight line-clamp-2">
                      <span className="text-cyan-400 font-semibold">Grant: </span>
                      {selectedScheme?.benefitEn}
                    </div>
                    <div className="text-[10px] text-sky-300/70 leading-tight line-clamp-2">
                      <span className="text-cyan-500 font-semibold">Eligibility: </span>
                      {selectedScheme?.eligibilityEn}
                    </div>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="border-t border-cyan-900/60 pt-1.5 flex items-center justify-between font-mono text-[10px] z-20">
                    <span className="text-amber-400/90">[BACK] Return</span>
                    <span className="oled-highlight px-2 py-0.5 rounded text-[10px] font-bold">
                      [SELECT] Print Token Slip
                    </span>
                  </div>
                </>
              ) : (
                /* Token Slip Print Screen */
                <div className="h-full flex flex-col justify-between font-mono z-20 text-center py-2">
                  <div className="oled-yellow-text text-xs font-bold border-b border-amber-500/40 pb-1">
                    THERMAL TOKEN ISSUED
                  </div>
                  <div className="space-y-1 my-auto">
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
                    </div>
                    <div className="oled-cyan-text text-xs font-bold">{selectedScheme?.titleEn}</div>
                    <div className="text-[10px] text-cyan-400/80">TOKEN #GS-2026-9821 · PLEASE COLLECT SLIP</div>
                  </div>
                  <div className="text-[10px] text-amber-400/80 border-t border-cyan-900/60 pt-1">
                    Press [BACK] or wait 10s to return
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* TACTILE HARDWARE KEYPAD CONTROLS */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Physical Terminal Push-Buttons (Emulation)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Click buttons to navigate OLED live
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2.5 sm:gap-4">
            {/* UP Button */}
            <button
              onClick={() => pressHardwareKey('UP')}
              disabled={isRebooting || isSyncing}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E293B] to-[#121A2A] border border-slate-600/50 hover:border-indigo-400 text-slate-200 hover:text-white shadow-lg active:scale-95 active:bg-indigo-600 transition-all duration-150 group cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 text-slate-300 group-hover:text-indigo-300 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-[10px] font-mono font-bold mt-1 tracking-wider text-slate-400 group-hover:text-slate-200">UP</span>
            </button>

            {/* DOWN Button */}
            <button
              onClick={() => pressHardwareKey('DOWN')}
              disabled={isRebooting || isSyncing}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E293B] to-[#121A2A] border border-slate-600/50 hover:border-indigo-400 text-slate-200 hover:text-white shadow-lg active:scale-95 active:bg-indigo-600 transition-all duration-150 group cursor-pointer"
            >
              <ChevronDown className="w-5 h-5 text-slate-300 group-hover:text-indigo-300 transition-transform group-hover:translate-y-0.5" />
              <span className="text-[10px] font-mono font-bold mt-1 tracking-wider text-slate-400 group-hover:text-slate-200">DOWN</span>
            </button>

            {/* SELECT Button (Primary Emerald Action) */}
            <button
              onClick={() => pressHardwareKey('SELECT')}
              disabled={isRebooting || isSyncing}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-800 border border-emerald-500 hover:border-emerald-300 text-white shadow-lg shadow-emerald-900/40 active:scale-95 transition-all duration-150 group cursor-pointer"
            >
              <Check className="w-5 h-5 text-white stroke-[2.5]" />
              <span className="text-[10px] font-mono font-bold mt-1 tracking-wider text-emerald-100">SELECT</span>
            </button>

            {/* BACK Button */}
            <button
              onClick={() => pressHardwareKey('BACK')}
              disabled={isRebooting || isSyncing}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E293B] to-[#121A2A] border border-slate-600/50 hover:border-amber-400 text-slate-200 hover:text-white shadow-lg active:scale-95 active:bg-amber-600 transition-all duration-150 group cursor-pointer"
            >
              <CornerDownLeft className="w-5 h-5 text-slate-300 group-hover:text-amber-300 transition-transform group-hover:-translate-x-0.5" />
              <span className="text-[10px] font-mono font-bold mt-1 tracking-wider text-slate-400 group-hover:text-slate-200">BACK</span>
            </button>

            {/* REBOOT Button */}
            <button
              onClick={rebootTerminal}
              disabled={isRebooting || isSyncing}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gradient-to-b from-[#1E293B] to-[#121A2A] border border-slate-600/50 hover:border-rose-400 text-slate-200 hover:text-white shadow-lg active:scale-95 active:bg-rose-600 transition-all duration-150 group cursor-pointer"
            >
              <Power className={`w-5 h-5 text-rose-400 group-hover:text-rose-300 ${isRebooting ? 'animate-spin' : ''}`} />
              <span className="text-[10px] font-mono font-bold mt-1 tracking-wider text-slate-400 group-hover:text-slate-200">RESET</span>
            </button>
          </div>
        </div>

        {/* Live HUD Feedback Ribbon */}
        <div className="mt-5 p-3.5 rounded-xl bg-[#090D18] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Target
            </span>
            <span className="text-slate-300 font-medium">
              Currently Selected on OLED:{' '}
              <span className="text-white font-semibold">
                {oledScreen === 'MENU' ? activeSchemes[activeMenuIndex]?.titleEn || 'Main Directory' : selectedScheme?.titleEn}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Mode: <strong className="text-slate-200">{oledScreen}</strong></span>
            <span>Latency: <strong className="text-emerald-400">18ms</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DigitalTwin;
