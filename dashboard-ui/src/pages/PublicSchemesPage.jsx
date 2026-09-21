import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import { useScheme } from '../context/SchemeContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeDetailModal from '../components/schemes/SchemeDetailModal';

const categories = [
  { id: 'all', labelEn: 'All Categories', labelTa: 'அனைத்துப் பிரிவுகள்' },
  { id: 'welfare', labelEn: 'Social Welfare', labelTa: 'சமூக நலன்' },
  { id: 'agriculture', labelEn: 'Agriculture', labelTa: 'வேளாண்மை' },
  { id: 'health', labelEn: 'Healthcare', labelTa: 'மக்கள் நல்வாழ்வு' },
  { id: 'education', labelEn: 'Education & Skills', labelTa: 'பள்ளிக் கல்வி & உயர்கல்வி' },
  { id: 'housing', labelEn: 'Housing & Infra', labelTa: 'வீட்டு வசதி' },
];

const scopes = [
  { id: 'all', labelEn: 'All Schemes', labelTa: 'அனைத்து திட்டங்கள்' },
  { id: 'tamil nadu', labelEn: 'Tamil Nadu State', labelTa: 'தமிழ்நாடு அரசு' },
  { id: 'central', labelEn: 'Central Government', labelTa: 'மத்திய அரசு' },
];

const extractYear = (scheme) => {
  if (scheme.year) return parseInt(scheme.year, 10);
  const match = (scheme.titleEn + ' ' + (scheme.schemeId || '')).match(/\b(202[4-6])\b/);
  if (match) return parseInt(match[1], 10);
  if (scheme.rank && scheme.rank <= 12) return 2026;
  if (scheme.rank && scheme.rank <= 30) return 2025;
  return 2024;
};

const PublicSchemesPage = () => {
  const { publicLanguage } = useScheme();
  const isTa = publicLanguage === 'ta';

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  // Fetch verified schemes from backend with instant cache hydration
  const fetchSchemes = async () => {
    try {
      const cached = sessionStorage.getItem('crivera_schemes_cache');
      if (cached && schemes.length === 0) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSchemes(parsed);
            setLoading(false);
          }
        } catch (e) {}
      }
    } catch (e) {}

    if (schemes.length === 0) {
      setLoading(true);
    }

    try {
      const res = await fetch('http://localhost:5000/api/schemes');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Sort chronologically from 2026 to 2024
        const sorted = [...json.data].sort((a, b) => {
          const yA = extractYear(a);
          const yB = extractYear(b);
          return yB - yA || (a.rank || 999) - (b.rank || 999);
        });
        setSchemes(sorted);
        try {
          sessionStorage.setItem('crivera_schemes_cache', JSON.stringify(sorted));
        } catch (e) {}
      }
    } catch (err) {
      console.error('Failed to load schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  // Filter schemes
  const filteredSchemes = schemes.filter((s) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      s.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesScope =
      selectedScope === 'all' ||
      s.scope?.toLowerCase().includes(selectedScope.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      s.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleTa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deptEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deptTa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitAmount?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitDescEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitDescTa?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesScope && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      
      {/* Navigation Header */}
      <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-950 border border-slate-800/80 shadow-sm flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-200">
              <img src="/crivera-logo.png" alt="CRIVERA Logo" className="w-full h-full object-contain filter drop-shadow-xs" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-black tracking-[0.22em] text-slate-900 uppercase leading-none font-sans">
                CRIVERA
              </span>
              <span className="text-[8px] font-bold tracking-[0.25em] text-slate-400 uppercase mt-0.5 leading-none">
                SYSTEMS &amp; INFRASTRUCTURE
              </span>
            </div>
          </Link>

          {/* Right Navigation */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90 transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isTa ? 'முகப்புக்குச் செல்க' : 'Back to Home'}</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Directory Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isTa ? 'மக்கள் நலத்திட்டங்கள்' : 'Welfare Schemes'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isTa
              ? 'அரசு அங்கீகரித்த நேரடி நிதி உதவி மற்றும் சமூக நலத்திட்டங்களின் முழுமையான பட்டியல்.'
              : 'Verified directory of central and state welfare entitlements and grants (2024–2026).'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-8 shadow-2xs space-y-4">
          
          {/* Top Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isTa
                  ? 'திட்டத்தின் பெயர், துறை அல்லது விபரங்கள் மூலம் தேடுக...'
                  : 'Search schemes by name, keyword, or department...'
              }
              className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
            />
          </div>

          {/* Scope and Category Filters - Spacious & Un-cramped */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            
            {/* Scope / Jurisdiction Filter Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0 uppercase tracking-wider">
                {isTa ? 'அரசு வரம்பு:' : 'Jurisdiction:'}
              </span>
              {scopes.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScope(sc.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedScope === sc.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isTa ? sc.labelTa : sc.labelEn}
                </button>
              ))}
            </div>

            {/* Category / Sector Filter Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100/80">
              <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0 uppercase tracking-wider">
                {isTa ? 'துறைப் பிரிவு:' : 'Category:'}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isTa ? cat.labelTa : cat.labelEn}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
          <div>
            {isTa ? (
              <span>
                காட்டப்படும் திட்டங்கள்: <span className="font-bold text-slate-900">{filteredSchemes.length}</span> (2024 முதல் 2026 வரை)
              </span>
            ) : (
              <span>
                Showing <span className="font-bold text-slate-900">{filteredSchemes.length}</span> schemes (2026 to 2024)
              </span>
            )}
            {(selectedCategory !== 'all' || selectedScope !== 'all' || searchQuery) && (isTa ? ' (வடிகட்டப்பட்டது)' : ' (filtered)')}
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{isTa ? 'திட்டங்கள் ஏற்றப்படுகின்றன...' : 'Loading schemes...'}</span>
            </div>
          )}
        </div>

        {/* Vertical List of Clean Scheme Cards */}
        {filteredSchemes.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.schemeId || scheme._id}
                scheme={scheme}
                language={publicLanguage}
                onSelect={(selected) => setActiveModalScheme(selected)}
                isAdmin={false}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900">
              {isTa ? 'பொருத்தமான திட்டங்கள் ஏதும் இல்லை' : 'No matching schemes found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isTa
                ? 'உங்கள் தேடல் வார்த்தையை மாற்றவும் அல்லது வேறு பிரிவைத் தேர்ந்தெடுக்கவும்.'
                : 'Try adjusting your search query or selecting a different category or scope.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedScope('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              {isTa ? 'வடிகட்டிகளை மீட்டமைக்க' : 'Reset Filters'}
            </button>
          </div>
        )}

      </main>

      {/* Noise-Free Detail Modal */}
      {activeModalScheme && (
        <SchemeDetailModal
          scheme={activeModalScheme}
          language={publicLanguage}
          onClose={() => setActiveModalScheme(null)}
        />
      )}

      {/* Clean Footer */}
      <footer className="w-full py-6 border-t border-slate-200/70 bg-white text-center text-xs text-slate-400 mt-16">
        <p>© 2026 CRIVERA Systems &amp; Infrastructure. Public Welfare Delivery Registry.</p>
      </footer>

    </div>
  );
};

export default PublicSchemesPage;
