import React, { useEffect } from 'react';
import { X, CheckCircle2, FileText, ExternalLink, Building2, ShieldCheck, Banknote } from 'lucide-react';

const categoryTamilMap = {
  welfare: 'சமூக நலன்',
  agriculture: 'வேளாண்மை',
  health: 'மக்கள் நல்வாழ்வு',
  education: 'கல்வி & திறன்',
  housing: 'வீட்டு வசதி',
};

const cleanTamilDoc = (doc) => {
  if (!doc) return '';
  return String(doc).replace(/\s*\([A-Za-z0-9\s,\-\/]+\)\s*/g, ' ').trim();
};

const localizeApplicationMode = (mode, isTa) => {
  if (!isTa) return mode || 'e-Sevai Center / Gram Panchayat';
  if (!mode) return 'இ-சேவை மையம் / கிராம ஊராட்சி';
  let m = String(mode);
  m = m.replace(/e-Sevai Center/gi, 'இ-சேவை மையம்')
       .replace(/e-Sevai/gi, 'இ-சேவை மையம்')
       .replace(/Gram Panchayat/gi, 'கிராம ஊராட்சி')
       .replace(/Block Office/gi, 'வட்டார வளர்ச்சி அலுவலகம்')
       .replace(/Online Portal/gi, 'அதிகாரப்பூர்வ இணையதளம்')
       .replace(/Online/gi, 'இணையதளம்')
       .replace(/Direct/gi, 'நேரடி விண்ணப்பம்');
  return m;
};

