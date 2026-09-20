import React, { createContext, useContext, useState, useEffect } from 'react';

const SchemeContext = createContext();

export const CATEGORIES_DATA = {
  agriculture: {
    id: 'agriculture',
    titleEn: 'Agriculture',
    titleTa: 'விவசாயம்',
    icon: 'Wheat',
    descEn: 'Subsidies, crop insurance, fertilizer support & equipment loans.',
    descTa: 'மானியங்கள், பயிர் காப்பீடு, உர உதவி மற்றும் உபகரணக் கடன்கள்.',
    color: 'emerald',
  },
  welfare: {
    id: 'welfare',
    titleEn: 'Social Welfare',
    titleTa: 'சமூக நலன்',
    icon: 'Shield',
    descEn: 'Pensions, women empowerment, health coverage & job cards.',
    descTa: 'முதியோர் உதவித்தொகை, பெண்கள் நலன், காப்பீடு மற்றும் வேலை அட்டை.',
    color: 'sky',
  },
  housing: {
    id: 'housing',
    titleEn: 'Housing',
    titleTa: 'வீடமைப்பு',
    icon: 'Home',
    descEn: 'Pucca houses, free house site pattas & construction grants.',
    descTa: 'பக்கா வீடுகள், இலவச வீட்டு மனை பட்டா மற்றும் கட்டுமான மானியங்கள்.',
    color: 'amber',
  },
  education: {
    id: 'education',
    titleEn: 'Education',
    titleTa: 'கல்வி',
    icon: 'GraduationCap',
    descEn: 'Scholarships, higher education stipend, laptops & skill training.',
    descTa: 'கல்வி உதவித்தொகை, உயர்கல்வி ஊக்கத்தொகை, இலவச மடிக்கணினி & திறன் பயிற்சி.',
    color: 'indigo',
  },
  health: {
    id: 'health',
    titleEn: 'Healthcare',
    titleTa: 'மருத்துவம்',
    icon: 'HeartPulse',
    descEn: 'Cashless hospital treatment, maternal aid & doorstep healthcare.',
    descTa: 'கட்டணமில்லா மருத்துவ சிகிச்சை, மகப்பேறு உதவி & மக்களைத் தேடி மருத்துவம்.',
    color: 'rose',
  },
};

