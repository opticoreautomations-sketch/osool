import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Tag, Check, Copy, ArrowRight, ArrowLeft } from 'lucide-react';

export const PromoAnnouncementBar: React.FC = () => {
  const { 
    language, 
    storeBanner, 
    applyPromoCode, 
    activePromoCode, 
    openCart 
  } = useStore();
  const [copied, setCopied] = useState(false);
  const [justApplied, setJustApplied] = useState(false);

  if (!storeBanner || !storeBanner.enabled) {
    return null;
  }

  const isAr = language === 'ar';
  const text = isAr ? storeBanner.textAr : storeBanner.textEn;
  const code = storeBanner.highlightCode?.trim().toUpperCase();
  const isCodeActive = activePromoCode && activePromoCode.code === code;

  const handleCopyOrApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!code) return;

    // Apply directly if not applied
    if (!isCodeActive) {
      const res = applyPromoCode(code);
      if (res.success) {
        setJustApplied(true);
        setTimeout(() => setJustApplied(false), 3000);
      }
    }

    // Also copy to clipboard
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <aside 
      aria-label={isAr ? 'إعلان العروض الخاصة' : 'Promotional Announcement'}
      className="relative z-30 bg-gradient-to-r from-stone-950 via-[#14120e] to-stone-950 border-b border-[#C6A76A]/25 text-stone-200 py-2.5 px-4 text-xs sm:text-sm font-light select-none shadow-sm transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-center">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C6A76A]/10 border border-[#C6A76A]/30 text-[#E8D7B5] text-[11px] font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-[#C6A76A] animate-pulse" />
          <span>{isAr ? 'عرض حصري' : 'Exclusive Offer'}</span>
        </div>

        {/* Text */}
        <p className="text-stone-300 font-normal tracking-wide">
          {text}
        </p>

        {/* Highlighted code button */}
        {code && (
          <button
            type="button"
            onClick={handleCopyOrApply}
            className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-mono font-medium transition-all ${
              isCodeActive
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                : 'bg-stone-900/80 hover:bg-[#C6A76A]/15 border-[#C6A76A]/40 hover:border-[#C6A76A] text-[#E8D7B5]'
            }`}
            title={isAr ? 'اضغط لتطبيق ونسخ الكود' : 'Click to apply & copy code'}
          >
            <Tag className="w-3 h-3 text-[#C6A76A]" />
            <span className="tracking-wider">{code}</span>
            {copied || justApplied ? (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-sans">
                <Check className="w-3 h-3" />
                {isAr ? 'تم التطبيق!' : 'Applied!'}
              </span>
            ) : isCodeActive ? (
              <span className="text-[10px] text-emerald-400/80 font-sans">
                {isAr ? 'مفعل بالسلة' : 'Active'}
              </span>
            ) : (
              <span className="text-[10px] opacity-70 group-hover:opacity-100 flex items-center font-sans">
                <Copy className="w-2.5 h-2.5 mr-0.5" />
                {isAr ? 'تطبيق' : 'Apply'}
              </span>
            )}
          </button>
        )}

        {/* View Cart shortcut */}
        <button
          type="button"
          onClick={() => openCart()}
          className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#C6A76A] hover:text-[#E8D7B5] underline underline-offset-4 transition-colors font-medium"
        >
          <span>{isAr ? 'عرض الحقيبة' : 'View Bag'}</span>
          {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
        </button>
      </div>
    </aside>
  );
};
