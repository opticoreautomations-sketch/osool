import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowDown, ShoppingBag, ShieldCheck, Sparkles, Check, ChevronRight, ChevronLeft, PackageSearch } from 'lucide-react';

export const Hero: React.FC = () => {
  const { 
    language, 
    products, 
    product, 
    selectedProductId, 
    setSelectedProductId, 
    addToCart
  } = useStore();

  const isAr = language === 'ar';
  const [justAdded, setJustAdded] = useState(false);

  if (!product || products.length === 0) {
    return (
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#050505] border-b border-[#1a1a1a]">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(198,167,106,0.15),transparent_70%)]" 
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#2a2a2a] text-xs tracking-widest text-[#C6A76A] uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'المملكة العربية السعودية · فخامة هادئة' : 'Saudi Arabia · Quiet Luxury'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium tracking-tight text-[#F5F3EF] leading-tight">
              {isAr ? (
                <span className="font-serif-arabic font-bold block">
                  وقتك.. يعكس أصولك.
                </span>
              ) : (
                <span>Time, Defined by You.</span>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'علامة ساعات سعودية فاخرة ترتكز على جماليات الفخامة الهادئة والتصميم المينيمالي. التشكيلة الاستثنائية الجديدة قيد الإطلاق قريباً.'
                : 'A contemporary Saudi luxury timepiece label centered on quiet prestige and architectural minimalism. The new collection is arriving soon.'}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('order-status');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded-lg transition-all shadow-lg active:scale-98 cursor-pointer"
              >
                <PackageSearch className="w-4 h-4" />
                <span>{isAr ? 'تتبع حالة طلب سابق' : 'Track Order Status'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('philosophy');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-[#F5F3EF] bg-[#111111] hover:bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg transition-all cursor-pointer"
              >
                <span>{isAr ? 'قصة علامة أصول' : 'Discover Our Story'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activeImage = product.images[0]?.src || '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg';

  const handleQuickAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#050505] border-b border-[#1a1a1a]">
      {/* Background ambient lighting subtle gold gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(198,167,106,0.15),transparent_70%)]" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Content Column (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-start">
            
            {/* Minimal unboxed brand kicker */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-widest text-[#C6A76A] uppercase font-medium">
              <span>{isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'فخامة هادئة' : 'Quiet Luxury'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#F5F3EF] bg-[#141414] px-2 py-0.5 rounded border border-[#2a2a2a]">
                {isAr ? `${products.length} موديلات فاخرة` : `${products.length} Signature Models`}
              </span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium tracking-tight text-[#F5F3EF] leading-tight text-balance">
                {isAr ? (
                  <span className="font-serif-arabic text-4xl sm:text-5xl lg:text-6xl font-bold leading-normal block">
                    وقتك.. يعكس أصولك.
                  </span>
                ) : (
                  <span>Time, Defined by You.</span>
                )}
              </h1>

              <p className="text-sm font-cinzel tracking-widest text-[#A3A3A3] uppercase">
                {isAr 
                  ? `تشكيلة ساعات أصول — ${products.length} إصدارات استثنائية من 219 إلى 249 ر.س` 
                  : `OSOOL Watch Lineup — ${products.length} Distinct Editions (219 – 249 SAR)`}
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed max-w-xl text-balance">
              {isAr
                ? 'مجموعة متكاملة من الساعات الرجالية الفاخرة: من الأسود البازلتي المطفي والذهب الشامبانيا، إلى الستانلس ستيل الفضي، والأخضر الزمردي والكحلي الملكي. اختر تصميمك المفضل واطلبه مباشرة بتأكيد فوري عبر واتساب.'
                : 'A curated collection of distinguished masculine timepieces: Obsidian Matte Black, Champagne Gold, Brushed Stainless Steel, Royal Emerald, and Midnight Navy. Choose your signature model with instant WhatsApp concierge delivery.'}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              {/* Primary CTA: Explore All Products in Collection */}
              <a
                href="#collection"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-98 whitespace-nowrap cursor-pointer text-center"
              >
                <ArrowDown className="w-4 h-4" />
                <span>{isAr ? `تصفح تشكيلة الساعات (${products.length} موديلات)` : `Explore Collection (${products.length} Models)`}</span>
              </a>

              {/* Secondary CTA: Add Currently Spotlighted Model to Bag */}
              <button
                type="button"
                onClick={handleQuickAdd}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-[#F5F3EF] bg-[#111111] hover:bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#C6A76A]/60 rounded transition-all whitespace-nowrap cursor-pointer text-center"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">{isAr ? 'تمت الإضافة للسلة ✓' : 'Added to Bag ✓'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C6A76A]" />
                    <span>
                      {isAr 
                        ? `أضف ${product.nameAr.split('(')[0].trim()} (${product.priceSAR} ر.س)` 
                        : `Add ${product.nameEn} (${product.priceSAR} SAR)`}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Proof & Trust Markers */}
            <div className="pt-4 border-t border-[#1a1a1a] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#737373]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span>{isAr ? `${products.length} ساعات مختلفة جاهزة للشحن` : `${products.length} Distinct Models Ready`}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A76A]" />
                <span>{isAr ? 'أسعار عادلة: 219 - 249 ر.س' : 'Fair Luxury: 219 - 249 SAR'}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <div>
                <span>{isAr ? 'شحن سريع لكافة مدن المملكة' : 'Rapid KSA Delivery'}</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Column with Interactive Model Pedestal (6 cols on lg) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Main Active Watch Showcase Frame */}
            <div className="relative w-full aspect-16/10 sm:aspect-16/9 lg:aspect-4/3 rounded-xl overflow-hidden border border-[#222222] bg-[#0c0c0c] shadow-2xl group transition-all duration-500">
              <img
                src={activeImage}
                alt={isAr ? product.nameAr : product.nameEn}
                referrerPolicy="no-referrer"
                key={product.id}
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle luxury vignette gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-65 pointer-events-none" />
              
              {/* Active Watch Spotlight Badge */}
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs text-[#F5F3EF] bg-[#050505]/85 backdrop-blur-md px-4 py-3 rounded-lg border border-[#282828]">
                <div className="min-w-0 pr-2">
                  <div className="font-semibold text-sm text-[#F5F3EF] truncate">
                    {isAr ? product.nameAr : product.nameEn}
                  </div>
                  <div className="text-[11px] text-[#A3A3A3] truncate">
                    {isAr ? product.categoryAr : product.categoryEn} · 40mm
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <div className="font-mono font-bold text-base text-[#C6A76A]">
                    {product.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {isAr ? 'متوفر فوري' : 'In Stock'}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Model Selector Strip - Shows ALL available products */}
            <div className="w-full mt-4 p-2.5 rounded-xl bg-[#0d0d0d] border border-[#222222] space-y-2">
              <div className="flex items-center justify-between px-1 text-[11px] text-[#8c8c8c]">
                <span className="font-medium text-[#C6A76A]">
                  {isAr ? 'اختر وتنقّل بين موديلات ساعات أصول:' : 'Select & preview any timepiece model:'}
                </span>
                <span className="font-mono text-[#666666]">
                  {products.findIndex(p => p.id === product.id) + 1} / {products.length}
                </span>
              </div>

              {/* Thumbnail Strip with horizontal scroll */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {products.map((item) => {
                  const isSelected = item.id === product.id;
                  const thumb = item.images[0]?.src || activeImage;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedProductId(item.id)}
                      className={`relative p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#181818] border-[#C6A76A] ring-1 ring-[#C6A76A]/40 shadow-md' 
                          : 'bg-[#101010] border-[#222222] hover:bg-[#151515] hover:border-[#383838] opacity-75 hover:opacity-100'
                      }`}
                      title={isAr ? item.nameAr : item.nameEn}
                    >
                      <div className="w-full aspect-square rounded overflow-hidden bg-black border border-white/5">
                        <img 
                          src={thumb} 
                          alt={item.nameEn} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="w-full text-[10px] font-medium text-[#F5F3EF] truncate leading-tight">
                        {isAr ? item.nameAr.split('(')[0].replace('أصول', '').trim() : item.nameEn.replace('OSOOL', '').trim()}
                      </div>
                      <div className="text-[10px] font-mono text-[#C6A76A] font-bold">
                        {item.priceSAR}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