const localizeBenefitAmount = (amount, isTa) => {
  if (!amount) return isTa ? 'அரசு நிதி உதவி / மானியம்' : 'Government Financial Grant';
  if (!isTa) return amount;

  let txt = String(amount).trim();

  // Known full patterns
  if (/Up to ₹78,000 Direct Subsidy \+ 300 Units Free Electricity/i.test(txt)) {
    return '₹78,000 வரை நேரடி மானியம் + 300 யூனிட் இலவச மின்சாரம்';
  }
  if (/₹1,000 \/ month Direct Bank Transfer/i.test(txt)) {
    return 'மாதம் ₹1,000 நேரடி வங்கி வரவு (DBT)';
  }
  if (/₹1,000 \/ month throughout Degree \/ Diploma Program/i.test(txt)) {
    return 'பட்டப்படிப்பு / பட்டயப்படிப்பு காலம் முழுவதும் மாதம் ₹1,000 உதவித்தொகை';
  }
  if (/₹1,000 \/ month throughout Undergraduate Course/i.test(txt)) {
    return 'இளங்கலை பட்டப்படிப்பு காலம் முழுவதும் மாதம் ₹1,000 உதவித்தொகை';
  }
  if (/Up to ₹5,00,000 \/ year Cashless Hospitalization/i.test(txt)) {
    return 'ஆண்டுக்கு ₹5,00,000 வரை பணமில்லா மருத்துவ சிகிச்சை';
  }
  if (/₹15,000 Toolkit Grant \+ Collateral-Free Loans at 5% Interest/i.test(txt)) {
    return '₹15,000 கருவித்தொகுப்பு மானியம் + 5% வட்டியில் பிணையில்லா கடன்';
  }
  if (/100% Free Doorstep Medication & Diagnostics/i.test(txt)) {
    return '100% இலவச இல்லம் தேடி மருத்துவ சிகிச்சை மற்றும் பரிசோதனை';
  }
  if (/Financial Assistance up to ₹1,00,000 \+ Monthly Pension ₹1,000/i.test(txt)) {
    return '₹1,00,000 வரை நிதியுதவி + மாத ஓய்வூதியம் ₹1,000';
  }
  if (/15% Financial Subsidy \/ Capital Assistance Grant/i.test(txt)) {
    return '15% மூலதன மானியம் / நிதி உதவி';
  }

  // General transforms
  txt = txt
    .replace(/Up to\s*(₹\s*[\d,]+|\d+)/gi, '$1 வரை')
    .replace(/Financial Assistance up to\s*(₹\s*[\d,]+|\d+)/gi, '$1 வரை நிதியுதவி')
    .replace(/Direct Subsidy/gi, 'நேரடி மானியம்')
    .replace(/Free Electricity/gi, 'இலவச மின்சாரம்')
    .replace(/Direct Bank Transfer/gi, 'நேரடி வங்கி வரவு')
    .replace(/DBT/gi, 'நேரடி வங்கி வரவு')
    .replace(/Units/gi, 'யூனிட்')
    .replace(/\/ month/gi, 'மாதம்')
    .replace(/per month/gi, 'மாதந்தோறும்')
    .replace(/\/ year/gi, 'ஆண்டுக்கு')
    .replace(/per year/gi, 'ஆண்டுக்கு')
    .replace(/Capital Subsidy/gi, 'மூலதன மானியம்')
    .replace(/Capital Assistance/gi, 'மூலதன உதவி')
    .replace(/Cashless Hospitalization/gi, 'பணமில்லா மருத்துவ சிகிச்சை')
    .replace(/Toolkit Grant/gi, 'கருவித்தொகுப்பு மானியம்')
    .replace(/Collateral-Free Loans at 5% Interest/gi, '5% வட்டியில் பிணையில்லா கடன்')
    .replace(/Collateral-Free Loans/gi, 'பிணையில்லா கடன்')
    .replace(/Monthly Pension/gi, 'மாத ஓய்வூதியம்')
    .replace(/Pension/gi, 'ஓய்வூதியம்')
    .replace(/Grant/gi, 'நிதியுதவி')
    .replace(/Subsidy/gi, 'மானியம்')
    .replace(/Interest Free/gi, 'வட்டியில்லா')
    .replace(/Loan/gi, 'கடன்')
    .replace(/Financial Assistance/gi, 'நிதியுதவி')
    .replace(/Reimbursement:\s*Full reimbursement of tuition fees[^\.]*/gi, 'முழு கல்விக் கட்டண விலக்கு')
    .replace(/Reimbursement:\s*Full reimbursement[^\.]*/gi, 'முழு கட்டண விலக்கு')
    .replace(/Accommodation:\s*Hostel facility for all[^\.]*/gi, 'இலவச தங்கும் விடுதி மற்றும் உணவு வசதி')
    .replace(/Textbooks:\s*Free textbooks for students[^\.]*/gi, 'இலவசப் பாடநூல்கள் விநியோகம்')
    .replace(/Incentive:\s*Financial grants for afforestation activities[^\.]*/gi, 'காடு வளர்ப்பு பணிகளுக்கான நிதியுதவி')
    .replace(/Training:\s*Inductee Teachers will get training[^\.]*/gi, 'ஆசிரியர்களுக்கான சிறப்புப் பயிற்சி')
    .replace(/Benefits:\s*Subscriptions of e-Resources[^\.]*/gi, 'மின்னணு கல்வி வளங்களுக்கான சந்தா வசதி')
    .replace(/The scheme envisages the following benefits:[^\.]*/gi, 'விவசாயிகளுக்கு கட்டுப்படியான விலை மற்றும் கொள்முதல் ஆதரவு')
    .replace(/Input for exports exempted from payment of Basic Customs[^\.]*/gi, 'சுங்க வரி விலக்கு மற்றும் ஏற்றுமதி ஊக்கத்தொகை')
    .replace(/\s+/g, ' ')
    .trim();

  return txt;
};

