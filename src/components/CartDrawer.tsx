import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Truck,
  ExternalLink,
  History,
  RotateCcw,
  CheckCircle2,
  Clock,
  PauseCircle,
  AlertCircle,
  XCircle,
  Tag,
  Percent,
  Sparkles
} from 'lucide-react';
import { SAUDI_CITIES, STORE_CONFIG, generateMultiItemWhatsAppOrderData, generateWhatsAppOrderData } from '../config/storeConfig';
import { getPromoDiscountType, getPromoDiscountValue } from '../types/store';

export const CartDrawer: React.FC = () => {
  const { 
    language, 
    products,
    product, 
    cartItems,
    cartQuantity, 
    isCartOpen, 
    closeCart, 
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    cartSubtotal,
    promoCodes,
    activePromoCode,
    appliedDiscount,
    cartFinalTotal,
    applyPromoCode,
    removePromoCode,
    checkoutStep,
    setCheckoutStep,
    customerPhone,
    setCustomerPhone,
    customerName,
    setCustomerName,
    customerCity,
    setCustomerCity,
    customerAddress,
    setCustomerAddress,
    preferredPayment,
    setPreferredPayment,
    completeCartCheckout,
    orderHistory,
    clearOrderHistory,
    removeDraftOrder,
    reorderDraft,
    latestSubmittedOrder,
    addToCart,
    navigateToOrderLookup
  } = useStore();

  const [activeTab, setActiveTab] = useState<'bag' | 'history'>('bag');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState<string>('');
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const isAr = language === 'ar';
  const latestOrder = orderHistory[0] || latestSubmittedOrder;

  const validateAndProceedToPhone = () => {
    if (cartQuantity <= 0) return;
    setCheckoutStep('phone_details');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean phone number
    const cleanPhone = customerPhone.trim().replace(/[\s-]/g, '');
    
    // Basic validation: must have at least 8 digits
    if (!cleanPhone || cleanPhone.length < 8) {
      setPhoneError(isAr ? 'يرجى إدخال رقم جوال صحيح للتواصل (مثال: 0501234567)' : 'Please enter a valid phone number (e.g. 0501234567)');
      return;
    }

    setPhoneError(null);
    completeCartCheckout();
  };

  const handleApplyPromo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promoInput.trim()) {
      setPromoFeedback({
        text: isAr ? 'يرجى كتابة كود الخصم أولاً' : 'Please type a promo code first',
        isError: true
      });
      return;
    }
    const result = applyPromoCode(promoInput);
    setPromoFeedback({
      text: result.message,
      isError: !result.success
    });
    if (result.success) {
      setPromoInput('');
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoFeedback({
      text: isAr ? 'تم إزالة كود الخصم' : 'Promo code removed',
      isError: false
    });
    setTimeout(() => setPromoFeedback(null), 2500);
  };

  // Preview message for step 2
  const effectiveItems = cartItems.length > 0 ? cartItems : [{ product, quantity: 1 }];
  const { messageText } = generateMultiItemWhatsAppOrderData(
    effectiveItems,
    {
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      preferredPayment,
      quantity: cartQuantity,
      promoCode: activePromoCode?.code,
      discountAmount: appliedDiscount > 0 ? appliedDiscount : undefined,
      finalTotal: cartFinalTotal
    },
    language
  );


  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="absolute inset-0"
        onClick={closeCart}
      />

      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex pl-0 sm:pl-10`}>
        <div 
          className="w-screen max-w-md bg-[#0a0a0a] border-x border-[#222222] shadow-2xl flex flex-col text-start z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#1c1c1c] bg-[#0e0e0e] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#161616] border border-[#262626] flex items-center justify-center text-[#C6A76A]">
                {activeTab === 'bag' ? <ShoppingBag className="w-4 h-4" /> : <History className="w-4 h-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-[#F5F3EF]">
                    {activeTab === 'history' 
                      ? (isAr ? 'سجل الطلبات السابقة' : 'Draft Order History')
                      : checkoutStep === 'cart' 
                        ? (isAr ? 'سلة المشتريات' : 'Your Shopping Bag')
                        : (isAr ? 'إضافة رقم الجوال للتأكيد' : 'Add Phone for WhatsApp Order')}
                  </h3>
                  {latestOrder && (
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      latestOrder.status === 'confirmed'
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        : latestOrder.status === 'cancelled'
                        ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                        : latestOrder.status === 'paused'
                        ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                        : 'bg-[#181408] border-[#C6A76A]/40 text-[#C6A76A]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        latestOrder.status === 'confirmed'
                          ? 'bg-emerald-400 animate-pulse'
                          : latestOrder.status === 'cancelled'
                          ? 'bg-rose-400'
                          : latestOrder.status === 'paused'
                          ? 'bg-amber-400'
                          : 'bg-[#C6A76A] animate-ping'
                      }`} />
                      <span>
                        {latestOrder.status === 'confirmed'
                          ? (isAr ? 'معتمد' : 'Confirmed')
                          : latestOrder.status === 'cancelled'
                          ? (isAr ? 'ملغي' : 'Cancelled')
                          : latestOrder.status === 'paused'
                          ? (isAr ? 'معلق' : 'On Hold')
                          : (isAr ? 'قيد المراجعة' : 'Pending')}
                      </span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8c8c8c] mt-0.5">
                  {activeTab === 'history'
                    ? `${orderHistory.length} ${isAr ? 'طلبات محفوظة في الجلسة' : 'saved orders in session'}`
                    : cartQuantity > 0 
                      ? `${cartQuantity} ${isAr ? 'قطعة مختارة' : 'item(s) selected'}` 
                      : (isAr ? 'السلة فارغة' : 'Bag is empty')}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded bg-[#161616] hover:bg-[#222222] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Luxury Segment Tabs: Current Bag vs Order History */}
          <div className="px-4 py-2 bg-[#090909] border-b border-[#1a1a1a] flex gap-2">
            <button
              onClick={() => setActiveTab('bag')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'bag'
                  ? 'bg-[#181818] text-[#F5F3EF] border border-[#333333] shadow-sm'
                  : 'text-[#8c8c8c] hover:text-[#F5F3EF]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C6A76A]" />
              <span>{isAr ? 'السلة الحالية' : 'Current Bag'}</span>
              {cartQuantity > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C6A76A] text-[#050505] text-[10px] font-bold font-mono flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#181818] text-[#F5F3EF] border border-[#333333] shadow-sm'
                  : 'text-[#8c8c8c] hover:text-[#F5F3EF]'
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#C6A76A]" />
              <span>{isAr ? 'سجل الطلبات' : 'Order History'}</span>
              {latestOrder && (
                <span 
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    latestOrder.status === 'confirmed'
                      ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : latestOrder.status === 'cancelled'
                      ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                      : latestOrder.status === 'paused'
                      ? 'bg-amber-400'
                      : 'bg-[#C6A76A] animate-pulse'
                  }`}
                  title={
                    latestOrder.status === 'confirmed'
                      ? (isAr ? 'طلب معتمد ومؤكد' : 'Confirmed Order')
                      : latestOrder.status === 'cancelled'
                      ? (isAr ? 'طلب ملغي' : 'Cancelled Order')
                      : (isAr ? 'طلب قيد المراجعة' : 'Pending Order')
                  }
                />
              )}
              {orderHistory.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#262626] text-[#C6A76A] text-[10px] font-mono font-medium">
                  {orderHistory.length}
                </span>
              )}
            </button>
          </div>

          {/* Live Order Status Visual Indicator Banner */}
          {latestOrder && (
            <div className={`p-4 border-b transition-all duration-300 ${
              latestOrder.status === 'confirmed'
                ? 'bg-[#06180f] border-emerald-500/40'
                : latestOrder.status === 'cancelled'
                ? 'bg-[#1b090b] border-rose-500/40'
                : latestOrder.status === 'paused'
                ? 'bg-[#181106] border-amber-500/40'
                : 'bg-[#141208] border-[#C6A76A]/30'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                    latestOrder.status === 'confirmed'
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                      : latestOrder.status === 'cancelled'
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                      : latestOrder.status === 'paused'
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'bg-[#C6A76A]/20 border-[#C6A76A]/50 text-[#C6A76A]'
                  }`}>
                    {latestOrder.status === 'confirmed' ? (
                      <CheckCircle2 className="w-4 h-4 animate-pulse" />
                    ) : latestOrder.status === 'cancelled' ? (
                      <XCircle className="w-4 h-4" />
                    ) : latestOrder.status === 'paused' ? (
                      <PauseCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4 animate-pulse" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#F5F3EF]">
                        {latestOrder.status === 'confirmed'
                          ? (isAr ? 'تم تأكيد واعتماد طلبك بنجاح' : 'Order Confirmed & Approved')
                          : latestOrder.status === 'cancelled'
                          ? (isAr ? 'تم إلغاء الطلب من الإدارة' : 'Order Cancelled by Admin')
                          : latestOrder.status === 'paused'
                          ? (isAr ? 'الطلب معلق مؤقتاً' : 'Order On Hold')
                          : (isAr ? 'طلبك قيد مراجعة المشرف' : 'Order Pending Concierge Review')}
                      </span>
                      <span className="text-[10px] font-mono text-[#C6A76A] font-semibold bg-[#181818] px-1.5 py-0.5 rounded border border-[#2a2a2a]">
                        #{latestOrder.id}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#A3A3A3] mt-0.5 leading-snug">
                      {latestOrder.status === 'confirmed'
                        ? (isAr ? 'اعتمدت الإدارة طلبك، وجارٍ التجهيز للشحن والتسليم لعنوانك.' : 'Admin confirmed and approved this order for delivery.')
                        : latestOrder.status === 'cancelled'
                        ? (isAr ? 'قام المشرف بإلغاء هذا الطلب. يمكنك إعادة الطلب أو التواصل معنا.' : 'This order has been marked as cancelled by store admin.')
                        : latestOrder.status === 'paused'
                        ? (isAr ? 'الطلب متوقف مؤقتاً لمراجعة العنوان أو التوفر.' : 'Order is on hold to verify shipping information.')
                        : (isAr ? 'سنتواصل معك عبر واتساب لتأكيد موعد التسليم وطريقة الدفع.' : 'Concierge team will contact you on WhatsApp to confirm.')}
                    </p>

                    {latestOrder.adminNotes && (
                      <div className="mt-1.5 p-1.5 rounded bg-black/40 border border-white/5 text-[10px] text-[#D4C39E]">
                        <span className="font-semibold text-[#C6A76A]">{isAr ? 'ملاحظة الإدارة: ' : 'Admin note: '}</span>
                        {latestOrder.adminNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge & Link */}
                <div className="shrink-0 flex flex-col items-end gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 border shadow-sm ${
                    latestOrder.status === 'confirmed'
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : latestOrder.status === 'cancelled'
                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                      : latestOrder.status === 'paused'
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-[#C6A76A]/20 border-[#C6A76A]/60 text-[#C6A76A]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      latestOrder.status === 'confirmed'
                        ? 'bg-emerald-400 animate-pulse'
                        : latestOrder.status === 'cancelled'
                        ? 'bg-rose-400'
                        : latestOrder.status === 'paused'
                        ? 'bg-amber-400'
                        : 'bg-[#C6A76A] animate-ping'
                    }`} />
                    <span>
                      {latestOrder.status === 'confirmed'
                        ? (isAr ? 'معتمد ومؤكد' : 'Confirmed')
                        : latestOrder.status === 'cancelled'
                        ? (isAr ? 'ملغي' : 'Cancelled')
                        : latestOrder.status === 'paused'
                        ? (isAr ? 'معلق مؤقتاً' : 'On Hold')
                        : (isAr ? 'قيد المراجعة' : 'Pending')}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    {activeTab !== 'history' && (
                      <button
                        onClick={() => setActiveTab('history')}
                        className="text-[10px] text-[#A3A3A3] hover:text-[#F5F3EF] hover:underline cursor-pointer"
                      >
                        {isAr ? 'السجل' : 'Record'}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        closeCart();
                        navigateToOrderLookup(latestOrder.id);
                      }}
                      className="text-[10px] text-[#C6A76A] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <Truck className="w-3 h-3" />
                      <span>{isAr ? 'تتبع مسار الشحنة ←' : 'Track Order →'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3-Step Live Timeline Indicator */}
              <div className="mt-3 pt-2.5 border-t border-white/5 grid grid-cols-3 gap-1.5 text-[10px]">
                {/* Step 1: Sent */}
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                  </div>
                  <span className="truncate">{isAr ? 'تم الإرسال' : 'Sent'}</span>
                </div>

                {/* Step 2: Admin Review */}
                <div className={`flex items-center gap-1.5 ${
                  latestOrder.status === 'confirmed'
                    ? 'text-emerald-400'
                    : latestOrder.status === 'cancelled'
                    ? 'text-rose-400'
                    : latestOrder.status === 'paused'
                    ? 'text-amber-400'
                    : 'text-[#C6A76A]'
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                    latestOrder.status === 'confirmed'
                      ? 'bg-emerald-500/20 border-emerald-500'
                      : latestOrder.status === 'cancelled'
                      ? 'bg-rose-500/20 border-rose-500'
                      : latestOrder.status === 'paused'
                      ? 'bg-amber-500/20 border-amber-500'
                      : 'bg-[#C6A76A]/20 border-[#C6A76A] animate-pulse'
                  }`}>
                    {latestOrder.status === 'confirmed' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : latestOrder.status === 'cancelled' ? (
                      <XCircle className="w-2.5 h-2.5" />
                    ) : (
                      <Clock className="w-2.5 h-2.5" />
                    )}
                  </div>
                  <span className="truncate">{isAr ? 'مراجعة المشرف' : 'Admin Review'}</span>
                </div>

                {/* Step 3: Resolution */}
                <div className={`flex items-center gap-1.5 ${
                  latestOrder.status === 'confirmed'
                    ? 'text-emerald-400 font-semibold'
                    : latestOrder.status === 'cancelled'
                    ? 'text-rose-400 font-semibold'
                    : 'text-[#555555]'
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${
                    latestOrder.status === 'confirmed'
                      ? 'bg-emerald-500/20 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : latestOrder.status === 'cancelled'
                      ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                      : 'bg-[#181818] border-[#333333]'
                  }`}>
                    {latestOrder.status === 'confirmed' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : latestOrder.status === 'cancelled' ? (
                      <XCircle className="w-2.5 h-2.5" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#444444]" />
                    )}
                  </div>
                  <span className="truncate">
                    {latestOrder.status === 'cancelled'
                      ? (isAr ? 'ملغي' : 'Cancelled')
                      : (isAr ? 'اعتماد وشحن' : 'Confirmed')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Drawer Content Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {activeTab === 'history' ? (
              /* TAB 2: ORDER HISTORY VIEW */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#A3A3A3] uppercase tracking-wider">
                    {isAr ? 'الطلبات المسجلة في هذه الجلسة' : 'Draft Orders Saved in Session'}
                  </span>
                  {orderHistory.length > 0 && (
                    <button
                      onClick={clearOrderHistory}
                      className="text-[11px] text-[#666666] hover:text-red-400 transition-colors cursor-pointer"
                    >
                      {isAr ? 'مسح السجل' : 'Clear All'}
                    </button>
                  )}
                </div>

                {orderHistory.length === 0 ? (
                  <div className="py-14 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#121212] border border-[#222222] flex items-center justify-center mx-auto text-[#666666]">
                      <History className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#F5F3EF]">
                      {isAr ? 'لا توجد طلبات سابقة بعد' : 'No previous draft orders yet'}
                    </h4>
                    <p className="text-xs text-[#737373] max-w-xs mx-auto leading-relaxed">
                      {isAr
                        ? 'عند إرسال أي طلب عبر واتساب، يتم تلقائياً حفظ نسخة من مسودة طلبك ورقم الجوال هنا للرجوع إليها وإعادة فتح المحادثة في أي وقت.'
                        : 'When you place a WhatsApp order, a draft receipt and chat link will automatically be saved here for easy review.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('bag')}
                      className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isAr ? 'الذهاب إلى السلة' : 'Go to Current Bag'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {orderHistory.map((order) => (
                      <div 
                        key={order.id}
                        className="p-4 rounded-lg bg-[#121212] border border-[#222222] hover:border-[#333333] transition-all space-y-3"
                      >
                        {/* Order Header & Status Badge */}
                        <div className="flex items-center justify-between border-b border-[#1c1c1c] pb-2 text-[11px]">
                          <div className="flex items-center gap-1.5 text-[#C6A76A] font-mono font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{order.id}</span>
                          </div>
                          <div className="text-[#666666] font-mono">
                            {order.createdAt}
                          </div>
                        </div>

                        {/* Order Lifecycle Status */}
                        <div className="flex items-center justify-between">
                          {order.status === 'confirmed' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{isAr ? 'تم التأكيد والاعتماد' : 'Order Confirmed'}</span>
                            </span>
                          ) : order.status === 'paused' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-300">
                              <PauseCircle className="w-3 h-3 text-amber-400" />
                              <span>{isAr ? 'الطلب معلق مؤقتاً' : 'Order On Hold'}</span>
                            </span>
                          ) : order.status === 'cancelled' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-950/60 border border-rose-500/40 text-rose-300">
                              <XCircle className="w-3 h-3 text-rose-400" />
                              <span>{isAr ? 'الطلب ملغي' : 'Order Cancelled'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#181408] border border-[#C6A76A]/40 text-[#C6A76A]">
                              <Clock className="w-3 h-3 animate-pulse text-[#C6A76A]" />
                              <span>{isAr ? 'قيد المراجعة بانتظار التواصل' : 'Pending Concierge Contact'}</span>
                            </span>
                          )}

                          {order.updatedAt && (
                            <span className="text-[10px] text-[#666666]">
                              {isAr ? 'تحديث:' : 'Updated:'} {order.updatedAt}
                            </span>
                          )}
                        </div>

                        {/* Admin Notes if provided */}
                        {order.adminNotes && (
                          <div className="p-2 rounded bg-[#16140d] border border-[#C6A76A]/20 text-[11px] text-[#D4C39E]">
                            <span className="font-semibold text-[#C6A76A]">{isAr ? 'ملاحظة المتجر: ' : 'Store note: '}</span>
                            {order.adminNotes}
                          </div>
                        )}

                        {/* Order Details: Multi-item or Single item */}
                        {order.items && order.items.length > 0 ? (
                          <div className="space-y-2 py-1 border-y border-[#1a1a1a]">
                            <div className="text-[11px] text-[#A3A3A3] font-medium">
                              {isAr ? `المنتجات المطلوبة (${order.items.length}):` : `Ordered Items (${order.items.length}):`}
                            </div>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-xs bg-[#090909] p-2 rounded border border-[#1c1c1c]">
                                  <img
                                    src={item.image}
                                    alt={item.nameEn}
                                    referrerPolicy="no-referrer"
                                    className="w-10 h-10 rounded object-cover bg-black border border-[#222222] shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-[#F5F3EF] truncate">
                                      {isAr ? item.nameAr : item.nameEn}
                                    </div>
                                    <div className="text-[10px] text-[#8c8c8c]">
                                      {item.quantity} × {item.unitPrice} {isAr ? 'ر.س' : 'SAR'} = <span className="font-mono text-[#C6A76A]">{item.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {order.promoCode && (
                              <div className="flex justify-between items-center text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-900/40">
                                <span className="flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  <span>{isAr ? `كود الخصم: ${order.promoCode}` : `Promo: ${order.promoCode}`}</span>
                                </span>
                                {order.discountAmount ? (
                                  <span className="font-mono">-{order.discountAmount} {isAr ? 'ر.س' : 'SAR'}</span>
                                ) : null}
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-1 text-xs font-mono font-bold text-[#C6A76A]">
                              <span>{isAr ? 'الإجمالي النهائي:' : 'Order Total:'}</span>
                              <div className="text-right">
                                {order.discountAmount && order.totalAfterDiscount !== undefined ? (
                                  <>
                                    <span className="line-through text-[#666666] text-[10px] block font-normal">{order.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                                    <span>{order.totalAfterDiscount} {isAr ? 'ر.س' : 'SAR'}</span>
                                  </>
                                ) : (
                                  <span>{order.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={order.productImage}
                                alt={order.productNameEn}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded object-cover bg-[#0a0a0a] border border-[#262626] shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-semibold text-[#F5F3EF] truncate">
                                  {isAr ? order.productNameAr : order.productNameEn}
                                </h5>
                                <div className="text-[11px] text-[#8c8c8c] mt-0.5">
                                  {order.quantity} × {order.unitPrice} {isAr ? 'ر.س' : 'SAR'}
                                </div>
                                <div className="text-xs font-mono font-bold text-[#C6A76A] mt-1">
                                  {isAr ? 'الإجمالي:' : 'Total:'} {order.totalAfterDiscount || order.subtotal} {isAr ? 'ر.س' : 'SAR'}
                                </div>
                              </div>
                            </div>
                            {order.promoCode && (
                              <div className="flex justify-between items-center text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-900/40">
                                <span className="flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  <span>{isAr ? `كود الخصم: ${order.promoCode}` : `Promo: ${order.promoCode}`}</span>
                                </span>
                                {order.discountAmount ? (
                                  <span className="font-mono">-{order.discountAmount} {isAr ? 'ر.س' : 'SAR'}</span>
                                ) : null}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Customer Info Tag */}
                        <div className="p-2.5 rounded bg-[#0b0b0b] border border-[#1a1a1a] text-[11px] space-y-1 text-[#8c8c8c]">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-[#A3A3A3]">
                              <Phone className="w-3 h-3 text-[#C6A76A]" />
                              <span>{isAr ? 'الجوال:' : 'Phone:'}</span>
                            </span>
                            <span className="font-mono text-[#F5F3EF]" dir="ltr">
                              {order.customerPhone}
                            </span>
                          </div>
                          {order.customerCity && (
                            <div className="flex items-center justify-between">
                              <span className="text-[#A3A3A3]">{isAr ? 'المدينة:' : 'City:'}</span>
                              <span className="text-[#D4D4D4]">{order.customerCity}</span>
                            </div>
                          )}
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <button
                            onClick={() => window.open(order.whatsappUrl, '_blank', 'noopener,noreferrer')}
                            className="flex-1 min-w-[110px] py-2 px-2 rounded bg-[#161616] hover:bg-[#202020] text-xs font-medium text-[#C6A76A] hover:text-[#D4B87D] border border-[#2a2a2a] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{isAr ? 'فتح في واتساب' : 'Open WhatsApp'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              closeCart();
                              navigateToOrderLookup(order.id);
                            }}
                            className="py-2 px-2.5 rounded bg-[#17140b] hover:bg-[#231d0e] text-xs font-medium text-[#C6A76A] hover:text-[#D4B87D] border border-[#C6A76A]/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            title={isAr ? 'تتبع مسار الشحنة' : 'Track Delivery'}
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تتبع الشحنة' : 'Track'}</span>
                          </button>

                          <button
                            onClick={() => {
                              reorderDraft(order);
                              setActiveTab('bag');
                            }}
                            className="py-2 px-2.5 rounded bg-[#141414] hover:bg-[#1a1a1a] text-xs font-medium text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#262626] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            title={isAr ? 'تحميل للسلة' : 'Reload to Bag'}
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>{isAr ? 'إعادة' : 'Re-order'}</span>
                          </button>

                          <button
                            onClick={() => removeDraftOrder(order.id)}
                            className="p-2 text-[#666666] hover:text-red-400 transition-colors cursor-pointer"
                            title={isAr ? 'حذف من السجل' : 'Delete'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#121212] border border-[#222222] flex items-center justify-center mx-auto text-[#666666]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="text-base font-medium text-[#F5F3EF]">
                  {isAr ? 'سلة المشتريات فارغة حالياً' : 'Your bag is empty'}
                </h4>
                <p className="text-xs text-[#888888] max-w-xs mx-auto">
                  {isAr 
                    ? 'أضف ساعات أصول إلى السلة للاستمتاع بالأناقة الهادئة وتأكيد طلبك مباشرة.'
                    : 'Add OSOOL timepieces to your bag to enjoy quiet luxury and finalize via WhatsApp.'}
                </p>
                <div className="space-y-3 pt-2 text-start">
                  <div className="text-[11px] text-[#C6A76A] font-semibold text-center">
                    {isAr ? 'اختر أي ساعة لإضافتها لسلتك:' : 'Select any timepiece to add to your bag:'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {products.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => addToCart(p, 1)}
                        className="p-2.5 rounded-lg bg-[#121212] hover:bg-[#181818] border border-[#222222] hover:border-[#C6A76A]/40 transition-all flex items-center gap-2 cursor-pointer text-start"
                      >
                        <img
                          src={p.images[0]?.src}
                          alt={p.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded object-cover bg-black border border-white/5 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-[#F5F3EF] truncate">
                            {isAr ? p.nameAr.split('(')[0].trim() : p.nameEn}
                          </div>
                          <div className="text-[11px] font-mono text-[#C6A76A] font-bold">
                            {p.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {orderHistory.length > 0 && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setActiveTab('history')}
                        className="px-4 py-1.5 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#262626] rounded transition-colors"
                      >
                        {isAr ? `عرض ${orderHistory.length} طلبات سابقة` : `View ${orderHistory.length} previous orders`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : checkoutStep === 'cart' ? (
              /* Step 1: Cart Items List */
              <div className="space-y-6">
                
                {/* Header with Clear All Button */}
                <div className="flex items-center justify-between text-xs pb-1 border-b border-[#1c1c1c]">
                  <span className="text-[#A3A3A3] font-medium">
                    {isAr ? `المنتجات في السلة (${cartQuantity} قطع):` : `Items in Bag (${cartQuantity} items):`}
                  </span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-[#737373] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    {isAr ? 'إفراغ السلة' : 'Clear Bag'}
                  </button>
                </div>

                {/* Multiple Products List in Cart */}
                <div className="space-y-3.5">
                  {cartItems.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-4 rounded-lg bg-[#121212] border border-[#222222] space-y-4 hover:border-[#2e2e2e] transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.images[0]?.src}
                          alt={item.product.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 rounded object-cover bg-[#070707] border border-[#262626] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-[#F5F3EF] truncate">
                              {isAr ? item.product.nameAr : item.product.nameEn}
                            </h4>
                            <button
                              onClick={() => removeCartItem(item.product.id)}
                              className="text-[#666666] hover:text-red-400 p-1 transition-colors cursor-pointer"
                              title={isAr ? 'حذف من السلة' : 'Remove item'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-xs text-[#A3A3A3] mt-0.5">
                            {isAr ? item.product.categoryAr : item.product.categoryEn}
                          </div>

                          <div className="mt-2 text-sm font-mono font-bold text-[#C6A76A]">
                            {item.product.priceSAR} {isAr ? item.product.currencyAr : item.product.currencyEn}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Line Total */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                        <div className="text-xs text-[#8c8c8c]">
                          <span>{isAr ? 'الإجمالي: ' : 'Total: '}</span>
                          <span className="font-mono font-semibold text-[#F5F3EF]">
                            {item.product.priceSAR * item.quantity} {isAr ? 'ر.س' : 'SAR'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#F5F3EF] flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-mono font-bold text-sm text-[#F5F3EF]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            className="w-7 h-7 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#F5F3EF] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping reassurance */}
                <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-[#1e1e1e] flex items-center gap-2.5 text-xs text-[#8c8c8c]">
                  <Truck className="w-4 h-4 text-[#C6A76A] shrink-0" />
                  <span>{isAr ? STORE_CONFIG.shippingCoverageAr : STORE_CONFIG.shippingCoverageEn}</span>
                </div>

                {/* Promo Code & Discounts Box */}
                <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#F5F3EF]">
                    <span className="flex items-center gap-1.5 text-[#C6A76A]">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{isAr ? 'كود الخصم أو العرض الترويجي' : 'Promo Code or Special Offer'}</span>
                    </span>
                    {activePromoCode && (
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        {isAr ? 'مُفعّل' : 'Applied'}
                      </span>
                    )}
                  </div>

                  {activePromoCode ? (
                    <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <div className="truncate">
                          <div className="font-mono font-bold text-emerald-300">
                            {activePromoCode.code}
                          </div>
                          <div className="text-[10px] text-emerald-400/80">
                            {isAr ? activePromoCode.descriptionAr : activePromoCode.descriptionEn}
                            {' · '}
                            {getPromoDiscountType(activePromoCode) === 'percentage' 
                              ? `خصم ${getPromoDiscountValue(activePromoCode)}%` 
                              : `خصم ${getPromoDiscountValue(activePromoCode)} ر.س`}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePromo}
                        className="p-1 rounded hover:bg-emerald-900/50 text-emerald-400 hover:text-emerald-200 transition-colors cursor-pointer"
                        title={isAr ? 'إلغاء الكود' : 'Remove promo code'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          if (promoFeedback) setPromoFeedback(null);
                        }}
                        placeholder={isAr ? 'أدخل الكود (مثال: OSOOL10)' : 'Enter code (e.g. OSOOL10)'}
                        className="flex-1 px-3 py-2 text-xs rounded bg-[#141414] border border-[#2b2b2b] text-[#F5F3EF] placeholder-[#555555] uppercase font-mono tracking-wider focus:border-[#C6A76A] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold rounded bg-[#1a1a1a] hover:bg-[#C6A76A] hover:text-[#050505] text-[#F5F3EF] border border-[#333333] transition-all cursor-pointer whitespace-nowrap"
                      >
                        {isAr ? 'تطبيق' : 'Apply'}
                      </button>
                    </form>
                  )}

                  {promoFeedback && (
                    <p className={`text-[11px] ${promoFeedback.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {promoFeedback.text}
                    </p>
                  )}
                </div>

                {/* Order Summary Pricing */}
                <div className="p-4 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#A3A3A3]">
                    <span>{isAr ? `المجموع الفرعي (${cartQuantity} قطع):` : `Subtotal (${cartQuantity} items):`}</span>
                    <span className="font-mono text-[#F5F3EF] font-medium">{cartSubtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        <span>{isAr ? `خصم الكود (${activePromoCode?.code}):` : `Promo Discount (${activePromoCode?.code}):`}</span>
                      </span>
                      <span className="font-mono">-{appliedDiscount} {isAr ? 'ر.س' : 'SAR'}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#A3A3A3]">
                    <span>{isAr ? 'الشحن والتوصيل:' : 'Estimated Delivery:'}</span>
                    <span className="text-[#C6A76A]">{isAr ? 'يحدد عبر واتساب' : 'Confirmed via WhatsApp'}</span>
                  </div>

                  <div className="pt-2 border-t border-[#1c1c1c] flex justify-between text-sm font-semibold text-[#F5F3EF]">
                    <span>{isAr ? 'الإجمالي بعد الخصم:' : 'Final Total:'}</span>
                    <div className="text-right">
                      {appliedDiscount > 0 && (
                        <span className="font-mono text-xs line-through text-[#666666] block">
                          {cartSubtotal} {isAr ? 'ر.س' : 'SAR'}
                        </span>
                      )}
                      <span className="font-mono text-base text-[#C6A76A]">
                        {cartFinalTotal} {isAr ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Step 2: Add Phone Number & Customer Coordinates */
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                
                {/* Back to Cart button */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#C6A76A] transition-colors cursor-pointer"
                >
                  {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                  <span>{isAr ? 'العودة لتعديل السلة' : 'Back to Cart items'}</span>
                </button>

                {/* Primary Field: Customer Phone Number */}
                <div className="p-4 rounded-lg bg-[#141414] border border-[#2a2a2a] space-y-2">
                  <label className="flex items-center justify-between text-xs font-semibold text-[#F5F3EF]">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#C6A76A]" />
                      <span>{isAr ? 'رقم الجوال للتواصل والتأكيد *' : 'Phone Number (Required) *'}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#C6A76A]">🇸🇦 966+</span>
                  </label>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder={isAr ? 'مثال: 0501234567' : 'e.g. 0501234567'}
                      className={`w-full px-3.5 py-2.5 text-sm rounded bg-[#0a0a0a] border text-[#F5F3EF] placeholder-[#555555] font-mono focus:outline-none ${
                        phoneError ? 'border-red-500' : 'border-[#333333] focus:border-[#C6A76A]'
                      }`}
                      dir="ltr"
                    />
                  </div>

                  {phoneError ? (
                    <p className="text-[11px] text-red-400">{phoneError}</p>
                  ) : (
                    <p className="text-[11px] text-[#737373]">
                      {isAr 
                        ? 'سيتم إرفاق رقم جوالك في رسالة الواتساب وحفظ مسودة الطلب في سجلك.' 
                        : 'Your phone will be sent via WhatsApp and saved to your session order history.'}
                    </p>
                  )}
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الاسم الكريم' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'مثال: فهد السالم' : 'e.g. Fahad Al-Salem'}
                    className="w-full px-3 py-2 text-xs rounded bg-[#121212] border border-[#262626] text-[#F5F3EF] placeholder-[#555555] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'المدينة في المملكة العربية السعودية' : 'City in Saudi Arabia'}
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-[#121212] border border-[#262626] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  >
                    {SAUDI_CITIES.map((city) => (
                      <option key={city.en} value={isAr ? city.ar : city.en}>
                        {isAr ? city.ar : city.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address / District */}
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الحي / العنوان (اختياري)' : 'District / Address (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder={isAr ? 'اسم الحي أو الشارع' : 'District or Street name'}
                    className="w-full px-3 py-2 text-xs rounded bg-[#121212] border border-[#262626] text-[#F5F3EF] placeholder-[#555555] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                {/* Preferred Payment */}
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'طريقة الدفع المفضلة' : 'Preferred Payment'}
                  </label>
                  <select
                    value={preferredPayment}
                    onChange={(e) => setPreferredPayment(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-[#121212] border border-[#262626] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  >
                    <option value={isAr ? 'تحويل بنكي مباشر' : 'Direct Bank Transfer'}>
                      {isAr ? 'تحويل بنكي مباشر' : 'Direct Bank Transfer'}
                    </option>
                    <option value={isAr ? 'بطاقة مدى / أبل باي' : 'Mada / Apple Pay'}>
                      {isAr ? 'بطاقة مدى / أبل باي' : 'Mada / Apple Pay'}
                    </option>
                    <option value={isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery (COD)'}>
                      {isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery (COD)'}
                    </option>
                  </select>
                </div>

                {/* WhatsApp Message Preview */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] text-[#737373] block">
                    {isAr ? 'نص رسالة الواتساب الجاهزة للإرسال:' : 'Prepared WhatsApp Message Preview:'}
                  </span>
                  <pre className="p-3 rounded bg-[#070707] border border-[#1f1f1f] text-[11px] font-mono text-[#A3A3A3] whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
                    {messageText}
                  </pre>
                </div>

              </form>
            )}

          </div>

          {/* Drawer Footer Actions (Only for bag tab) */}
          {activeTab === 'bag' && cartQuantity > 0 && (
            <div className="p-5 border-t border-[#1c1c1c] bg-[#0e0e0e] space-y-3">
              {checkoutStep === 'cart' ? (
                /* Step 1 CTA: Proceed to Phone Number */
                <button
                  onClick={validateAndProceedToPhone}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>{isAr ? 'متابعة وإضافة رقم الجوال' : 'Proceed to Add Phone Number'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              ) : (
                /* Step 2 CTA: Submit Order & Await Contact */
                <button
                  onClick={handleCheckoutSubmit}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wide text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isAr 
                      ? `إرسال الطلب وبانتظار التواصل (${cartFinalTotal} ر.س)`
                      : `Submit Order & Await Contact (${cartFinalTotal} SAR)`}
                  </span>
                </button>
              )}

              <p className="text-[11px] text-center text-[#888888] leading-relaxed">
                {isAr
                  ? '⏳ سيتم تسجيل طلبك فوراً وحفظه برقم تتبع. سيتواصل معك ممثل أصول هاتفياً أو عبر واتساب لتأكيد توفر المنتج، وتحديد موعد الشحن وطريقة الدفع.'
                  : '⏳ Your order will be recorded with a tracking ID. An OSOOL concierge will contact you via phone/WhatsApp to confirm availability, dispatch schedule, and payment.'}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
