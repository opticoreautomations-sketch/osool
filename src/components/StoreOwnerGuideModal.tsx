import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Settings, CheckCircle2, Phone, Image, FileText, Truck, Shield } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const StoreOwnerGuideModal: React.FC = () => {
  const { isOwnerGuideOpen, toggleOwnerGuide, language } = useStore();

  if (!isOwnerGuideOpen) return null;

  const isAr = language === 'ar';

  const checklistItems = [
    {
      icon: Phone,
      titleEn: '1. WhatsApp Business Number',
      titleAr: '١. رقم واتساب للأعمال الرسمي',
      file: 'src/config/storeConfig.ts -> whatsappNumber',
      current: '054 8691874 (966548691874)',
      actionEn: 'Official Saudi WhatsApp line configured (054 8691874 / 966548691874).',
      actionAr: 'تم تعيين رقم واتساب المتجر الرسمي المعتمد (054 8691874 / 966548691874).'
    },
    {
      icon: FileText,
      titleEn: '2. Confirmed Watch Specifications',
      titleAr: '٢. تأكيد المواصفات الفنية مع المورد',
      file: 'src/config/storeConfig.ts -> OSOOL_PRODUCT.specifications',
      current: 'Case diameter: 40mm, Profile: 7.5mm, 3 ATM water resistance',
      actionEn: 'Verify exact movement (e.g., Seiko quartz, Miyota, or customized), water resistance rating, and strap material before marketing.',
      actionAr: 'تأكد من نوع ماكينة الساعة بدقة (كوارتز ياباني، سويسري، إلخ)، درجة مقاومة الماء، ونوع الحزام مع المورد قبل بدء الحملات الإعلانية.'
    },
    {
      icon: Truck,
      titleEn: '3. Shipping Partner & Delivery Rates',
      titleAr: '٣. شركة الشحن ورسوم التوصيل',
      file: 'src/config/storeConfig.ts -> standardDeliveryDays / shippingCoverage',
      current: STORE_CONFIG.standardDeliveryDays,
      actionEn: 'Partner with local Saudi logistics (e.g., SMSA, Aramex, RedBox, or SPL) and confirm fixed shipping fee or free shipping threshold.',
      actionAr: 'اتفق مع شركة الشحن المعتمدة في المملكة (مثل سمسا، أرامكس، سبل، أو ريدبوكس) وحدد هل التوصيل مجاني أو برسوم إضافية يتم إبلاغ العميل بها في الواتساب.'
    },
    {
      icon: Image,
      titleEn: '4. Physical Batch Photography',
      titleAr: '٤. صور الدفعة الفعلية للساعة',
      file: 'src/config/storeConfig.ts -> OSOOL_PRODUCT.images',
      current: '4 studio luxury images generated & included',
      actionEn: 'When the physical production stock arrives in Saudi Arabia, capture authentic high-resolution studio shots of your packaging and watch.',
      actionAr: 'عند وصول الدفعة الفعلية للمملكة، التقط صوراً حقيقية واضحة للعلبة والتغليف وساعة أصول نوار لتعزيز ثقة العميل.'
    },
    {
      icon: Shield,
      titleEn: '5. Return & Warranty Rules',
      titleAr: '٥. سياسة الضمان والاسترجاع المعتمدة',
      file: 'src/config/storeConfig.ts -> FAQ_ITEMS & PolicyModal.tsx',
      current: '7 days inspection window',
      actionEn: 'Confirm your warranty terms (e.g. 1-year movement warranty) once you have warranty cards printed for your brand.',
      actionAr: 'اعتمد مدة الضمان على الماكينة (سنة أو سنتين) بعد طباعة كروت الضمان الخاصة ببراند أصول داخل العلبة.'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#0e0e0e] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#222222] bg-[#141414]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#333333] flex items-center justify-center text-[#C6A76A]">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#F5F3EF]">
                {isAr ? 'دليل إطلاق المتجر وتعديل البيانات للمالك' : 'Store Owner Pre-Launch Configuration'}
              </h3>
              <p className="text-xs text-[#8c8c8c]">
                {isAr ? 'قائمة القيم والإعدادات الواجب تخصيصها قبل الإطلاق التجاري' : 'Mandatory values to configure before public advertising'}
              </p>
            </div>
          </div>

          <button
            onClick={toggleOwnerGuide}
            className="p-1.5 rounded bg-[#1c1c1c] hover:bg-[#282828] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#333333] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          <div className="p-3.5 rounded bg-[#16130a] border border-[#C6A76A]/30 text-xs text-[#C6A76A] leading-relaxed">
            {isAr
              ? 'مرحباً بك! تم بناء هذا المتجر ليعمل بنظام تحويل مباشر بنسبة 100% إلى محادثات واتساب دون تعقيدات بوابات الدفع. جميع المتغيرات مجمعة في ملف مركزي واحد src/config/storeConfig.ts لتسهيل التعديل في ثوانٍ.'
              : 'Welcome! This storefront is engineered for 100% conversion directly into WhatsApp order inquiries with zero payment gateway barriers. All settings are centralized in src/config/storeConfig.ts.'}
          </div>

          <div className="space-y-4">
            {checklistItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-4 rounded-lg bg-[#121212] border border-[#222222] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F3EF]">
                      <IconComp className="w-4 h-4 text-[#C6A76A]" />
                      <span>{isAr ? item.titleAr : item.titleEn}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] text-[#A3A3A3] border border-[#2a2a2a]">
                      {item.file}
                    </span>
                  </div>

                  <p className="text-xs text-[#A3A3A3] leading-relaxed">
                    {isAr ? item.actionAr : item.actionEn}
                  </p>

                  <div className="text-[11px] font-mono text-[#737373] pt-1 border-t border-[#1a1a1a]">
                    <span>{isAr ? 'القيمة الحالية:' : 'Current Value:'}</span>{' '}
                    <span className="text-[#C6A76A]">{item.current}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#222222] bg-[#141414] flex justify-end">
          <button
            onClick={toggleOwnerGuide}
            className="px-5 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق الدليل' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
