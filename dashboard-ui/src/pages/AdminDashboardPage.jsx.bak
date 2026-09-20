import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialSchemesData = [
  {
    slot: '#01',
    titleEn: 'Kalaignar Magalir Urimai Thittam',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    category: 'Direct Cash / Women',
    benefit: '₹1,000 / month (DBT)',
    size: '104 KB',
    status: 'PUBLISHED',
  },
  {
    slot: '#02',
    titleEn: 'Pudhumai Penn Scheme',
    titleTa: 'புதுமைப் பெண் திட்டம்',
    category: 'Higher Education',
    benefit: '₹1,000 / month',
    size: '98 KB',
    status: 'PUBLISHED',
  },
  {
    slot: '#03',
    titleEn: "Chief Minister's Comprehensive Health Insurance (CM-CHIS)",
    titleTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    category: 'Healthcare Coverage',
    benefit: 'Up to ₹5,00,000 / family',
    size: '112 KB',
    status: 'PUBLISHED',
  },
  {
    slot: '#04',
    titleEn: 'Indira Gandhi National Old Age Pension (IGNOAPS)',
    titleTa: 'முதியோர் உதவித்தொகை திட்டம்',
    category: 'Social Security',
    benefit: '₹1,200 / month',
    size: '94 KB',
    status: 'PUBLISHED',
  },
  {
    slot: '#05',
    titleEn: 'Free Laptop Distribution for Students',
    titleTa: 'மாணவர்களுக்கான விலையில்லா மடிக்கணினி',
    category: 'School Education',
    benefit: 'Hardware Device Grant',
    size: '108 KB',
    status: 'PUBLISHED',
  },
  {
    slot: '#06',
    titleEn: 'Moovalur Ramamirtham Ammiyar Marriage Assistance',
    titleTa: 'மூவலூர் ராமாமிர்தம் அம்மையார் நினைவு திருமண உதவி',
    category: 'Social Welfare',
    benefit: '₹50,000 + 1 Sovereign Gold',
    size: '96 KB',
    status: 'STAGED DRAFT',
  },
];

