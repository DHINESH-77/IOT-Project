import React from 'react';
import { useScheme } from '../context/SchemeContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { publicLanguage, setPublicLanguage } = useScheme();

  return (
    <div
      className={`inline-flex items-center border border-slate-200/90 rounded-full p-0.5 bg-white/90 backdrop-blur-xs shadow-2xs text-[11px] font-bold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setPublicLanguage('en')}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
          publicLanguage === 'en'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="Switch to English"
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setPublicLanguage('ta')}
        className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer font-medium ${
          publicLanguage === 'ta'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="தமிழுக்கு மாறுக"
      >
        தமிழ்
      </button>
    </div>
  );
};

export default LanguageSwitcher;
