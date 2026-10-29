import { Product, FAQItem, WhatsAppOrderDetails, PromoCode, StoreOfferBanner } from '../types/store';

/**
 * ============================================================================
 * OSOOL (أصول) — STORE CONFIGURATION
 * ============================================================================
 * 
 * STORE OWNER: Update the values below to match your live business settings:
 * 1. WHATSAPP_NUMBER: Your Saudi WhatsApp Business phone number in international format
 *    (without '+' or spaces, e.g. "9665XXXXXXXX").
 * 2. SPECIFICATIONS: Update with your manufacturer-verified watch dimensions & movement.
 * 3. POLICIES & DELIVERY: Update cities, transit times, and return terms.
 */

export const STORE_CONFIG = {
  brandNameEn: 'OSOOL',
  brandNameAr: 'أصول',
  brandTaglineEn: 'Time, Defined by You.',
  brandTaglineAr: 'وقتك.. يعكس أصولك.',
  
  // WhatsApp business number (without '+' or spaces). Format: 9665XXXXXXXX
  whatsappNumber: '966548691874',
  displayPhoneNumber: '054 8691874',
  displayPhoneInternational: '+966 54 869 1874',
  
  // Social links
  instagramHandle: '@osool.sa',
  instagramUrl: 'https://instagram.com', // STORE_OWNER_TODO: Replace with official Instagram page URL
  supportEmail: 'concierge@osool.sa',

  // Delivery configuration (Saudi Arabia)
  standardDeliveryDays: '2 - 4 أيام عمل',
  standardDeliveryDaysEn: '2 - 4 Business Days',
  shippingCoverageAr: 'توصيل متاح لكافة مناطق ومدن المملكة العربية السعودية 🇸🇦',
  shippingCoverageEn: 'Delivery available to all cities across Saudi Arabia 🇸🇦',

  // Brand Story from official brand brief
  brandStory: {
    quoteAr: 'تأسست أصول على قناعة راسخة بأن الفخامة الحقيقية لا تحتاج إلى صخب. إنها تتجلى في أدق التفاصيل، وفي التصميم الهادئ، وفي ثقة ارتداء قطعة تعبر عن أصالتك ومكانتك. تجمع أصول بين الجماليات الخالدة والأناقة اليومية.',
    quoteEn: 'OSOOL is built around the belief that true luxury does not need to be loud. It lives in the details, the design, and the confidence of wearing something that reflects who you are. OSOOL brings timeless aesthetics into everyday life.',
    missionTitleAr: 'فلسفة التصميم والأصالة',
    missionTitleEn: 'Design Philosophy & Quiet Luxury',
    missionBodyAr: 'صُممت ساعة أصول نوار للرجل العصري في المملكة الذي يبحث عن الأناقة الراقية والخطوط البسيطة. توازن متقن بين السطح الأسود المطفي واللمسات الذهبية الشامبانيا الخافتة، لتكون رفيقاً مثالياً في كل مناسبة واجتماع.',
    missionBodyEn: 'The OSOOL Noir timepiece is tailored for the discerning modern gentleman across Saudi Arabia who values sleek restraint over ostentation. A masterful balance of deep obsidian matte finishes and subtle champagne gold accents.'
  }
};

/**
 * Featured Single Product: OSOOL Noir
 * Target retail price: SAR 229 (Within SAR 199 - 249 brand positioning)
 */
