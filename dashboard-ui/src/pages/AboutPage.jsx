import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScheme } from '../context/SchemeContext';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const content = {
  en: {
    brandName: 'CRIVERA',
    brandTag: 'SYSTEMS & INFRASTRUCTURE',
    nav: {
      story: 'Story',
      method: 'Architecture',
      fieldNotes: 'Perspective',
      home: 'Home',
    },
    headline: 'The true measure of public welfare is how seamlessly it reaches the doorstep.',
    heroDesc: 'Public support creates real impact only when communities know what is available to them. CRIVERA bridges the last-mile information gap by organizing complex welfare guidelines into a clean, transparent digital touchpoint, making scheme details directly accessible to every rural household.',
    methodSection: {
      tag: 'Core Pillars',
      title: 'Information Structuring & Civic Usability',
      subtitle: 'Translating public welfare administration into accessible, transparent digital infrastructure.',
      cards: [
        {
          num: '01',
          title: 'Information Structuring',
          desc: 'Public welfare guidelines are often dispersed across complex circulars and siloed portals. We synthesize and standardize this data into unified, readable profiles—translating administrative complexity into clean, structured summaries that highlight key scheme objectives, assistance details, and official prerequisites.',
        },
        {
          num: '02',
          title: 'Frictionless Digital Interface',
          desc: 'Accessibility is defined by usability. We build lightweight, highly responsive digital layouts designed for low-friction browsing across desktop and mobile devices alike, ensuring that anyone at the village level can navigate and consume civic data without technical confusion.',
        },
        {
          num: '03',
          title: 'Complementary Civic Conduit',
          desc: 'Crivera does not compete with or replace established administrative infrastructure. Instead, it operates as an open discovery layer alongside existing public systems, eliminating navigational bottlenecks and delivering direct visibility into programs communities are entitled to explore.',
        },
      ],
    },
    perspectiveSection: {
      tag: 'Core Philosophy',
      quoteLead: 'Technology achieves its highest purpose when it removes friction between a system and the people it serves.',
      body: 'Rather than replacing existing administrative frameworks, CRIVERA acts as a parallel digital lens—organizing complex welfare metrics into an intuitive, high-speed interface that ensures public programs are visible, understandable, and within easy reach.',
      returnHomeBtn: 'Back to Home',
    },
  },
  ta: {
    brandName: 'CRIVERA',
    brandTag: 'அமைப்புகள் & கட்டமைப்பு',
    nav: {
      story: 'நோக்கம்',
      method: 'கட்டமைப்பு',
      fieldNotes: 'கோட்பாடு',
      home: 'முகப்பு',
    },
    headline: 'அரசு மக்கள் நலனின் உண்மையான அளவுகோல், அது எவ்வித தடையுமின்றி மக்களின் வீட்டு வாசலை எவ்வளவு எளிதாக அடைகிறது என்பதில் உள்ளது.',
    heroDesc: 'மக்களுக்கு என்னென்ன திட்டங்கள் கிடைக்கின்றன என்பதை சமுதாயம் தெளிவாக அறிந்து கொள்ளும்போது மட்டுமே மக்கள் நல ஆதரவு உண்மையான தாக்கத்தை ஏற்படுத்தும். சிக்கலான அரசு வழிகாட்டுதல்களை எளிய, வெளிப்படையான டிஜிட்டல் தளமாக ஒழுங்கமைத்து, ஒவ்வொரு கிராமப்புற குடும்பத்திற்கும் நலத்திட்ட விவரங்களை நேரடியாகக் கொண்டு சேர்ப்பதன் மூலம் CRIVERA கடைசி மைல் தகவல் இடைவெளியைத் தகர்க்கிறது.',
    methodSection: {
      tag: 'முக்கிய தூண்கள்',
      title: 'தகவல் கட்டமைப்பு & எளிய பயன்பாடு',
      subtitle: 'அரசு நல நிர்வாக வழிகாட்டுதல்களை எளிய, வெளிப்படையான டிஜிட்டல் அமைப்பாக மாற்றுதல்.',
      cards: [
        {
          num: '01',
          title: 'தகவல் கட்டமைப்பு',
          desc: 'அரசு நல வழிகாட்டுதல்கள் பெரும்பாலும் பல்வேறு சிக்கலான சுற்றறிக்கைகளிலும் தனித்தனி இணையதளங்களிலும் சிதறிக்கிடக்கின்றன. நாங்கள் இந்தத் தகவல்களை ஒருங்கிணைத்து, நிர்வாகச் சிக்கல்களை எளிய சுருக்கங்களாக மாற்றி, முக்கிய திட்ட நோக்கங்கள், நிதி உதவி விவரங்கள் மற்றும் தகுதி வரம்புகளைத் தெளிவாக வழங்குகிறோம்.',
        },
        {
          num: '02',
          title: 'எளிய டிஜிட்டல் இடைமுகம்',
          desc: 'பயன்பாட்டின் எளிமையே உண்மையான அணுகலாகும். கிராமப்புறங்களில் உள்ள எவரும் எவ்வித தொழில்நுட்பக் குழப்பமும் இன்றி பொதுத் தகவல்களை எளிதாகப் பெறக்கூடிய வகையில் கணினி மற்றும் மொபைல் இரண்டிலும் சீராக இயங்கும் எடையற்ற வேகமான வடிவமைப்புகளை நாங்கள் உருவாக்குகிறோம்.',
        },
        {
          num: '03',
          title: 'துணை மக்கள் கட்டமைப்பு',
          desc: 'CRIVERA தற்போதுள்ள அரசு நிர்வாக அமைப்புகளுக்கு மாற்றாகவோ அல்லது போட்டியாகவோ செயல்படவில்லை. மாறாக, இருக்கும் பொது அமைப்புகளுடன் இணைந்து செயல்படும் திறந்தநிலை வழிகாட்டித் தளமாக இயங்கி, தகவல் தடைகளை நீக்கி மக்கள் தங்களுக்குரிய திட்டங்களை நேரடியாகக் கண்டறிய உதவுகிறது.',
        },
      ],
    },
    perspectiveSection: {
      tag: 'செயல்பாட்டுக் கோட்பாடு',
      quoteLead: 'ஒரு அமைப்புக்கும் அது சேவை செய்யும் மக்களுக்குமான சிரமங்களையும் தடைகளையும் நீக்கும் போதே தொழில்நுட்பம் அதன் உச்சகட்ட நோக்கத்தை அடைகிறது.',
      body: 'தற்போதுள்ள அரசு நிர்வாக அமைப்புகளை மாற்றுவதற்குப் பதிலாக, CRIVERA ஒரு இணையான டிஜிட்டல் லென்ஸாகச் செயல்பட்டு—சிக்கலான மக்கள் நல அளவீடுகளை உள்ளுணர்வுடன் கூடிய வேகமான இடைமுகமாக ஒழுங்கமைத்து, அரசுத் திட்டங்கள் அனைவருக்கும் தெளிவாகத் தெரியவும், புரியவும், எளிதில் சென்றடையவும் செய்கிறது.',
      returnHomeBtn: 'முகப்பிற்கு திரும்புக',
    },
  },
};

