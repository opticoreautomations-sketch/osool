import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag,
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Info,
  Maximize2
} from 'lucide-react';

export const ProductSection: React.FC = () => {
  const { 
    language, 
    product, 
    quantity, 
    incrementQuantity, 
    decrementQuantity, 
    subtotal, 
    openOrderModal, 
    openPolicy,
    triggerDirectWhatsAppOrder,
    addToCart,
    products,
    selectedProductId,
    setSelectedProductId
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const isAr = language === 'ar';

  if (!product || products.length === 0) {
    return null;
  }

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setSelectedImageIndex(0);
  };

  return (
    <section id="product" className="py-16 sm:py-24 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-widest text-[#C6A76A] uppercase mb-2">
            {isAr ? 'التشكيلة المختارة' : 'Signature Timepiece Collection'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#F5F3EF]">
            {isAr ? (
              <span className="font-serif-arabic font-bold">{product.nameAr} — الفخامة الهادئة</span>
            ) : (
              <span>{product.nameEn} — Quiet Luxury Timepiece</span>
            )}
          </h2>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            {isAr ? product.taglineAr : product.taglineEn}
          </p>
        </div>

        {/* Multi-Product Collection Switcher */}
        {products.length > 1 && (
          <div className="mb-12 p-4 rounded-xl bg-[#0d0d0d] border border-[#222222] max-w-5xl mx-auto">
            <div className="flex items-center justify-between text-[11px] text-[#8c8c8c] uppercase tracking-wider mb-3 px-1 text-start font-medium">
              <span>{isAr ? `اختر واستعرض مواصفات أي موديل (${products.length} ساعات متوفرة):` : `Select & Inspect Any Timepiece (${products.length} models available):`}</span>
              <span className="text-[#C6A76A]">{isAr ? 'اضغط للتبديل' : 'Click to switch'}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {products.map((item) => {
                const isActive = item.id === selectedProductId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all text-center cursor-pointer ${
                      isActive 
                        ? 'bg-[#181818] border-[#C6A76A] shadow-md ring-1 ring-[#C6A76A]/40' 
                        : 'bg-[#101010] border-[#222222] hover:bg-[#151515] hover:border-[#333333]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded overflow-hidden bg-black border border-white/5 shrink-0">
                      <img
                        src={item.images[0]?.src}
                        alt={item.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full min-w-0">
                      <div className="text-[11px] font-semibold text-[#F5F3EF] truncate">
                        {isAr ? item.nameAr.split('(')[0].replace('أصول', '').trim() : item.nameEn.replace('OSOOL', '').trim()}
                      </div>
                      <div className="text-[10px] font-mono text-[#C6A76A] font-bold">
                        {item.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Product Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Interactive Luxury Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-[#111111] border border-[#222222] group">
              <img
                src={currentImage.src}
                alt={isAr ? currentImage.altAr : currentImage.altEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500 ease-out cursor-zoom-in"
                onClick={() => setFullscreenImage(currentImage.src)}
              />

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setFullscreenImage(currentImage.src)}
                className="absolute top-4 end-4 p-2 bg-[#050505]/70 hover:bg-[#050505] text-[#A3A3A3] hover:text-[#F5F3EF] rounded border border-[#2a2a2a] backdrop-blur-sm transition-colors"
                title={isAr ? 'تكبير الصورة' : 'Enlarge view'}
                aria-label="Enlarge view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Image Angle Caption */}
              <div className="absolute bottom-3 start-3 px-3 py-1 bg-[#050505]/80 backdrop-blur-md rounded border border-[#222222] text-xs text-[#A3A3A3]">
                {isAr ? currentImage.labelAr : currentImage.labelEn}
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => {
                const isActive = idx === selectedImageIndex;
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-4/3 rounded overflow-hidden bg-[#141414] border transition-all cursor-pointer ${
                      isActive 
                        ? 'border-[#C6A76A] ring-1 ring-[#C6A76A]/40' 
                        : 'border-[#222222] opacity-60 hover:opacity-100 hover:border-[#333333]'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={isAr ? img.altAr : img.altEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#C6A76A]/10 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Editorial Craftsmanship Callout */}
            <div className="p-5 rounded-lg bg-[#0e0e0e] border border-[#1e1e1e] text-xs text-[#8c8c8c] space-y-2">
              <div className="flex items-center gap-2 text-[#C6A76A] font-medium text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'ضمان الفحص والمعاينة' : 'Inspection & Authenticity Guarantee'}</span>
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'يتم فحص وتغليف كل ساعة يدوياً قبل خروجها للشحن داخل علبة أصول الفاخرة لضمان وصولها بأعلى معايير الجودة والنظافة.'
                  : 'Every timepiece is individually inspected and securely packaged in OSOOL signature gift casing prior to dispatch across Saudi Arabia.'}
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 cols on lg) */}
          <div className="lg:col-span-5 bg-[#0e0e0e] border border-[#222222] rounded-lg p-6 sm:p-8 space-y-6">
            
            {/* Header: Category & Availability */}
            <div className="flex items-center justify-between text-xs border-b border-[#1c1c1c] pb-4">
              <span className="text-[#A3A3A3] font-medium tracking-wider uppercase">
                {isAr ? product.categoryAr : product.categoryEn}
              </span>
              <div className="flex items-center gap-1.5 text-[#C6A76A] font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? product.stockStatusAr : product.stockStatusEn}</span>
              </div>
            </div>

            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#F5F3EF]">
                {isAr ? product.nameAr : product.nameEn}
              </h1>
              
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono tracking-tight text-[#C6A76A]">
                  {product.priceSAR}
                </span>
                <span className="text-sm font-medium text-[#A3A3A3]">
                  {isAr ? product.currencyAr : product.currencyEn}
                </span>
                <span className="text-xs text-[#666666]">
                  {isAr ? '(شامل الضريبة)' : '(VAT inclusive)'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              {isAr ? product.shortDescriptionAr : product.shortDescriptionEn}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-[#A3A3A3] block">
                {isAr ? 'الكمية المطلوبة' : 'Select Quantity'}
              </label>
              
              <div className="flex items-center justify-between p-2 rounded bg-[#070707] border border-[#262626]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 rounded bg-[#161616] hover:bg-[#222222] disabled:opacity-40 text-[#F5F3EF] transition-colors cursor-pointer disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="font-mono font-bold text-base text-[#F5F3EF] min-w-[2rem] text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= 10}
                    className="p-2 rounded bg-[#161616] hover:bg-[#222222] disabled:opacity-40 text-[#F5F3EF] transition-colors cursor-pointer disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal Calculation */}
                <div className="text-end">
                  <div className="text-xs text-[#737373]">{isAr ? 'الإجمالي قبل الشحن' : 'Subtotal'}</div>
                  <div className="font-mono font-bold text-base text-[#C6A76A]">
                    {subtotal} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-2">
              {/* Primary: Add to Cart and enter Phone Number */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 text-sm font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {isAr 
                    ? `أضف إلى السلة (${subtotal} ر.س)`
                    : `Add to Bag (${subtotal} SAR)`}
                </span>
              </button>

              {/* Secondary: Instant direct WhatsApp Order */}
              <button
                onClick={() => triggerDirectWhatsAppOrder()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#F5F3EF] bg-[#141414] hover:bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#C6A76A]/40 rounded transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#C6A76A]" />
                <span>{isAr ? 'طلب مباشر وفوري عبر واتساب' : 'Direct Order via WhatsApp'}</span>
              </button>

              <button
                onClick={openOrderModal}
                className="w-full flex items-center justify-center gap-1.5 py-1 text-[11px] text-[#737373] hover:text-[#C6A76A] transition-colors cursor-pointer"
              >
                <span>{isAr ? 'تخصيص بيانات الطلب والمدينة مسبقاً' : 'Pre-fill City & Name in Order Form'}</span>
              </button>

              <p className="text-[11px] text-center text-[#666666] leading-relaxed">
                {isAr
                  ? '🔒 لا توجد بوابات دفع إلكترونية أو بطاقات بنكية. إضافة المنتج تتيح لك إدخال رقم جوالك وتأكيد الشحنة فوراً عبر واتساب.'
                  : '🔒 No online cards or payment gateways. Adding to bag lets you provide your phone number and confirm directly via WhatsApp.'}
              </p>
            </div>

            {/* Policies Quick Access */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1c1c1c] text-xs">
              <button
                onClick={() => openPolicy('shipping')}
                className="flex items-center gap-2 p-2.5 rounded bg-[#121212] hover:bg-[#181818] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#222222] transition-colors cursor-pointer text-start"
              >
                <Truck className="w-4 h-4 text-[#C6A76A] shrink-0" />
                <span className="truncate">{isAr ? 'سياسة الشحن والتوصيل' : 'Shipping Policy'}</span>
              </button>

              <button
                onClick={() => openPolicy('returns')}
                className="flex items-center gap-2 p-2.5 rounded bg-[#121212] hover:bg-[#181818] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#222222] transition-colors cursor-pointer text-start"
              >
                <RotateCcw className="w-4 h-4 text-[#C6A76A] shrink-0" />
                <span className="truncate">{isAr ? 'سياسة الاستبدال' : 'Exchange Policy'}</span>
              </button>
            </div>

          </div>

        </div>

        {/* Specifications Matrix (Clear Editable Placeholders) */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#1c1c1c]">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#F5F3EF]">
                {isAr ? 'المواصفات الفنية للساعة' : 'Technical Specifications'}
              </h3>
              <p className="text-xs text-[#737373]">
                {isAr 
                  ? 'المعلومات المحددة أدناه قابلة للتعديل والتحقق من قبل مالك المتجر قبل الإطلاق التجاري.'
                  : 'Specifications below are editable placeholders and can be verified by the brand owner before final launch.'}
              </p>
            </div>

            <div className="rounded-lg bg-[#0e0e0e] border border-[#222222] overflow-hidden divide-y divide-[#1a1a1a]">
              {product.specifications.map((spec) => (
                <div key={spec.id} className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 text-sm gap-2">
                  <div className="text-[#A3A3A3] font-medium flex items-center gap-1.5">
                    <span>{isAr ? spec.labelAr : spec.labelEn}</span>
                    {spec.isPlaceholderNote && (
                      <span 
                        title={isAr ? 'قيمة نموذجية قابلة للتعديل' : 'Editable placeholder'} 
                        className="text-[#666666] hover:text-[#C6A76A]"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="sm:col-span-2 text-[#F5F3EF] font-mono text-xs sm:text-sm">
                    {isAr ? spec.valueAr : spec.valueEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multi-Product Comparison Matrix */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#1c1c1c]">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold tracking-widest text-[#C6A76A] uppercase">
                {isAr ? 'مقارنة الموديلات' : 'Side-by-Side Model Comparison'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#F5F3EF]">
                {isAr ? 'قارن بين موديلات ساعات أصول الستة' : 'Compare All 6 OSOOL Timepieces'}
              </h3>
              <p className="text-xs text-[#8c8c8c] max-w-xl mx-auto">
                {isAr 
                  ? 'كل ساعة صُممت لتناسب نمط حياة وشخصية مميزة مع الاحتفاظ بنفس الدقة والمقاس الكلاسيكي 40 ملم.' 
                  : 'Every timepiece is curated with balanced 40mm proportions, differing in dial character, metal finishing, and occasion styling.'}
              </p>
            </div>

            {/* Responsive Table Container */}
            <div className="rounded-xl bg-[#0e0e0e] border border-[#222222] overflow-x-auto shadow-2xl">
              <table className="w-full text-start text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#222222] bg-[#121212] text-[#A3A3A3] text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 text-start">{isAr ? 'الساعة' : 'Timepiece'}</th>
                    <th className="p-3.5 text-start">{isAr ? 'التصنيف والمظهر' : 'Finish & Aesthetic'}</th>
                    <th className="p-3.5 text-start">{isAr ? 'المقاس والسُمك' : 'Diameter & Profile'}</th>
                    <th className="p-3.5 text-start">{isAr ? 'السعر' : 'Price'}</th>
                    <th className="p-3.5 text-end">{isAr ? 'إجراء سريع' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {products.map((item) => {
                    const isCurrent = item.id === selectedProductId;
                    const thumb = item.images[0]?.src || '';

                    return (
                      <tr 
                        key={item.id} 
                        className={`transition-colors ${isCurrent ? 'bg-[#18160f]/60' : 'hover:bg-[#121212]'}`}
                      >
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={thumb}
                              alt={item.nameEn}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded object-cover bg-black border border-[#2a2a2a] shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-sm text-[#F5F3EF]">
                                {isAr ? item.nameAr : item.nameEn}
                              </div>
                              <div className="text-[10px] text-[#737373]">
                                {isCurrent ? (isAr ? '● المعروضة حالياً' : '● In Active View') : (isAr ? 'متوفر' : 'In Stock')}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5 text-[#A3A3A3]">
                          <div className="font-medium text-[#F5F3EF]">{isAr ? item.categoryAr : item.categoryEn}</div>
                          <div className="text-[10px] text-[#737373] truncate max-w-xs">{isAr ? item.taglineAr : item.taglineEn}</div>
                        </td>

                        <td className="p-3.5 font-mono text-[#D4D4D4]">
                          40mm · 7.5mm
                        </td>

                        <td className="p-3.5 font-mono font-bold text-sm text-[#C6A76A]">
                          {item.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                        </td>

                        <td className="p-3.5 text-end">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                handleSelectProduct(item.id);
                                const el = document.getElementById('product');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1.5 rounded bg-[#161616] hover:bg-[#222222] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] text-[11px] transition-colors cursor-pointer"
                            >
                              {isAr ? 'عرض' : 'View'}
                            </button>
                            <button
                              onClick={() => addToCart(item, 1)}
                              className="px-3 py-1.5 rounded bg-[#C6A76A] hover:bg-[#D4B87D] text-[#050505] font-semibold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>{isAr ? 'إضافة' : 'Add'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#000000]/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={fullscreenImage}
              alt="Enlarged timepiece view"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 end-4 px-3 py-1.5 bg-[#111111] text-xs text-[#F5F3EF] rounded border border-[#333333] hover:border-[#C6A76A]"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