export const OSOOL_PRODUCT: Product = {
  id: 'osool-noir',
  nameEn: 'OSOOL Noir',
  nameAr: 'أصول نوار',
  taglineEn: 'Minimalist Black Timepiece with Champagne Gold Accents',
  taglineAr: 'ساعة سوداء كلاسيكية فاخرة بلمسات ذهبية شامبانيا هادئة',
  categoryEn: 'Minimalist Black Watch',
  categoryAr: 'ساعة سوداء كلاسيكية بسيطة',
  priceSAR: 229,
  currencyEn: 'SAR',
  currencyAr: 'ر.س',
  inStock: true,
  stockStatusEn: 'In Stock · Ready to Dispatch',
  stockStatusAr: 'متوفر للطلب الفوري · شحن سريع',
  shortDescriptionEn: 'A statement of quiet luxury. Engineered with a deep obsidian matte black dial, understated champagne gold markers, and an ultra-slim profile for effortless everyday sophistication.',
  shortDescriptionAr: 'تعبير نقي عن الفخامة الهادئة. ميناء أسود مطفي مستوحى من حجر البازلت الأسود مع مؤشرات ذهبية شامبانيا دقيقة وتصميم فائق النحافة يمنحك حضوراً واثقاً في كل تفصيل.',
  fullDescriptionEn: 'Crafted for those who understand that presence is felt, not proclaimed. OSOOL Noir embodies architectural minimalism with its sleek black casing and balanced proportions, offering luxury aesthetics at an accessible price point for the modern Saudi gentleman.',
  fullDescriptionAr: 'صيغت لمن يدرك أن الهيبة تُحس ولا تُعلن. تجسد ساعة أصول نوار البساطة المعمارية الراقية بهيكل أسود مطفي متناسق الأبعاد وخامات مدروسة تمنحك إحساس الساعات السويسرية الفاخرة بسعر استثنائي ومناسب.',
  
  images: [
    {
      id: 'hero',
      src: '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg',
      altEn: 'OSOOL Noir minimalist black luxury watch on volcanic basalt stone',
      altAr: 'ساعة أصول نوار الفاخرة باللون الأسود على صخرة بازلتية',
      labelEn: 'Front Perspective',
      labelAr: 'المشهد الرئيسي'
    },
    {
      id: 'dial',
      src: '/src/assets/images/product_osool_noir_dial_1793109556834.jpg',
      altEn: 'Close up macro view of OSOOL Noir matte black dial and champagne gold indices',
      altAr: 'لقطة مقربة لميناء أصول نوار الأسود والمؤشرات الذهبية الرفيعة',
      labelEn: 'Dial & Hands Macro',
      labelAr: 'تفاصيل الميناء والعقارب'
    },
    {
      id: 'profile',
      src: '/src/assets/images/product_osool_noir_profile_1793109558767.jpg',
      altEn: 'Side profile angle showing ultra-slim case geometry and textured black strap',
      altAr: 'المنظور الجانبي يوضح نحافة الهيكل والتاج المنحوت وسوار الساعة',
      labelEn: 'Case Profile & Crown',
      labelAr: 'نحافة الهيكل والتاج'
    },
    {
      id: 'lifestyle',
      src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
      altEn: 'Modern Saudi gentleman wearing OSOOL Noir on the wrist with tailored charcoal cuff',
      altAr: 'ساعة أصول نوار على المعصم بإطلالة يومية أنيقة وفاخرة',
      labelEn: 'On the Wrist',
      labelAr: 'على المعصم'
    }
  ],

  specifications: [
    {
      id: 'case_diameter',
      labelEn: 'Case Diameter',
      labelAr: 'قطر الهيكل',
      valueEn: '40 mm (Universal classic fit)',
      valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
      isPlaceholderNote: true
    },
    {
      id: 'case_thickness',
      labelEn: 'Case Profile',
      labelAr: 'سُمك الهيكل',
      valueEn: '7.5 mm (Ultra-slim lightweight)',
      valueAr: '7.5 ملم (فائق النحافة وانسيابي)',
      isPlaceholderNote: true
    },
    {
      id: 'dial_color',
      labelEn: 'Dial Finish',
      labelAr: 'لون وتشطيب الميناء',
      valueEn: 'Matte Obsidian Black with Champagne Gold Indices',
      valueAr: 'أسود مطفي داكن مع مؤشرات بلون الذهب الشامبانيا',
      isPlaceholderNote: false
    },
    {
      id: 'strap_material',
      labelEn: 'Strap Material',
      labelAr: 'نوع وحزام الساعة',
      valueEn: 'Matte Black Textured Leather / Premium Silicone [Placeholder]',
      valueAr: 'حزام أسود مطفي فاخر محكم الإغلاق [قابل للتعديل]',
      isPlaceholderNote: true
    },
    {
      id: 'movement',
      labelEn: 'Movement Type',
      labelAr: 'نوع الحركة',
      valueEn: 'High-Precision Electronic Quartz [Placeholder]',
      valueAr: 'حركة كوارتز عالية الدقة [قابل للتعديل]',
      isPlaceholderNote: true
    },
    {
      id: 'water_resistance',
      labelEn: 'Water Resistance',
      labelAr: 'مقاومة الماء',
      valueEn: 'Daily Splash Resistance (3 ATM) [Placeholder - verify with supplier]',
      valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM) [يرجى التأكيد من المورد]',
      isPlaceholderNote: true
    }
  ]
};

/**
 * Signature Multiple Product Lineup for OSOOL
 */
