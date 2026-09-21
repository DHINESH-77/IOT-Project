import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  LogOut,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Send,
  Loader2,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminContactPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [category, setCategory] = useState('operational');
  const [priority, setPriority] = useState('urgent');
  const [fullName, setFullName] = useState(user?.name || 'Panchayat Administrative Officer');
  const [email, setEmail] = useState(user?.email || 'admin@crivera.gov.in');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate direct confidential transmission to governance server
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      
      {/* Institutional Top Header */}
      <header className="w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          
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
                ADMINISTRATION PORTAL
              </span>
            </div>
          </Link>

          {/* Navigation Links & Officer Status */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/admin/schemes"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Schemes
            </Link>

            <span className="text-xs font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5">
              Contact
            </span>

            {/* Officer Identification Badge with Circular Avatar */}
            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center overflow-hidden shrink-0 border border-slate-300/80">
                <svg className="w-5 h-5 text-slate-500 fill-current translate-y-0.5" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <span className="font-semibold text-slate-900 text-xs tracking-tight pr-1">
                {user?.email || 'admin@crivera.gov.in'}
              </span>
            </div>

            {/* Sign Out Button */}
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

      {/* Main Editorial Canvas (2-Column Split) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 sm:py-14 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Officer Lifestyle Image & Executive Contact Bento */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Clean Executive Visual Card (No Text Overlay) */}
            <div className="w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200/80 aspect-[4/4] sm:aspect-[4/3] lg:aspect-[3/4]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1UwD47XhagMo--iF1XZWCi2cGQZXZprD8V5WX7QTeH-6k_RtY4xc6u8pVyba5fiwrOo__vQcdbrxvrro3SoPJ9q8lb5TATRDQ1cwXSq5u2NhJn2jQ858GqNbMVTMpzO8RsVwKQt_zkZZP0USFP6hoaHGSOTGAFzcK-xufKDhiUHpQwIP2GEK0zPtZW3d1IwakQUBt7eVoeCHO3DyE1M5u47PaltpRkwfkiMuUoOkCwoWHmqz3Bmlngz2MU"
                alt="Executive governance desk"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bento Contact Details Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col gap-4.5">
              
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Direct Oversight</span>
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-900 font-mono">
                  xxxxxx@xxxx.gov.in
                </p>
              </div>

              <div className="flex flex-col gap-1 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Confidential Line</span>
                </span>
                <p className="text-sm font-semibold text-slate-800 font-mono">
                  +91 XXXXX XXXXX
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 text-slate-500 text-xs font-semibold">
                <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>District Administration Office · Tamil Nadu</span>
              </div>

            </div>

          </div>

          {/* Right Column: Editorial Header & Complete Form */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1.5 font-mono">
                Confidential Administrative Channel
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Leadership &amp; Field Feedback
              </h1>
              <p className="text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                Direct, discreet communication with state executive oversight and policy directors.
              </p>
            </div>

            {/* Interactive Form Card */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs"
            >

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="officer-name"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Officer Name / Designation
                </label>
                <input
                  id="officer-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Officer Name / Role"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="officer-email"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Official Government Email
                </label>
                <input
                  id="officer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@xxxx.gov.in"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="officer-message"
                  className="text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Message &amp; Incident Context
                </label>
                <textarea
                  id="officer-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your notes, field observations, policy discrepancy, or incident context..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Row & Status */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Direct &amp; confidential
                </span>
              </div>

              {/* Success Notification */}
              {isSubmitted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your message has been confidentially delivered to executive oversight.</span>
                </div>
              )}

            </form>

          </div>

        </div>

      </main>

      {/* Institutional Clean Footer */}
      <footer className="w-full bg-[#FAF9F6] border-t border-slate-200 py-8 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CRIVERA Systems &amp; Infrastructure. Administrative Direct Liaison.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Confidentiality Charter
            </span>
            <span className="hover:text-slate-900 transition-colors cursor-pointer">
              Security Protocol
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AdminContactPage;
