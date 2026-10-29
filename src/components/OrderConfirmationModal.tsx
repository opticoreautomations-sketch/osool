import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Truck
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { 
    language, 
    isOrderSuccessModalOpen, 
    setIsOrderSuccessModalOpen, 
    latestSubmittedOrder,
    openCart,
    navigateToOrderLookup
  } = useStore();

  if (!isOrderSuccessModalOpen || !latestSubmittedOrder) return null;

  const isAr = language === 'ar';

  const order = latestSubmittedOrder;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Luxury Accent */}
        <div className="p-6 border-b border-[#1f1f1f] bg-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-950/50 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#F5F3EF]">
                {isAr ? 'تم استلام طلبك بنجاح!' : 'Order Received Successfully!'}
              </h3>
              <p className="text-xs text-[#8c8c8c] font-mono">
                {isAr ? 'رقم الطلب:' : 'Order Ref:'} <span className="text-[#C6A76A] font-bold">{order.id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderSuccessModalOpen(false)}
            className="p-1.5 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Status Banner */}
          <div className="p-4 rounded-lg bg-[#161309] border border-[#C6A76A]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A76A]">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>
                {isAr ? 'حالة الطلب: قيد المراجعة — بانتظار التواصل والتأكيد' : 'Status: Pending Review — Awaiting Concierge Contact'}
              </span>
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              {isAr
                ? 'تم تسجيل طلبك في نظام أصول. يرجى الانتظار، حيث سيقوم مسؤول خدمة العملاء بالتواصل معك مباشرة على رقم جوالك لتأكيد توفر المنتج، وترتيب موعد الشحن وطريقة الدفع المناسبة.'
                : 'Your order has been registered in the OSOOL system. Please wait while our concierge reviews the order and contacts you directly via your phone/WhatsApp to confirm dispatch and payment.'}
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block">
              {isAr ? 'مراحل تنفيذ طلبك' : 'Order Processing Steps'}
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-[11px] font-bold">
                  ✓
                </div>
                <span>{isAr ? 'تم استلام بيانات الطلب ورقم الجوال' : 'Order & Contact Info Received'}</span>
              </div>

              <div className="flex items-center gap-3 text-[#C6A76A] font-medium">
                <div className="w-5 h-5 rounded-full bg-[#1e190e] border border-[#C6A76A] flex items-center justify-center text-[11px] font-bold">
                  2
                </div>
                <span>{isAr ? 'مراجعة الإدارة والتواصل معك هاتفياً / واتساب (الخطوة الحالية)' : 'Admin Review & Direct Outreach (Current)'}</span>
              </div>

              <div className="flex items-center gap-3 text-[#666666]">
                <div className="w-5 h-5 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[11px]">
                  3
                </div>
                <span>{isAr ? 'تأكيد الطلب وتسليم الشحنة لشركة التوصيل' : 'Order Confirmation & Courier Handover'}</span>
              </div>
            </div>
          </div>

          {/* Order Details Card */}
          <div className="p-4 rounded-lg bg-[#121212] border border-[#222222] space-y-3">
            {order.items && order.items.length > 0 ? (
              <div className="space-y-2.5">
                <div className="text-[11px] font-medium text-[#A3A3A3]">
                  {isAr ? `المنتجات المطلوبة (${order.items.length}):` : `Ordered Watches (${order.items.length}):`}
                </div>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded bg-[#090909] border border-[#1e1e1e]">
                      <img
                        src={item.image}
                        alt={item.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded object-cover bg-black border border-[#262626] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-[#F5F3EF] truncate">
                          {isAr ? item.nameAr : item.nameEn}
                        </h4>
                        <div className="text-[11px] text-[#8c8c8c]">
                          {item.quantity} × {item.unitPrice} {isAr ? 'ر.س' : 'SAR'} = <span className="font-mono text-[#C6A76A] font-semibold">{item.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {order.promoCode && (
                  <div className="flex justify-between items-center text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1.5 rounded border border-emerald-900/40">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isAr ? `كود الخصم المطبق (${order.promoCode}):` : `Promo Applied (${order.promoCode}):`}</span>
                    </span>
                    {order.discountAmount ? (
                      <span className="font-mono font-bold">-{order.discountAmount} {isAr ? 'ر.س' : 'SAR'}</span>
                    ) : null}
                  </div>
                )}

                <div className="pt-2 border-t border-[#1a1a1a] flex justify-between items-center text-sm font-semibold text-[#F5F3EF]">
                  <span>{order.promoCode ? (isAr ? 'الإجمالي النهائي بعد الخصم:' : 'Final Total After Discount:') : (isAr ? 'إجمالي المنتجات قبل الشحن:' : 'Total Before Shipping:')}</span>
                  <div className="text-right">
                    {order.discountAmount && order.totalAfterDiscount !== undefined ? (
                      <>
                        <span className="line-through text-[#666666] text-xs block font-normal">{order.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                        <span className="font-mono text-[#C6A76A] font-bold text-base">{order.totalAfterDiscount} {isAr ? 'ر.س' : 'SAR'}</span>
                      </>
                    ) : (
                      <span className="font-mono text-[#C6A76A] font-bold">{order.subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={order.productImage}
                  alt={order.productNameEn}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded object-cover bg-[#0a0a0a] border border-[#2a2a2a] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#F5F3EF] truncate">
                    {isAr ? order.productNameAr : order.productNameEn}
                  </h4>
                  <div className="text-xs text-[#8c8c8c]">
                    {order.quantity} × {order.unitPrice} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                  <div className="text-sm font-mono font-bold text-[#C6A76A] mt-0.5">
                    {isAr ? 'المجموع:' : 'Subtotal:'} {order.subtotal} {isAr ? 'ر.س' : 'SAR'}
                  </div>
                </div>
              </div>
            )}

            {/* Customer coordinates summary */}
            <div className="pt-3 border-t border-[#1a1a1a] grid grid-cols-2 gap-2 text-[11px] text-[#A3A3A3]">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                <span className="font-mono text-[#F5F3EF]" dir="ltr">{order.customerPhone}</span>
              </div>

              {order.customerCity && (
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                  <span className="truncate">{order.customerCity}</span>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Direct Option */}
          <div className="p-3.5 rounded bg-[#0f0f0f] border border-[#222222] space-y-2">
            <div className="text-xs text-[#A3A3A3]">
              {isAr
                ? 'هل تفضل بدء المحادثة وتأكيد الطلب بنفسك الآن دون انتظار الاتصال؟'
                : 'Prefer to initiate the WhatsApp conversation yourself immediately?'}
            </div>
            <button
              onClick={() => window.open(order.whatsappUrl, '_blank', 'noopener,noreferrer')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-[#161616] hover:bg-[#1f1f1f] text-xs font-medium text-[#C6A76A] hover:text-[#D4B87D] border border-[#2e2e2e] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'فتح المحادثة عبر واتساب الآن' : 'Open WhatsApp Chat Now'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Luxury Order Status & Delivery Tracking CTA */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-[#14120a] to-[#0f0e0a] border border-[#C6A76A]/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1e1a0e] border border-[#C6A76A]/60 flex items-center justify-center text-[#C6A76A] shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F5F3EF]">
                  {isAr ? 'تتبع مسار شحنتك المباشر' : 'Track Your Watch Delivery'}
                </div>
                <div className="text-[11px] text-[#A3A3A3]">
                  {isAr ? `تابع مراحل الفحص والتجهيز والتسليم للرقم: ${order.id}` : `Follow live inspection, packaging and carrier dispatch: ${order.id}`}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                navigateToOrderLookup(order.id);
              }}
              className="shrink-0 px-3.5 py-2 rounded bg-[#C6A76A] hover:bg-[#D4B87D] text-[#050505] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>{isAr ? 'تتبع الشحنة' : 'Track Order'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1f1f1f] bg-[#121212] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                openCart();
              }}
              className="text-xs text-[#A3A3A3] hover:text-[#F5F3EF] underline cursor-pointer"
            >
              {isAr ? 'عرض سجل طلباتي' : 'View Order History'}
            </button>
            <span className="text-[#333]">•</span>
            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                navigateToOrderLookup(order.id);
              }}
              className="text-xs text-[#C6A76A] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{isAr ? 'تتبع الشحنة' : 'Track Order'}</span>
            </button>
          </div>

          <button
            onClick={() => setIsOrderSuccessModalOpen(false)}
            className="px-6 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer"
          >
            {isAr ? 'العودة للمتجر' : 'Continue Shopping'}
          </button>
        </div>

      </div>
    </div>
  );
};