export const DEFAULT_PRODUCTS: Product[] = [
  OSOOL_PRODUCT,
  {
    id: 'osool-dore',
    nameEn: 'OSOOL Doré',
    nameAr: 'أصول دوريه (الإصدار الذهبي)',
    taglineEn: 'Champagne Gold Bezel with Deep Obsidian Onyx Dial',
    taglineAr: 'إطار ذهبي شامبانيا فاخر مع ميناء أسود أونيكس عميق',
    categoryEn: 'Prestige Gold Watch',
    categoryAr: 'ساعة ذهبية ملكية فاخرة',
    priceSAR: 249,
    currencyEn: 'SAR',
    currencyAr: 'ر.س',
    inStock: true,
    stockStatusEn: 'In Stock · Limited Edition',
    stockStatusAr: 'متوفر للطلب الفوري · إصدار مميز',
    shortDescriptionEn: 'A masterwork in warm metallic contrast. Combines brushed champagne gold bezel tones with a deep midnight dial for heightened evening presence.',
    shortDescriptionAr: 'تحفة في التباين اللوني الدافئ. تجمع بين بريق الذهب الشامبانيا المطفي وميناء أسود عميق يمنحك هيبة استثنائية في المناسبات واللقاءات الرسمية.',
    fullDescriptionEn: 'Designed for the modern gentleman who commands admiration without excess. The OSOOL Doré features a precision-machined case coated with durable warm champagne finish, paired with a midnight black genuine strap.',
    fullDescriptionAr: 'صُممت للرجل الذي يفرض حضوره دون مبالغة. تتميز أصول دوريه بهيكل مشغول بعناية وتشطيب بلون الذهب الشامبانيا مع حزام جلدي فاخر يبرز أصالتك.',
    images: [
      {
        id: 'dore-main',
        src: '/src/assets/images/product_osool_or_gold_1793111032363.jpg',
        altEn: 'OSOOL Doré Champagne Gold watch with black dial',
        altAr: 'ساعة أصول دوريه باللون الذهبي الشامبانيا والميناء الأسود',
        labelEn: 'Front Perspective',
        labelAr: 'المشهد الرئيسي'
      },
      {
        id: 'dore-dial',
        src: '/src/assets/images/product_osool_noir_dial_1793109556834.jpg',
        altEn: 'Dial details and gold hour markers',
        altAr: 'تفاصيل الميناء والعلامات الذهبية',
        labelEn: 'Dial Macro',
        labelAr: 'الميناء المقرب'
      },
      {
        id: 'dore-wrist',
        src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
        altEn: 'OSOOL Doré on wrist with formal cuff',
        altAr: 'ساعة أصول على المعصم بمظهر رسمي فاخر',
        labelEn: 'On the Wrist',
        labelAr: 'على المعصم'
      }
    ],
    specifications: [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: '40 mm (Classic universal fit)',
        valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
        isPlaceholderNote: true
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: '7.8 mm (Ultra-slim profile)',
        valueAr: '7.8 ملم (تصميم نحيف مريح)',
        isPlaceholderNote: true
      },
      {
        id: 'dial_color',
        labelEn: 'Bezel & Dial Finish',
        labelAr: 'لون وتشطيب الهيكل والميناء',
        valueEn: 'Brushed Champagne Gold Bezel / Onyx Dial',
        valueAr: 'إطار ذهبي شامبانيا مطفي مع ميناء أسود أونيكس',
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: 'Textured Midnight Black Leather',
        valueAr: 'حزام جلد أسود فاخر ناعم الملمس',
        isPlaceholderNote: true
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: 'Japanese Quartz Movement',
        valueAr: 'حركة كوارتز يابانية عالية الدقة',
        isPlaceholderNote: true
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: 'Daily Splash Resistance (3 ATM)',
        valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM)',
        isPlaceholderNote: true
      }
    ]
  },
  {
    id: 'osool-argent',
    nameEn: 'OSOOL Argent',
    nameAr: 'أصول أرجنت (الإصدار الفضي)',
    taglineEn: 'Brushed Stainless Steel with Architectural Sunburst Dial',
    taglineAr: 'هيكل ستانلس ستيل مصقول مع ميناء متلألئ بتصميم معماري',
    categoryEn: 'Classic Steel Watch',
    categoryAr: 'ساعة ستانلس ستيل كلاسيكية',
    priceSAR: 219,
    currencyEn: 'SAR',
    currencyAr: 'ر.س',
    inStock: true,
    stockStatusEn: 'In Stock · Ready to Dispatch',
    stockStatusAr: 'متوفر للطلب الفوري · شحن سريع',
    shortDescriptionEn: 'The essence of pure timeless horology. Clean brushed silver contours paired with a high-contrast dial for pristine everyday versatility.',
    shortDescriptionAr: 'جوهر الساعات الكلاسيكية الخالدة. خطوط فضية مصقولة وتباين نقي يمنحك تناغماً مثالياً مع الثوب السعودي والإطلالات الكاجوال والرسمية.',
    fullDescriptionEn: 'OSOOL Argent honors heritage industrial geometry with high-grade stainless finishing, scratch-resistant mineral crystal, and understated indices that elevate daily attire effortlessly.',
    fullDescriptionAr: 'تحتفي أصول أرجنت بالخطوط الهندسية الراقية مع تشطيب معدني ناصع وزجاج مقاوم للخدوش الخفيفة، لتكون خيارك اليومي المعتمد.',
    images: [
      {
        id: 'argent-main',
        src: '/src/assets/images/product_osool_silver_1793111031890.jpg',
        altEn: 'OSOOL Argent Brushed Stainless Steel watch',
        altAr: 'ساعة أصول أرجنت باللون الفضي الستانلس ستيل',
        labelEn: 'Front Perspective',
        labelAr: 'المشهد الرئيسي'
      },
      {
        id: 'argent-profile',
        src: '/src/assets/images/product_osool_noir_profile_1793109558767.jpg',
        altEn: 'Profile view showing slim casing',
        altAr: 'المظهر الجانبي للهيكل الفضي النحيف',
        labelEn: 'Slim Profile',
        labelAr: 'الهيكل النحيف'
      },
      {
        id: 'argent-wrist',
        src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
        altEn: 'OSOOL watch worn with everyday watch look',
        altAr: 'ساعة أصول على المعصم بإطلالة عصرية',
        labelEn: 'On the Wrist',
        labelAr: 'على المعصم'
      }
    ],
    specifications: [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: '40 mm (Universal classic fit)',
        valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
        isPlaceholderNote: true
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: '7.5 mm (Ultra-slim lightweight)',
        valueAr: '7.5 ملم (فائق النحافة وانسيابي)',
        isPlaceholderNote: true
      },
      {
        id: 'dial_color',
        labelEn: 'Dial & Case Finish',
        labelAr: 'لون وتشطيب الميناء والهيكل',
        valueEn: 'Brushed Silver Steel with Dark Contrast Dial',
        valueAr: 'ستانلس ستيل فضي مصقول مع ميناء أسود متباين',
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: 'Textured Black Leather Strap',
        valueAr: 'حزام جلد أسود مريح ومقاوم للتعرق',
        isPlaceholderNote: true
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: 'Japanese Electronic Quartz',
        valueAr: 'حركة كوارتز يابانية موثوقة',
        isPlaceholderNote: true
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: 'Daily Splash Resistance (3 ATM)',
        valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM)',
        isPlaceholderNote: true
      }
    ]
  },
  {
    id: 'osool-basalt',
    nameEn: 'OSOOL Basalt All-Black',
    nameAr: 'أصول بازلت (الأسود الأحادي)',
    taglineEn: 'Monochromatic Obsidian Stealth Timepiece',
    taglineAr: 'ساعة أحادية اللون بالكامل مستوحاة من صخور البازلت البركانية',
    categoryEn: 'Monochrome Stealth Watch',
    categoryAr: 'ساعة سوداء بالكامل أحادية اللون',
    priceSAR: 239,
    currencyEn: 'SAR',
    currencyAr: 'ر.س',
    inStock: true,
    stockStatusEn: 'In Stock · Ready to Dispatch',
    stockStatusAr: 'متوفر للطلب الفوري · شحن سريع',
    shortDescriptionEn: 'The darkest expression of OSOOL minimalism. Total matte black finish from casing to hands for a daring, stealth modern statement.',
    shortDescriptionAr: 'التعبير الأكثر عمقاً وبساطة عن هوية أصول. طلاء أسود مطفي بالكامل من الهيكل حتى العقارب لإطلالة جريئة وعصرية لا تشبه غيرها.',
    fullDescriptionEn: 'Engineered for those who appreciate stealth design and tactile textures. Coated in non-reflective black PVD with matching subdued markers.',
    fullDescriptionAr: 'صممت لعشاق التميز والتصاميم المطفية الهادئة. طلاء أسود مقاوم للانعكاسات يمنحك مظهراً غامضاً وأنيقاً يكمل أسلوبك الشخصي.',
    images: [
      {
        id: 'basalt-main',
        src: '/src/assets/images/product_osool_noir_dial_1793109556834.jpg',
        altEn: 'OSOOL Basalt All-Black Stealth watch dial',
        altAr: 'ساعة أصول بازلت باللون الأسود الأحادي',
        labelEn: 'Dial Focus',
        labelAr: 'المشهد الرئيسي'
      },
      {
        id: 'basalt-hero',
        src: '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg',
        altEn: 'OSOOL Basalt watch on stone',
        altAr: 'ساعة أصول بازلت على الصخرة',
        labelEn: 'Full Perspective',
        labelAr: 'المظهر الكامل'
      },
      {
        id: 'basalt-wrist',
        src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
        altEn: 'OSOOL Basalt worn on wrist',
        altAr: 'ساعة أصول على المعصم',
        labelEn: 'On the Wrist',
        labelAr: 'على المعصم'
      }
    ],
    specifications: [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: '40 mm (Universal classic fit)',
        valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
        isPlaceholderNote: true
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: '7.5 mm (Ultra-slim)',
        valueAr: '7.5 ملم (فائق النحافة)',
        isPlaceholderNote: true
      },
      {
        id: 'dial_color',
        labelEn: 'Dial & Case Finish',
        labelAr: 'لون وتشطيب الهيكل والميناء',
        valueEn: 'Matte Obsidian Black Monochromatic PVD',
        valueAr: 'أسود مطفي أحادي بالكامل مقاوم للبصمات',
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: 'Matte Black Textured Silicone / Leather',
        valueAr: 'حزام أسود مطفي فاخر',
        isPlaceholderNote: true
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: 'High-Precision Electronic Quartz',
        valueAr: 'حركة كوارتز عالية الدقة',
        isPlaceholderNote: true
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: 'Daily Splash Resistance (3 ATM)',
        valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM)',
        isPlaceholderNote: true
      }
    ]
  },
  {
    id: 'osool-emeraude',
    nameEn: 'OSOOL Émeraude',
    nameAr: 'أصول إيمرود (الإصدار الأخضر الملكي)',
    taglineEn: 'Deep Emerald Sunburst Dial with Brushed Steel Casing',
    taglineAr: 'ميناء أخضر زمردي ملكي متلألئ مع هيكل ستانلس ستيل مصقول',
    categoryEn: 'Royal Emerald Watch',
    categoryAr: 'ساعة خضراء ملكية فاخرة',
    priceSAR: 249,
    currencyEn: 'SAR',
    currencyAr: 'ر.س',
    inStock: true,
    stockStatusEn: 'In Stock · Prestige Edition',
    stockStatusAr: 'متوفر للطلب الفوري · إصدار ملكي خاص',
    shortDescriptionEn: 'A bold, regal aesthetic reflecting heritage Saudi greenery and timeless craftsmanship. Finished with a deep sunburst emerald dial and matching textured strap.',
    shortDescriptionAr: 'إطلالة ملكية فريدة مستوحاة من الهوية السعودية الراقية. ميناء أخضر زمردي ساحر يعكس الضوء ببراعة مع سوار جلدي فاخر يكمل تميزك في المناسبات.',
    fullDescriptionEn: 'OSOOL Émeraude marries classic horological prestige with vibrant sophistication. Engineered with durable stainless steel, scratch-resistant sapphire-grade crystal, and an unforgettable deep emerald hue.',
    fullDescriptionAr: 'تجمع أصول إيمرود بين الفخامة السويسرية واللون الأخضر الملكي البديع. هيكل فولاذي صلب مقاوم للصدأ، زجاج معدني مقوى، وحضور يلفت الأنظار دون تكلف.',
    images: [
      {
        id: 'emeraude-main',
        src: '/src/assets/images/osool_emeraude_watch_1793273558530.jpg',
        altEn: 'OSOOL Émeraude luxury emerald green watch on dark stone',
        altAr: 'ساعة أصول إيمرود الخضراء الملكية على صخرة داكنة',
        labelEn: 'Front Perspective',
        labelAr: 'المشهد الرئيسي'
      },
      {
        id: 'emeraude-wrist',
        src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
        altEn: 'OSOOL luxury watch worn on wrist',
        altAr: 'ساعة أصول على المعصم بإطلالة فاخرة',
        labelEn: 'On the Wrist',
        labelAr: 'على المعصم'
      }
    ],
    specifications: [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: '40 mm (Universal classic fit)',
        valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
        isPlaceholderNote: true
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: '7.6 mm (Ultra-slim lightweight)',
        valueAr: '7.6 ملم (نحيف وانسيابي)',
        isPlaceholderNote: true
      },
      {
        id: 'dial_color',
        labelEn: 'Dial & Case Finish',
        labelAr: 'لون وتشطيب الهيكل والميناء',
        valueEn: 'Deep Emerald Sunburst with Brushed Steel',
        valueAr: 'أخضر زمردي متلألئ مع ستانلس ستيل فضي مصقول',
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: 'Deep Emerald Textured Genuine Leather',
        valueAr: 'حزام جلد أخضر زمردي فاخر ومريح',
        isPlaceholderNote: true
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: 'High-Precision Electronic Quartz',
        valueAr: 'حركة كوارتز عالية الدقة',
        isPlaceholderNote: true
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: 'Daily Splash Resistance (3 ATM)',
        valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM)',
        isPlaceholderNote: true
      }
    ]
  },
  {
    id: 'osool-bleu',
    nameEn: 'OSOOL Bleu Nuit',
    nameAr: 'أصول بلو نوي (الإصدار الأزرق الملكي)',
    taglineEn: 'Midnight Navy Sunburst Dial with Polished Steel Accents',
    taglineAr: 'ميناء كحلي ملكي متلألئ مع حواف ستانلس ستيل فضية براقة',
    categoryEn: 'Midnight Blue Watch',
    categoryAr: 'ساعة كحلية ملكية فاخرة',
    priceSAR: 239,
    currencyEn: 'SAR',
    currencyAr: 'ر.س',
    inStock: true,
    stockStatusEn: 'In Stock · Ready to Dispatch',
    stockStatusAr: 'متوفر للطلب الفوري · شحن سريع',
    shortDescriptionEn: 'The majesty of twilight in a sleek minimalist case. Deep midnight blue dial that catches the light with subtle sophistication.',
    shortDescriptionAr: 'فخامة لون سماء الليل في تصميم عصري بسيط. ميناء كحلي عميق يعكس الضوء بأناقة هادئة مع حزام جلدي كحلي متناسق.',
    fullDescriptionEn: 'Crafted for distinguished business and evening occasions. OSOOL Bleu Nuit pairs a vibrant navy dial with a mirror-finish steel case, offering quiet distinction and effortless panache.',
    fullDescriptionAr: 'صُممت لأصحاب الذوق الرفيع في اللقاءات الرسمية والمسائية. تجمع بين سحر اللون الأزرق الداكن وإشراقة الستانلس ستيل لتمنحك تميزاً يدوم.',
    images: [
      {
        id: 'bleu-main',
        src: '/src/assets/images/osool_bleu_watch_1793273571162.jpg',
        altEn: 'OSOOL Bleu Nuit luxury midnight blue watch on stone',
        altAr: 'ساعة أصول بلو نوي الكحلية على صخرة البازلت',
        labelEn: 'Front Perspective',
        labelAr: 'المشهد الرئيسي'
      },
      {
        id: 'bleu-wrist',
        src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg',
        altEn: 'OSOOL watch worn on wrist',
        altAr: 'ساعة أصول على المعصم',
        labelEn: 'On the Wrist',
        labelAr: 'على المعصم'
      }
    ],
    specifications: [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: '40 mm (Universal classic fit)',
        valueAr: '40 ملم (مقاس كلاسيكي متناسق)',
        isPlaceholderNote: true
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: '7.5 mm (Ultra-slim profile)',
        valueAr: '7.5 ملم (فائق النحافة)',
        isPlaceholderNote: true
      },
      {
        id: 'dial_color',
        labelEn: 'Dial & Case Finish',
        labelAr: 'لون وتشطيب الهيكل والميناء',
        valueEn: 'Midnight Navy Sunburst with Polished Steel',
        valueAr: 'كحلي ملكي متلألئ مع ستانلس ستيل مصقول',
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: 'Midnight Blue Textured Genuine Leather',
        valueAr: 'حزام جلد كحلي فاخر عالي الجودة',
        isPlaceholderNote: true
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: 'Japanese Electronic Quartz',
        valueAr: 'حركة كوارتز يابانية موثوقة',
        isPlaceholderNote: true
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: 'Daily Splash Resistance (3 ATM)',
        valueAr: 'مقاومة رذاذ الاستخدام اليومي (3 ATM)',
        isPlaceholderNote: true
      }
    ]
  }
];

