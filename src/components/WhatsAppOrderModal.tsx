import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  MessageCircle, 
  Copy, 
  Check, 
  Plus, 
  Minus, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { SAUDI_CITIES, STORE_CONFIG, generateWhatsAppOrderData } from '../config/storeConfig';

export const WhatsAppOrderModal: React.FC = () => {
  const { 
    language, 
    isOrderModalOpen, 
    closeOrderModal, 
    products,
    product, 
    selectedProductId,
    setSelectedProductId,
    quantity, 
    setQuantity, 
    incrementQuantity, 
    decrementQuantity,
    customerPhone,
    setCustomerPhone,
    customerName,
    setCustomerName,
    customerCity,
    setCustomerCity,
    customerAddress,
    setCustomerAddress,
    preferredPayment,
    setPreferredPayment
  } = useStore();

  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOrderModalOpen) return null;

  const isAr = language === 'ar';

  const { messageText, whatsappUrl } = generateWhatsAppOrderData(
    product,
    quantity,
    {
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      preferredPayment,
      quantity,
      notes
    },
    language
  );

  const subtotal = product.priceSAR * quantity;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#262626] rounded-xl shadow-2xl overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f1f1f] bg-[#121212]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-[#C6A76A]">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#F5F3EF]">
                {isAr ? `طلب ${product.nameAr} عبر واتساب` : `Order ${product.nameEn} via WhatsApp`}
              </h3>
              <p className="text-xs text-[#8c8c8c]">
                {isAr ? 'إرسال مباشر إلى ممثل خدمة العملاء' : 'Direct dispatch to customer concierge'}
              </p>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="p-1.5 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Multi-product quick selector */}
          {products.length > 1 && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#A3A3A3] block">
                {isAr ? 'موديل الساعة المختار:' : 'Selected Timepiece Model:'}
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#141414] border border-[#2a2a2a] focus:border-[#C6A76A] rounded-lg text-xs text-[#F5F3EF] outline-none cursor-pointer"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {isAr ? p.nameAr : p.nameEn} — {p.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Order Summary Pill */}
          <div className="p-4 rounded-lg bg-[#141414] border border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={product.images[0]?.src || ''}
                alt={product.nameEn}
                referrerPolicy="no-referrer"
                className="w-14 h-14 object-cover rounded bg-[#0a0a0a] border border-[#262626]"
              />
              <div>
                <h4 className="text-sm font-semibold text-[#F5F3EF]">
                  {isAr ? product.nameAr : product.nameEn}
                </h4>
                <div className="text-xs text-[#A3A3A3]">
                  {product.priceSAR} {isAr ? product.currencyAr : product.currencyEn} {isAr ? 'للقطعة' : 'per piece'}
                </div>
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-[#222222] pt-2 sm:pt-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-1.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] disabled:opacity-40 text-[#F5F3EF] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono font-bold text-sm text-[#F5F3EF] w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 10}
                  className="p-1.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] disabled:opacity-40 text-[#F5F3EF] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-end">
                <div className="text-[11px] text-[#737373]">{isAr ? 'الإجمالي' : 'Subtotal'}</div>
                <div className="font-mono font-bold text-base text-[#C6A76A]">
                  {subtotal} {isAr ? 'ر.س' : 'SAR'}
                </div>
              </div>
            </div>
          </div>

          {/* Optional Pre-fill Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#C6A76A] uppercase tracking-wider">
                {isAr ? 'بيانات التوصيل (اختيارية لتسريع الطلب)' : 'Delivery Details (Optional)'}
              </span>
              <span className="text-[11px] text-[#666666]">
                {isAr ? 'تُضمّن في رسالة الواتساب' : 'Pre-fills in message'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-[#F5F3EF] mb-1">
                  <span>{isAr ? 'رقم الجوال *' : 'Phone Number *'}</span>
                  <span className="text-[10px] text-[#C6A76A] ms-1 font-mono">(966+)</span>
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={isAr ? 'مثال: 0501234567' : 'e.g. 0501234567'}
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder-[#555555] font-mono focus:border-[#C6A76A] focus:outline-none"
                  dir="ltr"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                  {isAr ? 'الاسم الكريم' : 'Your Name'}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isAr ? 'مثال: عبد العزيز المحمد' : 'e.g. Abdulaziz Al-Mohammad'}
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder-[#555555] focus:border-[#C6A76A] focus:outline-none"
                />
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                  {isAr ? 'المدينة' : 'City in Saudi Arabia'}
                </label>
                <select
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
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
                  {isAr ? 'الحي / العنوان' : 'District / Address'}
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={isAr ? 'مثال: حي النخيل، شارع الأمير...' : 'e.g. Al Nakheel District...'}
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder-[#555555] focus:border-[#C6A76A] focus:outline-none"
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
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
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
            </div>
          </div>

          {/* Live Message Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A3A3A3] font-medium">
                {isAr ? 'معاينة نص الرسالة التي ستُرسل إلى واتساب:' : 'Live WhatsApp Message Preview:'}
              </span>
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-[#C6A76A] hover:text-[#D4B87D] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ النص' : 'Copy Text')}</span>
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-[#080808] border border-[#222222] text-xs font-mono text-[#D4D4D4] whitespace-pre-wrap leading-relaxed select-all">
              {messageText}
            </pre>
          </div>

          {/* Important Transparency Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded bg-[#16130b] border border-[#C6A76A]/20 text-xs text-[#C6A76A]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {isAr
                ? 'تنبيه الشفافية: عند الضغط على الزر بالأسفل سيتم فتح تطبيق واتساب مباشرة. لن يتم خصم أي مبالغ من هذا الموقع. يجب إرسال الرسالة إلى حساب أصول لتأكيد الطلب وتحديد موعد الشحن.'
                : 'Transparency Notice: Clicking the button below opens WhatsApp directly. No payment is charged online. You must send the WhatsApp message to submit your inquiry and arrange delivery with OSOOL.'}
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#1f1f1f] bg-[#121212] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#8c8c8c] text-center sm:text-start">
            <span>{isAr ? 'رقم خدمة العملاء والواتساب:' : 'Support & WhatsApp Line:'}</span>{' '}
            <span className="font-mono text-[#C6A76A]" dir="ltr">{STORE_CONFIG.displayPhoneNumber || '054 8691874'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={closeOrderModal}
              className="w-1/3 sm:w-auto px-4 py-2.5 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] rounded border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="w-2/3 sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'فتح واتساب وإرسال الطلب' : 'Open WhatsApp & Send Order'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
