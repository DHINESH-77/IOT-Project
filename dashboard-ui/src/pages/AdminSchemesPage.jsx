import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  RefreshCw,
  Layers,
  LogOut,
  Shield,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeDetailModal from '../components/schemes/SchemeDetailModal';
import { useAuth } from '../context/AuthContext';

const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'welfare', label: 'Social Welfare' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'health', label: 'Healthcare' },
  { id: 'education', label: 'Education & Skills' },
  { id: 'housing', label: 'Housing & Infra' },
];

const scopes = [
  { id: 'all', label: 'All Scopes' },
  { id: 'tamil nadu', label: 'Tamil Nadu State' },
  { id: 'central', label: 'Central Government' },
];

const extractYear = (scheme) => {
  if (scheme.year) return parseInt(scheme.year, 10);
  const match = (scheme.titleEn + ' ' + (scheme.schemeId || '')).match(/\b(202[4-6])\b/);
  if (match) return parseInt(match[1], 10);
  if (scheme.rank && scheme.rank <= 12) return 2026;
  if (scheme.rank && scheme.rank <= 30) return 2025;
  return 2024;
};

const AdminSchemesPage = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');

  // Modals state
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'
  const [deleteConfirmScheme, setDeleteConfirmScheme] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form input state
  const initialFormState = {
    schemeId: '',
    titleEn: '',
    titleTa: '',
    scope: 'Tamil Nadu',
    category: 'welfare',
    deptEn: '',
    deptTa: '',
    benefitAmount: '',
    benefitDescEn: '',
    eligibilityEnText: '',
    documentsEnText: '',
    applicationMode: 'e-Sevai Center / Gram Panchayat',
    officialUrl: '',
    year: '2026',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch schemes from backend MongoDB with instant cache hydration
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
        // Sort chronologically from 2026 down to 2024
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
      console.error('Error fetching schemes:', err);
      showNotice('Failed to connect to backend repository.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const showNotice = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const getAuthToken = () => {
    return token || localStorage.getItem('crivera_auth_token') || '';
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormMode('add');
    const autoId = `tn-scheme-${Date.now().toString().slice(-5)}`;
    setFormData({
      ...initialFormState,
      schemeId: autoId,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (scheme) => {
    setFormMode('edit');
    setFormData({
      _id: scheme._id,
      schemeId: scheme.schemeId || scheme._id,
      titleEn: scheme.titleEn || '',
      titleTa: scheme.titleTa || '',
      scope: scheme.scope || 'Tamil Nadu',
      category: scheme.category || 'welfare',
      deptEn: scheme.deptEn || '',
      deptTa: scheme.deptTa || '',
      benefitAmount: scheme.benefitAmount || '',
      benefitDescEn: scheme.benefitDescEn || '',
      eligibilityEnText: Array.isArray(scheme.eligibilityEn)
        ? scheme.eligibilityEn.join('\n')
        : '',
      documentsEnText: Array.isArray(scheme.documentsEn)
        ? scheme.documentsEn.join('\n')
        : '',
      applicationMode: scheme.applicationMode || 'e-Sevai Center / Gram Panchayat',
      officialUrl: scheme.officialUrl || '',
      year: extractYear(scheme).toString(),
    });
    setIsFormModalOpen(true);
  };

  // Handle Form Submit (Add or Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const authToken = getAuthToken();

    const eligibilityEn = formData.eligibilityEnText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const documentsEn = formData.documentsEnText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      schemeId: formData.schemeId,
      titleEn: formData.titleEn,
      titleTa: formData.titleTa || formData.titleEn,
      scope: formData.scope,
      category: formData.category,
      deptEn: formData.deptEn,
      deptTa: formData.deptTa || formData.deptEn,
      benefitAmount: formData.benefitAmount,
      benefitDescEn: formData.benefitDescEn,
      benefitDescTa: formData.benefitDescEn,
      eligibilityEn,
      eligibilityTa: eligibilityEn,
      documentsEn,
      documentsTa: documentsEn,
      applicationMode: formData.applicationMode,
      officialUrl: formData.officialUrl,
      year: parseInt(formData.year, 10) || 2026,
    };

    try {
      if (formMode === 'add') {
        const res = await fetch('http://localhost:5000/api/schemes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          const newScheme = json.data;
          setSchemes((prev) => [newScheme, ...prev]);
          showNotice('New welfare scheme registered successfully.');
          setIsFormModalOpen(false);
        } else {
          showNotice(json.message || 'Failed to register scheme.', 'error');
        }
      } else {
        const targetId = formData.schemeId || formData._id;
        const res = await fetch(
          `http://localhost:5000/api/schemes/${targetId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const json = await res.json();
        if (json.success) {
          setSchemes((prev) =>
            prev.map((s) =>
              (s.schemeId && s.schemeId === formData.schemeId) ||
              (s._id && json.data?._id && s._id === json.data._id)
                ? { ...s, ...json.data }
                : s
            )
          );
          showNotice('Scheme details updated successfully.');
          setIsFormModalOpen(false);
        } else {
          showNotice(json.message || 'Failed to update scheme.', 'error');
        }
      }
    } catch (err) {
      showNotice('Communication failure with database server.', 'error');
    }
  };

  // Delete Scheme
  const handleDeleteScheme = async (schemeToDelete) => {
    if (!schemeToDelete) return;
    const targetId = schemeToDelete.schemeId || schemeToDelete._id;
    const authToken = getAuthToken();
    try {
      const res = await fetch(`http://localhost:5000/api/schemes/${targetId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        setSchemes((prev) =>
          prev.filter((s) => {
            if (schemeToDelete.schemeId && s.schemeId === schemeToDelete.schemeId) return false;
            if (schemeToDelete._id && s._id === schemeToDelete._id) return false;
            return true;
          })
        );
        showNotice(`Scheme "${schemeToDelete.titleEn}" deleted from registry.`);
        setDeleteConfirmScheme(null);
      } else {
        showNotice(json.message || 'Failed to delete scheme.', 'error');
      }
    } catch (err) {
      showNotice('Network error while deleting scheme.', 'error');
    }
  };

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
      s.deptEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitAmount?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitDescEn?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesScope && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      
      {/* Top Institutional Header */}
      <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <svg
              width="34"
              height="34"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 shrink-0 text-slate-900 transition-transform group-hover:scale-105"
            >
              <path d="M 80 20 A 45 45 0 1 0 80 80 L 60 65 A 20 20 0 1 1 60 35 Z" fill="#0F172A" />
              <circle cx="60" cy="50" r="16" fill="#0F172A" />
              <path d="M 55 42 L 67 50 L 55 58 Z" fill="#FFFFFF" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[16px] font-black tracking-[0.22em] text-slate-900 uppercase leading-none font-sans">
                CRIVERA
              </span>
              <span className="text-[8px] font-bold tracking-[0.25em] text-slate-400 uppercase mt-0.5 leading-none">
                ADMINISTRATION PORTAL
              </span>
            </div>
          </Link>

          {/* Navigation Links & Officer Status */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-xs font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5">
              Schemes
            </span>

            <Link
              to="/admin/contact"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>

            {/* Officer Identification Badge with Circular Avatar */}
            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 shadow-2xs">
              {/* Circular Profile Avatar */}
              <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden shrink-0 border border-slate-300/80">
                <svg className="w-5 h-5 text-slate-500 fill-current translate-y-0.5" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-900 text-xs tracking-tight pr-1">
                {user?.email || 'admin@crivera.gov.in'}
              </span>
            </div>

            {/* Sign Out Button - Noticeable & Clear */}
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-rose-300 text-slate-700 hover:text-rose-600 hover:bg-rose-50/50 text-xs font-semibold transition-all duration-150 cursor-pointer shadow-2xs"
              title="Sign Out from Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        
        {/* Toast Status Notice */}
        {statusMessage && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 ${
              statusMessage.type === 'error'
                ? 'bg-rose-900 text-white'
                : 'bg-slate-900 text-white'
            }`}
          >
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Page Title & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Schemes
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSchemes}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Scheme</span>
            </button>
          </div>
        </div>

        {/* Search and Filters Container */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-8 shadow-2xs space-y-4">
          
          {/* Top Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by title, code, benefit, or department..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/90 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
            />
          </div>

          {/* Scope and Category Filters - Spacious & Un-cramped */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            
            {/* Scope / Jurisdiction Filter Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0 uppercase tracking-wider">
                Jurisdiction:
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
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Category / Sector Filter Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100/80">
              <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0 uppercase tracking-wider">
                Category:
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
                  {cat.label}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500 font-medium">
          <div>
            Showing <span className="font-bold text-slate-900">{filteredSchemes.length}</span> schemes (2026 to 2024)
            {(selectedCategory !== 'all' || selectedScope !== 'all' || searchQuery) && ' (filtered)'}
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Querying database...</span>
            </div>
          )}
        </div>

        {/* Vertical Stack of Clean Scheme Cards */}
        {filteredSchemes.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.schemeId || scheme._id}
                scheme={scheme}
                onSelect={(selected) => setActiveModalScheme(selected)}
                isAdmin={true}
                onEdit={(selected) => handleOpenEdit(selected)}
                onDelete={(id) => setDeleteConfirmScheme(scheme)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900">No matching schemes found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedScope('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Noise-Free Detail Modal */}
      {activeModalScheme && (
        <SchemeDetailModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
        />
      )}

      {/* Add / Edit Scheme Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {formMode === 'add' ? 'Register New Welfare Scheme' : 'Edit Scheme Parameters'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter official government policy guidelines and grant entitlement metrics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              
              {/* Scheme ID & Scope Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Scheme ID / Code *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={formMode === 'edit'}
                    value={formData.schemeId}
                    onChange={(e) => setFormData({ ...formData, schemeId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Jurisdiction / Scope *
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="Tamil Nadu">Tamil Nadu State</option>
                    <option value="Central">Central Government</option>
                  </select>
                </div>
              </div>

              {/* Title & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Scheme Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="e.g. Kalaignar Magalir Urimai Thittam"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="welfare">Social Welfare</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="health">Healthcare</option>
                    <option value="education">Education &amp; Skills</option>
                    <option value="housing">Housing &amp; Infra</option>
                  </select>
                </div>
              </div>

              {/* Department & Benefit Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Nodal Department
                  </label>
                  <input
                    type="text"
                    value={formData.deptEn}
                    onChange={(e) => setFormData({ ...formData, deptEn: e.target.value })}
                    placeholder="e.g. Social Welfare and Women Empowerment"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Grant / Benefit Value *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.benefitAmount}
                    onChange={(e) => setFormData({ ...formData, benefitAmount: e.target.value })}
                    placeholder="e.g. ₹1,000 / month direct transfer"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Benefit Description &amp; Scope *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.benefitDescEn}
                  onChange={(e) => setFormData({ ...formData, benefitDescEn: e.target.value })}
                  placeholder="Provide concise summary of direct benefits..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-normal focus:outline-none focus:border-slate-900 leading-relaxed"
                />
              </div>

              {/* Eligibility Criteria (one per line) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Eligibility Criteria (One rule per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.eligibilityEnText}
                  onChange={(e) => setFormData({ ...formData, eligibilityEnText: e.target.value })}
                  placeholder="Women heads of family aged 21 years and above&#10;Annual family income below ₹2.5 Lakhs&#10;Owns less than 5 acres wetland"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-normal focus:outline-none focus:border-slate-900 leading-relaxed"
                />
              </div>

              {/* Documents Required (one per line) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Documents Required (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.documentsEnText}
                  onChange={(e) => setFormData({ ...formData, documentsEnText: e.target.value })}
                  placeholder="Aadhaar Card&#10;Smart Family Ration Card&#10;Bank Account Passbook (Aadhaar linked)"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-normal focus:outline-none focus:border-slate-900 leading-relaxed"
                />
              </div>

              {/* Official URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Official Portal / Guidelines Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.officialUrl}
                  onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                  placeholder="https://edistricts.tn.gov.in"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-900"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  {formMode === 'add' ? 'Register Scheme' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6">
            <h3 className="text-base font-bold text-slate-900">
              Confirm Scheme Removal
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900 font-bold">{deleteConfirmScheme.titleEn}</strong> (
              {deleteConfirmScheme.schemeId}) from the central registry? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmScheme(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteScheme(deleteConfirmScheme)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              >
                Delete Scheme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-200/70 bg-white text-center text-xs text-slate-400 mt-16">
        <p>© 2026 CRIVERA Systems &amp; Infrastructure. Administrative Scheme Management Console.</p>
      </footer>

    </div>
  );
};

export default AdminSchemesPage;
