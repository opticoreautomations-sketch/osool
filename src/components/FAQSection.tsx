import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FAQ_ITEMS } from '../config/storeConfig';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { language, openOrderModal } = useStore();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const isAr = language === 'ar';

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0a0a0a] border-b border-[#1a1a1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <p className="text-xs font-semibold tracking-widest text-[#C6A76A] uppercase">
            {isAr ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury text-[#F5F3EF]">
            {isAr ? (
              <span className="font-serif-arabic font-bold">كل ما يهمك معرفته عن الطلب والتوصيل</span>
            ) : (
              <span>Everything You Need to Know</span>
            )}
          </h2>
          <p className="text-sm text-[#A3A3A3]">
            {isAr
              ? 'إجابات واضحة ومباشرة لتجربة تسوق راقية عبر واتساب.'
              : 'Clear, transparent answers for a seamless WhatsApp shopping experience.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-[#1e1e1e] border-y border-[#1e1e1e]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-5">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between text-start gap-4 focus:outline-none group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-medium text-[#F5F3EF] group-hover:text-[#C6A76A] transition-colors">
                    {isAr ? item.questionAr : item.questionEn}
                  </span>
                  <div
                    className={`p-1.5 rounded bg-[#141414] border border-[#262626] text-[#A3A3A3] group-hover:text-[#F5F3EF] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#C6A76A]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pb-2 text-sm text-[#A3A3A3] leading-relaxed animate-fadeIn">
                    <p>{isAr ? item.answerAr : item.answerEn}</p>
                    
                    {item.isConfigurableNote && (
                      <p className="mt-2 text-xs text-[#666666] italic">
                        {isAr 
                          ? '* ملاحظة للمالك: يمكن تعديل شروط هذا السؤال بسهولة من ملف storeConfig.ts'
                          : '* Store Owner Note: This policy answer is editable in storeConfig.ts'}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 rounded-lg bg-[#0e0e0e] border border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div>
            <h4 className="text-sm font-semibold text-[#F5F3EF]">
              {isAr ? 'لديك استفسار آخر لم يتم ذكره؟' : 'Have a question not listed here?'}
            </h4>
            <p className="text-xs text-[#8c8c8c] mt-0.5">
              {isAr ? 'تحدث مباشرة مع فريق أصول في أي وقت عبر واتساب' : 'Speak directly with our concierge team anytime on WhatsApp'}
            </p>
          </div>
          <button
            onClick={openOrderModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isAr ? 'تواصل مع خدمة العملاء' : 'Chat with Concierge'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
