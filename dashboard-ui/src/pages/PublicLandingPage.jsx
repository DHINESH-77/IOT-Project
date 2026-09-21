import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScheme } from '../context/SchemeContext';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const schemesList = [
  {
    id: 'SCH-01',
    category: 'agriculture',
    titleEn: 'PM Kisan Samman Nidhi',
    titleTa: 'கிசான் சம்மான் நிதி உதவி',
    benefitEn: '₹6,000 / year',
    benefitTa: 'ஆண்டுக்கு ₹6,000',
    descEn: 'Direct DBT grant for small & marginal farmers holding cultivable land up to 2 hectares.',
    descTa: '2 ஹெக்டேர் வரை நிலம் வைத்துள்ள விவசாயிகளுக்கு நேரடி வங்கி நிதி உதவி.',
    tagEn: 'Direct Financial Grant',
    tagTa: 'நேரடி நிதி உதவி',
  },
  {
    id: 'SCH-02',
    category: 'welfare',
    titleEn: 'Women Livelihood Grant (Magalir Urimai)',
    titleTa: 'மகளிர் உரிமை வாழ்வாதார உதவித்தொகை',
    benefitEn: '₹1,000 / month',
    benefitTa: 'மாதம் ₹1,000',
    descEn: 'Monthly economic independence assistance credited directly to women family heads.',
    descTa: 'குடும்பத் தலைவிகளின் மாதாந்திர நேரடி வங்கி வரவு உதவித்தொகை.',
    tagEn: 'Monthly Direct Benefit',
    tagTa: 'மாதாந்திர உதவி',
  },
  {
    id: 'SCH-03',
    category: 'housing',
    titleEn: 'Rural Pucca Housing Grant (PMAY-G)',
    titleTa: 'ஊரக நிரந்தர குடியிருப்பு மானியம்',
    benefitEn: '₹1,20,000 Grant',
    benefitTa: '₹1,20,000 மானியம்',
    descEn: 'Direct grant assistance to construct permanent concrete houses for rural households.',
    descTa: 'கிராமப்புற ஏழை மக்களுக்கு நிரந்தர பக்கா வீடு கட்ட நேரடி நிதி உதவி.',
    tagEn: 'Housing Grant',
    tagTa: 'வீடமைப்பு மானியம்',
  },
  {
    id: 'SCH-04',
    category: 'education',
    titleEn: 'Higher Education Empowerment Grant',
    titleTa: 'உயர்கல்வி ஊக்கத்தொகை திட்டம்',
    benefitEn: '₹1,000 / month',
    benefitTa: 'மாதம் ₹1,000',
    descEn: 'Monthly scholarship support throughout degree program for girl students.',
    descTa: 'பட்டப்படிப்பு பயிலும் மாணவிகளுக்கு மாதாந்திர நேரடி கல்வி உதவித்தொகை.',
    tagEn: 'Education Subsidy',
    tagTa: 'கல்வி உதவி',
  },
  {
    id: 'SCH-05',
    category: 'agriculture',
    titleEn: 'Solar Irrigation & Farm Power Grant',
    titleTa: 'சூரியசக்தி பாசன மானியத் திட்டம்',
    benefitEn: '100% Free Power & Subsidy',
    benefitTa: 'முழு மானியம் & மின்சாரம்',
    descEn: 'Clean continuous solar energy and uninterrupted power for rural farm irrigation.',
    descTa: 'விவசாய பம்புசெட்டுகளுக்கு சூரியசக்தி மற்றும் தடையற்ற மின் விநியோகம்.',
    tagEn: 'Energy Grant',
    tagTa: 'மின்சார மானியம்',
  },
  {
    id: 'SCH-06',
    category: 'welfare',
    titleEn: 'Senior Citizen Livelihood Support',
    titleTa: 'முதியோர் சமூகப் பாதுகாப்பு ஓய்வூதியம்',
    benefitEn: '₹1,20,000 / year',
    benefitTa: 'மாதம் ₹1,200',
    descEn: 'Direct monthly pension support for senior citizens with zero intermediary deduction.',
    descTa: 'ஆதரவற்ற முதியோர்களுக்கு மாதாந்திர நேரடி சமூகப் பாதுகாப்பு ஓய்வூதியம்.',
    tagEn: 'Social Security',
    tagTa: 'சமூக பாதுகாப்பு',
  },
];

