import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CitizenKioskPage = () => {
  const navigate = useNavigate();

  // Inactivity Timer (45s)
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [currentLang, setCurrentLang] = useState('ta'); // 'en' | 'ta'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeedback, setModalFeedback] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [tokenBtnText, setTokenBtnText] = useState('டோக்கன் பெறுக • Print Token');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  // Selected scheme for modal
  const [activeScheme, setActiveScheme] = useState({
    code: '#TN-KMUT-2023',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    titleEn: 'Kalaignar Magalir Urimai Thogai',
    dept: 'Social Welfare & Women Empowerment Dept',
    benefit: '₹1,000',
    benefitSub: '/ மாதம் (மாதந்தோறும் 15-ஆம் தேதி)',
    tag: 'Direct Benefit Transfer',
    eligibilityTa: [
      { text: 'குடும்ப ஆண்டு வருமானம் < ₹2.5 லட்சம்', sub: 'Annual family income strictly below ₹2.5 Lakhs' },
      { text: 'நில உரிமை வரம்பு < 5 ஏக்கர்', sub: 'Dry land < 5 acres or Wet wetland < 2.5 acres' },
      { text: 'மின் நுகர்வு < 3,600 யூனிட்கள்', sub: 'Domestic electricity consumption below 3,600 units/year' },
    ],
  });

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsModalOpen(false);
          return 45;
        }
        return prev - 1;
      });
    }, 1000);

    const resetTimer = () => setSecondsLeft(45);
    window.addEventListener('click', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    return () => {
      clearInterval(timer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, []);

  const openModalWithScheme = (schemeData) => {
    if (schemeData) setActiveScheme(schemeData);
    setIsModalOpen(true);
    setModalFeedback('');
  };

  const handlePrintSlip = () => {
    setIsPrinting(true);
    setModalFeedback('🖨️ சீட்டு அச்சிடப்படுகிறது... Thermal slip is printing from slot #1.');
    setTimeout(() => {
      setModalFeedback('✅ அச்சிடப்பட்டது! Collect your printed acknowledgement slip.');
      setIsPrinting(false);
    }, 1600);
  };

  const handleSendSMS = () => {
    const phone = window.prompt('Enter 10-digit mobile number for SMS summary / கைபேசி எண்:', '9840012345');
    if (phone) {
      setModalFeedback(`📱 SMS sent with ${activeScheme.titleEn} eligibility token to +91 ${phone}`);
    }
  };

  const handlePrintToken = () => {
    setTokenBtnText('அச்சிடப்படுகிறது... Generating #A-083');
    setTimeout(() => {
      setTokenBtnText('டோக்கன் பெறப்பட்டது! Ticket #A-083 Printed');
      setTimeout(() => {
        setTokenBtnText('டோக்கன் பெறுக • Print Token');
      }, 3000);
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-surface text-on-surface ${highContrast ? 'contrast-125 saturate-150' : ''} ${fontSizeLarge ? 'text-lg' : ''}`}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,32,70,0.06)]">
        <div className="h-20 w-full px-screen-padding-edge flex items-center justify-between">
          <div className="flex items-center gap-admin-gap-normal">
            <div 
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm cursor-pointer"
            >
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
              className="px-4 py-2 rounded-xl font-headline-sm text-body-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              className="transition-all bg-primary-container text-on-primary font-headline-sm text-body-md px-5 py-2.5 rounded-xl shadow-sm cursor-pointer"
            >
              Citizen Kiosk Portal
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-5 py-2.5 rounded-xl font-headline-sm text-body-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all cursor-pointer"
            >
              Admin IoT Console
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-body-sm font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-mono-telemetry text-mono-telemetry font-bold tracking-tight">Reset in {secondsLeft}s</span>
            </div>

            <div className="flex items-center rounded-xl bg-surface-container-low p-1">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-3 py-1.5 rounded font-label-touch text-body-sm font-bold transition-all cursor-pointer ${
                  currentLang === 'en' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('ta')}
                className={`px-3 py-1.5 rounded font-label-touch text-body-sm font-bold transition-all cursor-pointer ${
                  currentLang === 'ta' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                தமிழ்
              </button>
            </div>

            <button
              onClick={() => navigate('/admin/dashboard')}
              title="Admin Login"
              className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Kiosk Content */}
      <main className="w-full pt-20 flex-1 bg-surface">
        <div className="flex flex-col w-full">
          
          {/* Accessibility & Active State Micro-Banner */}
          <section className="w-full bg-surface-container-high px-screen-padding-edge py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md flex-shrink-0">
                  <span className="material-symbols-outlined text-[32px]">assured_workload</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-headline-lg text-headline-sm md:text-headline-md text-primary font-bold">
                      {currentLang === 'ta' ? 'தமிழ்நாடு அரசு மக்கள் நலத்திட்டங்கள்' : 'Government of Tamil Nadu Citizen Welfare Portal'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-telemetry text-label-telemetry uppercase tracking-wider">
                      Verified Portal
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                    TN Direct Citizen Civic Benefits &amp; Welfare Delivery Gateway • Kiosk Terminal #42
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-surface-container-lowest p-1.5 rounded-xl shadow-sm">
                  <button
                    onClick={() => window.alert('குரல் வழிகாட்டி இயக்கப்பட்டது (Audio guidance enabled in Tamil & English)')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-headline-sm text-body-sm transition-all cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">volume_up</span>
                    <span className="hidden sm:inline">Audio Guide</span>
                  </button>
                  <div className="h-6 w-px bg-surface-container-highest mx-1"></div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all cursor-pointer"
                    title="High Contrast Mode"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[22px]">contrast</span>
                  </button>
                  <button
                    onClick={() => setFontSizeLarge(!fontSizeLarge)}
                    className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all font-bold text-body-sm cursor-pointer"
                    title="Enlarge Typography"
                    type="button"
                  >
                    A+
                  </button>
                </div>

                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed shadow-sm">
                  <span className="w-3 h-3 rounded-full bg-secondary animate-ping"></span>
                  <div className="flex flex-col">
                    <span className="font-label-telemetry text-label-telemetry leading-none uppercase text-on-secondary-fixed-variant">
                      Auto Reset
                    </span>
                    <span className="font-mono-telemetry text-mono-telemetry font-bold">
                      Inactivity: {secondsLeft}s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Kiosk Content Area */}
          <div className="max-w-7xl mx-auto w-full px-screen-padding-edge py-8 flex flex-col gap-10">
            
            {/* Trending Schemes */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-8 bg-secondary rounded-full"></div>
                  <div>
                    <h2 className="font-headline-lg text-headline-sm md:text-headline-md text-primary font-extrabold tracking-tight">
                      {currentLang === 'ta' ? 'முக்கிய மக்கள் நலத்திட்டங்கள் • Trending Citizen Schemes' : 'Trending Citizen Welfare Schemes'}
                    </h2>
                    <p className="font-body-md text-body-sm text-on-surface-variant">
                      Tap any scheme card below for immediate digital eligibility check and slip printout
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Scheme 1 */}
                <div
                  onClick={() => openModalWithScheme({
                    code: '#TN-KMUT-2023',
                    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
                    titleEn: 'Kalaignar Magalir Urimai Thogai',
                    dept: 'Social Welfare & Women Empowerment Dept',
                    benefit: '₹1,000',
                    benefitSub: '/ month to Bank (மாதந்தோறும் 15-ஆம் தேதி)',
                    tag: 'Direct Benefit Transfer',
                    eligibilityTa: [
                      { text: 'குடும்ப ஆண்டு வருமானம் < ₹2.5 லட்சம்', sub: 'Annual family income strictly below ₹2.5 Lakhs' },
                      { text: 'நில உரிமை வரம்பு < 5 ஏக்கர்', sub: 'Dry land < 5 acres or Wet wetland < 2.5 acres' },
                      { text: 'மின் நுகர்வு < 3,600 யூனிட்கள்', sub: 'Domestic electricity consumption below 3,600 units/year' },
                    ],
                  })}
                  className="group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 rounded-xl p-6 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden text-left min-h-[310px]"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-secondary"></div>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-telemetry text-label-telemetry uppercase tracking-wider font-bold">
                        Direct Benefit Transfer
                      </span>
                      <span className="material-symbols-outlined text-secondary text-[28px]">stars</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors mb-1">
                      கலைஞர் மகளிர் உரிமைத் திட்டம்
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface font-semibold mb-3">
                      Kalaignar Magalir Urimai Thogai
                    </p>
                    <div className="bg-surface-container-low p-3.5 rounded-lg mb-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary text-[32px]">payments</span>
                      <div>
                        <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase block">Sanctioned Financial Aid</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                          ₹1,000 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ month to Bank</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-label-touch text-body-md font-bold flex items-center justify-center gap-2 group-hover:bg-primary-container shadow-sm transition-colors cursor-pointer" type="button">
                    <span>விவரங்களை பார்க்க • Touch to View</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

                {/* Scheme 2 */}
                <div
                  onClick={() => openModalWithScheme({
                    code: '#TN-CMCHIS-2024',
                    titleTa: 'முதலமைச்சரின் விரிவான மருத்துவ காப்பீடு',
                    titleEn: 'CM Comprehensive Health Insurance (CMCHIS)',
                    dept: 'Health and Family Welfare Department',
                    benefit: '₹5,00,000',
                    benefitSub: '/ year cashless hospitalization',
                    tag: 'Universal Health Shield',
                    eligibilityTa: [
                      { text: 'ஸ்மார்ட் குடும்ப அட்டை வைத்திருப்பவர்கள்', sub: 'Active Smart Family Ration Card holders' },
                      { text: 'ஆண்டு வருமானம் ₹1.20 லட்சத்திற்குள்', sub: 'Annual income less than ₹1,20,000' },
                      { text: 'அனைத்து அரசு மற்றும் 1,090+ தனியார் மருத்துவமனைகள்', sub: 'Network of 1,090+ empanelled hospitals across TN' },
                    ],
                  })}
                  className="group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 rounded-xl p-6 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden text-left min-h-[310px]"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-surface-container-highest text-primary font-label-telemetry text-label-telemetry uppercase tracking-wider font-bold">
                        Universal Health Shield
                      </span>
                      <span className="material-symbols-outlined text-primary text-[28px]">health_and_safety</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-primary-container transition-colors mb-1">
                      முதலமைச்சரின் விரிவான மருத்துவ காப்பீடு
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface font-semibold mb-3">
                      CM Comprehensive Health Insurance (CMCHIS)
                    </p>
                    <div className="bg-surface-container-low p-3.5 rounded-lg mb-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[32px]">local_hospital</span>
                      <div>
                        <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase block">Family Coverage Ceiling</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                          ₹5,00,000 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ yr cashless</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3.5 px-4 rounded-xl bg-surface-container-high text-primary font-label-touch text-body-md font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-on-primary shadow-sm transition-colors cursor-pointer" type="button">
                    <span>விவரங்களை பார்க்க • Touch to View</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

                {/* Scheme 3 */}
                <div
                  onClick={() => openModalWithScheme({
                    code: '#TN-UZHAVAR-2024',
                    titleTa: 'உழவர் சந்தை & பண்ணை நல ஆதரவு',
                    titleEn: 'Uzhavar Santhai Direct Farmer Support',
                    dept: 'Agricultural Marketing & Agri-Business Department',
                    benefit: '0% Intermediary',
                    benefitSub: '+ Free Stalls & Direct Sales',
                    tag: 'Agri Direct Market Access',
                    eligibilityTa: [
                      { text: 'உழவர் அடையாள அட்டை மற்றும் பட்டா', sub: 'Valid Farmer ID Card and registered land patta' },
                      { text: 'நேரடி காய்கறி & பழ விற்பனையாளர்கள்', sub: 'Direct vegetable and fruit cultivating farmers' },
                      { text: 'இலவச போக்குவரத்து & எடை பார்க்கும் வசதி', sub: 'Zero commission and free daily market stall allotment' },
                    ],
                  })}
                  className="group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 rounded-xl p-6 shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden text-left min-h-[310px]"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-on-tertiary-container"></div>
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-surface-container-highest text-tertiary-container font-label-telemetry text-label-telemetry uppercase tracking-wider font-bold">
                        Agri Direct Market Access
                      </span>
                      <span className="material-symbols-outlined text-tertiary-container text-[28px]">agriculture</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-tertiary-container transition-colors mb-1">
                      உழவர் சந்தை &amp; பண்ணை நல ஆதரவு
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface font-semibold mb-3">
                      Uzhavar Santhai Direct Farmer Support
                    </p>
                    <div className="bg-surface-container-low p-3.5 rounded-lg mb-4 flex items-center gap-3">
                      <span className="material-symbols-outlined text-tertiary-container text-[32px]">storefront</span>
                      <div>
                        <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase block">Direct Trade Facility</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                          0% Intermediary <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">+ Free Stalls</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3.5 px-4 rounded-xl bg-surface-container-high text-primary font-label-touch text-body-md font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-on-primary shadow-sm transition-colors cursor-pointer" type="button">
                    <span>விவரங்களை பார்க்க • Touch to View</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

              </div>
            </section>

            {/* Fast-Track Token Generator */}
            <section className="w-full rounded-2xl bg-primary text-on-primary p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-2 z-10 max-w-2xl">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-telemetry text-label-telemetry font-bold uppercase w-fit">
                  Citizen Physical Walk-in Support
                </span>
                <h3 className="font-headline-lg text-headline-sm md:text-headline-md font-bold">
                  ஆவண சரிபார்ப்பு மற்றும் தபால் உதவி மையம்
                </h3>
                <p className="font-body-md text-body-md text-surface-variant">
                  Need in-person biometric scanning or smart card updates? Touch below to print a Fast-Track Queue Token for Counter 04 at this e-Sevai centre.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 z-10 w-full lg:w-auto">
                <button
                  onClick={handlePrintToken}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-headline-sm text-body-lg font-bold shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
                  <span>{tokenBtnText}</span>
                </button>
              </div>
            </section>

          </div>

          {/* Scheme Details Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
              <div className="bg-surface-container-lowest text-on-surface w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                
                {/* Modal Header */}
                <div className="bg-primary text-on-primary px-6 py-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[30px]">workspace_premium</span>
                    </div>
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-surface-container-high text-primary font-label-telemetry text-label-telemetry uppercase font-bold">
                        Scheme Code: {activeScheme.code}
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-primary font-bold mt-0.5">
                        {activeScheme.titleTa}
                      </h2>
                      <p className="font-body-md text-body-sm text-surface-variant">
                        {activeScheme.titleEn} • {activeScheme.dept}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-surface-container-high/20 hover:bg-surface-container-high/40 text-on-primary flex items-center justify-center transition-colors cursor-pointer"
                    title="Close Modal"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[24px]">close</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6">
                  <div className="p-5 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">currency_rupee</span>
                      </div>
                      <div>
                        <span className="font-label-telemetry text-label-telemetry uppercase text-on-secondary-fixed-variant font-bold">
                          Monthly Direct Benefit Transfer
                        </span>
                        <p className="font-headline-lg text-headline-lg text-secondary font-black leading-none mt-1">
                          {activeScheme.benefit}{' '}
                          <span className="font-headline-sm text-headline-sm font-semibold">{activeScheme.benefitSub}</span>
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 rounded-lg bg-surface-container-lowest text-secondary font-headline-sm text-body-md font-bold shadow-sm">
                      {activeScheme.tag}
                    </span>
                  </div>

                  {/* Checklist & Documents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">checklist</span>
                        <h4 className="font-headline-sm text-body-lg font-bold text-primary">தகுதி அளவுகோல் • Eligibility Checklist</h4>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {activeScheme.eligibilityTa.map((item, idx) => (
                          <label key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                            <input defaultChecked className="w-6 h-6 mt-0.5 rounded text-primary accent-primary cursor-pointer" type="checkbox" />
                            <div className="flex flex-col">
                              <span className="font-headline-sm text-body-md font-bold text-primary">{item.text}</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">{item.sub}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[22px]">folder_shared</span>
                        <h4 className="font-headline-sm text-body-lg font-bold text-primary">தேவையான ஆவணங்கள் • Required Documents</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-surface-container flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[28px]">fingerprint</span>
                          <div>
                            <span className="font-headline-sm text-body-sm font-bold text-primary block">ஆதார் அட்டை</span>
                            <span className="font-body-sm text-label-telemetry text-on-surface-variant">Aadhaar Card</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[28px]">badge</span>
                          <div>
                            <span className="font-headline-sm text-body-sm font-bold text-primary block">குடும்ப அட்டை</span>
                            <span className="font-body-sm text-label-telemetry text-on-surface-variant">Smart Ration Card</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[28px]">account_balance</span>
                          <div>
                            <span className="font-headline-sm text-body-sm font-bold text-primary block">வங்கி புத்தகம்</span>
                            <span className="font-body-sm text-label-telemetry text-on-surface-variant">Bank Passbook</span>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[28px]">bolt</span>
                          <div>
                            <span className="font-headline-sm text-body-sm font-bold text-primary block">மின்சாரக் கட்டணம்</span>
                            <span className="font-body-sm text-label-telemetry text-on-surface-variant">Electricity Bill</span>
                          </div>
                        </div>
                      </div>

                      {modalFeedback && (
                        <div className="p-3.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-headline-sm text-body-sm flex items-center gap-2.5 shadow-sm mt-2">
                          <span className="material-symbols-outlined text-[20px] text-tertiary">check_circle</span>
                          <span>{modalFeedback}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-surface-container-low px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-headline-sm text-body-md font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    முந்தைய பக்கம் • Back
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleSendSMS}
                      className="flex-1 sm:flex-initial px-6 py-4 rounded-xl bg-surface-container-highest hover:bg-surface-container text-primary font-headline-sm text-body-md font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[22px]">sms</span>
                      <span>📱 மொபைல் SMS • Send SMS</span>
                    </button>

                    <button
                      onClick={handlePrintSlip}
                      disabled={isPrinting}
                      className="flex-1 sm:flex-initial px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-body-md font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[22px]">print</span>
                      <span>{isPrinting ? 'அச்சிடப்படுகிறது...' : '🖨️ சீட்டு அச்சிடு • Print Slip'}</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest shadow-[0_-2px_8px_rgba(0,32,70,0.03)] py-3 px-screen-padding-edge">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-label-telemetry text-label-telemetry text-on-surface-variant uppercase">
              Tamil Nadu e-Governance Agency (TNeGA) • Citizen Self-Service Terminal
            </span>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-xs font-mono-telemetry text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>Admin Console</span>
          </button>
        </div>
      </footer>

    </div>
  );
};

export default CitizenKioskPage;
