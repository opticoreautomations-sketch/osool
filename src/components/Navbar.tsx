import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Menu, X, MessageCircle, Globe, ShoppingBag, Instagram, Youtube } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, openOrderModal, openCart, cartQuantity, orderHistory } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === 'ar';

  const navLinks = [
    { href: '#collection', label: isAr ? 'تشكيلة الساعات' : 'Watch Collection' },
    { href: '#product', label: isAr ? 'مواصفات ومقارنة الساعات' : 'Watch Specs & Compare' },
    { href: '#craftsmanship', label: isAr ? 'التصميم' : 'Design' },
    { href: '#philosophy', label: isAr ? 'قصة أصول' : 'Brand Story' },
    { href: '#faq', label: isAr ? 'الأسئلة الشائعة' : 'FAQ' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#222222]">
      {/* Top Bar Contract: 3 zones, gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line text element */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-cinzel font-bold tracking-wider text-[#F5F3EF] hover:text-[#C6A76A] transition-colors whitespace-nowrap shrink-0"
        >
          OSOOL <span className="font-serif-arabic text-lg sm:text-xl font-normal text-[#C6A76A]">| أصول</span>
        </a>

        {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A3A3A3]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#F5F3EF] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#C6A76A] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + cart + language switcher */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Shopping Bag Button with Badge & Live Status Indicator */}
          <button
            onClick={openCart}
            className="relative p-2 text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#262626] rounded hover:border-[#C6A76A]/40 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
            title={isAr ? 'سلة المشتريات ومتابعة الطلبات' : 'Shopping Bag & Order Status'}
          >
            <ShoppingBag className="w-4 h-4 text-[#C6A76A]" />
            {cartQuantity > 0 ? (
              <span className="absolute -top-1.5 -end-1.5 w-4 h-4 rounded-full bg-[#C6A76A] text-[#050505] text-[10px] font-bold font-mono flex items-center justify-center">
                {cartQuantity}
              </span>
            ) : orderHistory.length > 0 && (
              <span 
                className={`absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full border border-[#050505] ${
                  orderHistory[0].status === 'confirmed'
                    ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]'
                    : orderHistory[0].status === 'cancelled'
                    ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]'
                    : 'bg-[#C6A76A] animate-ping'
                }`}
                title={
                  orderHistory[0].status === 'confirmed'
                    ? (isAr ? 'طلب معتمد ومؤكد' : 'Confirmed Order')
                    : orderHistory[0].status === 'cancelled'
                    ? (isAr ? 'طلب ملغي' : 'Cancelled Order')
                    : (isAr ? 'طلب قيد المراجعة' : 'Pending Order')
                }
              />
            )}
          </button>

          {/* Language switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#262626] rounded hover:border-[#C6A76A]/40 transition-colors whitespace-nowrap shrink-0"
            aria-label="Switch language"
            title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#C6A76A]" />
            <span>{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Instagram Link */}
          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center p-2 text-[#A3A3A3] hover:text-[#C6A76A] border border-[#262626] rounded hover:border-[#C6A76A]/40 transition-colors"
            aria-label="Instagram @osoolofficial1"
            title="Instagram: @osoolofficial1"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* TikTok Link */}
          <a
            href={STORE_CONFIG.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center p-2 text-[#A3A3A3] hover:text-[#C6A76A] border border-[#262626] rounded hover:border-[#C6A76A]/40 transition-colors"
            aria-label="TikTok @osoolwatchesoffical"
            title="TikTok: @osoolwatchesoffical"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.7a6.34 6.34 0 0 0 10.83 4.47v-7.14a8.27 8.27 0 0 0 5.66 2.24v-3.48a4.84 4.84 0 0 1-3.77-1.1v-4z" />
            </svg>
          </a>

          {/* YouTube Link */}
          <a
            href={STORE_CONFIG.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center p-2 text-[#A3A3A3] hover:text-[#C6A76A] border border-[#262626] rounded hover:border-[#C6A76A]/40 transition-colors"
            aria-label="YouTube @OsoolWatchesOfficial"
            title="YouTube: @OsoolWatchesOfficial"
          >
            <Youtube className="w-4 h-4" />
          </a>

          {/* Primary CTA */}
          <button
            onClick={openOrderModal}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#A3A3A3] hover:text-[#F5F3EF] rounded border border-[#222222]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#222222] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-[#A3A3A3] hover:text-[#C6A76A] py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#222222] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-[#050505] bg-[#C6A76A] rounded transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'اطلب عبر واتساب (229 ر.س)' : 'Order via WhatsApp (229 SAR)'}</span>
            </button>

            <div className="grid grid-cols-3 gap-2">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[11px] font-medium text-[#F5F3EF] bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] rounded transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span className="truncate max-w-full">Instagram</span>
              </a>

              <a
                href={STORE_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[11px] font-medium text-[#F5F3EF] bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] rounded transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#C6A76A]" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.1 15.7a6.34 6.34 0 0 0 10.83 4.47v-7.14a8.27 8.27 0 0 0 5.66 2.24v-3.48a4.84 4.84 0 0 1-3.77-1.1v-4z" />
                </svg>
                <span className="truncate max-w-full">TikTok</span>
              </a>

              <a
                href={STORE_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center gap-1 py-2 px-1 text-[11px] font-medium text-[#F5F3EF] bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] rounded transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span className="truncate max-w-full">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