const AboutPage = () => {
  const navigate = useNavigate();
  const { publicLanguage: lang, setPublicLanguage: setLang } = useScheme();
  const [activeSection, setActiveSection] = useState('story');
  const lenisRef = useRef(null);
  const t = content[lang];

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky smooth exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Robust IntersectionObserver for active navbar tracking
  useEffect(() => {
    const sectionIds = ['story', 'method', 'perspective'];

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-25% 0px -50% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset: -90, duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 90;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-slate-900 selection:text-white antialiased font-sans">
      
      {/* Background Ambient Aura */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-slate-200/40 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gradient-to-r from-amber-100/30 to-transparent rounded-full blur-[140px]" />
      </div>

      {/* Navigation Header */}
      <header className="w-full bg-[#FAF9F6]/85 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Identity */}
          <div className="flex items-center shrink-0">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-3.5 focus:outline-none group shrink-0 cursor-pointer text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200">
                <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 80 20 A 45 45 0 1 0 80 80 L 60 65 A 20 20 0 1 1 60 35 Z" fill="#FFFFFF"/>
                  <circle cx="60" cy="50" r="16" fill="#FFFFFF"/>
                  <path d="M 55 42 L 67 50 L 55 58 Z" fill="#0F172A"/>
                </svg>
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-[17px] sm:text-[18.5px] font-black tracking-[0.24em] text-slate-900 uppercase leading-none font-sans">
                  {t.brandName}
                </span>
                <span className="text-[8.5px] font-bold tracking-[0.28em] text-slate-400 uppercase mt-1 leading-none font-mono">
                  {t.brandTag}
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links with Active Scroll-Spy Tracking */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-200/60 p-1.5 rounded-full border border-slate-300/60">
            <button 
              onClick={() => navigate('/')} 
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.nav.home}
            </button>

            <button 
              onClick={(e) => scrollToSection(e, 'story')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'story'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.nav.story}
            </button>

            <button 
              onClick={(e) => scrollToSection(e, 'method')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'method'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.nav.method}
            </button>

            <button 
              onClick={(e) => scrollToSection(e, 'perspective')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeSection === 'perspective'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.nav.fieldNotes}
            </button>
          </nav>

          {/* Right Action: Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-full p-1 bg-white/80 shadow-xs text-xs font-semibold">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'en' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  lang === 'ta' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="w-full relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION 1: STORY / MISSION (#story) */}
        {/* ========================================================================= */}
        <section id="story" className="max-w-6xl mx-auto px-6 lg:px-8 pt-14 md:pt-20 pb-20">
          
          {/* Editorial Headline & Narrative - Clean, Unboxed Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.18] text-slate-900 font-extrabold tracking-tight">
                {t.headline}
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pt-1">
              <div className="pl-6 border-l-2 border-slate-300">
                <p className="text-[16px] sm:text-[16.5px] leading-relaxed text-slate-600 font-normal">
                  {t.heroDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Documentary Showcase Photo - Clean High-End Presentation */}
          <div className="pt-2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-100 shadow-xl shadow-slate-900/5 group">
              <img 
                alt="Community collaboration and trust: A diverse group gathered together at a wooden table in an authentic documentary setting" 
                className="w-full h-auto max-h-[560px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzU5ueRCSan5tIFEwb6KzipzN0AmOrGYI9Gx9b3ozXfSZgoKvMa9dC1i2zbj2BbUzOKl8rB0xkuCUNmo-eyqfSKMjIlZmoG3v30WPj8gEelsMAHA7stxuBZTGhuGky6WRTAycfTS1CqRrJ_55Noe6ptBmt2kASIOvkd1RbfKQ3Qv3O8kaNOiFNaEBS-ZETKvqMdB2ymeUsRi3eLgYGpo1J4IIaM_qQNEbJ51y7v6OXLlJ8LHK3rnGd4Q" 
              />
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: ARCHITECTURE PILLARS (#method) */}
        {/* ========================================================================= */}
        <section id="method" className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-24 border-t border-slate-200">
          
          {/* Section Header - Refined Editorial Hierarchy */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.28em] text-slate-400 font-bold block mb-3 font-mono">
                {t.methodSection.tag}
              </span>
              <h2 className="text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight">
                {t.methodSection.title}
              </h2>
            </div>
            <div className="max-w-sm md:text-right">
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                {t.methodSection.subtitle}
              </p>
            </div>
          </div>

          {/* Open Architectural Grid: No enclosing cardboard boxes, completely cohesive with the editorial canvas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {t.methodSection.cards.map((card, idx) => (
              <div 
                key={idx} 
                className="pt-8 border-t-2 border-slate-900/80 flex flex-col justify-between group"
              >
                <div>
                  {/* Pillar Numeral */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      {card.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-slate-900 transition-colors duration-300" />
                  </div>

                  {/* Verbatim Title */}
                  <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 mb-4 tracking-tight leading-snug">
                    {card.title}
                  </h3>

                  {/* Verbatim Description */}
                  <p className="text-[15px] leading-relaxed text-slate-600 font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: PERSPECTIVE / PHILOSOPHY (#perspective) */}
        {/* ========================================================================= */}
        <section id="perspective" className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Documentary Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 group">
                <img 
                  alt="Human connection and mutual assistance: Warm candid documentary photograph" 
                  className="w-full aspect-[4/5] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPiWZANy8rDd-NjIfNKjE56xvoKI8W8vf08jndzczmdcp2Xk8hupeqk_UVPTZJN8k9Kmk40okvz0-FqLy_irMy6ar1UcoCTzthzN5to0n9Eggp1-Ere-q5CCV6QRXoZeswdzaHWTX7JMoD2YqvFUcCEXOPTxH3qLZz097aZI6u0SVkMtY_NJqmAPAYq3jHH2hhtWeEyYjm4uQ6FGhUPbYPmL2aShoGP8banYJFBQn1glO3WnPJHxpANw" 
                />
              </div>
            </div>

            {/* Narrative & Quote Column - Unboxed, High-Impact Editorial Layout */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  <span className="text-xs uppercase tracking-[0.28em] text-slate-500 font-bold font-mono">
                    {t.perspectiveSection.tag}
                  </span>
                </div>

                <blockquote className="text-2xl sm:text-3xl lg:text-[32px] text-slate-900 font-bold leading-[1.28] tracking-tight">
                  “{t.perspectiveSection.quoteLead}”
                </blockquote>
              </div>

              {/* Body Text - Clean Editorial Typography without Cardboard Box */}
              <div className="pt-2">
                <p className="text-[16px] sm:text-[16.5px] leading-relaxed text-slate-600 font-normal">
                  {t.perspectiveSection.body}
                </p>
              </div>

              {/* Brand CTA Button */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.22em] font-bold px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-200 cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span>{t.perspectiveSection.returnHomeBtn}</span>
                </button>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Structured Minimal Editorial Footer */}
      <footer className="w-full border-t border-slate-200 bg-[#FAF9F6] py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div className="flex items-center gap-2.5 font-sans font-bold text-slate-900">
            <span>{t.brandName}</span>
            <span className="text-slate-300 font-normal">·</span>
            <span className="text-slate-400 font-medium uppercase tracking-widest text-[11px] font-mono">{t.brandTag}</span>
          </div>
          <div>
            © 2026 CRIVERA Civic Systems · Open Welfare Discovery Gateway
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AboutPage;