const content = {
  en: {
    brandName: 'CRIVERA',
    brandTagline: 'SYSTEMS & INFRASTRUCTURE',
    nav: {
      home: 'Home',
      about: 'About',
      schemes: 'Schemes',
    },
    adminBtn: 'Officer Sign In',
    headline: 'Direct, dignified welfare delivery for every rural citizen.',
    subheading: 'An intelligent, offline-resilient digital welfare platform eliminating paperwork barriers, middleman leakages, and operational downtime. Delivering instant verification, grant tracking, and scheme accessibility directly to grassroots doorsteps.',
    primaryCta: 'Explore Welfare Schemes',
    secondaryCta: 'Officer Portal',
    quote: '"Empowering rural communities through transparent, accessible digital technology at every doorstep."',
    quoteAuthor: 'CRIVERA PHILOSOPHY',
    aboutModal: {
      title: 'About CRIVERA Platform',
      badge: 'Systems & Infrastructure',
      desc: 'CRIVERA delivers robust, offline-resilient digital infrastructure engineered to bring transparent public benefit distribution to every grassroots community without dependency on volatile connectivity.',
      pillars: [
        {
          title: 'Offline-First Resilience',
          desc: 'Operates continuously during rural power outages or internet drops via local hardware synchronization.',
          icon: 'offline_bolt',
        },
        {
          title: 'Direct Benefit Transparency',
          desc: 'Direct calculation of benefit entitlements and elimination of bureaucratic leakages.',
          icon: 'currency_rupee',
        },
        {
          title: 'Instant Hardware Attestation',
          desc: 'Sub-second cryptographic verification and physical token tracking.',
          icon: 'verified',
        },
      ],
      closeBtn: 'Close Overview',
    },
    schemesModal: {
      title: 'Active Public Welfare Schemes',
      badge: 'Verified Benefit Grants',
      desc: 'Browse through active welfare schemes with verified grant amounts and eligibility criteria.',
      closeBtn: 'Close Schemes',
    },
  },
  ta: {
    brandName: 'CRIVERA',
    brandTagline: 'SYSTEMS & INFRASTRUCTURE',
    nav: {
      home: 'முகப்பு',
      about: 'அமைப்பு பற்றி',
      schemes: 'நலத்திட்டங்கள்',
    },
    adminBtn: 'அதிகாரி உள்நுழைவு',
    headline: 'கிராமப்புற மக்களுக்கான நேரடி மற்றும் வெளிப்படையான நலச்சேவை.',
    subheading: 'இடைத்தரகர்கள் இன்றி, ஆவண அலைச்சல்களை தவிர்த்து, கிராம பஞ்சாயத்து அளவில் அரசு நலத்திட்டங்கள், உதவித்தொகை மற்றும் தகுதி விவரங்களை நேரடியாக தெரிந்து கொள்ள உதவும் அதிநவீன டிஜிட்டல் தளம்.',
    primaryCta: 'நலத்திட்டங்களை ஆராய்க',
    secondaryCta: 'அதிகாரி நுழைவு',
    quote: '"கடைக்கோடி கிராம மக்களுக்கும் கண்ணியமான, வெளிப்படையான நலச்சேவை தொழில்நுட்பம்."',
    quoteAuthor: 'CRIVERA நோக்கம்',
    aboutModal: {
      title: 'CRIVERA தளம் பற்றி',
      badge: 'அமைப்பு & கட்டமைப்பு',
      desc: 'CRIVERA என்பது இணைய சேவை மற்றும் மின்தடை நிலவும் கிராமப்புற பகுதிகளிலும் தடையின்றி இயங்கும் ஆஃப்லைன் தொழில்நுட்ப மக்கள் நல கட்டமைப்பாகும். இடைத்தரகர்கள் இன்றி அரசு உதவிகளை நேரடியாக அறிந்து கொள்ளலாம்.',
      pillars: [
        {
          title: 'ஆஃப்லைன் தொழில்நுட்பம்',
          desc: 'இணைய சேவை மற்றும் மின்தடைகளின் போதும் உள்ளூர் நினைவகம் மூலம் தடையின்றி இயங்கும்.',
          icon: 'offline_bolt',
        },
        {
          title: 'நேரடி வங்கி உதவி (DBT)',
          desc: 'முழு நிதி உதவி மற்றும் தகுதி விதிகள் எந்தவித இடைத்தரகரும் இன்றி வெளிப்படையாக காட்டப்படும்.',
          icon: 'currency_rupee',
        },
        {
          title: 'டோக்கன் & சரிபார்ப்பு',
          desc: 'நொடிகளில் தகுதி சரிபார்ப்பு மற்றும் அச்சிடப்பட்ட ஆவண சரிபார்ப்பு சீட்டு பெறலாம்.',
          icon: 'receipt_long',
        },
      ],
      closeBtn: 'சரி, புரிந்தது',
    },
    schemesModal: {
      title: 'செயலில் உள்ள மக்கள் நலத்திட்டங்கள்',
      badge: 'அங்கீகரிக்கப்பட்ட நேரடி நிதி உதவிகள்',
      desc: 'உதவித்தொகை விவரங்கள் மற்றும் தகுதி விதிமுறைகளுடன் கூடிய முழு பட்டியல்.',
      closeBtn: 'மூடுக',
    },
  },
};

