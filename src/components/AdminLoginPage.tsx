import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  KeyRound, 
  Globe,
  CheckCircle2
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    loginAdmin, 
    setIsAdminView
  } = useStore();

  const isAr = language === 'ar';

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = loginAdmin(email, password, rememberMe);
      setIsSubmitting(false);

      if (!result.success) {
        setErrorMessage(result.error || (isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password'));
      }
    }, 250);
  };

  const handleBackToStore = () => {
    setIsAdminView(false);
    try {
      if (typeof window !== 'undefined' && window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {}
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] text-[#F5F3EF] flex flex-col justify-between font-sans-modern relative overflow-hidden selection:bg-[#C6A76A]/20 selection:text-[#F5F3EF]"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Subtle Luxury Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#C6A76A]/5 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-[#C6A76A]/3 rounded-full pointer-events-none blur-3xl" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToStore}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] hover:border-[#C6A76A]/40 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] transition-all cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{isAr ? 'العودة لمتجر العملاء' : 'Back to Storefront'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A3A3A3] hover:text-[#C6A76A] rounded bg-[#0d0d0d] border border-[#1f1f1f] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono uppercase">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#0c0c0c]/90 backdrop-blur-xl border border-[#242424] rounded-2xl p-8 sm:p-10 shadow-2xl space-y-7 relative">
          
          {/* Subtle Top Gold Border Glow */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C6A76A]/60 to-transparent" />

          {/* Brand Identity & Icon */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#141414] border border-[#2a2a2a] text-[#C6A76A] shadow-inner mb-1">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-cinzel font-bold text-[#F5F3EF] tracking-wider">
                OSOOL <span className="font-serif-luxury text-[#C6A76A]">| أصول</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[#A3A3A3] font-mono">
                {isAr ? 'بوابة الإدارة والتحكم المحمية' : 'Secured Admin Portal'}
              </p>
            </div>

            <p className="text-xs text-[#737373] max-w-xs mx-auto leading-relaxed">
              {isAr 
                ? 'يرجى تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور للوصول إلى لوحة التحكم.'
                : 'Sign in with your email and password to access the administration dashboard.'}
            </p>
          </div>

          {/* Status Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span className="text-start">{errorMessage}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3.5 rounded-lg bg-[#14130a] border border-[#C6A76A]/60 text-[#C6A76A] text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-start">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#C6A76A]">
                {isAr ? 'البريد الإلكتروني للإدارة' : 'Admin Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#737373]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@osool.sa"
                  className="w-full ps-10 pe-3.5 py-3 text-sm rounded-lg bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder:text-[#555555] font-mono focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A]/40 focus:outline-none transition-all"
                  dir="ltr"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-[#C6A76A]">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-[#8c8c8c] hover:text-[#C6A76A] flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? (isAr ? 'إخفاء' : 'Hide') : (isAr ? 'إظهار' : 'Show')}</span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-[#737373]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full ps-10 pe-10 py-3 text-sm rounded-lg bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder:text-[#555555] font-mono focus:border-[#C6A76A] focus:ring-1 focus:ring-[#C6A76A]/40 focus:outline-none transition-all"
                  dir="ltr"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#A3A3A3] hover:text-[#F5F3EF]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#141414] border-[#2a2a2a] accent-[#C6A76A] cursor-pointer"
                />
                <span>{isAr ? 'تذكر تسجيل الدخول' : 'Keep me signed in'}</span>
              </label>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-lg bg-[#C6A76A] hover:bg-[#D4B87D] active:scale-[0.99] text-[#050505] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <KeyRound className="w-4 h-4" />
              <span>
                {isSubmitting 
                  ? (isAr ? 'جارٍ التحقق...' : 'Verifying...') 
                  : (isAr ? 'دخول لوحة التحكم' : 'Sign In to Dashboard')}
              </span>
            </button>
          </form>

          {/* Back link */}
          <div className="pt-4 border-t border-[#1f1f1f] text-center space-y-2">
            <p className="text-[11px] text-[#666666]">
              {isAr ? 'منطقة محظورة مخصصة لمسؤولي المتجر فقط' : 'Restricted area for authorized personnel only'}
            </p>
            <button
              type="button"
              onClick={handleBackToStore}
              className="text-xs text-[#8c8c8c] hover:text-[#C6A76A] underline transition-colors cursor-pointer"
            >
              {isAr ? 'العودة لمتجر العملاء' : 'Return to store'}
            </button>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#555555]">
        <p>© {new Date().getFullYear()} OSOOL Timepieces. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}</p>
      </footer>
    </div>
  );
};