/**
 * Frequently Asked Questions (Editable answers)
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'how_to_order',
    questionEn: 'How can I place an order?',
    questionAr: 'كيف يمكنني إتمام الطلب؟',
    answerEn: 'Ordering with OSOOL is effortless and personal. Simply click the "Order via WhatsApp" button on this page. A pre-filled message with your selected quantity and calculated subtotal will open directly in WhatsApp with our concierge team. Send the message and our customer specialist will assist you with confirming your details, address, and delivery.',
    answerAr: 'الطلب في أصول يتم بكل سهولة وخصوصية عبر واتساب. اضغط على زر "اطلب عبر واتساب" وسيتم فتح محادثة مباشرة مع فريق خدمة العملاء مجهزة بتفاصيل طلبك والكمية والإجمالي. فقط أرسل الرسالة وسيقوم ممثلنا بتأكيد عنوانك وبيانات التوصيل فوراً.',
    isConfigurableNote: false
  },
  {
    id: 'payment_methods',
    questionEn: 'What payment methods are available?',
    questionAr: 'ما هي طرق الدفع المتاحة؟',
    answerEn: 'Payment arrangements are agreed upon directly with our customer representative on WhatsApp. We support direct Bank Transfer, Mada payment links, or Cash on Delivery (COD) based on the current options confirmed by our team.',
    answerAr: 'يتم تنسيق طريقة الدفع المناسبة مباشرة عبر المحادثة في واتساب. تتوفر خيارات التحويل البنكي المباشر لحساب المتجر، روابط دفع مدى الآمنة، أو الدفع عند الاستلام وفقاً للشروط المحددة من خدمة العملاء.',
    isConfigurableNote: true
  },
  {
    id: 'delivery_time',
    questionEn: 'How long does delivery take?',
    questionAr: 'كم يستغرق توصيل الطلب داخل المملكة؟',
    answerEn: 'Deliveries to major Saudi cities (Riyadh, Jeddah, Dammam, Mecca, Medina, Khobar) typically arrive within 2 to 4 business days. For other regions, transit may take 3 to 5 business days depending on the courier service.',
    answerAr: 'يستغرق التوصيل للمدن الرئيسية في المملكة (الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة، الخبر) من 2 إلى 4 أيام عمل. ولبقية المحافظات والمناطق من 3 إلى 5 أيام عمل عبر شركات الشحن المعتمدة.',
    isConfigurableNote: true
  },
  {
    id: 'returns_policy',
    questionEn: 'Can I return or exchange my order?',
    questionAr: 'هل يمكنني استرجاع أو استبدال الساعة؟',
    answerEn: 'Yes. We offer a transparent inspection and exchange policy within 7 days of receiving your package, provided the timepiece is in its original unworn condition with protective seals and packaging intact. Contact our WhatsApp support team to initiate an exchange.',
    answerAr: 'نعم، نوفر سياسة استبدال واسترجاع مرنة خلال 7 أيام من تاريخ استلام الشحنة، شريطة أن تكون الساعة بحالتها الأصلية غير المستخدمة وملصقات الحماية وعلبتها الأصلية كاملة. يمكنك التواصل مع خدمة العملاء عبر واتساب لترتيب ذلك.',
    isConfigurableNote: true
  },
  {
    id: 'customer_support',
    questionEn: 'How can I contact customer support?',
    questionAr: 'كيف يمكنني التواصل مع الدعم وخدمة العملاء؟',
    answerEn: 'Our support team is available directly via WhatsApp and phone at 054 8691874 daily from 10:00 AM to 11:00 PM (Saudi Time). You can also reach us via direct message on our official Instagram account or by email.',
    answerAr: 'فريق دعم أصول متاح لخدمتكم يومياً عبر محادثة واتساب والاتصال المباشر على الرقم 054 8691874 من الساعة 10:00 صباحاً حتى 11:00 مساءً بتوقيت مكة المكرمة، كما يمكنكم مراسلتنا عبر حسابنا في إنستغرام أو البريد الإلكتروني.',
    isConfigurableNote: true
  }
];

/**
 * Common Saudi cities for quick selection in the interactive order helper
 */
