import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';
import { 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Check,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  X,
  Tag
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { 
    language, 
    products, 
    selectedProductId, 
    setSelectedProductId, 
    addToCart,
    openOrderModal,
    triggerDirectWhatsAppOrder
  } = useStore();

  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedNoticeId, setAddedNoticeId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', labelAr: 'كافة الساعات', labelEn: 'All Watches' },
    { id: 'black', labelAr: 'الأسود البازلتي', labelEn: 'Obsidian Black' },
    { id: 'gold', labelAr: 'الذهبي الشامبانيا', labelEn: 'Champagne Gold' },
    { id: 'silver', labelAr: 'الفضي والستانلس', labelEn: 'Silver & Steel' },
    { id: 'green', labelAr: 'الأخضر الزمردي', labelEn: 'Royal Emerald' },
    { id: 'blue', labelAr: 'الكحلي الملكي', labelEn: 'Midnight Blue' },
  ];

  let filteredProducts = products.filter(product => {
    // Category match
    if (activeCategory === 'black') {
      const match = product.id.includes('noir') || product.id.includes('basalt') || product.nameEn.toLowerCase().includes('black') || product.categoryAr.includes('سود');
      if (!match) return false;
    } else if (activeCategory === 'gold') {
      const match = product.id.includes('dore') || product.nameEn.toLowerCase().includes('gold') || product.categoryAr.includes('ذهب');
      if (!match) return false;
    } else if (activeCategory === 'silver') {
      const match = product.id.includes('argent') || product.nameEn.toLowerCase().includes('silver') || product.nameEn.toLowerCase().includes('steel') || product.categoryAr.includes('فض');
      if (!match) return false;
    } else if (activeCategory === 'green') {
      const match = product.id.includes('emeraude') || product.nameEn.toLowerCase().includes('emerald') || product.categoryAr.includes('خضر');
      if (!match) return false;
    } else if (activeCategory === 'blue') {
      const match = product.id.includes('bleu') || product.nameEn.toLowerCase().includes('blue') || product.categoryAr.includes('كحل') || product.categoryAr.includes('أزرق');
      if (!match) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const nameMatch = product.nameEn.toLowerCase().includes(q) || product.nameAr.includes(q);
      const catMatch = product.categoryEn.toLowerCase().includes(q) || product.categoryAr.includes(q);
      const descMatch = product.shortDescriptionEn.toLowerCase().includes(q) || product.shortDescriptionAr.includes(q);
      if (!nameMatch && !catMatch && !descMatch) return false;
    }

    return true;
  });

  // Sort
  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceSAR - b.priceSAR);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.priceSAR - a.priceSAR);
  }

  const handleSelectAndScroll = (productId: string) => {
    setSelectedProductId(productId);
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (p: Product) => {
    addToCart(p, 1);
    setAddedNoticeId(p.id);
    setTimeout(() => setAddedNoticeId(null), 2000);
  };

  return (
    <section id="collection" className="py-16 sm:py-24 bg-[#070707] border-b border-[#1f1f1f] relative overflow-hidden">
      {/* Subtle luxury ambient radial glows */}
      <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(198,167,106,0.08),transparent_70%)] pointer-events-none blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#2a2a2a] text-[#C6A76A] text-xs font-medium uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? `تشكيلة الساعات الكاملة (${products.length} موديلات)` : `Full Collection (${products.length} Models)`}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-[#F5F3EF] tracking-tight">
            {isAr ? (
              <span className="font-serif-arabic font-bold">ساعات أصول — فخامة لا تحتاج إلى صخب</span>
            ) : (
              <span>OSOOL Timepieces — Defined by Restraint</span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? `استكشف ${products.length} تصاميم معمارية فريدة مصممة لتناسب مختلف إطلالاتك: الأسود المات، الذهبي الشامبانيا، الستانلس ستيل، والأخضر والكحلي الملكي. أسعار عادلة تتراوح بين 219 إلى 249 ريال سعودي.`
              : `Explore ${products.length} distinctive minimalist timepieces tailored for everyday prestige across Saudi Arabia: Obsidian Black, Champagne Gold, Brushed Silver, Emerald Green, and Midnight Navy.`}
          </p>

          {/* Search & Sort Controls Bar */}
          <div className="pt-2 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث باسم الساعة أو اللون أو الموديل...' : 'Search watch name, dial color, or style...'}
                className="w-full py-2.5 px-9 bg-[#111111] border border-[#262626] focus:border-[#C6A76A] rounded-lg text-xs text-[#F5F3EF] placeholder-[#666666] outline-none transition-colors"
              />
              <Search className="w-4 h-4 text-[#8c8c8c] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[#8c8c8c] hover:text-[#F5F3EF] p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full sm:w-auto py-2.5 px-3 bg-[#111111] border border-[#262626] focus:border-[#C6A76A] rounded-lg text-xs text-[#A3A3A3] outline-none cursor-pointer"
            >
              <option value="featured">{isAr ? 'الترتيب: الافتراضي' : 'Sort: Featured'}</option>
              <option value="price-asc">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
            </select>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#C6A76A] text-[#050505] shadow-md font-semibold'
                    : 'bg-[#121212] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#222222] hover:border-[#383838]'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid - Shows all models with distinct style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {filteredProducts.map((p) => {
            const isSelected = p.id === selectedProductId;
            const primaryImg = p.images[0]?.src || '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg';

            return (
              <article
                key={p.id}
                className={`group relative bg-[#0d0d0d] rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                  isSelected 
                    ? 'border-[#C6A76A]/80 ring-1 ring-[#C6A76A]/30' 
                    : 'border-[#1f1f1f] hover:border-[#383838] hover:bg-[#101010]'
                }`}
              >
                {/* Top Image Showcase */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#141414] border-b border-[#1c1c1c]">
                  <img
                    src={primaryImg}
                    alt={isAr ? p.nameAr : p.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                    onClick={() => handleSelectAndScroll(p.id)}
                  />

                  {/* Gradient Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Stock Status Badge */}
                  <div className="absolute top-3.5 start-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-[#050505]/85 backdrop-blur-md border border-[#262626] text-[#C6A76A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] animate-pulse" />
                      <span>{isAr ? p.stockStatusAr.split('·')[0].trim() : p.stockStatusEn.split('·')[0].trim()}</span>
                    </span>
                  </div>

                  {/* Active Selected Tag */}
                  {isSelected && (
                    <div className="absolute top-3.5 end-3.5">
                      <span className="px-2.5 py-1 rounded bg-[#C6A76A] text-[#050505] text-[10px] font-bold uppercase tracking-wider">
                        {isAr ? 'المحدد حالياً' : 'Selected'}
                      </span>
                    </div>
                  )}

                  {/* Floating Price Pill */}
                  <div className="absolute bottom-3 end-3.5 px-3 py-1.5 rounded-lg bg-[#050505]/90 backdrop-blur-md border border-[#2a2a2a] text-end">
                    <span className="text-xs font-mono font-bold text-[#F5F3EF]">
                      {p.priceSAR} {isAr ? p.currencyAr : p.currencyEn}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-start">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#C6A76A]">
                        {isAr ? p.categoryAr : p.categoryEn}
                      </span>
                      <span className="text-[11px] text-[#737373]">40mm</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif-luxury font-medium text-[#F5F3EF] group-hover:text-[#C6A76A] transition-colors">
                      {isAr ? (
                        <span className="font-serif-arabic font-bold">{p.nameAr}</span>
                      ) : (
                        <span>{p.nameEn}</span>
                      )}
                    </h3>

                    <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed">
                      {isAr ? p.shortDescriptionAr : p.shortDescriptionEn}
                    </p>
                  </div>

                  {/* Specifications Snapshot */}
                  <div className="pt-2.5 border-t border-[#1a1a1a] grid grid-cols-2 gap-2 text-[11px] text-[#8c8c8c]">
                    <div className="truncate">
                      <span className="text-[#666666]">{isAr ? 'الحركة: ' : 'Movement: '}</span>
                      <span>{isAr ? 'كوارتز دقيق' : 'Quartz'}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-[#666666]">{isAr ? 'السُمك: ' : 'Profile: '}</span>
                      <span>7.5 mm</span>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {/* Primary Quick Add to Bag */}
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(p)}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#C6A76A] hover:bg-[#D4B87D] active:scale-[0.98] text-[#050505] font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>
                          {addedNoticeId === p.id 
                            ? (isAr ? 'تمت الإضافة للسلة ✓' : 'Added to Bag ✓')
                            : (isAr ? `أضف للسلة (${p.priceSAR} ر.س)` : `Add to Bag (${p.priceSAR} SAR)`)}
                        </span>
                      </button>

                      {/* View Details Anchor */}
                      <button
                        type="button"
                        onClick={() => handleSelectAndScroll(p.id)}
                        className="p-2.5 rounded-lg bg-[#161616] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] hover:border-[#C6A76A]/40 transition-colors cursor-pointer"
                        title={isAr ? 'استعراض مواصفات هذه الساعة' : 'View timepiece specifications'}
                        aria-label="View timepiece specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Secondary WhatsApp Direct Order Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProductId(p.id);
                        triggerDirectWhatsAppOrder({ quantity: 1 });
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-transparent hover:bg-[#141414] text-[11px] font-medium text-[#A3A3A3] hover:text-[#C6A76A] border border-[#1f1f1f] hover:border-[#2e2e2e] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{isAr ? 'طلب هذا الموديل عبر واتساب' : 'Direct Order on WhatsApp'}</span>
                      {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-[#0d0d0d] rounded-2xl border border-[#222222] my-8">
            <p className="text-sm text-[#A3A3A3]">
              {isAr ? 'لم نجد ساعات مطابقة لبحثك' : 'No watches matched your search query'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] rounded"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* Multi-Watch Bundle Promotion Banner */}
        <div className="mt-14 p-5 rounded-2xl bg-gradient-to-r from-[#14120a] via-[#16140e] to-[#0f0e0a] border border-[#C6A76A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-start">
            <div className="w-10 h-10 rounded-full bg-[#1e190e] border border-[#C6A76A]/50 flex items-center justify-center text-[#C6A76A] shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#F5F3EF]">
                {isAr ? 'عرض تشكيلة الساعات المتعددة: خصم 20% عند شراء ساعتين أو أكثر' : 'Multi-Watch Bundle: 20% OFF when ordering 2 or more timepieces'}
              </h4>
              <p className="text-xs text-[#A3A3A3] mt-0.5">
                {isAr ? 'أضف ساعتين مختلفتين للسلة واستخدم كود OSOOL20 في الدفع' : 'Add 2 different watches to bag and apply code OSOOL20 at checkout'}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-[#C6A76A] px-3.5 py-1.5 rounded bg-black/60 border border-[#C6A76A]/40">
            OSOOL20
          </span>
        </div>

        {/* Reassurance Footer Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-[#0c0c0c] border border-[#222222] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#C6A76A] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#F5F3EF]">
                {isAr ? 'توصيل سريع لكافة مناطق المملكة' : 'Rapid Saudi Delivery'}
              </h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                {isAr ? 'شحن موثوق خلال 2 - 4 أيام عمل' : 'Direct transit in 2 - 4 business days'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#C6A76A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#F5F3EF]">
                {isAr ? 'فحص ومعاينة قبل الاستلام' : 'Inspection & Authenticity'}
              </h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                {isAr ? 'ساعات معتمدة بأسعار شفافة وعادلة' : 'Verified watches at fair transparent rates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#C6A76A] shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#F5F3EF]">
                {isAr ? 'خدمة عملاء واتساب شخصية' : 'Personal WhatsApp Concierge'}
              </h4>
              <p className="text-[11px] text-[#737373] mt-0.5">
                {isAr ? 'متابعة فورية وتأكيد فوري للطلب' : 'Instant status updates & direct coordination'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
