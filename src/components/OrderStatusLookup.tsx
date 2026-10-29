import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  MessageCircle, 
  Copy, 
  Check, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

interface SimulatedTimelineStep {
  step: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  locationAr: string;
  locationEn: string;
  timeAr: string;
  timeEn: string;
  status: 'completed' | 'current' | 'upcoming';
}

export const OrderStatusLookup: React.FC = () => {
  const { 
    language, 
    orderHistory, 
    searchOrderId, 
    setSearchOrderId, 
    whatsappNumber,
    products 
  } = useStore();

  const isAr = language === 'ar';
  const [inputVal, setInputVal] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copiedTracking, setCopiedTracking] = useState<boolean>(false);

  // Sync with context searchOrderId if updated from external buttons
  useEffect(() => {
    if (searchOrderId) {
      setInputVal(searchOrderId);
      setHasSearched(true);
    }
  }, [searchOrderId]);

  // Clean uppercase order ID
  const cleanId = inputVal.trim().toUpperCase();

  // 1. Check if ID matches an actual stored order from the session
  const realOrder = orderHistory.find(
    o => o.id.toUpperCase() === cleanId || o.id.replace(/[^0-9]/g, '') === cleanId.replace(/[^0-9]/g, '')
  );

  // 2. Generate simulated details if not in history
  const simulatedId = cleanId || 'OSL-849201';
  
  // Deterministic seed based on string characters for consistent simulated state
  const charSum = simulatedId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stageIndex = (charSum % 4) + 1; // 1 to 4
  const carrierName = (charSum % 2 === 0) ? 'سمسا إكسبريس (SMSA Express)' : 'أرامكس (Aramex Priority)';
  const trackingNumber = `SA-${simulatedId.replace(/[^A-Z0-9]/g, '')}-${(charSum * 3).toString().slice(-4)}`;
  
  // Simulated watch model
  const featuredProduct = products[0] || {
    nameAr: 'أصول نوار (إصدار محدود)',
    nameEn: 'OSOOL Noir (Limited Edition)',
    priceSAR: 229,
    images: [{ src: '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg' }]
  };

  const simulatedTimeline: SimulatedTimelineStep[] = [
    {
      step: 1,
      titleAr: 'استلام الطلب وتأكيد البيانات',
      titleEn: 'Order Received & Verified',
      descAr: 'تم استلام تفاصيل الطلب بنجاح وتأكيد توفر موديل الساعة في مستودع الرياض.',
      descEn: 'Order confirmed and allocated at Riyadh luxury dispatch facility.',
      locationAr: 'الرياض، مركز العمليات الرئيسي',
      locationEn: 'Riyadh, Operations Hub',
      timeAr: 'قبل يومين · 10:30 ص',
      timeEn: '2 days ago · 10:30 AM',
      status: 'completed'
    },
    {
      step: 2,
      titleAr: 'الفحص الفني والتغليف الملكي الفاخر',
      titleEn: 'Precision Inspection & Luxury Casing',
      descAr: 'فحص ميكانيكا الساعة، مقاومة الماء، ونظافة الميناء، ثم إرفاق كارت الضمان والتغليف بعلبة أصول المميزة.',
      descEn: 'Movement calibration, water resistance check, and placement inside signature presentation box.',
      locationAr: 'مختبر المعايرة والتجهيز',
      locationEn: 'QC & Packaging Lab',
      timeAr: 'أمس · 02:15 م',
      timeEn: 'Yesterday · 02:15 PM',
      status: stageIndex >= 2 ? 'completed' : 'current'
    },
    {
      step: 3,
      titleAr: 'تسليم الشحنة للناقل وإصدار البوليصة',
      titleEn: 'Carrier Handover & Waybill Issued',
      descAr: `تم تسليم الشحنة إلى ${carrierName} برقم تتبع رسمي وخروجها من المستودع المركزي.`,
      descEn: `Handed over to ${carrierName} with official priority waybill issued.`,
      locationAr: 'مركز الفرز والشحن السريع',
      locationEn: 'Priority Sorting Facility',
      timeAr: 'اليوم · 09:40 ص',
      timeEn: 'Today · 09:40 AM',
      status: stageIndex > 2 ? 'completed' : stageIndex === 2 ? 'current' : 'upcoming'
    },
    {
      step: 4,
      titleAr: 'في الطريق إلى مدينتك ومقر الاستلام',
      titleEn: 'In Transit to Destination City',
      descAr: 'الشحنة على متن مركبة التوزيع السريع للتسليم المباشر والتواصل عبر الهاتف.',
      descEn: 'Shipment is on express delivery vehicle heading to your specified address.',
      locationAr: realOrder?.customerCity ? `مدينة ${realOrder.customerCity}` : 'مدينة الرياض / وجهة الاستلام',
      locationEn: realOrder?.customerCity ? realOrder.customerCity : 'Riyadh / Destination Address',
      timeAr: 'جاري التوصيل الآن',
      timeEn: 'Out for Delivery',
      status: stageIndex >= 4 ? 'current' : stageIndex === 3 ? 'current' : 'upcoming'
    },
    {
      step: 5,
      titleAr: 'التسليم النهائي والتوقيع',
      titleEn: 'Delivered & Signed',
      descAr: 'استلام الساعة الفاخرة وتوقيع بوليصة الاستلام بعد المعاينة.',
      descEn: 'Timepiece received and signed for in pristine condition.',
      locationAr: 'عنوان العميل',
      locationEn: 'Customer Address',
      timeAr: 'متوقع خلال ساعات',
      timeEn: 'Estimated within hours',
      status: 'upcoming'
    }
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    setHasSearched(true);
    setSearchOrderId(inputVal.trim().toUpperCase());
  };

  const handleCopyTracking = (trackNum: string) => {
    try {
      navigator.clipboard.writeText(trackNum);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2500);
    } catch {}
  };

  const handlePresetSample = (sampleId: string) => {
    setInputVal(sampleId);
    setSearchOrderId(sampleId);
    setHasSearched(true);
  };

  const activeDisplayId = realOrder ? realOrder.id : (cleanId || 'OSL-849201');

  const queryWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    isAr 
      ? `السلام عليكم، أود الاستفسار عن حالة وتتبع طلبي رقم (${activeDisplayId}) لساعة أصول الفاخرة.`
      : `Hello, I would like to inquire about the delivery status for my OSOOL timepiece order #${activeDisplayId}.`
  )}`;

  return (
    <section 
      id="order-status" 
      aria-label={isAr ? 'استعلام وتتبع حالة الطلب' : 'Order Status & Tracking'}
      className="py-20 sm:py-28 bg-[#070707] border-b border-[#1c1c1c] relative overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C6A76A]/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16140d] border border-[#C6A76A]/30 text-xs font-semibold text-[#C6A76A]">
            <Truck className="w-3.5 h-3.5 animate-pulse" />
            <span>{isAr ? 'خدمة المتابعة والتوصيل الملكي' : 'Concierge Delivery & Tracking'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury font-bold text-[#F5F3EF]">
            {isAr ? (
              <span className="font-serif-arabic font-bold">تتبع مسار وحالة طلبك</span>
            ) : (
              <span>Track Your Timepiece Delivery</span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
            {isAr
              ? 'أدخل رقم طلبك (مثل OSL-849201) للاطلاع الفوري على مراحل الفحص الدقيق، والتغليف الملكي، وحركة الشحنة المباشرة حتى وصولها إلى باب منزلك.'
              : 'Enter your Order ID (e.g. OSL-849201) to view real-time inspection, bespoke luxury casing, and direct courier dispatch progress.'}
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 p-2 rounded-xl bg-[#0e0e0e] border border-[#262626] shadow-xl focus-within:border-[#C6A76A]/60 transition-all">
            <div className="relative flex-1 flex items-center">
              <div className="ps-3.5 pointer-events-none text-[#737373]">
                <Search className="w-4 h-4 text-[#C6A76A]" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value.toUpperCase())}
                placeholder={isAr ? 'أدخل رقم الطلب (مثال: OSL-849201)' : 'Enter Order ID (e.g. OSL-849201)'}
                className="w-full ps-3 pe-8 py-2.5 text-xs sm:text-sm rounded bg-transparent text-[#F5F3EF] placeholder-[#555555] font-mono uppercase tracking-wider focus:outline-none"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setHasSearched(false);
                    setSearchOrderId('');
                  }}
                  className="pe-3 text-[#737373] hover:text-[#F5F3EF] transition-colors cursor-pointer"
                  title={isAr ? 'مسح' : 'Clear'}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded-lg transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>{isAr ? 'استعلام وتتبع' : 'Track Order'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-[11px] text-[#8c8c8c]">
            <span>{isAr ? 'أكواد سريعة للتجربة:' : 'Quick samples to try:'}</span>

            {orderHistory.length > 0 && (
              orderHistory.slice(0, 2).map((ord) => (
                <button
                  key={ord.id}
                  type="button"
                  onClick={() => handlePresetSample(ord.id)}
                  className="px-2.5 py-1 rounded-full bg-[#141414] hover:bg-[#1f1a10] border border-[#2a2a2a] hover:border-[#C6A76A]/50 text-[#C6A76A] font-mono font-medium transition-colors cursor-pointer"
                >
                  {isAr ? `طلبك (${ord.id})` : `Your Order (${ord.id})`}
                </button>
              ))
            )}

            <button
              type="button"
              onClick={() => handlePresetSample('OSL-849201')}
              className="px-2.5 py-1 rounded-full bg-[#141414] hover:bg-[#1f1a10] border border-[#2a2a2a] hover:border-[#C6A76A]/50 text-[#D4C39E] font-mono transition-colors cursor-pointer"
            >
              OSL-849201 ({isAr ? 'عينة تجريبية' : 'Demo'})
            </button>

            <button
              type="button"
              onClick={() => handlePresetSample('OSL-392105')}
              className="px-2.5 py-1 rounded-full bg-[#141414] hover:bg-[#1f1a10] border border-[#2a2a2a] hover:border-[#C6A76A]/50 text-[#D4C39E] font-mono transition-colors cursor-pointer"
            >
              OSL-392105
            </button>
          </div>
        </div>

        {/* Order Status Display Result Card */}
        {hasSearched ? (
          <div className="max-w-3xl mx-auto rounded-xl bg-[#0c0c0c] border border-[#262626] overflow-hidden shadow-2xl animate-fadeIn space-y-6">
            
            {/* Result Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#121212] via-[#16140e] to-[#121212] border-b border-[#222222] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-[#8c8c8c] uppercase tracking-wider">
                    {isAr ? 'رقم التتبع والطلب:' : 'Order Reference:'}
                  </span>
                  <span className="px-3 py-1 rounded bg-[#1c1912] border border-[#C6A76A]/40 font-mono font-bold text-sm sm:text-base text-[#F5F3EF] tracking-wider">
                    {activeDisplayId}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#737373]">
                  <Calendar className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>
                    {realOrder ? realOrder.createdAt : (isAr ? 'مسجل قبل قليل · 2026' : 'Placed recently · 2026')}
                  </span>
                  {realOrder ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      {isAr ? 'طلب موثق في جلستك' : 'Verified Session Order'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#1a170f] border border-[#C6A76A]/30 text-[#D4C39E]">
                      {isAr ? 'تتبع محاكاة الشحن الفوري' : 'Live Simulated Tracking'}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {realOrder ? (
                  realOrder.status === 'confirmed' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{isAr ? 'معتمد وجاري التوصيل' : 'Confirmed & In Transit'}</span>
                    </span>
                  ) : realOrder.status === 'cancelled' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-950/80 border border-rose-500/50 text-rose-300">
                      <X className="w-4 h-4 text-rose-400" />
                      <span>{isAr ? 'الطلب ملغي' : 'Order Cancelled'}</span>
                    </span>
                  ) : realOrder.status === 'paused' ? (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/50 text-amber-300">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span>{isAr ? 'الطلب معلق للمراجعة' : 'Order On Hold'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181408] border border-[#C6A76A]/40 text-[#C6A76A]">
                      <Clock className="w-4 h-4 animate-pulse text-[#C6A76A]" />
                      <span>{isAr ? 'بانتظار التواصل والتأكيد' : 'Pending Review & Contact'}</span>
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'في مرحلة الشحن السريع' : 'Out for Priority Delivery'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Order Items & Summary Preview */}
            <div className="px-5 sm:px-6">
              <div className="p-4 rounded-lg bg-[#111111] border border-[#222222] space-y-3">
                <span className="text-[11px] font-semibold text-[#8c8c8c] uppercase tracking-wider block">
                  {isAr ? 'محتويات الشحنة المسجلة:' : 'Recorded Shipment Contents:'}
                </span>

                {realOrder && realOrder.items && realOrder.items.length > 0 ? (
                  <div className="space-y-2">
                    {realOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded bg-[#090909] border border-[#1c1c1c]">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded object-cover bg-black border border-[#262626] shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <h4 className="font-semibold text-[#F5F3EF] truncate">
                            {isAr ? item.nameAr : item.nameEn}
                          </h4>
                          <div className="text-[11px] text-[#8c8c8c] mt-0.5">
                            {item.quantity} × {item.unitPrice} {isAr ? 'ر.س' : 'SAR'}
                          </div>
                        </div>
                        <div className="font-mono text-xs font-bold text-[#C6A76A]">
                          {item.subtotal} {isAr ? 'ر.س' : 'SAR'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3.5 p-2 rounded bg-[#090909] border border-[#1c1c1c]">
                    <img
                      src={featuredProduct.images[0]?.src}
                      alt={featuredProduct.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded object-cover bg-black border border-[#262626] shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <h4 className="font-semibold text-[#F5F3EF] text-sm truncate">
                        {realOrder ? (isAr ? realOrder.productNameAr : realOrder.productNameEn) : (isAr ? featuredProduct.nameAr : featuredProduct.nameEn)}
                      </h4>
                      <p className="text-[11px] text-[#8c8c8c] mt-0.5">
                        {isAr ? 'ساعة يد كلاسيكية فاخرة مع علبة التقديم الملكية' : 'Luxury Classic Timepiece in Presentation Box'}
                      </p>
                      <div className="font-mono text-xs font-bold text-[#C6A76A] mt-1">
                        {realOrder ? `${realOrder.totalAfterDiscount || realOrder.subtotal} ${isAr ? 'ر.س' : 'SAR'}` : `${featuredProduct.priceSAR} ${isAr ? 'ر.س' : 'SAR'}`}
                      </div>
                    </div>
                  </div>
                )}

                {/* Logistics details row */}
                <div className="pt-3 border-t border-[#1c1c1c] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#A3A3A3]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C6A76A] shrink-0" />
                    <div>
                      <span className="text-[#737373] block text-[10px]">{isAr ? 'شركة الشحن المعتمدة:' : 'Carrier:'}</span>
                      <span className="font-medium text-[#F5F3EF]">{carrierName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <div>
                      <span className="text-[#737373] block text-[10px]">{isAr ? 'رقم البوليصة والتتبع:' : 'Waybill Tracking:'}</span>
                      <span className="font-mono text-[#D4C39E] font-bold">{trackingNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTracking(trackingNumber)}
                      className="p-1 rounded bg-[#181818] hover:bg-[#242424] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#262626] transition-colors cursor-pointer"
                      title={isAr ? 'نسخ رقم التتبع' : 'Copy tracking number'}
                    >
                      {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Real order admin notes if provided */}
                {realOrder && realOrder.adminNotes && (
                  <div className="p-2.5 rounded bg-[#17140b] border border-[#C6A76A]/30 text-xs text-[#E8D7B5]">
                    <span className="font-semibold text-[#C6A76A]">{isAr ? 'ملاحظة خدمة العملاء: ' : 'Concierge Note: '}</span>
                    {realOrder.adminNotes}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Timeline Stages */}
            <div className="px-5 sm:px-6 space-y-4">
              <span className="text-xs font-semibold text-[#F5F3EF] uppercase tracking-wider block">
                {isAr ? 'المسار الزمني لمراحل التوصيل:' : 'Delivery Journey Checkpoints:'}
              </span>

              <div className="relative border-s-2 border-[#222222] ms-4 sm:ms-6 ps-6 space-y-6">
                {simulatedTimeline.map((item) => {
                  const isDone = item.status === 'completed';
                  const isCurrent = item.status === 'current';

                  return (
                    <div key={item.step} className="relative group">
                      {/* Milestone Dot on Axis */}
                      <div className={`absolute -start-[31px] sm:-start-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        isDone 
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                          : isCurrent 
                          ? 'bg-[#1e190e] border-[#C6A76A] text-[#C6A76A] shadow-[0_0_12px_rgba(198,167,106,0.6)] animate-pulse' 
                          : 'bg-[#141414] border-[#2a2a2a] text-[#555555]'
                      }`}>
                        {isDone ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <span className="text-[10px] font-mono font-bold">{item.step}</span>
                        )}
                      </div>

                      {/* Content Card */}
                      <div className={`p-4 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-[#131109] border-[#C6A76A]/40 shadow-md'
                          : isDone
                          ? 'bg-[#0f0f0f] border-[#222222]'
                          : 'bg-[#0a0a0a] border-[#1c1c1c] opacity-60'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className={`text-xs sm:text-sm font-semibold ${
                            isCurrent ? 'text-[#E8D7B5]' : isDone ? 'text-[#F5F3EF]' : 'text-[#888888]'
                          }`}>
                            {isAr ? item.titleAr : item.titleEn}
                          </h4>

                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isCurrent 
                              ? 'bg-[#C6A76A]/20 text-[#C6A76A] font-bold' 
                              : isDone 
                              ? 'bg-emerald-950/60 text-emerald-400' 
                              : 'bg-[#161616] text-[#666666]'
                          }`}>
                            {isAr ? item.timeAr : item.timeEn}
                          </span>
                        </div>

                        <p className="text-xs text-[#8c8c8c] mt-1.5 leading-relaxed">
                          {isAr ? item.descAr : item.descEn}
                        </p>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#666666] mt-2">
                          <MapPin className="w-3 h-3 text-[#C6A76A]" />
                          <span>{isAr ? item.locationAr : item.locationEn}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Concierge Contact */}
            <div className="p-5 sm:p-6 bg-[#090909] border-t border-[#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#8c8c8c]">
                <ShieldCheck className="w-4 h-4 text-[#C6A76A] shrink-0" />
                <span>
                  {isAr 
                    ? 'شحنتك مشمولة بضمان المعاينة والتسليم اليدوي الفاخر 🇸🇦' 
                    : 'Inspected and backed by OSOOL authenticity guarantee 🇸🇦'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={queryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setHasSearched(false);
                    setSearchOrderId('');
                  }}
                  className="p-2.5 rounded-lg bg-[#141414] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
                  title={isAr ? 'بحث عن طلب آخر' : 'Search another order'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Initial Empty State: Concierge Guarantees */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
            <div className="p-6 rounded-xl bg-[#0c0c0c] border border-[#1e1e1e] hover:border-[#C6A76A]/30 transition-all space-y-3 text-start">
              <div className="w-10 h-10 rounded-lg bg-[#16140d] border border-[#C6A76A]/30 flex items-center justify-center text-[#C6A76A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#F5F3EF]">
                {isAr ? 'الفحص المكتبي قبل التغليف' : 'Pre-Dispatch Quality Inspection'}
              </h3>
              <p className="text-xs text-[#8c8c8c] leading-relaxed">
                {isAr
                  ? 'تخضع كل قطعة لمعاينة دقيقة للتأكد من خلو الميناء من أي شوائب ودقة دوران العقارب وسلامة الحزام الجلدي.'
                  : 'Every single timepiece undergoes meticulous inspection for dial purity, time accuracy, and strap integrity.'}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0c0c0c] border border-[#1e1e1e] hover:border-[#C6A76A]/30 transition-all space-y-3 text-start">
              <div className="w-10 h-10 rounded-lg bg-[#16140d] border border-[#C6A76A]/30 flex items-center justify-center text-[#C6A76A]">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#F5F3EF]">
                {isAr ? 'تغليف الهدايا الملكي المحمي' : 'Bespoke Luxury Casing'}
              </h3>
              <p className="text-xs text-[#8c8c8c] leading-relaxed">
                {isAr
                  ? 'تصلك الساعة داخل علبة فاخرة مبطنة ببطانة مخملية واقية مع وسادة مخملية ومختومة بختم علامة أصول.'
                  : 'Delivered in a velvet-lined luxury presentation case with certificate and official seal.'}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0c0c0c] border border-[#1e1e1e] hover:border-[#C6A76A]/30 transition-all space-y-3 text-start">
              <div className="w-10 h-10 rounded-lg bg-[#16140d] border border-[#C6A76A]/30 flex items-center justify-center text-[#C6A76A]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-[#F5F3EF]">
                {isAr ? 'شحن سريع لكافة مدن المملكة' : 'Express Delivery across KSA'}
              </h3>
              <p className="text-xs text-[#8c8c8c] leading-relaxed">
                {isAr
                  ? 'شحن مباشر ومؤمن عبر أفضل الشركاء المحليين (سمسا، أرامكس) مع تتبع فوري حتى باب منزلك.'
                  : 'Direct, insured delivery through top national couriers with door-to-door tracking.'}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
