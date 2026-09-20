import React from 'react';
import { ChevronRight, Edit3, Trash2 } from 'lucide-react';

const extractYear = (scheme) => {
  if (scheme.year) return scheme.year;
  const match = (scheme.titleEn + ' ' + (scheme.schemeId || '')).match(/\b(202[4-6])\b/);
  if (match) return match[1];
  if (scheme.rank && scheme.rank <= 12) return '2026';
  if (scheme.rank && scheme.rank <= 30) return '2025';
  return '2024';
};

const categoryTamilMap = {
  welfare: 'சமூக நலன்',
  agriculture: 'வேளாண்மை',
  health: 'மக்கள் நல்வாழ்வு',
  education: 'கல்வி & திறன்',
  housing: 'வீட்டு வசதி',
};

const SchemeCard = ({
  scheme,
  onSelect,
  isAdmin = false,
  onEdit,
  onDelete,
  language = 'en',
}) => {
  const isTamilNadu = scheme.scope?.toLowerCase().includes('tamil');
  const year = extractYear(scheme);

  const isTa = language === 'ta';
  const displayTitle = isTa && scheme.titleTa ? scheme.titleTa : scheme.titleEn;
  const displayDept = isTa && scheme.deptTa ? scheme.deptTa : scheme.deptEn;
  const displayScope = isTamilNadu
    ? (isTa ? 'தமிழ்நாடு அரசு' : 'Tamil Nadu')
    : (isTa ? 'மத்திய அரசு' : 'Central');
  const catKey = scheme.category?.toLowerCase() || 'welfare';
  const displayCategory = isTa && categoryTamilMap[catKey] ? categoryTamilMap[catKey] : (scheme.category || 'Welfare');

  return (
    <div
      onClick={() => onSelect?.(scheme)}
      className="w-full bg-white border border-slate-200/90 hover:border-slate-400 rounded-xl px-5 py-4 transition-all duration-150 shadow-2xs hover:shadow-xs cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
    >
      {/* Left: Metadata & Title */}
      <div className="flex-1 min-w-0">
        {/* Subtle Year, Scope & Category Tags */}
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono">
            {year}
          </span>
          <span
            className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md border ${
              isTamilNadu
                ? 'bg-blue-50 text-blue-700 border-blue-200/70'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {displayScope}
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            • {displayCategory}
          </span>
        </div>

        {/* Scheme Title (Primary Focus) */}
        <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
          {displayTitle}
        </h3>

        {/* Department Name */}
        {displayDept && (
          <p className="text-xs text-slate-500 mt-1 truncate font-normal">
            {displayDept}
          </p>
        )}
      </div>

      {/* Right: Actions */}
      <div
        className="flex items-center gap-2 shrink-0 self-end sm:self-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex items-center gap-1 mr-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(scheme);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Edit Scheme Details"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(scheme.schemeId);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Delete Scheme"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* View Details Arrow */}
        <button
          type="button"
          onClick={() => onSelect?.(scheme)}
          className="flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span>{isTa ? 'விவரங்கள்' : 'Details'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;
