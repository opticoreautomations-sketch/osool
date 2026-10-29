import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Truck, RotateCcw, Shield, FileText } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const PolicyModal: React.FC = () => {
  const { language, activePolicy, closePolicy } = useStore();

  if (!activePolicy || activePolicy === 'configGuide') return null;

  const isAr = language === 'ar';

  const renderContent = () => {
    switch (activePolicy) {
      case 'shipping':
        return {
          titleEn: 'Shipping & Delivery Policy',
          titleAr: 'سياسة الشحن والتوصيل',
          icon: Truck,
          content: isAr ? (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                نحرص في <strong className="text-[#F5F3EF]">أصول</strong> على إيصال ساعاتنا الفاخرة بعناية فائقة وتغليف وقائي مميز يضمن سلامة المنتج أثناء الشحن والنقل.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">مناطق التغطية:</h4>
                <p>نوفر الشحن والتوصيل إلى جميع مدن ومحافظات المملكة العربية السعودية 🇸🇦.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">مدة التوصيل التقديرية:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>المدن الرئيسية (الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة، الخبر): {STORE_CONFIG.standardDeliveryDays}.</li>
                  <li>بقية مدن ومحافظات المملكة: 3 إلى 5 أيام عمل.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">تأكيد الشحنة:</h4>
                <p>
                  بمجرد تأكيد طلبك مع ممثل خدمة العملاء عبر واتساب، يتم تجهيز الطلب وإرسال بوليصة الشحن ورابط التتبع مباشرة لمتابعة خط سير الشحنة حتى باب منزلك.
                </p>
              </div>
              <p className="text-[11px] text-[#666666] italic">
                * ملاحظة لمالك المتجر: يمكن تحديث مدن وشركات الشحن المعتمدة ورسوم التوصيل بسهولة في ملف الإعدادات storeConfig.ts.
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                At <strong className="text-[#F5F3EF]">OSOOL</strong>, we ensure each timepiece is securely inspected and packaged in protective luxury presentation casing before dispatch.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Shipping Coverage:</h4>
                <p>We deliver to all regions and municipalities across the Kingdom of Saudi Arabia 🇸🇦.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Estimated Transit Times:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Major urban hubs (Riyadh, Jeddah, Dammam, Makkah, Madinah, Khobar): {STORE_CONFIG.standardDeliveryDaysEn}.</li>
                  <li>Other Saudi cities and governorates: 3 to 5 business days.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Tracking & Confirmation:</h4>
                <p>
                  Upon confirming your order via our official WhatsApp concierge, your tracking link and courier details will be provided directly in your chat.
                </p>
              </div>
              <p className="text-[11px] text-[#666666] italic">
                * Store Owner Note: Shipping rates and transit windows can be modified in storeConfig.ts.
              </p>
            </div>
          )
        };

      case 'returns':
        return {
          titleEn: 'Returns & Exchange Policy',
          titleAr: 'سياسة الاسترجاع والاستبدال',
          icon: RotateCcw,
          content: isAr ? (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                رضاكم عن مقتنياتكم من أصول هو أولويتنا الأولى. نتيح لعملائنا في المملكة فحص الساعة والتأكد من ملاءمتها وفقاً للشروط التالية:
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">فترة المعاينة والاستبدال:</h4>
                <p>يمكن تقديم طلب الاستبدال أو الاسترجاع خلال <strong className="text-[#C6A76A]">7 أيام</strong> من تاريخ استلام الشحنة.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">شروط قبول الاسترجاع:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>أن تكون الساعة بحالتها الأصلية غير المستخدمة ودون أي خدوش أو علامات ارتداء.</li>
                  <li>بقاء ملصقات الحماية الشفافة على الزجاج والهيكل كما هي.</li>
                  <li>توفر علبة أصول الأصلية وكامل ملحقات التغليف.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">طريقة تقديم الطلب:</h4>
                <p>
                  يتم التواصل مباشرة مع فريق الدعم عبر محادثة واتساب الرسمية مع إرفاق صورة واضحة للساعة والعلبة لبدء الإجراءات.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                Your satisfaction is our cornerstone. We provide a straightforward inspection and exchange policy for customers across Saudi Arabia:
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Inspection Window:</h4>
                <p>Requests for exchange or returns may be initiated within <strong className="text-[#C6A76A]">7 days</strong> of delivery receipt.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Eligibility Criteria:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>The timepiece must remain unworn, with zero scratches or signs of wear.</li>
                  <li>Factory protective films on crystal and case must remain intact.</li>
                  <li>Original presentation box and packaging materials must be preserved.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">How to Initiate:</h4>
                <p>
                  Contact our WhatsApp concierge with your order reference and clear photographs of the timepiece in its packaging.
                </p>
              </div>
            </div>
          )
        };

      case 'privacy':
        return {
          titleEn: 'Privacy & Data Protection',
          titleAr: 'سياسة الخصوصية وحماية البيانات',
          icon: Shield,
          content: isAr ? (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                في <strong className="text-[#F5F3EF]">أصول</strong>، نقدر خصوصيتك تقديراً تاماً ولا نقوم بجمع أو تخزين بياناتك المصرفية أو بيع معلوماتك لأي طرف ثالث.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">طبيعة المعاملات:</h4>
                <p>
                  لا يتم حفظ أي أرقام بطاقات دفع على هذا الموقع. كافة المحادثات والبيانات اللوجستية (الاسم، المدينة، العنوان) تتم حصراً عبر تطبيق واتساب المشفر بين العميل وممثل المتجر المعتمد لإتمام توصيل الشحنة.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">استخدام البيانات:</h4>
                <p>تستخدم معلومات الشحن حصراً لغرض تسليم الطلب عبر مندوب أو شركة الشحن داخل المملكة العربية السعودية.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                At <strong className="text-[#F5F3EF]">OSOOL</strong>, your privacy is paramount. We do not store financial payment information on our servers.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">WhatsApp Communications:</h4>
                <p>
                  All order communications and delivery coordinates (Name, City, Delivery Address) take place directly through end-to-end encrypted WhatsApp messaging between the customer and our authorized representative.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Data Purpose:</h4>
                <p>Delivery information is solely utilized to dispatch your consignment via authorized domestic courier services in Saudi Arabia.</p>
              </div>
            </div>
          )
        };

      case 'terms':
        return {
          titleEn: 'Terms of Service',
          titleAr: 'الشروط والأحكام',
          icon: FileText,
          content: isAr ? (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                مرحباً بكم في متجر أصول الإلكتروني. باستخدامكم لهذا الموقع وإرسالكم طلبات الشراء عبر واتساب، فإنكم توافقون على الشروط والأحكام التالية:
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">الأسعار والتوافر:</h4>
                <p>
                  جميع الأسعار المعروضة بالريال السعودي (SAR). يتم تأكيد توفر الكميات وتكلفة الشحن النهائية قبل اعتماد الشحنة من خلال محادثة واتساب.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">آلية الشراء:</h4>
                <p>
                  يعد إرسال رسالة واتساب بمثابة طلب استفسار وشراء مباشر. لا تعتبر الشحنة مؤكدة إلا بعد رد ممثل المتجر وتأكيد العنوان ورقم المستلم.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              <p>
                Welcome to OSOOL. By browsing our website and ordering via WhatsApp, you acknowledge the following terms of service:
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Pricing & Inventory:</h4>
                <p>
                  All quoted prices are in Saudi Riyals (SAR). Final delivery arrangements and shipping fees are confirmed directly through WhatsApp before consignment dispatch.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#F5F3EF]">Order Process:</h4>
                <p>
                  Orders are confirmed upon explicit mutual agreement via our WhatsApp concierge. Consignments are dispatched once delivery address and recipient details are verified.
                </p>
              </div>
            </div>
          )
        };

      default:
        return null;
    }
  };

  const policyData = renderContent();
  if (!policyData) return null;

  const IconComponent = policyData.icon;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-xl bg-[#0d0d0d] border border-[#262626] rounded-xl shadow-2xl overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f1f1f] bg-[#121212]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-[#C6A76A]">
              <IconComponent className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#F5F3EF]">
              {isAr ? policyData.titleAr : policyData.titleEn}
            </h3>
          </div>

          <button
            onClick={closePolicy}
            className="p-1.5 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {policyData.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1f1f1f] bg-[#121212] flex justify-end">
          <button
            onClick={closePolicy}
            className="px-5 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer"
          >
            {isAr ? 'فهمت ذلك' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