export const SAUDI_CITIES = [
  { ar: 'الرياض', en: 'Riyadh' },
  { ar: 'جدة', en: 'Jeddah' },
  { ar: 'الدمام', en: 'Dammam' },
  { ar: 'مكة المكرمة', en: 'Makkah' },
  { ar: 'المدينة المنورة', en: 'Madinah' },
  { ar: 'الخبر', en: 'Khobar' },
  { ar: 'الظهران', en: 'Dhahran' },
  { ar: 'الأحساء', en: 'Al Ahsa' },
  { ar: 'الطائف', en: 'Taif' },
  { ar: 'تبوك', en: 'Tabuk' },
  { ar: 'بريدة', en: 'Buraidah' },
  { ar: 'خميس مشيط', en: 'Khamis Mushait' },
  { ar: 'أبها', en: 'Abha' },
  { ar: 'حائل', en: 'Hail' },
  { ar: 'نجران', en: 'Najran' },
  { ar: 'ينبع', en: 'Yanbu' },
  { ar: 'الجبيل', en: 'Jubail' },
  { ar: 'مدينة أخرى', en: 'Other City' }
];

/**
 * Default Promotional Codes & Offers configured for OSOOL
 */
export const DEFAULT_PROMO_CODES: PromoCode[] = [
  {
    id: 'promo-osool10',
    code: 'OSOOL10',
    type: 'percentage',
    discountType: 'percentage',
    value: 10,
    discountValue: 10,
    minOrderAmount: 200,
    isActive: true,
    descriptionAr: 'خصم 10% بمناسبة إطلاق التشكيلة الجديدة',
    descriptionEn: '10% off new signature collection launch',
    usageCount: 3,
    createdAt: '2026-10-25'
  },
  {
    id: 'promo-welcome25',
    code: 'WELCOME25',
    type: 'fixed',
    discountType: 'fixed',
    value: 25,
    discountValue: 25,
    minOrderAmount: 219,
    isActive: true,
    descriptionAr: 'خصم 25 ريال للعملاء الجدد على أي ساعة',
    descriptionEn: '25 SAR off for new customers on any timepiece',
    usageCount: 7,
    createdAt: '2026-10-26'
  },
  {
    id: 'promo-vip15',
    code: 'VIP15',
    type: 'percentage',
    discountType: 'percentage',
    value: 15,
    discountValue: 15,
    minOrderAmount: 400,
    isActive: true,
    descriptionAr: 'خصم 15% للطلبات المتميزة بقيمة 400 ريال وأكثر',
    descriptionEn: '15% VIP discount for orders of 400 SAR or more',
    usageCount: 2,
    createdAt: '2026-10-27'
  }
];