const initialSchemes = [
  {
    id: 'SCH-01',
    category: 'agriculture',
    titleEn: 'PM Kisan Samman Nidhi',
    titleTa: 'பி.எம் கிசான் திட்டம்',
    deptEn: 'Department of Agriculture & Farmers Welfare',
    deptTa: 'வேளாண்மை மற்றும் விவசாயிகள் நலத்துறை',
    benefitEn: '₹6,000 / year in 3 direct payments',
    benefitTa: 'ஆண்டுக்கு ₹6,000 நேரடி வங்கி வரவு',
    eligibilityEn: 'Small and marginal farmers holding cultivable land up to 2 hectares.',
    eligibilityTa: '2 ஹெக்டேர் வரை நிலம் வைத்துள்ள சிறு மற்றும் குறு விவசாயிகள்.',
    activeOnTerminal: true,
    clicks: 542,
    rank: 1,
  },
  {
    id: 'SCH-02',
    category: 'housing',
    titleEn: 'Pradhan Mantri Awas Yojana (PMAY-G)',
    titleTa: 'பிரதம மந்திரி கிராமப்புற வீட்டு வசதி திட்டம்',
    deptEn: 'Ministry of Rural Development',
    deptTa: 'ஊரக வளர்ச்சி அமைச்சகம்',
    benefitEn: '₹1.20 Lakh direct financial assistance for pucca house',
    benefitTa: 'பக்கா வீடு கட்ட ₹1.20 லட்சம் நேரடி நிதி உதவி',
    eligibilityEn: 'Homeless rural households or families living in kutcha / dilapidated houses.',
    eligibilityTa: 'வீடற்ற அல்லது தற்காலிக குடிசை வீடுகளில் வசிக்கும் கிராமப்புற குடும்பங்கள்.',
    activeOnTerminal: true,
    clicks: 418,
    rank: 2,
  },
  {
    id: 'SCH-03',
    category: 'welfare',
    titleEn: 'Mahatma Gandhi NREGA (100 Days Job)',
    titleTa: 'மகாத்மா காந்தி 100 நாள் வேலை திட்டம்',
    deptEn: 'Rural Development Department',
    deptTa: 'ஊரக வளர்ச்சி மற்றும் பஞ்சாயத்து ராஜ் துறை',
    benefitEn: '100 days guaranteed wage employment @ ₹319/day',
    benefitTa: 'ஆண்டுக்கு 100 நாட்கள் உத்தரவாத வேலை மற்றும் தினக்கூலி',
    eligibilityEn: 'Adult rural citizens willing to do unskilled manual work.',
    eligibilityTa: 'உடலுழைப்பு செய்ய விருப்பமுள்ள கிராமப்புற வயது வந்த குடிமக்கள்.',
    activeOnTerminal: true,
    clicks: 362,
    rank: 3,
  },
  {
    id: 'SCH-04',
    category: 'agriculture',
    titleEn: 'Kalaignar All Village Integrated Agriculture Scheme',
    titleTa: 'கலைஞரின் அனைத்து கிராம ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்',
    deptEn: 'Tamil Nadu Agriculture Department',
    deptTa: 'தமிழ்நாடு வேளாண்மை மற்றும் உழவர் நலத்துறை',
    benefitEn: 'Free tarpaulins, power sprayers, saplings & canal desilting',
    benefitTa: 'இலவச தார்ப்பாய், தெளிப்பான், மரக்கன்றுகள் மற்றும் பாசன வாய்க்கால் தூர்வாருதல்',
    eligibilityEn: 'All village farmers residing in the selected village panchayats.',
    eligibilityTa: 'தேர்ந்தெடுக்கப்பட்ட கிராம பஞ்சாயத்துகளில் வசிக்கும் அனைத்து விவசாயிகள்.',
    activeOnTerminal: true,
    clicks: 289,
    rank: 4,
  },
  {
    id: 'SCH-05',
    category: 'welfare',
    titleEn: 'Kalaignar Magalir Urimai Thittam',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    deptEn: 'Department of Social Welfare and Women Rights',
    deptTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை',
    benefitEn: '₹1,000 / month direct bank assistance for women heads',
    benefitTa: 'குடும்பத் தலைவிகளுக்கு மாதம் ₹1,000 நேரடி வங்கி உதவி',
    eligibilityEn: 'Women heads of household with annual family income under ₹2.5 Lakh.',
    eligibilityTa: 'ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் உள்ள குடும்பங்களின் பெண் தலைவர்கள்.',
    activeOnTerminal: true,
    clicks: 245,
    rank: 5,
  },
  {
    id: 'SCH-06',
    category: 'welfare',
    titleEn: 'Chief Minister Comprehensive Health Insurance Scheme (CMCHIS)',
    titleTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    deptEn: 'Health and Family Welfare Department',
    deptTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை',
    benefitEn: 'Cashless hospital treatment up to ₹5,00,000 / year',
    benefitTa: 'ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவ சிகிச்சை',
    eligibilityEn: 'Families with annual income less than ₹1,20,000 having smart ration card.',
    eligibilityTa: 'குடும்ப அட்டை வைத்துள்ள மற்றும் ஆண்டு வருமானம் ₹1.2 லட்சத்திற்கு குறைவான குடும்பங்கள்.',
    activeOnTerminal: true,
    clicks: 198,
    rank: 6,
  },
  {
    id: 'SCH-07',
    category: 'agriculture',
    titleEn: 'Tamil Nadu Free Power Supply for Agriculture',
    titleTa: 'இலவச விவசாய மின்சார இணைப்பு திட்டம்',
    deptEn: 'TANGEDCO / Power Department',
    deptTa: 'தமிழ்நாடு மின் உற்பத்தி மற்றும் பகிர்மான கழகம்',
    benefitEn: '100% Free unmetered electricity for agricultural pump-sets',
    benefitTa: 'விவசாய பம்புசெட்டுகளுக்கு 100% இலவச மின்சாரம்',
    eligibilityEn: 'Farmers having agricultural land with functional irrigation borewell or open well.',
    eligibilityTa: 'பாசன கிணறு அல்லது ஆழ்துளை கிணறு கொண்ட நில உரிமையாளர்கள்.',
    activeOnTerminal: false,
    clicks: 124,
    rank: 7,
  },
  {
    id: 'SCH-08',
    category: 'housing',
    titleEn: 'Free House Site Patta Scheme',
    titleTa: 'இலவச வீட்டு மனை பட்டா திட்டம்',
    deptEn: 'Revenue and Disaster Management Department',
    deptTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    benefitEn: 'Free residential plot ownership patta up to 3 cents',
    benefitTa: '3 சென்ட் வரை இலவச வீட்டு மனை நில உரிமைப் பட்டா',
    eligibilityEn: 'Landless poor families residing in rural areas without own home.',
    eligibilityTa: 'சொந்த வீடு இல்லாத கிராமப்புற நிலமற்ற ஏழைக் குடும்பங்கள்.',
    activeOnTerminal: false,
    clicks: 92,
    rank: 8,
  },
];