const sampleEvents = [
  'GPIO_ISR: Optical paper gate sensor ping 0x01: Paper low detector nominal',
  'RFID_READ: CRC Check OK. Validated UID: 0x99 0x2A 0x87 0x11 (Citizen Card)',
  'KEYPAD_MATRIX: Interrupted on Row 3, Col 1 -> KEY_CODE: KEY_C [Debounce OK]',
  'TELEMETRY_HEARTBEAT: Ping latency: 11ms to MQTT broker tnega-iot.gov.in:8883',
  'RFID_TAG_DETECTED: UID: 0x4A 0x8C 0x11 0xEF (TN-PDS Smart Ration Card Validated)',
  'THERMAL_PRINTER: PRT_ACK: Status Ready, Head Temp 34°C, Cutter Motor Homed',
];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Lease Countdown (28:42)
  const [leaseSeconds, setLeaseSeconds] = useState(28 * 60 + 42);
  const [schemes, setSchemes] = useState(initialSchemesData);
  const [oledState, setOledState] = useState({
    cardId: '[WAITING_FOR_TAG]',
    status: 'READY',
    slot: 0,
  });

  const [terminalLogs, setTerminalLogs] = useState([
    { time: '14:22:01.102', tag: 'GPIO_ISR:', tagColor: 'text-primary-fixed', text: 'RC522_RFID IRQ pin 19 HIGH. Polling MIFARE register...' },
    { time: '14:22:01.328', tag: 'RFID_TAG_DETECTED:', tagColor: 'text-secondary-fixed', text: 'UID: 0x4A 0x8C 0x11 0xEF (TN-PDS Smart Ration Card Validated)' },
    { time: '14:22:05.811', tag: 'KEYPAD_MATRIX:', tagColor: 'text-primary-fixed', text: 'Row 2, Col 3 closed -> KEY_CODE: NUM_4 [Debounce: 12ms OK]' },
    { time: '14:22:06.940', tag: 'KEYPAD_MATRIX:', tagColor: 'text-primary-fixed', text: 'Row 1, Col 4 closed -> KEY_CODE: KEY_A [Confirmation Trigger]' },
    { time: '14:22:09.115', tag: 'OPTICAL_SENSOR:', tagColor: 'text-tertiary-fixed', text: 'IR Proximity Gate 0x02: Citizen hand in dispenser bay (dist: 64mm)' },
    { time: '14:22:12.449', tag: 'THERMAL_PRINTER:', tagColor: 'text-primary-fixed', text: 'PRT_ACK: Status Ready, Head Temp 34°C, Cutter Motor Homed' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeaseSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLease = () => {
    const mins = Math.floor(leaseSeconds / 60);
    const secs = leaseSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleInjectKey = () => {
    const rand = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
    const now = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100);
    setTerminalLogs((prev) => [
      ...prev,
      { time: now, tag: 'INJECTED_EVENT:', tagColor: 'text-secondary-container font-bold', text: rand },
    ]);
  };

  const handleClearTerminal = () => {
    setTerminalLogs([
      { time: new Date().toTimeString().split(' ')[0], tag: 'SYS_INFO:', tagColor: 'text-on-surface-variant', text: '-- Buffer flushed by engineer. Telemetry listening on esp32/che042/events --' }
    ]);
  };

  const handlePushOTA = () => {
    window.alert('OTA Payload Staged for TN-CHE-042:\nDiff binary: 124 KB\nTarget partition: OTA_1 (Rollback safe).\nInitiating mTLS firmware broadcast...');
  };

  const handleReboot = () => {
    if (window.confirm('CAUTION: Hard restart of ESP32-S3 node TN-CHE-042 will reset active kiosk touchscreen session. Proceed?')) {
      window.alert('Sending MQTT payload: {"cmd": "RESTART_CORE", "force": true} -> Node TN-CHE-042 restarting in 3 seconds.');
      setOledState({ cardId: '[REBOOTING_SYS]', status: 'REBOOT', slot: 0 });
      setTimeout(() => {
        setOledState({ cardId: '[WAITING_FOR_TAG]', status: 'READY', slot: 0 });
      }, 3000);
    }
  };

  const handleAddScheme = () => {
    const title = window.prompt('Enter Scheme Name (English):', 'Free Agriculture Solar Pump Scheme');
    if (title) {
      if (schemes.length >= 8) {
        window.alert('Scheme Flash Quota Guard:\nCannot add scheme! Maximum 8 of 8 slots occupied. Please purge a scheme first.');
        return;
      }
      const newSlot = `#0${schemes.length + 1}`;
      setSchemes((prev) => [
        ...prev,
        {
          slot: newSlot,
          titleEn: title,
          titleTa: 'விவசாய சூரிய மின் பம்பு திட்டம்',
          category: 'Agriculture Subsidy',
          benefit: '70% Solar Capital Grant',
          size: '102 KB',
          status: 'PUBLISHED',
        },
      ]);
    }
  };

  const handleDeleteScheme = (slot) => {
    if (window.confirm(`Are you sure you want to purge Slot ${slot} from SPIFFS flash?`)) {
      setSchemes((prev) => prev.filter((s) => s.slot !== slot));
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,32,70,0.06)]">
        <div className="h-20 w-full px-screen-padding-edge flex items-center justify-between">
          <div className="flex items-center gap-admin-gap-normal">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[28px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-headline-sm text-primary font-bold leading-none tracking-tight">e-Sevai</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-telemetry text-label-telemetry uppercase tracking-wider">#TN-CHE-042</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Tamil Nadu Citizen Services Kiosk • தமிழ்நாடு அரசு</span>
            </div>
          </div>

          <nav className="flex items-center gap-admin-gap-dense bg-surface-container-low p-1.5 rounded-xl">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-xl font-headline-sm text-body-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer"
            >
              Public Portal
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="transition-all bg-primary-container text-on-primary font-headline-sm text-body-md px-4 py-2 rounded-xl shadow-sm cursor-pointer"
            >
              Hardware Console
            </button>
            <button
              onClick={() => navigate('/admin/schemes')}
              className="transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-headline-sm text-body-md px-4 py-2 rounded-xl cursor-pointer"
            >
              Scheme Management
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-body-sm font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-mono-telemetry text-mono-telemetry font-bold tracking-tight">Active Node</span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              title="Sign Out & Terminate Session"
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Console */}
      <main className="w-full pt-20 flex-1 bg-surface">
        <div className="flex flex-col w-full">
          
          {/* Security & Role Protection Context Ribbon */}
          <div className="w-full bg-inverse-surface text-inverse-on-surface px-screen-padding-edge py-2.5 flex flex-wrap items-center justify-between gap-admin-gap-normal shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-tertiary-container text-tertiary-fixed font-mono-telemetry text-mono-telemetry uppercase tracking-wider font-bold">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                <span>LEVEL-3 HARDWARE ENGINEER</span>
              </div>
              <span className="font-body-sm text-body-sm text-surface-variant/80">Secured Hardware Session • Node Root Access</span>
              <span className="font-mono-telemetry text-mono-telemetry text-outline-variant">UID: ENG-TNEGA-7749X</span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 font-mono-telemetry text-mono-telemetry text-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified_user</span>
                <span>TLS 1.3 / mTLS Node Certificate Valid</span>
              </div>
              <div className="flex items-center gap-2 bg-inverse-surface/80 px-3 py-1 rounded">
                <span className="material-symbols-outlined text-[15px] text-secondary-container">alarm</span>
                <span className="font-mono-telemetry text-mono-telemetry text-secondary-fixed">SESSION LEASE:</span>
                <span className="font-mono-telemetry text-mono-telemetry font-bold text-secondary-container">{formatLease()}</span>
              </div>
              <button
                onClick={() => setLeaseSeconds(30 * 60)}
                className="px-2.5 py-1 rounded bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-inverse-on-surface font-label-telemetry text-label-telemetry transition-colors cursor-pointer"
                type="button"
              >
                RE-AUTHENTICATE
              </button>
            </div>
          </div>

          {/* Telemetry Master Grid Banner */}
          <div className="w-full bg-surface-container-low px-screen-padding-edge py-5 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-admin-gap-normal">
              
              {/* Card 1: Node Identification */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">Node Hardware</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">developer_board</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold block truncate">ESP32-S3</span>
                  <span className="font-mono-telemetry text-mono-telemetry text-on-surface-variant block truncate">WROOM-1-N8R8 Dual-Core</span>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">XTENSA LX7</span>
                  <span className="font-mono-telemetry text-mono-telemetry font-bold text-on-surface">240 MHz</span>
                </div>
              </div>

              {/* Card 2: Firmware Info */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">OTA Firmware</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">system_update_alt</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">v2.4.1-OTA</span>
                  <span className="font-mono-telemetry text-mono-telemetry text-tertiary-container font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span> Channel: STABLE
                  </span>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">BUILD STAMP</span>
                  <span className="font-mono-telemetry text-mono-telemetry">2025.04.18-REL</span>
                </div>
              </div>

              {/* Card 3: Flash Memory Utilization */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">SPI Flash ROM</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">memory</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">4.8</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ 8.0 MB</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">PARTITION</span>
                  <span className="font-mono-telemetry text-mono-telemetry font-bold text-primary">60.0% ALLOC</span>
                </div>
              </div>

              {/* Card 4: Kiosk Physical Uptime */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">Terminal Uptime</span>
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">timer</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">99.8%</span>
                  <span className="font-mono-telemetry text-mono-telemetry text-on-surface-variant block">41d 16h 04m without fault</span>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">WATCHDOG</span>
                  <span className="font-mono-telemetry text-mono-telemetry text-tertiary-fixed-dim font-bold">ACTIVE (0 resets)</span>
                </div>
              </div>

              {/* Card 5: Thermal Paper Gauge */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">Thermal Roll</span>
                  <span className="material-symbols-outlined text-[18px] text-secondary">receipt_long</span>
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">82%</span>
                    <span className="font-mono-telemetry text-mono-telemetry text-on-surface-variant">~410 slips</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">SENSOR STATUS</span>
                  <span className="font-mono-telemetry text-mono-telemetry font-bold text-tertiary-fixed-dim">FEED OK</span>
                </div>
              </div>

              {/* Card 6: Power Bus / Supply V */}
              <div className="bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase tracking-wider">V-Rail &amp; Temp</span>
                  <span className="material-symbols-outlined text-[18px] text-primary">bolt</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">3.31V / 12.0V</span>
                  <span className="font-mono-telemetry text-mono-telemetry text-on-surface-variant block">Thermal: 43.8°C nominal</span>
                </div>
                <div className="mt-2 pt-2 flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-telemetry text-label-telemetry">UPS RESERVE</span>
                  <span className="font-mono-telemetry text-mono-telemetry font-bold text-on-surface">100% (AC Grid)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Operational Diagnostics & Control Main Workspace */}
          <div className="w-full px-screen-padding-edge py-6 space-y-6">
            
            {/* Top Action Bar & Control Triggers */}
            <div className="flex flex-wrap items-center justify-between gap-admin-gap-normal bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[24px]">tune</span>
                </div>
                <div>
                  <h1 className="font-headline-sm text-headline-sm text-primary font-bold">Kiosk Node Operations Panel</h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">TNeGA Chennai Central Regional Cluster • ID: TN-CHE-042</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAddScheme}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-headline-sm text-body-md font-bold hover:bg-primary-container shadow-sm transition-all active:translate-y-0.5 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>+ Add Scheme</span>
                </button>

                <button
                  onClick={handlePushOTA}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-headline-sm text-body-md font-bold shadow-sm transition-all active:translate-y-0.5 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">cell_tower</span>
                  <span>Push OTA Update to Kiosk</span>
                </button>

                <button
                  onClick={handleReboot}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-error-container hover:bg-error/20 text-on-error-container font-headline-sm text-body-md font-bold shadow-sm transition-all active:translate-y-0.5 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                  <span>Reboot ESP32 Kiosk</span>
                </button>
              </div>
            </div>

            {/* Dual Split Diagnostic View: OLED Twin & Live Telemetry Terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-admin-gap-normal">
              
              {/* ESP32 Digital Twin OLED Monitor (A3) */}
              <div className="lg:col-span-5 flex flex-col bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">tv</span>
                    <h2 className="font-headline-sm text-body-lg font-bold text-primary">ESP32 Digital Twin OLED</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono-telemetry text-mono-telemetry text-on-surface-variant">SSD1306 128x64 I2C</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
                  </div>
                </div>

                {/* Simulated Physical Bezel Container */}
                <div className="w-full bg-inverse-surface rounded-xl p-4 shadow-xl flex flex-col items-center justify-center my-auto">
                  <div className="w-full flex items-center justify-between px-2 pb-2 text-surface-variant font-mono-telemetry text-label-telemetry">
                    <span>ADDR: 0x3C</span>
                    <span>BUS SPEED: 400 KHz</span>
                    <span>FPS: 30</span>
                  </div>

                  {/* Monochromatic Digital Twin Pixel Matrix */}
                  <div className="w-full aspect-[2/1] bg-black rounded-md p-3 relative overflow-hidden flex flex-col justify-between shadow-[inset_0_0_15px_rgba(0,0,0,0.9)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tertiary-fixed/5 to-transparent pointer-events-none"></div>

                    {/* OLED Simulated Header */}
                    <div className="flex items-center justify-between text-tertiary-fixed font-mono-telemetry text-label-telemetry">
                      <span>TN-CHE-042 [{oledState.status}]</span>
                      <div className="flex items-center gap-1">
                        <span>WIFI: -54dBm</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
                      </div>
                    </div>

                    {/* OLED Center Screen Canvas/State */}
                    <div className="my-auto py-1 text-center">
                      <div className="text-tertiary-fixed font-mono-telemetry text-body-md font-bold tracking-tight">
                        e-SEVAI TN CITIZEN KIOSK
                      </div>
                      <div className="text-tertiary-fixed/80 font-mono-telemetry text-label-telemetry mt-0.5">
                        PLEASE SCAN SMART CARD OR TAP TOUCHSCREEN
                      </div>
                      <div className="inline-block mt-2 px-3 py-1 bg-tertiary-container/60 text-tertiary-fixed font-mono-telemetry text-mono-telemetry tracking-widest">
                        CARD_ID: {oledState.cardId}
                      </div>
                    </div>

                    {/* OLED Status Footer */}
                    <div className="flex items-center justify-between text-tertiary-fixed/70 font-mono-telemetry text-label-telemetry pt-1">
                      <span>HEAP: 218KB</span>
                      <span>SCHEMES: {schemes.length}/8 ACT</span>
                      <span>SLOT: {oledState.slot}</span>
                    </div>
                  </div>

                  {/* Microcontroller Silkscreen Physical Buttons Emulation */}
                  <div className="w-full grid grid-cols-4 gap-2 mt-3 pt-2">
                    <button
                      onClick={() => {
                        setOledState({ cardId: '[TEST_OK]', status: 'SELFTEST', slot: 1 });
                        setTimeout(() => setOledState({ cardId: '[WAITING_FOR_TAG]', status: 'READY', slot: 0 }), 2000);
                      }}
                      className="py-1.5 px-2 rounded bg-inverse-surface/80 hover:bg-surface-variant/20 text-inverse-on-surface font-mono-telemetry text-label-telemetry transition-colors text-center cursor-pointer"
                      type="button"
                    >
                      SW1: TEST
                    </button>
                    <button
                      onClick={() => {
                        window.alert('Paper feed sequence initiated. 25mm advanced.');
                      }}
                      className="py-1.5 px-2 rounded bg-inverse-surface/80 hover:bg-surface-variant/20 text-inverse-on-surface font-mono-telemetry text-label-telemetry transition-colors text-center cursor-pointer"
                      type="button"
                    >
                      SW2: FEED
                    </button>
                    <button
                      onClick={() => {
                        window.alert('I2C Touchscreen Calibration matrix loaded from EEPROM: [1.02, 0.99, -4.2]');
                      }}
                      className="py-1.5 px-2 rounded bg-inverse-surface/80 hover:bg-surface-variant/20 text-inverse-on-surface font-mono-telemetry text-label-telemetry transition-colors text-center cursor-pointer"
                      type="button"
                    >
                      SW3: CALIB
                    </button>
                    <button
                      onClick={handleReboot}
                      className="py-1.5 px-2 rounded bg-error/40 hover:bg-error/60 text-inverse-on-surface font-mono-telemetry text-label-telemetry transition-colors text-center cursor-pointer"
                      type="button"
                    >
                      RST: HARD
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-on-surface-variant font-label-telemetry text-label-telemetry">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                    DMA Framebuffer Mirror Synchronized
                  </span>
                  <span className="font-mono-telemetry">REFRESH: 33ms</span>
                </div>
              </div>

              {/* Live Keystroke, RFID & Peripheral Stream (A3) */}
              <div className="lg:col-span-7 flex flex-col bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">terminal</span>
                    <h2 className="font-headline-sm text-body-lg font-bold text-primary">Live Keystroke &amp; Peripheral Stream (A3)</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearTerminal}
                      className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-telemetry text-label-telemetry cursor-pointer"
                      type="button"
                    >
                      CLEAR BUFFER
                    </button>
                    <span className="px-2 py-1 rounded bg-surface-container-high font-mono-telemetry text-mono-telemetry text-primary font-bold">
                      MQTT: esp32/che042/events
                    </span>
                  </div>
                </div>

                {/* Terminal Console Canvas */}
                <div className="flex-1 min-h-[290px] max-h-[340px] overflow-y-auto bg-inverse-surface rounded-xl p-3.5 font-mono-telemetry text-mono-telemetry space-y-1 text-surface-container-highest shadow-inner">
                  <div className="text-on-surface-variant/80 pb-1">
                    -- TNeGA Hardware Telemetry Stream Link Opened. Protocol: MQTT-QoS1 --
                  </div>
                  {terminalLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-tertiary-fixed-dim font-bold">[{log.time}]</span>
                      <span className={log.tagColor}>{log.tag}</span>
                      <span>{log.text}</span>
                    </div>
                  ))}
                </div>

                {/* Terminal Quick Action Bar & Peripheral Status */}
                <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-admin-gap-dense">
                  <div className="flex items-center gap-4 text-on-surface-variant font-label-telemetry text-label-telemetry">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                      RFID RC522: OK
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                      4x4 Matrix Pad: OK
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                      Optical Head: OK
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
                      UART2 Serial: TX/RX PASS
                    </span>
                  </div>

                  <button
                    onClick={handleInjectKey}
                    className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary font-mono-telemetry text-mono-telemetry font-bold transition-all cursor-pointer"
                    type="button"
                  >
                    + Inject Key Event
                  </button>
                </div>
              </div>

            </div>

            {/* Scheme Manager & 8-Scheme Flash Quota Guard (A4) */}
            <div className="w-full bg-surface-container-lowest p-admin-pane-padding rounded-xl shadow-sm space-y-5">
              
              {/* Quota Visualizer & Hardware Guard Alert */}
              <div className="p-admin-pane-padding rounded-xl bg-surface-container-low shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[22px]">shield</span>
                      <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Scheme Manager &amp; 8-Scheme Flash Quota Guard (A4)</h2>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Node Non-Volatile Flash Partition Scheme: Enforces 8-Scheme maximum hardware slot ceiling to prevent EEPROM overflow and corrupted OTA deployments.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-body-sm font-bold flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">warning</span>
                      <span>Quota Alert: {Math.round((schemes.length / 8) * 100)}% Capacity Used</span>
                    </div>
                  </div>
                </div>

                {/* 8-Slot Hardware Visualizer Representation */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between font-label-telemetry text-label-telemetry">
                    <span className="font-bold text-primary tracking-wide">
                      CURRENT FLASH ALLOCATION: {schemes.length} OF 8 SCHEMES ACTIVE ({Math.round((schemes.length / 8) * 100)}% FLASH QUOTA)
                    </span>
                    <span className="font-mono-telemetry text-mono-telemetry text-on-surface-variant">
                      Used: {schemes.length * 102} KB / 816 KB Max Slot Table
                    </span>
                  </div>

                  {/* Discrete Hardware Slots Display */}
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((slotNum) => {
                      const schemeInSlot = schemes[slotNum - 1];
                      if (schemeInSlot) {
                        return (
                          <div key={slotNum} className="bg-primary-container text-on-primary p-2 rounded-lg text-center shadow-sm">
                            <span className="font-mono-telemetry text-label-telemetry block opacity-80">SLOT #{slotNum}</span>
                            <span className="font-label-touch text-label-telemetry block truncate font-bold">
                              {schemeInSlot.titleEn.split(' ')[0]}
                            </span>
                            <span className="font-mono-telemetry text-[11px] block text-tertiary-fixed-dim">{schemeInSlot.size}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={slotNum} className="bg-surface-container-highest text-on-surface-variant p-2 rounded-lg text-center">
                          <span className="font-mono-telemetry text-label-telemetry block opacity-70">SLOT #{slotNum}</span>
                          <span className="font-label-touch text-label-telemetry block truncate font-semibold">AVAILABLE</span>
                          <span className="font-mono-telemetry text-[11px] block text-on-surface-variant">102 KB FREE</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Scheme List Data Table */}
              <div className="overflow-x-auto rounded-xl shadow-sm">
                <table className="w-full text-left bg-surface-container-lowest">
                  <thead className="bg-surface-container-low text-on-surface-variant font-label-telemetry text-label-telemetry uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Slot</th>
                      <th className="py-3 px-4">Scheme Name (English &amp; Tamil)</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Direct Benefit Value</th>
                      <th className="py-3 px-4">Flash Weight</th>
                      <th className="py-3 px-4">Node Status</th>
                      <th className="py-3 px-4 text-right">Hardware Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-0 text-on-surface font-body-md text-body-md">
                    {schemes.map((s, idx) => (
                      <tr key={s.slot} className={`hover:bg-surface-container-low/50 transition-colors ${idx % 2 === 1 ? 'bg-surface-container-low/20' : ''}`}>
                        <td className="py-3.5 px-4 font-mono-telemetry text-mono-telemetry text-primary font-bold">{s.slot}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-headline-sm text-body-lg font-bold text-primary">{s.titleEn}</div>
                          <div className="font-body-sm text-body-sm text-on-surface-variant">{s.titleTa}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-telemetry text-label-telemetry font-semibold">
                            {s.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono-telemetry text-mono-telemetry font-bold text-primary">
                          {s.benefit}
                        </td>
                        <td className="py-3.5 px-4 font-mono-telemetry text-mono-telemetry text-on-surface-variant">
                          {s.size}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono-telemetry text-mono-telemetry font-bold ${
                            s.status === 'PUBLISHED' ? 'bg-tertiary-container text-tertiary-fixed' : 'bg-secondary-fixed text-on-secondary-fixed'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'PUBLISHED' ? 'bg-tertiary-fixed-dim' : 'bg-secondary'}`}></span>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => {
                                const newTitle = window.prompt('Edit Scheme Name:', s.titleEn);
                                if (newTitle) {
                                  setSchemes((prev) => prev.map((item) => item.slot === s.slot ? { ...item, titleEn: newTitle } : item));
                                }
                              }}
                              className="p-1.5 rounded hover:bg-surface-container text-primary cursor-pointer"
                              title="Edit Scheme Payload"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => {
                                window.alert(`Slot ${s.slot} prioritized for instant DMA caching on ESP32-S3.`);
                              }}
                              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
                              title="Move Slot Priority"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">swap_vert</span>
                            </button>
                            <button
                              onClick={() => handleDeleteScheme(s.slot)}
                              className="p-1.5 rounded hover:bg-error-container text-error cursor-pointer"
                              title="Purge from EEPROM"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Table Note & Partition Status */}
              <div className="flex flex-wrap items-center justify-between text-on-surface-variant font-label-telemetry text-label-telemetry pt-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">verified</span>
                  <span>Dual SPI Flash Banking: Bank 0 (Active), Bank 1 (Safe Rollback Mirror)</span>
                </div>
                <div>
                  <span>REMAINING SLOTS AVAILABLE: <strong>{8 - schemes.length} OF 8 SCHEMES</strong></span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-2px_8px_rgba(0,32,70,0.03)] py-3 px-screen-padding-edge">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase">
              Tamil Nadu e-Governance Agency (TNeGA) • Citizen Self-Service Terminal
            </span>
            <span className="inline-flex items-center gap-1.5 text-on-surface-variant font-mono-telemetry text-mono-telemetry">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              ESP32 Telemetry Link: Optimal (12ms)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Toll-free Assistance: 1800-425-1333</span>
            <button
              onClick={() => navigate('/')}
              className="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
              title="Discreet Hardware Admin Mode"
            >
              <span className="material-symbols-outlined text-[18px]">key</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AdminDashboardPage;
