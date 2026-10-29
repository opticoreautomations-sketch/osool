import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { Compass, Feather, Eye } from 'lucide-react';

export const BrandPhilosophy: React.FC = () => {
  const { language } = useStore();
  const isAr = language === 'ar';

  const craftPillars = [
    {
      icon: Eye,
      titleEn: 'Visual Restraint',
      titleAr: 'الهدوء البصري',
      descriptionEn: 'A pristine matte obsidian dial unburdened by superfluous clutter. Only what matters is given space.',
      descriptionAr: 'ميناء أسود مطفي مستوحى من لون حجر البازلت، خالٍ من التعقيدات والتفاصيل الزائدة ليمنحك هدوءاً بصرياً راقياً.'
    },
    {
      icon: Feather,
      titleEn: 'Slim Ergonomic Silhouette',
      titleAr: 'نحافة وانسيابية المعصم',
      descriptionEn: 'Carefully proportioned 7.5mm thickness slips effortlessly under a tailored dress cuff or traditional thawb.',
      descriptionAr: 'سُمك متوازن 7.5 ملم ينساب بخفة وسلاسة تحت كم الثوب أو البدلة الرسمية دون ثقل أو بروز غير مريح.'
    },
    {
      icon: Compass,
      titleEn: 'Authentic Expression',
      titleAr: 'تعبير عن الأصالة',
      descriptionEn: 'Designed for men who let their personal presence and character speak before their accessories do.',
      descriptionAr: 'صُممت للرجل الذي يثق بأن حضوره وأصالته هي ما يمنح الأشياء قيمتها، وليس المظاهر الصاخبة.'
    }
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#050505] border-b border-[#1a1a1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Brand Story / Quote Block */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest text-[#C6A76A] uppercase font-semibold">
            <span>{isAr ? 'عن علامة أصول' : 'About OSOOL'}</span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'قصة البراند' : 'Brand Story'}</span>
          </div>

          <blockquote className="relative">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-serif-luxury text-[#F5F3EF] leading-relaxed italic text-balance">
              {isAr ? (
                <span className="font-serif-arabic font-normal not-italic block text-2xl sm:text-3xl lg:text-4xl leading-loose">
                  «{STORE_CONFIG.brandStory.quoteAr}»
                </span>
              ) : (
                <span>"{STORE_CONFIG.brandStory.quoteEn}"</span>
              )}
            </p>
          </blockquote>

          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-[#C6A76A]/40" />
            <span className="font-cinzel text-sm tracking-widest text-[#C6A76A] font-semibold">
              OSOOL | أصول
            </span>
            <div className="h-[1px] w-12 bg-[#C6A76A]/40" />
          </div>
        </div>

        {/* Craftsmanship & Design Section */}
        <div id="craftsmanship" className="mt-24 pt-16 border-t border-[#1a1a1a]">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="text-xs font-semibold tracking-widest text-[#C6A76A] uppercase">
              {isAr ? 'معايير التصميم' : 'Design Integrity'}
            </p>
            <h3 className="text-3xl font-serif-luxury text-[#F5F3EF]">
              {isAr ? (
                <span className="font-serif-arabic font-bold">حِرفية التفاصيل والجماليات الخالدة</span>
              ) : (
                <span>Craftsmanship & Timeless Silhouette</span>
              )}
            </h3>
            <p className="text-sm text-[#A3A3A3]">
              {isAr 
                ? 'نركز على تناغم النسب المعمارية وجودة التشطيب النهائي دون ادعاءات مبالغ فيها.'
                : 'Focusing on harmonious architectural proportions and refined finishes without inflated claims.'}
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {craftPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#C6A76A]/40 transition-colors space-y-4 text-start"
                >
                  <div className="w-10 h-10 rounded bg-[#141414] border border-[#262626] flex items-center justify-center text-[#C6A76A]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-serif-luxury font-semibold text-[#F5F3EF]">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h4>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