export const DEFAULT_STORE_BANNER: StoreOfferBanner = {
  enabled: true,
  textAr: '✨ عرض إطلاق التشكيلة: استخدم كود OSOOL10 للحصول على خصم 10% فوري مع شحن سريع لكافة مناطق المملكة',
  textEn: '✨ Collection Launch Special: Use code OSOOL10 for 10% off + Express Delivery across Saudi Arabia',
  highlightCode: 'OSOOL10'
};

/**
 * Reusable WhatsApp Message and URL Generator for a Single Product
 */
export function generateWhatsAppOrderData(
  product: Product,
  quantity: number,
  details?: WhatsAppOrderDetails,
  lang: 'ar' | 'en' = 'ar'
): { messageText: string; whatsappUrl: string } {
  const safeQuantity = Math.max(1, quantity);
  const subtotal = product.priceSAR * safeQuantity;
  const discountAmount = details?.discountAmount || 0;
  const finalTotal = details?.finalTotal !== undefined ? details.finalTotal : Math.max(0, subtotal - discountAmount);
  const promoCode = details?.promoCode;
  const phone = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

  let messageText = '';

  if (lang === 'ar') {
    const phoneLine = details?.customerPhone ? details.customerPhone : '';
    const nameLine = details?.customerName ? details.customerName : '';
    const cityLine = details?.customerCity ? details.customerCity : '';
    const addressLine = details?.customerAddress ? details.customerAddress : '';
    const paymentLine = details?.preferredPayment ? details.preferredPayment : '';
    const notesLine = details?.notes ? `ملاحظات: ${details.notes}\n` : '';
    
    const discountLines = (promoCode && discountAmount > 0)
      ? `\nكود الخصم المطبق: ${promoCode} (خصم -${discountAmount} ريال)\nالإجمالي النهائي بعد الخصم: ${finalTotal} ريال`
      : '';

    messageText = 
`السلام عليكم، أرغب في تأكيد طلب ساعة ${product.nameEn}.

المنتج: ${product.nameEn}
السعر: ${product.priceSAR} ريال
الكمية: ${safeQuantity}
الإجمالي قبل الشحن: ${subtotal} ريال${discountLines}

رقم الجوال: ${phoneLine}
الاسم: ${nameLine}
المدينة: ${cityLine}
العنوان: ${addressLine}
طريقة الدفع المفضلة: ${paymentLine}
${notesLine}
يرجى تأكيد توفر المنتج وتكلفة الشحن وتفاصيل الدفع.`;
  } else {
    const phoneLine = details?.customerPhone ? details.customerPhone : '';
    const nameLine = details?.customerName ? details.customerName : '';
    const cityLine = details?.customerCity ? details.customerCity : '';
    const addressLine = details?.customerAddress ? details.customerAddress : '';
    const paymentLine = details?.preferredPayment ? details.preferredPayment : '';
    const notesLine = details?.notes ? `Notes: ${details.notes}\n` : '';

    const discountLines = (promoCode && discountAmount > 0)
      ? `\nApplied Promo Code: ${promoCode} (-${discountAmount} SAR discount)\nFinal Total After Discount: ${finalTotal} SAR`
      : '';

    messageText = 
`Hello, I would like to confirm my order for the ${product.nameEn} watch.

Product: ${product.nameEn}
Price: ${product.priceSAR} SAR
Quantity: ${safeQuantity}
Subtotal before shipping: ${subtotal} SAR${discountLines}

Phone: ${phoneLine}
Name: ${nameLine}
City: ${cityLine}
Address: ${addressLine}
Preferred Payment: ${paymentLine}
${notesLine}
Please confirm product availability, shipping cost, and payment details.`;
  }

  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  return { messageText, whatsappUrl };
}