const PublicLandingPage = () => {
  const navigate = useNavigate();
  const { publicLanguage: lang, setPublicLanguage: setLang } = useScheme();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSchemesModalOpen, setIsSchemesModalOpen] = useState(false);

  const videoRef = useRef(null);
  const lenisRef = useRef(null);
  const heroVectorRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const quoteSectionRef = useRef(null);
  const quoteCardRef = useRef(null);
  const quoteIconRef = useRef(null);

  // Real-time cursor parallax tracking for hero vector illustration
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2; // Normalized -1 to 1
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMouseOffset({ x, y });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Play the video once when the component mounts to keep the page lightweight
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.playbackRate = 1.0;
      video.play().catch(() => {
        // Autoplay might be blocked, silent catch
      });
    }
  }, []);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger Integration for Continuous Canvas
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky smooth exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Hero Vector Illustration: glides upward weightlessly melting into whitespace
      if (heroVectorRef.current) {
        gsap.to(heroVectorRef.current, {
          scrollTrigger: {
            trigger: heroVectorRef.current,
            start: 'top top+=60',
            end: 'bottom top',
            scrub: 1,
          },
          y: -40,
          opacity: 0.85,
          ease: 'none',
        });
      }

      // 2. Typography & Core CTA Flow: emerges organically out of the whitespace with buttery focus
      if (ctaSectionRef.current) {
        gsap.fromTo(
          ctaSectionRef.current,
          { y: 40, opacity: 0.5 },
          {
            scrollTrigger: {
              trigger: ctaSectionRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1,
            },
            y: 0,
            opacity: 1,
            ease: 'power1.out',
          }
        );
      }

      // 3. Quote Card Flow: smoothly lifts into focus without washing out opacity
      if (quoteCardRef.current) {
        gsap.fromTo(
          quoteCardRef.current,
          { y: 35 },
          {
            scrollTrigger: {
              trigger: quoteCardRef.current,
              start: 'top 95%',
              end: 'top 65%',
              scrub: 1,
            },
            y: 0,
            ease: 'power1.out',
          }
        );
      }

      // 4. Quote Badge Icon: pulls away with subtle independent floating motion on scroll
      if (quoteIconRef.current) {
        gsap.to(quoteIconRef.current, {
          scrollTrigger: {
            trigger: quoteCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -24,
          ease: 'none',
        });
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const t = content[lang];

  return (
    <div className="w-full min-h-screen font-sans antialiased text-slate-800 bg-white selection:bg-slate-900 selection:text-white relative overflow-x-hidden">
      
      {/* 1. The Header & Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md transition-all duration-300">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Left: CRIVERA Brand Identity */}
          <div className="flex items-center shrink-0">
            <a href="/" className="flex items-center space-x-3 focus:outline-none group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-950 border border-slate-800/80 shadow-sm flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-200">
                <img src="/crivera-logo.png" alt="CRIVERA Logo" className="w-full h-full object-contain filter drop-shadow-xs" />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-[17px] sm:text-[18.5px] font-black tracking-[0.24em] text-[#0F172A] uppercase leading-none font-sans">
                  CRIVERA
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-bold tracking-[0.28em] text-slate-400 uppercase mt-1 leading-none">
                  SYSTEMS &amp; INFRASTRUCTURE
                </span>
              </div>
            </a>
          </div>

          {/* Center: Ordered navigation items: 1. Home, 2. About, 3. Schemes, 4. Contacts */}
          <nav className="hidden md:flex items-center space-x-2 text-[13.5px] font-medium text-slate-600">
            <button 
              onClick={() => {
                if (lenisRef.current) {
                  lenisRef.current.scrollTo(0, { duration: 1.2 });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
              className="px-4 py-1.5 rounded-full text-slate-900 font-bold hover:bg-slate-50 cursor-pointer transition-colors"
            >
              {t.nav.home}
            </button>

            <button 
              onClick={() => navigate('/about')} 
              className="px-4 py-1.5 rounded-full hover:bg-slate-50 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>

            <button 
              onClick={() => navigate('/schemes')} 
              className="px-4 py-1.5 rounded-full hover:bg-slate-50 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              {t.nav.schemes}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            
            {/* Bilingual EN / தமிழ் Switcher */}
            <div className="h-[38px] flex items-center rounded-full bg-slate-100 p-1 border border-slate-200/80 shadow-2xs">
              <button
                onClick={() => setLang('en')}
                className={`h-full px-3 rounded-full text-[11.5px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                  lang === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`h-full px-3 rounded-full text-[11.5px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                  lang === 'ta'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Distinctive Bright Orange Administrator Login Button with Padlock */}
            <button
              onClick={() => navigate('/admin/login')}
              className="h-[38px] px-4 sm:px-5 text-[12px] sm:text-[12.5px] font-bold text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-full shadow-md shadow-orange-600/20 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[15px]">lock</span>
              <span>{t.adminBtn}</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. The Hero Vector Illustration Canvas */}
      <section 
        id="hero-section"
        className="w-full h-[85vh] lg:h-[90vh] min-h-[400px] flex flex-col items-center justify-end pb-10 relative overflow-hidden bg-[#050505]"
      >
        {/* Full Cover Video Animation */}
        <video 
          ref={videoRef}
          src="/crivera without watermark.mp4" 
          autoPlay 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        
      </section>

      {/* 3. The Typography & Core Call-to-Action Flow (Emerging organically out of open whitespace) */}
      <section 
        ref={ctaSectionRef}
        id="cta-section"
        className="w-full max-w-[1080px] mx-auto px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col items-center justify-center text-center will-change-transform"
      >
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.18] font-black text-[#0F172A] tracking-tight max-w-4xl mx-auto mb-6">
          {t.headline}
        </h1>

        {/* Subheading Paragraph */}
        <p className="text-slate-600 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          {t.subheading}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={() => navigate('/schemes')}
            className="group h-[52px] px-8 sm:px-10 bg-[#0F172A] hover:bg-[#1E293B] text-white text-[15px] font-bold rounded-full shadow-xl shadow-slate-900/15 hover:shadow-2xl hover:shadow-slate-900/25 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2.5 ring-1 ring-white/10 shrink-0"
          >
            <span>{t.primaryCta}</span>
            <span className="material-symbols-outlined text-[19px] group-hover:translate-x-1.5 transition-transform shrink-0">
              arrow_forward
            </span>
          </button>

          {/* Officer Portal CTA */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="group h-[52px] px-7 sm:px-9 rounded-full bg-white hover:bg-slate-50 text-slate-800 text-[15px] font-bold border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2.5 shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-[#EA580C]/10 group-hover:bg-[#EA580C] text-[#EA580C] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
              <span className="material-symbols-outlined text-[13px]">lock</span>
            </div>
            <span>{t.secondaryCta}</span>
          </button>
        </div>
      </section>

      {/* 4. The Quote Block & Conclusion Flow */}
      <section 
        ref={quoteSectionRef}
        id="quote-section"
        className="w-full max-w-[1080px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-20 flex flex-col items-center justify-center relative"
      >
        <div 
          ref={quoteCardRef}
          className="w-full rounded-3xl pt-14 sm:pt-16 pb-12 sm:pb-14 px-6 sm:px-12 lg:px-16 border border-slate-200/90 relative bg-slate-50/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center will-change-transform overflow-visible"
        >
          {/* Distinctive Circular Quote Icon sitting on the card's top edge pulling away with independent floating momentum */}
          <div 
            ref={quoteIconRef}
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.12)] flex items-center justify-center z-10 will-change-transform transition-transform hover:scale-110"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0F172A">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          {/* Dedicated Minimalist Editorial Quote Section */}
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center text-center">
            {/* Quote Statement */}
            <p 
              style={{ color: '#0F172A', opacity: 1 }}
              className={`leading-[1.48] text-center max-w-2xl mx-auto font-bold ${
                lang === 'en' 
                  ? 'text-2xl sm:text-3xl lg:text-[34px] font-serif italic tracking-tight text-[#0F172A]' 
                  : 'text-xl sm:text-2xl lg:text-[28px] font-sans font-bold text-[#0F172A]'
              }`}
            >
              {t.quote}
            </p>
          </div>
        </div>
      </section>

      {/* 1. About Platform Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            
            <button
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full mb-3">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{t.aboutModal.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pr-6 mb-2">
              {t.aboutModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {t.aboutModal.desc}
            </p>

            <div className="space-y-3 mb-6">
              {t.aboutModal.pillars.map((pillar, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">{pillar.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-0.5">
                      {pillar.title}
                    </h4>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsAboutModalOpen(false)}
              className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {t.aboutModal.closeBtn}
            </button>

          </div>
        </div>
      )}

      {/* 2. Schemes Modal */}
      {isSchemesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in duration-150">
            
            <button
              onClick={() => setIsSchemesModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-3 w-fit">
              <span className="material-symbols-outlined text-[16px]">account_balance</span>
              <span>{t.schemesModal.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pr-6 mb-1">
              {t.schemesModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              {t.schemesModal.desc}
            </p>

            <div className="overflow-y-auto space-y-3 pr-1 flex-1 mb-5">
              {schemesList.map((scheme) => (
                <div key={scheme.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {lang === 'ta' ? scheme.tagTa : scheme.tagEn}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {scheme.id}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {lang === 'ta' ? scheme.titleTa : scheme.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {lang === 'ta' ? scheme.descTa : scheme.descEn}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-emerald-700 block whitespace-nowrap">
                      {lang === 'ta' ? scheme.benefitTa : scheme.benefitEn}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsSchemesModalOpen(false)}
              className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {t.schemesModal.closeBtn}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default PublicLandingPage;
