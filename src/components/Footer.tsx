import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { MessageCircle, Instagram, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, openPolicy, openOrderModal, setIsAdminView } = useStore();
  const [secretClickCount, setSecretClickCount] = useState(0);
  const isAr = language === 'ar';

  const handleSecretAdminTrigger = () => {
    const next = secretClickCount + 1;
    if (next >= 4) {
      setSecretClickCount(0);
      setIsAdminView(true);
    } else {
      setSecretClickCount(next);
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] text-xs text-[#737373] pb-24 lg:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-start">
            <div className="text-xl font-cinzel font-bold tracking-wider text-[#F5F3EF]">
              OSOOL <span className="font-serif-arabic text-lg font-normal text-[#C6A76A]">| أصول</span>
            </div>
            <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-sm">
              {isAr ? STORE_CONFIG.brandTaglineAr : STORE_CONFIG.brandTaglineEn}
            </p>
            <p className="text-xs text-[#737373] leading-relaxed max-w-sm">
              {isAr
                ? 'علامة ساعات سعودية معاصرة ترتكز على جماليات الفخامة الهادئة والتصميم المينيمالي الأنيق.'
                : 'A contemporary Saudi watch label centered on quiet luxury and refined minimalist proportions.'}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-start">
            <h4 className="text-xs font-semibold text-[#F5F3EF] uppercase tracking-wider">
              {isAr ? 'السياسات والشروط' : 'Policies & Information'}
            </h4>
            <ul className="space-y-2 text-[#A3A3A3]">
              <li>
                <button
                  onClick={() => openPolicy('shipping')}
                  className="hover:text-[#C6A76A] transition-colors cursor-pointer text-start"
                >
                  {isAr ? 'الشحن والتوصيل' : 'Shipping & Delivery'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('returns')}
                  className="hover:text-[#C6A76A] transition-colors cursor-pointer text-start"
                >
                  {isAr ? 'الاسترجاع والاستبدال' : 'Returns & Exchange'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('privacy')}
                  className="hover:text-[#C6A76A] transition-colors cursor-pointer text-start"
                >
                  {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPolicy('terms')}
                  className="hover:text-[#C6A76A] transition-colors cursor-pointer text-start"
                >
                  {isAr ? 'الشروط والأحكام' : 'Terms of Service'}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-start">
            <h4 className="text-xs font-semibold text-[#F5F3EF] uppercase tracking-wider">
              {isAr ? 'التواصل المباشر وخدمة العملاء' : 'Direct Concierge & Contact'}
            </h4>
            
            <div className="space-y-2 text-[#A3A3A3]">
              {/* Phone line display */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span className="text-[#8c8c8c]">{isAr ? 'خدمة العملاء والواتساب:' : 'Support & WhatsApp:'}</span>
                <a 
                  href="tel:0548691874" 
                  className="font-mono text-[#F5F3EF] hover:text-[#C6A76A] font-bold transition-colors"
                  dir="ltr"
                >
                  054 8691874
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#C6A76A]">🇸🇦</span>
                <span>{isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
              </div>
              <div className="text-xs text-[#737373]">
                {isAr ? 'ساعات الدعم: ١٠:٠٠ ص - ١١:٠٠ م (يومياً)' : 'Support hours: 10:00 AM - 11:00 PM (Daily)'}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {/* WhatsApp direct */}
              <button
                onClick={openOrderModal}
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-[#F5F3EF] hover:text-[#C6A76A] text-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              </button>

              {/* Instagram */}
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-[#F5F3EF] hover:text-[#C6A76A] text-xs transition-colors"
                aria-label="Instagram page"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>{STORE_CONFIG.instagramHandle}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Hairline & Legal Transparency */}
        <div className="pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start text-xs text-[#525252]">
          <div 
            onClick={handleSecretAdminTrigger} 
            className="cursor-default select-none transition-colors hover:text-[#737373]"
            title="OSOOL Official"
          >
            © {new Date().getFullYear()} OSOOL (أصول). {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>{isAr ? 'نظام طلب وتأكيد عبر واتساب' : 'WhatsApp Concierge Ordering'}</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr" className="font-mono text-[#8c8c8c]">054 8691874</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