/**
 * Reusable WhatsApp Message and URL Generator for Multi-Product Cart Checkout
 */
export function generateMultiItemWhatsAppOrderData(
  items: { product: Product; quantity: number }[],
  details?: WhatsAppOrderDetails,
  lang: 'ar' | 'en' = 'ar'
): { messageText: string; whatsappUrl: string; totalSum: number } {
  const phone = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const totalSum = items.reduce((sum, item) => sum + (item.product.priceSAR * item.quantity), 0);
  const discountAmount = details?.discountAmount || 0;
  const finalTotal = details?.finalTotal !== undefined ? details.finalTotal : Math.max(0, totalSum - discountAmount);
  const promoCode = details?.promoCode;

  let messageText = '';

  if (lang === 'ar') {
    const phoneLine = details?.customerPhone ? details.customerPhone : '';
    const nameLine = details?.customerName ? details.customerName : '';
    const cityLine = details?.customerCity ? details.customerCity : '';
    const addressLine = details?.customerAddress ? details.customerAddress : '';
    const paymentLine = details?.preferredPayment ? details.preferredPayment : '';
    const notesLine = details?.notes ? `ملاحظات: ${details.notes}\n` : '';

    const itemsSummary = items
      .map((item, index) => {
        const lineTotal = item.product.priceSAR * item.quantity;
        return `${index + 1}. ${item.product.nameAr} (${item.product.nameEn})\n   الكمية: ${item.quantity} × ${item.product.priceSAR} ريال = ${lineTotal} ريال`;
      })
      .join('\n\n');

    const discountSummary = (promoCode && discountAmount > 0)
      ? `\nكود الخصم: ${promoCode} (خصم -${discountAmount} ريال)\nالإجمالي النهائي بعد الخصم: ${finalTotal} ريال`
      : '';

    messageText = 
`السلام عليكم، أرغب في تأكيد طلب الساعات التالية من متجر أصول (OSOOL):

${itemsSummary}

---------------------------
المجموع الفرعي للمنتجات: ${totalSum} ريال${discountSummary}
(قبل تكلفة الشحن)

رقم الجوال: ${phoneLine}
الاسم: ${nameLine}
المدينة: ${cityLine}
العنوان: ${addressLine}
طريقة الدفع المفضلة: ${paymentLine}
${notesLine}
يرجى تأكيد توفر الموديلات وتكلفة الشحن وإجراءات الاستلام.`;
  } else {
    const phoneLine = details?.customerPhone ? details.customerPhone : '';
    const nameLine = details?.customerName ? details.customerName : '';
    const cityLine = details?.customerCity ? details.customerCity : '';
    const addressLine = details?.customerAddress ? details.customerAddress : '';
    const paymentLine = details?.preferredPayment ? details.preferredPayment : '';
    const notesLine = details?.notes ? `Notes: ${details.notes}\n` : '';

    const itemsSummary = items
      .map((item, index) => {
        const lineTotal = item.product.priceSAR * item.quantity;
        return `${index + 1}. ${item.product.nameEn} (${item.product.nameAr})\n   Qty: ${item.quantity} × ${item.product.priceSAR} SAR = ${lineTotal} SAR`;
      })
      .join('\n\n');

    const discountSummary = (promoCode && discountAmount > 0)
      ? `\nPromo Code: ${promoCode} (-${discountAmount} SAR)\nFinal Total After Discount: ${finalTotal} SAR`
      : '';

    messageText = 
`Hello, I would like to confirm my order for the following OSOOL timepieces:

${itemsSummary}

---------------------------
Items Subtotal: ${totalSum} SAR${discountSummary}
(Before shipping cost)

Phone: ${phoneLine}
Name: ${nameLine}
City: ${cityLine}
Address: ${addressLine}
Preferred Payment: ${paymentLine}
${notesLine}
Please confirm models availability, shipping cost, and payment details.`;
  }

  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  return { messageText, whatsappUrl, totalSum: finalTotal };
}