const SchemeDetailModal = ({ scheme, onClose, language = 'en' }) => {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scheme) return null;

  const isTamilNadu = scheme.scope?.toLowerCase().includes('tamil');
  const isTa = language === 'ta';

  const displayTitle = isTa && scheme.titleTa ? scheme.titleTa : scheme.titleEn;
  const displayDept = isTa && scheme.deptTa ? scheme.deptTa : scheme.deptEn;
  const displayScope = isTamilNadu
    ? (isTa ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu State')
    : (isTa ? 'மத்திய அரசு' : 'Central Government');
  const catKey = scheme.category?.toLowerCase() || 'welfare';
  const displayCategory = isTa && categoryTamilMap[catKey] ? categoryTamilMap[catKey] : (scheme.category || 'Welfare');
  const displayBenefitDesc = isTa && scheme.benefitDescTa ? scheme.benefitDescTa : scheme.benefitDescEn;
  const displayBenefitAmount = localizeBenefitAmount(scheme.benefitAmount, isTa);
  const displayApplicationMode = localizeApplicationMode(scheme.applicationMode, isTa);
  
  const rawEligibility = (isTa && Array.isArray(scheme.eligibilityTa) && scheme.eligibilityTa.length > 0)
    ? scheme.eligibilityTa
    : scheme.eligibilityEn;
  const displayEligibility = isTa && Array.isArray(rawEligibility)
    ? rawEligibility.map(cleanTamilDoc)
    : rawEligibility;

  const rawDocs = (isTa && Array.isArray(scheme.documentsTa) && scheme.documentsTa.length > 0)
    ? scheme.documentsTa
    : scheme.documentsEn;
  const displayDocs = isTa && Array.isArray(rawDocs)
    ? rawDocs.map(cleanTamilDoc)
    : rawDocs;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Modal Dialog Container */}
      <div 
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            {/* Scope & Category Tag */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isTamilNadu
                    ? 'bg-blue-50 text-blue-700 border-blue-200/70'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {displayScope}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {displayCategory}
              </span>
            </div>

            {/* Scheme Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {displayTitle}
            </h2>

            {/* Department */}
            {displayDept && (
              <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-normal">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{displayDept}</span>
              </p>
            )}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: The 3 Essential Sections */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* Section 1: Scheme Details & Benefit Amount */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-slate-500" />
              <span>{isTa ? 'திட்ட விவரம் மற்றும் நிதிப் பயன்கள்' : 'Scheme Details & Benefit Entitlement'}</span>
            </h3>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                {isTa ? 'மானிய மதிப்பு / நிதி உதவி' : 'Financial / Grant Value'}
              </span>
              <span className="text-base sm:text-lg font-black text-emerald-900 block">
                {displayBenefitAmount}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              {displayBenefitDesc}
            </p>
          </div>

          {/* Section 2: Eligibility Criteria */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>{isTa ? 'தகுதி வரம்புகள்' : 'Eligibility Criteria'}</span>
            </h3>

            {Array.isArray(displayEligibility) && displayEligibility.length > 0 ? (
              <ul className="space-y-2.5">
                {displayEligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-normal">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isTa ? 'அரசு மற்றும் துறை விதிமுறைகளுக்கு உட்பட்ட தகுதியான குடிமக்கள்.' : 'Eligible for qualified citizens meeting departmental guidelines.'}
              </p>
            )}
          </div>

          {/* Section 3: Documents Required */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>{isTa ? 'தேவையான ஆவணங்கள்' : 'Documents Required'}</span>
            </h3>

            {Array.isArray(displayDocs) && displayDocs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {displayDocs.map((doc, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs font-medium text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isTa ? 'குடும்ப அட்டை மற்றும் ஆதார் அட்டை சமர்ப்பிக்க வேண்டும்.' : 'Standard identity proof (Aadhaar Card, Family Ration Card) required.'}
              </p>
            )}
          </div>

          {/* Application Mode Note */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{isTa ? 'விண்ணப்பிக்கும் முறை:' : 'Application Mode:'}</span>
            <span>{displayApplicationMode}</span>
          </div>

        </div>

        {/* Modal Footer: Action Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isTa ? 'மூடுக' : 'Close Overview'}
          </button>

          {scheme.officialUrl && (
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <span>{isTa ? 'அதிகாரப்பூர்வ இணையதளம்' : 'Visit Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>

    </div>
  );
};

export default SchemeDetailModal;