const initialEvents = [
  { id: 1, time: 'Just now', type: 'SCHEME_VIEW', target: 'PM Kisan Samman Nidhi', key: 'SELECT_KEY', node: 'ESP32_NODE_01', detail: 'Citizen viewed full grant benefits & requirements' },
  { id: 2, time: '18s ago', type: 'MENU_NAV', target: 'Agriculture Category', key: 'NAV_DOWN', node: 'ESP32_NODE_01', detail: 'Cursor moved down to index 01' },
  { id: 3, time: '1m ago', type: 'SCHEME_VIEW', target: 'Pradhan Mantri Awas Yojana', key: 'SELECT_KEY', node: 'ESP32_NODE_01', detail: 'Inquired on subsidy amount for rural pucca house' },
  { id: 4, time: '4m ago', type: 'CATEGORY_SELECT', target: 'Housing Category', key: 'SELECT_KEY', node: 'ESP32_NODE_01', detail: 'Loaded housing category list from SPIFFS flash' },
  { id: 5, time: '9m ago', type: 'HEARTBEAT', target: 'MQTT Broker', key: 'NET_PING', node: 'ESP32_NODE_01', detail: 'Ping ACK: RSSI -54 dBm, 142 KB Heap Free' },
];

export const SchemeProvider = ({ children }) => {
  const [schemes, setSchemes] = useState(initialSchemes);
  const [events, setEvents] = useState(initialEvents);
  
  // Public Portal persistent language state
  const [publicLanguage, setPublicLanguageState] = useState(() => {
    try {
      return localStorage.getItem('crivera_app_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setPublicLanguage = (lang) => {
    const validLang = lang === 'ta' ? 'ta' : 'en';
    setPublicLanguageState(validLang);
    try {
      localStorage.setItem('crivera_app_lang', validLang);
      // Dispatch custom event to notify any non-React listeners
      window.dispatchEvent(new Event('crivera_language_changed'));
    } catch (e) {}
  };

  const [publicStep, setPublicStep] = useState('LANGUAGE'); // 'LANGUAGE' | 'CATEGORY' | 'SCHEMES'
  const [selectedCategory, setSelectedCategory] = useState('agriculture');

  // Digital Twin state
  const [oledScreen, setOledScreen] = useState('MENU'); // 'MENU' | 'DETAILS' | 'CONFIRM'
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(initialSchemes[0]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');

  // Fetch live schemes from MongoDB Atlas via backend API
  useEffect(() => {
    const fetchLiveSchemes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/schemes');
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map(item => ({
            id: item.schemeId || item._id,
            category: item.category,
            scope: item.scope || 'Central',
            targetGroupEn: item.targetGroupEn || '',
            titleEn: item.titleEn,
            titleTa: item.titleTa || item.titleEn,
            deptEn: item.deptEn || '',
            deptTa: item.deptTa || item.deptEn || '',
            benefitEn: item.benefitAmount ? `${item.benefitAmount} - ${item.benefitDescEn || ''}` : (item.benefitDescEn || ''),
            benefitTa: item.benefitDescTa || item.benefitAmount || '',
            benefitAmount: item.benefitAmount || '',
            eligibilityEn: Array.isArray(item.eligibilityEn) ? item.eligibilityEn.join('; ') : (item.eligibilityEn || ''),
            eligibilityTa: Array.isArray(item.eligibilityTa) && item.eligibilityTa.length > 0 ? item.eligibilityTa.join('; ') : '',
            documentsEn: item.documentsEn || [],
            applicationMode: item.applicationMode || '',
            officialUrl: item.officialUrl || '',
            activeOnTerminal: Boolean(item.activeOnTerminal),
            clicks: item.clicks || Math.floor(Math.random() * 200) + 120,
            rank: item.rank || 99,
          }));
          setSchemes(mapped);
          const firstActive = mapped.find(s => s.activeOnTerminal) || mapped[0];
          if (firstActive) {
            setSelectedScheme(firstActive);
          }
        }
      } catch (err) {
        console.warn('Backend offline, using fallback schemes:', err);
      }
    };
    fetchLiveSchemes();
  }, []);

  const LIMIT = 8;
  const activeSchemes = schemes.filter(s => s.activeOnTerminal);

  // Hardware keypad emulation for Digital Twin
  const pressHardwareKey = (key) => {
    const timeNow = 'Just now';
    let newEvt = null;

    if (key === 'UP') {
      if (oledScreen === 'MENU') {
        const nextIdx = activeMenuIndex > 0 ? activeMenuIndex - 1 : activeSchemes.length - 1;
        setActiveMenuIndex(nextIdx);
        const target = activeSchemes[nextIdx]?.titleEn || 'Menu';
        newEvt = { id: Date.now(), time: timeNow, type: 'NAV_UP', target, key: 'KEY_UP', node: 'ESP32_NODE_01', detail: `Scrolled up to index ${nextIdx + 1}` };
      }
    } else if (key === 'DOWN') {
      if (oledScreen === 'MENU') {
        const nextIdx = activeMenuIndex < activeSchemes.length - 1 ? activeMenuIndex + 1 : 0;
        setActiveMenuIndex(nextIdx);
        const target = activeSchemes[nextIdx]?.titleEn || 'Menu';
        newEvt = { id: Date.now(), time: timeNow, type: 'NAV_DOWN', target, key: 'KEY_DOWN', node: 'ESP32_NODE_01', detail: `Scrolled down to index ${nextIdx + 1}` };
      }
    } else if (key === 'SELECT') {
      if (oledScreen === 'MENU') {
        const curr = activeSchemes[activeMenuIndex] || activeSchemes[0];
        setSelectedScheme(curr);
        setOledScreen('DETAILS');
        // Increment touch count
        setSchemes(prev => prev.map(s => s.id === curr.id ? { ...s, clicks: s.clicks + 1 } : s));
        newEvt = { id: Date.now(), time: timeNow, type: 'SCHEME_VIEW', target: curr.titleEn, key: 'KEY_SELECT', node: 'ESP32_NODE_01', detail: `Opened details for ${curr.titleEn}` };
      } else if (oledScreen === 'DETAILS') {
        setOledScreen('CONFIRM');
        newEvt = { id: Date.now(), time: timeNow, type: 'PRINT_TOKEN', target: selectedScheme?.titleEn, key: 'KEY_SELECT', node: 'ESP32_NODE_01', detail: 'Token slip printed on thermal printer' };
      } else {
        setOledScreen('MENU');
      }
    } else if (key === 'BACK') {
      setOledScreen('MENU');
      newEvt = { id: Date.now(), time: timeNow, type: 'RETURN_HOME', target: 'Main Menu', key: 'KEY_BACK', node: 'ESP32_NODE_01', detail: 'Returned to root menu on OLED' };
    }

    if (newEvt) {
      setEvents(prev => [newEvt, ...prev.slice(0, 19)]);
    }
  };

  // Inspect specific scheme on OLED
  const loadSchemeOntoOled = (scheme) => {
    setSelectedScheme(scheme);
    setOledScreen('DETAILS');
    const idx = activeSchemes.findIndex(s => s.id === scheme.id);
    if (idx !== -1) setActiveMenuIndex(idx);

    setEvents(prev => [
      {
        id: Date.now(),
        time: 'Just now',
        type: 'ADMIN_OVERRIDE',
        target: scheme.titleEn,
        key: 'REMOTE_CMD',
        node: 'ESP32_NODE_01',
        detail: `Admin mirrored "${scheme.titleEn}" to OLED screen`,
      },
      ...prev.slice(0, 19)
    ]);
  };

  // Toggle active scheme on terminal (max 8)
  const toggleSchemeActive = (id) => {
    setSchemes(prev => {
      const activeCount = prev.filter(s => s.activeOnTerminal).length;
      return prev.map(s => {
        if (s.id === id) {
          if (!s.activeOnTerminal && activeCount >= LIMIT) return s;
          return { ...s, activeOnTerminal: !s.activeOnTerminal };
        }
        return s;
      });
    });
  };

  // Add new scheme
  const addScheme = (scheme) => {
    const id = `SCH-${String(schemes.length + 1).padStart(2, '0')}`;
    const newRecord = {
      ...scheme,
      id,
      clicks: 0,
      rank: schemes.length + 1,
    };
    setSchemes(prev => [newRecord, ...prev]);
  };

  // Delete scheme
  const deleteScheme = (id) => {
    setSchemes(prev => prev.filter(s => s.id !== id));
  };

  // Simulate sync to hardware
  const syncTerminal = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('Just now');
      setEvents(prev => [
        {
          id: Date.now(),
          time: 'Just now',
          type: 'OTA_SYNC_SUCCESS',
          target: `${activeSchemes.length} Active Schemes`,
          key: 'FLASH_WRITE',
          node: 'ESP32_NODE_01',
          detail: `Synchronized ${activeSchemes.length} schemes into SPIFFS EEPROM block 0x30`,
        },
        ...prev.slice(0, 19)
      ]);
    }, 1200);
  };

  // Simulate reboot
  const rebootTerminal = () => {
    setIsRebooting(true);
    setOledScreen('MENU');
    setTimeout(() => {
      setIsRebooting(false);
      setEvents(prev => [
        {
          id: Date.now(),
          time: 'Just now',
          type: 'SYS_REBOOT',
          target: 'ESP32-WROOM-32',
          key: 'HARD_RESET',
          node: 'ESP32_NODE_01',
          detail: 'Cold reboot OK. Free heap: 142 KB. Network connected (-54 dBm)',
        },
        ...prev.slice(0, 19)
      ]);
    }, 1600);
  };

  return (
    <SchemeContext.Provider
      value={{
        schemes,
        activeSchemes,
        events,
        LIMIT,
        publicLanguage,
        setPublicLanguage,
        language: publicLanguage,
        switchLanguage: setPublicLanguage,
        publicStep,
        setPublicStep,
        selectedCategory,
        setSelectedCategory,
        oledScreen,
        activeMenuIndex,
        selectedScheme,
        isSyncing,
        isRebooting,
        lastSyncTime,
        pressHardwareKey,
        loadSchemeOntoOled,
        toggleSchemeActive,
        addScheme,
        deleteScheme,
        syncTerminal,
        rebootTerminal,
      }}
    >
      {children}
    </SchemeContext.Provider>
  );
};

export const useScheme = () => {
  const context = useContext(SchemeContext);
  if (!context) throw new Error('useScheme must be used within a SchemeProvider');
  return context;
};
