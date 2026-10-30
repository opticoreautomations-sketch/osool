import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Product, 
  ProductSpecification, 
  OrderStatus, 
  DraftOrder, 
  DiscountType, 
  PromoCode, 
  StoreOfferBanner,
  getPromoDiscountType,
  getPromoDiscountValue,
  getPromoExpiry
} from '../types/store';
import { 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  Edit3, 
  Trash2, 
  Check, 
  Eye, 
  Package, 
  Phone, 
  Save, 
  X, 
  Image as ImageIcon, 
  Layers,
  RotateCcw,
  Clock,
  CheckCircle2,
  PauseCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  MapPin,
  User,
  ShoppingBag,
  Filter,
  FileText,
  LogOut,
  Key,
  ShieldCheck,
  Mail,
  Lock,
  Tag,
  Percent,
  Sparkles,
  TrendingUp,
  Calendar,
  Copy,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// Preset luxury watch images generated for OSOOL
const PRESET_WATCH_IMAGES = [
  {
    labelEn: 'OSOOL Noir (Obsidian Black)',
    labelAr: 'أصول نوار (أسود بازلتي)',
    src: '/src/assets/images/hero_osool_noir_watch_1793109557552.jpg'
  },
  {
    labelEn: 'OSOOL Brushed Gold Edition',
    labelAr: 'أصول الإصدار الذهبي الشامبانيا',
    src: '/src/assets/images/product_osool_or_gold_1793111032363.jpg'
  },
  {
    labelEn: 'OSOOL Stainless Silver Edition',
    labelAr: 'أصول ستانلس ستيل الفضي',
    src: '/src/assets/images/product_osool_silver_1793111031890.jpg'
  },
  {
    labelEn: 'OSOOL Émeraude (Royal Green)',
    labelAr: 'أصول إيمرود (الأخضر الزمردي)',
    src: '/src/assets/images/osool_emeraude_watch_1793273558530.jpg'
  },
  {
    labelEn: 'OSOOL Bleu Nuit (Royal Blue)',
    labelAr: 'أصول بلو نوي (الكحلي الملكي)',
    src: '/src/assets/images/osool_bleu_watch_1793273571162.jpg'
  },
  {
    labelEn: 'Dial & Hands Macro',
    labelAr: 'تفاصيل الميناء والعقارب',
    src: '/src/assets/images/product_osool_noir_dial_1793109556834.jpg'
  },
  {
    labelEn: 'Case Profile & Crown',
    labelAr: 'المنظور الجانبي والنحافة',
    src: '/src/assets/images/product_osool_noir_profile_1793109558767.jpg'
  },
  {
    labelEn: 'On the Wrist Lifestyle',
    labelAr: 'صورة على المعصم',
    src: '/src/assets/images/product_osool_noir_wrist_1793109558602.jpg'
  }
];

export const AdminPage: React.FC = () => {
  const { 
    language, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    deleteAllProducts,
    resetToDefaultProducts, 
    loadSampleProducts,
    setIsAdminView, 
    setSelectedProductId,
    whatsappNumber,
    setWhatsappNumber,
    orderHistory,
    updateOrderStatus,
    removeDraftOrder,
    adminEmail,
    logoutAdmin,
    updateAdminCredentials,
    resetAdminCredentials,
    promoCodes,
    addPromoCode,
    updatePromoCode,
    deletePromoCode,
    togglePromoCodeStatus,
    storeBanner,
    updateStoreBanner,
    resetToDefaultPromoCodes
  } = useStore();

  const isAr = language === 'ar';

  // Navigation tab state: 'orders' | 'products' | 'offers' | 'settings'
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'products' | 'offers' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'confirmed' | 'paused' | 'cancelled'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [orderNotesText, setOrderNotesText] = useState<string>('');

  // Promo code modal state
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoDiscountType, setPromoDiscountType] = useState<DiscountType>('percentage');
  const [promoDiscountValue, setPromoDiscountValue] = useState<number>(10);
  const [promoMinOrder, setPromoMinOrder] = useState<number>(0);
  const [promoValidUntil, setPromoValidUntil] = useState<string>('');
  const [promoDescAr, setPromoDescAr] = useState<string>('');
  const [promoDescEn, setPromoDescEn] = useState<string>('');
  const [promoIsActive, setPromoIsActive] = useState<boolean>(true);
  const [promoModalError, setPromoModalError] = useState<string | null>(null);

  // Store announcement banner state
  const [bannerEnabled, setBannerEnabled] = useState(storeBanner.enabled);
  const [bannerTextAr, setBannerTextAr] = useState(storeBanner.textAr);
  const [bannerTextEn, setBannerTextEn] = useState(storeBanner.textEn);
  const [bannerHighlightCode, setBannerHighlightCode] = useState(storeBanner.highlightCode || '');
  const [bannerSaved, setBannerSaved] = useState(false);

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings state
  const [tempPhone, setTempPhone] = useState(whatsappNumber);
  const [phoneSaved, setPhoneSaved] = useState(false);

  // Admin Account & Security state
  const [editAdminEmail, setEditAdminEmail] = useState(adminEmail);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [credsError, setCredsError] = useState<string | null>(null);
  const [credsSuccess, setCredsSuccess] = useState(false);

  // New/Edit product form state
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [categoryEn, setCategoryEn] = useState('Minimalist Watch');
  const [categoryAr, setCategoryAr] = useState('ساعة كلاسيكية بسيطة');
  const [priceSAR, setPriceSAR] = useState<number>(229);
  const [taglineEn, setTaglineEn] = useState('Minimalist Luxury Timepiece');
  const [taglineAr, setTaglineAr] = useState('ساعة فاخرة بلمسات هادئة');
  const [shortDescriptionEn, setShortDescriptionEn] = useState('');
  const [shortDescriptionAr, setShortDescriptionAr] = useState('');
  const [fullDescriptionEn, setFullDescriptionEn] = useState('');
  const [fullDescriptionAr, setFullDescriptionAr] = useState('');
  const [selectedImageSrc, setSelectedImageSrc] = useState(PRESET_WATCH_IMAGES[1].src);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [inStock, setInStock] = useState(true);

  // Specifications
  const [caseDiameter, setCaseDiameter] = useState('40 mm');
  const [caseProfile, setCaseProfile] = useState('7.5 mm (Ultra-slim)');
  const [strapMaterial, setStrapMaterial] = useState('Matte Black Textured Leather');
  const [movementType, setMovementType] = useState('Precision Japanese Quartz');
  const [waterResistance, setWaterResistance] = useState('Daily Splash Resistance (3 ATM)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddForm = () => {
    setEditingProductId(null);
    setNameEn('');
    setNameAr('');
    setCategoryEn('Minimalist Watch');
    setCategoryAr('ساعة كلاسيكية بسيطة');
    setPriceSAR(229);
    setTaglineEn('Minimalist Luxury Timepiece');
    setTaglineAr('ساعة فاخرة بتصميم مينيمالي');
    setShortDescriptionEn('Crafted for everyday prestige with architectural minimalism and understated elegance.');
    setShortDescriptionAr('صُممت للأناقة اليومية بخطوط معمارية هادئة وفخامة تعبر عن حضورك الواثق.');
    setFullDescriptionEn('A statement of modern luxury designed for Saudi gentlemen who value subtle sophistication.');
    setFullDescriptionAr('تعبير راقٍ عن الفخامة الهادئة للرجل السعودي الذي يقدّر التفاصيل الدقيقة.');
    setSelectedImageSrc(PRESET_WATCH_IMAGES[1].src);
    setCustomImageUrl('');
    setInStock(true);
    setCaseDiameter('40 mm');
    setCaseProfile('7.5 mm (Ultra-slim)');
    setStrapMaterial('Matte Black Textured Leather');
    setMovementType('Precision Electronic Quartz');
    setWaterResistance('Daily Splash Resistance (3 ATM)');
    setIsFormOpen(true);
  };

  const openEditForm = (prod: Product) => {
    setEditingProductId(prod.id);
    setNameEn(prod.nameEn);
    setNameAr(prod.nameAr);
    setCategoryEn(prod.categoryEn);
    setCategoryAr(prod.categoryAr);
    setPriceSAR(prod.priceSAR);
    setTaglineEn(prod.taglineEn);
    setTaglineAr(prod.taglineAr);
    setShortDescriptionEn(prod.shortDescriptionEn);
    setShortDescriptionAr(prod.shortDescriptionAr);
    setFullDescriptionEn(prod.fullDescriptionEn);
    setFullDescriptionAr(prod.fullDescriptionAr);
    setSelectedImageSrc(prod.images[0]?.src || PRESET_WATCH_IMAGES[0].src);
    setInStock(prod.inStock);
    
    // Find specs
    const diameter = prod.specifications.find(s => s.id === 'case_diameter')?.valueEn || '40 mm';
    const profile = prod.specifications.find(s => s.id === 'case_thickness')?.valueEn || '7.5 mm';
    const strap = prod.specifications.find(s => s.id === 'strap_material')?.valueEn || 'Matte Black Textured Leather';
    const movement = prod.specifications.find(s => s.id === 'movement')?.valueEn || 'Precision Electronic Quartz';
    const water = prod.specifications.find(s => s.id === 'water_resistance')?.valueEn || '3 ATM';

    setCaseDiameter(diameter);
    setCaseProfile(profile);
    setStrapMaterial(strap);
    setMovementType(movement);
    setWaterResistance(water);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const activeImage = customImageUrl.trim() || selectedImageSrc;

    const specs: ProductSpecification[] = [
      {
        id: 'case_diameter',
        labelEn: 'Case Diameter',
        labelAr: 'قطر الهيكل',
        valueEn: caseDiameter,
        valueAr: caseDiameter,
        isPlaceholderNote: false
      },
      {
        id: 'case_thickness',
        labelEn: 'Case Profile',
        labelAr: 'سُمك الهيكل',
        valueEn: caseProfile,
        valueAr: caseProfile,
        isPlaceholderNote: false
      },
      {
        id: 'strap_material',
        labelEn: 'Strap Material',
        labelAr: 'نوع وحزام الساعة',
        valueEn: strapMaterial,
        valueAr: strapMaterial,
        isPlaceholderNote: false
      },
      {
        id: 'movement',
        labelEn: 'Movement Type',
        labelAr: 'نوع الحركة',
        valueEn: movementType,
        valueAr: movementType,
        isPlaceholderNote: false
      },
      {
        id: 'water_resistance',
        labelEn: 'Water Resistance',
        labelAr: 'مقاومة الماء',
        valueEn: waterResistance,
        valueAr: waterResistance,
        isPlaceholderNote: false
      }
    ];

    if (editingProductId) {
      // Update existing
      const existing = products.find(p => p.id === editingProductId);
      if (existing) {
        const updated: Product = {
          ...existing,
          nameEn: nameEn.trim() || 'OSOOL Timepiece',
          nameAr: nameAr.trim() || 'ساعة أصول',
          categoryEn,
          categoryAr,
          priceSAR: Number(priceSAR) || 229,
          taglineEn,
          taglineAr,
          shortDescriptionEn,
          shortDescriptionAr,
          fullDescriptionEn,
          fullDescriptionAr,
          inStock,
          stockStatusEn: inStock ? 'In Stock · Ready to Dispatch' : 'Out of Stock',
          stockStatusAr: inStock ? 'متوفر للطلب الفوري · شحن سريع' : 'نفدت الكمية حالياً',
          images: [
            {
              id: 'main',
              src: activeImage,
              altEn: nameEn,
              altAr: nameAr,
              labelEn: 'Front View',
              labelAr: 'المنظور الرئيسي'
            },
            ...(existing.images.slice(1))
          ],
          specifications: specs
        };
        updateProduct(updated);
        showToast(isAr ? 'تم تحديث بيانات المنتج بنجاح' : 'Product updated successfully');
      }
    } else {
      // Create new product
      const newId = `osool-${Date.now()}`;
      const newProduct: Product = {
        id: newId,
        nameEn: nameEn.trim() || 'OSOOL New Edition',
        nameAr: nameAr.trim() || 'ساعة أصول جديدة',
        categoryEn,
        categoryAr,
        priceSAR: Number(priceSAR) || 229,
        currencyEn: 'SAR',
        currencyAr: 'ر.س',
        taglineEn,
        taglineAr,
        shortDescriptionEn,
        shortDescriptionAr,
        fullDescriptionEn,
        fullDescriptionAr,
        inStock,
        stockStatusEn: inStock ? 'In Stock · Ready to Dispatch' : 'Out of Stock',
        stockStatusAr: inStock ? 'متوفر للطلب الفوري · شحن سريع' : 'نفدت الكمية حالياً',
        images: [
          {
            id: 'main',
            src: activeImage,
            altEn: nameEn,
            altAr: nameAr,
            labelEn: 'Front View',
            labelAr: 'المنظور الرئيسي'
          },
          {
            id: 'dial',
            src: PRESET_WATCH_IMAGES[3].src,
            altEn: 'Macro Dial',
            altAr: 'تفاصيل الميناء',
            labelEn: 'Dial Detail',
            labelAr: 'الميناء'
          },
          {
            id: 'profile',
            src: PRESET_WATCH_IMAGES[4].src,
            altEn: 'Profile Angle',
            altAr: 'المنظور الجانبي',
            labelEn: 'Profile',
            labelAr: 'الجانب'
          }
        ],
        specifications: specs
      };
      addProduct(newProduct);
      showToast(isAr ? 'تمت إضافة المنتج الجديد إلى المتجر بنجاح' : 'New product published to storefront');
    }

    setIsFormOpen(false);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappNumber(tempPhone);
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2500);
    showToast(isAr ? 'تم تحديث رقم واتساب المتجر' : 'WhatsApp number updated');
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredsError(null);
    setCredsSuccess(false);

    if (newAdminPassword && newAdminPassword !== confirmAdminPassword) {
      setCredsError(isAr ? 'كلمتا المرور الجديدة غير متطابقتين' : 'New passwords do not match');
      return;
    }

    if (newAdminPassword && newAdminPassword.length < 5) {
      setCredsError(isAr ? 'كلمة المرور يجب أن لا تقل عن 5 خانات' : 'Password must be at least 5 characters');
      return;
    }

    const passwordToSave = newAdminPassword || 'osool2026';
    const result = updateAdminCredentials(editAdminEmail, passwordToSave);
    if (result.success) {
      setCredsSuccess(true);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
      showToast(isAr ? 'تم تحديث بيانات حساب الإدارة بنجاح' : 'Admin credentials updated successfully');
      setTimeout(() => setCredsSuccess(false), 3000);
    } else {
      setCredsError(result.error || 'Failed to update credentials');
    }
  };

  const handleResetCreds = () => {
    resetAdminCredentials();
    setEditAdminEmail('opticoreautomations@gmail.com');
    setNewAdminPassword('');
    setConfirmAdminPassword('');
    setCredsError(null);
    showToast(isAr ? 'تمت استعادة بيانات الدخول الافتراضية' : 'Default credentials restored');
  };

  // Promo Codes & Offers Handlers
  const openAddPromoModal = () => {
    setEditingPromoId(null);
    setPromoCodeInput('');
    setPromoDiscountType('percentage');
    setPromoDiscountValue(10);
    setPromoMinOrder(0);
    setPromoValidUntil('');
    setPromoDescAr('خصم حصري على مشتريات الساعات الفاخرة');
    setPromoDescEn('Exclusive discount on luxury timepieces');
    setPromoIsActive(true);
    setPromoModalError(null);
    setIsPromoModalOpen(true);
  };

  const openEditPromoModal = (code: PromoCode) => {
    setEditingPromoId(code.id);
    setPromoCodeInput(code.code);
    setPromoDiscountType(getPromoDiscountType(code));
    setPromoDiscountValue(getPromoDiscountValue(code));
    setPromoMinOrder(code.minOrderAmount || 0);
    setPromoValidUntil(getPromoExpiry(code) || '');
    setPromoDescAr(code.descriptionAr || '');
    setPromoDescEn(code.descriptionEn || '');
    setPromoIsActive(code.isActive !== false);
    setPromoModalError(null);
    setIsPromoModalOpen(true);
  };

  const handleSavePromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoModalError(null);

    const cleanCode = promoCodeInput.trim().toUpperCase();
    if (!cleanCode || cleanCode.length < 3) {
      setPromoModalError(isAr ? 'كود الخصم يجب أن يتكون من 3 أحرف أو أرقام على الأقل' : 'Code must be at least 3 characters');
      return;
    }

    if (promoDiscountValue <= 0) {
      setPromoModalError(isAr ? 'يرجى إدخال قيمة خصم صالحة أكبر من 0' : 'Discount value must be greater than 0');
      return;
    }

    if (promoDiscountType === 'percentage' && promoDiscountValue > 90) {
      setPromoModalError(isAr ? 'نسبة الخصم لا يمكن أن تتجاوز 90%' : 'Percentage discount cannot exceed 90%');
      return;
    }

    if (editingPromoId) {
      const existing = promoCodes.find(p => p.id === editingPromoId);
      if (existing) {
        updatePromoCode({
          ...existing,
          code: cleanCode,
          type: promoDiscountType,
          discountType: promoDiscountType,
          value: Number(promoDiscountValue),
          discountValue: Number(promoDiscountValue),
          minOrderAmount: promoMinOrder > 0 ? Number(promoMinOrder) : undefined,
          validUntil: promoValidUntil ? promoValidUntil : undefined,
          expiryDate: promoValidUntil ? promoValidUntil : undefined,
          descriptionAr: promoDescAr.trim() || 'عرض خاص',
          descriptionEn: promoDescEn.trim() || 'Special Offer',
          isActive: promoIsActive
        });
        showToast(isAr ? `تم تحديث كود الخصم (${cleanCode}) بنجاح` : `Promo code (${cleanCode}) updated`);
      }
    } else {
      const result = addPromoCode({
        id: `promo_${Date.now()}`,
        code: cleanCode,
        type: promoDiscountType,
        discountType: promoDiscountType,
        value: Number(promoDiscountValue),
        discountValue: Number(promoDiscountValue),
        minOrderAmount: promoMinOrder > 0 ? Number(promoMinOrder) : undefined,
        validUntil: promoValidUntil ? promoValidUntil : undefined,
        expiryDate: promoValidUntil ? promoValidUntil : undefined,
        descriptionAr: promoDescAr.trim() || 'عرض خاص',
        descriptionEn: promoDescEn.trim() || 'Special Offer',
        isActive: promoIsActive,
        usageCount: 0
      });
      if (!result.success) {
        setPromoModalError(result.error || (isAr ? 'تعذر إضافة الكود' : 'Failed to add code'));
        return;
      }
      showToast(isAr ? `تمت إضافة كود الخصم الجديد (${cleanCode})` : `New promo code (${cleanCode}) added`);
    }

    setIsPromoModalOpen(false);
  };

  const handleDeletePromoCode = (code: PromoCode) => {
    if (confirm(isAr ? `هل أنت متأكد من حذف كود الخصم (${code.code})؟` : `Are you sure you want to delete code (${code.code})?`)) {
      deletePromoCode(code.id);
      showToast(isAr ? `تم حذف كود الخصم (${code.code})` : `Promo code (${code.code}) deleted`);
    }
  };

  const handleTogglePromoStatus = (code: PromoCode) => {
    togglePromoCodeStatus(code.id);
    const newStatus = code.isActive === false;
    showToast(
      isAr 
        ? `تم ${newStatus ? 'تفعيل' : 'تعطيل'} كود الخصم (${code.code})`
        : `Promo code (${code.code}) ${newStatus ? 'activated' : 'deactivated'}`
    );
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreBanner({
      enabled: bannerEnabled,
      textAr: bannerTextAr.trim(),
      textEn: bannerTextEn.trim(),
      highlightCode: bannerHighlightCode.trim().toUpperCase() || undefined
    });
    setBannerSaved(true);
    setTimeout(() => setBannerSaved(false), 2500);
    showToast(isAr ? 'تم حفظ وتحديث شريط الإعلانات الترويجي' : 'Store announcement banner updated');
  };

  const handleResetPromoDefaults = () => {
    if (confirm(isAr ? 'هل تريد استعادة أكواد الخصم والإعلان الافتراضي؟' : 'Reset promo codes and banner to defaults?')) {
      resetToDefaultPromoCodes();
      setBannerEnabled(true);
      setBannerTextAr('✨ عرض خاص: استخدم كود OSOOL10 للحصول على خصم 10% على جميع الساعات + توصيل مجاني');
      setBannerTextEn('✨ Special Offer: Use code OSOOL10 for 10% OFF all timepieces + free shipping');
      setBannerHighlightCode('OSOOL10');
      showToast(isAr ? 'تمت استعادة الأكواد الافتراضية بنجاح' : 'Default promo codes restored');
    }
  };

  const handlePreviewInStore = (prodId: string) => {
    setSelectedProductId(prodId);
    setIsAdminView(false);
  };

  // Order status actions: confirm, pause, cancel
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    const label = newStatus === 'confirmed' 
      ? (isAr ? 'تم تأكيد واعتماد الطلب بنجاح' : 'Order Confirmed & Approved')
      : newStatus === 'paused'
      ? (isAr ? 'تم تعليق الطلب مؤقتاً' : 'Order Paused / Put On Hold')
      : (isAr ? 'تم إلغاء الطلب' : 'Order Cancelled');
    showToast(label);
  };

  const handleSaveOrderNotes = (orderId: string, currentStatus: OrderStatus) => {
    updateOrderStatus(orderId, currentStatus, orderNotesText);
    setEditingNotesId(null);
    setOrderNotesText('');
    showToast(isAr ? 'تم حفظ ملاحظة الإدارة على الطلب' : 'Admin notes saved');
  };

  const handleContactCustomer = (order: DraftOrder) => {
    const rawPhone = order.customerPhone.replace(/[\s-+()]/g, '');
    let cleanPhone = rawPhone;
    if (rawPhone.startsWith('05')) {
      cleanPhone = '966' + rawPhone.slice(1);
    } else if (rawPhone.startsWith('5')) {
      cleanPhone = '966' + rawPhone;
    }
    
    const greeting = isAr
      ? `السلام عليكم ورحمة الله وبركاته، مرحباً بك أخي ${order.customerName ? order.customerName : 'الكريم'}.
معك خدمة عملاء متجر أصول (OSOOL) للساعات الفاخرة.
تلقينا طلبك رقم (${order.id}) لساعة ${order.productNameAr} بقيمة ${order.subtotal} ر.س لمدينة ${order.customerCity || 'المملكة'}.
نود تأكيد توفر الساعة وترتيب موعد الشحن والتسليم.
طريقة الدفع المسجلة: ${order.preferredPayment || 'تحويل بنكي / مدى'}.
يرجى تأكيد رغبتكم بالاعتماد لنقوم بتجهيز الشحنة فوراً.`
      : `Hello ${order.customerName || 'valued customer'},
This is OSOOL Luxury Timepieces regarding your order #${order.id} (${order.productNameEn}, Total: ${order.subtotal} SAR).
We are reviewing your delivery to ${order.customerCity || 'Saudi Arabia'}.
Would you like us to confirm and dispatch your order today?`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(greeting)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCreateSampleOrder = () => {
    const targetProduct = products[0] || {
      nameEn: 'OSOOL Noir',
      nameAr: 'أصول نوار',
      priceSAR: 229,
      images: [{ src: PRESET_WATCH_IMAGES[0].src }]
    };

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const demoOrder: DraftOrder = {
      id: `OSL-${randomSuffix}`,
      createdAt: new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      productNameEn: targetProduct.nameEn,
      productNameAr: targetProduct.nameAr,
      productImage: targetProduct.images[0]?.src || PRESET_WATCH_IMAGES[0].src,
      quantity: 1,
      unitPrice: targetProduct.priceSAR,
      subtotal: targetProduct.priceSAR,
      customerPhone: '0555123456',
      customerName: isAr ? 'عبدالله التميمي' : 'Abdullah Al-Tamimi',
      customerCity: isAr ? 'الرياض' : 'Riyadh',
      customerAddress: isAr ? 'حي حطين، شارع الأمير تركي' : 'Hittin District, Prince Turki St.',
      preferredPayment: isAr ? 'بطاقة مدى / أبل باي' : 'Mada / Apple Pay',
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=SampleOrder`,
      status: 'pending',
      adminNotes: undefined
    };

    const saved = localStorage.getItem('osool_draft_orders_v1');
    let currentOrders: DraftOrder[] = [];
    if (saved) {
      try {
        currentOrders = JSON.parse(saved);
      } catch {
        currentOrders = [];
      }
    }
    const updated = [demoOrder, ...currentOrders];
    localStorage.setItem('osool_draft_orders_v1', JSON.stringify(updated));
    updateOrderStatus(demoOrder.id, 'pending');
    showToast(isAr ? 'تم إنشاء طلب تجريبي جديد بانتظار المراجعة' : 'Sample pending order created');
  };

  // Filter calculations
  const filteredOrders = orderHistory.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  const pendingCount = orderHistory.filter(o => o.status === 'pending').length;
  const confirmedCount = orderHistory.filter(o => o.status === 'confirmed').length;
  const pausedCount = orderHistory.filter(o => o.status === 'paused').length;
  const cancelledCount = orderHistory.filter(o => o.status === 'cancelled').length;
  const totalOrdersValue = orderHistory.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const confirmedOrdersValue = orderHistory.filter(o => o.status === 'confirmed').reduce((sum, o) => sum + (o.subtotal || 0), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F3EF] flex flex-col font-sans-modern">
      
      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-cinzel font-bold text-[#F5F3EF]">
              OSOOL <span className="text-[#C6A76A]">| لوحة التحكم</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-[#181818] border border-[#2a2a2a] text-[#C6A76A] font-medium hidden sm:inline">
              {isAr ? 'إدارة المنتجات' : 'Products Manager'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Admin identity badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212] border border-[#262626] text-[11px] text-[#A3A3A3]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C6A76A]" />
              <span className="font-mono text-[#F5F3EF]">{adminEmail}</span>
            </div>

            <button
              onClick={() => {
                setIsAdminView(false);
                try {
                  if (typeof window !== 'undefined' && window.location.hash === '#admin') {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  }
                } catch {}
              }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#F5F3EF] bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#C6A76A]/40 rounded transition-colors cursor-pointer"
            >
              {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للمتجر' : 'Storefront'}</span>
            </button>

            <button
              onClick={openAddForm}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{isAr ? 'إضافة منتج' : 'Add Watch'}</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-300 hover:text-red-200 bg-red-950/30 hover:bg-red-950/60 border border-red-900/50 rounded transition-all cursor-pointer"
              title={isAr ? 'تسجيل الخروج من لوحة الإدارة' : 'Sign out from admin portal'}
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Toast alert */}
        {toastMessage && (
          <div className="p-4 rounded-lg bg-[#14130a] border border-[#C6A76A] text-[#C6A76A] text-xs font-medium flex items-center gap-2 shadow-lg animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#222222] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`flex items-center gap-2.5 py-3 px-5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeAdminTab === 'orders'
                ? 'border-[#C6A76A] text-[#F5F3EF] bg-[#121212]'
                : 'border-transparent text-[#8c8c8c] hover:text-[#F5F3EF] hover:bg-[#0c0c0c]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C6A76A]" />
            <span>{isAr ? 'إدارة ومتابعة الطلبات' : 'Orders Management'}</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6A76A] text-[#050505] animate-pulse">
                {pendingCount} {isAr ? 'جديد' : 'New'}
              </span>
            )}
            {pendingCount === 0 && orderHistory.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#222222] text-[#A3A3A3]">
                {orderHistory.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`flex items-center gap-2.5 py-3 px-5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeAdminTab === 'products'
                ? 'border-[#C6A76A] text-[#F5F3EF] bg-[#121212]'
                : 'border-transparent text-[#8c8c8c] hover:text-[#F5F3EF] hover:bg-[#0c0c0c]'
            }`}
          >
            <Package className="w-4 h-4 text-[#C6A76A]" />
            <span>{isAr ? 'كتالوج الساعات والمنتجات' : 'Products Catalog'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#222222] text-[#A3A3A3]">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('offers')}
            className={`flex items-center gap-2.5 py-3 px-5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeAdminTab === 'offers'
                ? 'border-[#C6A76A] text-[#F5F3EF] bg-[#121212]'
                : 'border-transparent text-[#8c8c8c] hover:text-[#F5F3EF] hover:bg-[#0c0c0c]'
            }`}
          >
            <Tag className="w-4 h-4 text-[#C6A76A]" />
            <span>{isAr ? 'العروض وأكواد الخصم' : 'Discounts & Offers'}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#222222] text-[#A3A3A3]">
              {promoCodes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`flex items-center gap-2.5 py-3 px-5 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap border-b-2 ${
              activeAdminTab === 'settings'
                ? 'border-[#C6A76A] text-[#F5F3EF] bg-[#121212]'
                : 'border-transparent text-[#8c8c8c] hover:text-[#F5F3EF] hover:bg-[#0c0c0c]'
            }`}
          >
            <Phone className="w-4 h-4 text-[#C6A76A]" />
            <span>{isAr ? 'إعدادات المتجر ورقم الواتساب' : 'Store Settings & WhatsApp'}</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            
            {/* KPI Cards for Orders */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>{isAr ? 'إجمالي الطلبات' : 'Total Orders'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F3EF]">
                  {orderHistory.length}
                </div>
                <div className="text-[11px] text-[#555555]">
                  {totalOrdersValue} {isAr ? 'ر.س القيمة الكلية' : 'SAR gross value'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#141208] border border-[#C6A76A]/30 space-y-1">
                <div className="text-xs text-[#C6A76A] flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C6A76A] animate-pulse" />
                  <span>{isAr ? 'بانتظار المراجعة والتواصل' : 'Awaiting Review & Contact'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#C6A76A]">
                  {pendingCount}
                </div>
                <div className="text-[11px] text-[#A39572]">
                  {isAr ? 'يحتاج تواصل هاتفي / واتساب' : 'Requires customer outreach'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a140d] border border-emerald-900/40 space-y-1">
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'الطلبات المعتمدة والمؤكدة' : 'Confirmed Orders'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {confirmedCount}
                </div>
                <div className="text-[11px] text-emerald-600/90 font-mono">
                  {confirmedOrdersValue} {isAr ? 'ر.س معتمد' : 'SAR confirmed'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-1.5">
                  <PauseCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isAr ? 'معلق / ملغي' : 'Paused / Cancelled'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#A3A3A3]">
                  {pausedCount + cancelledCount}
                </div>
                <div className="text-[11px] text-[#555555]">
                  {pausedCount} {isAr ? 'معلق' : 'paused'} · {cancelledCount} {isAr ? 'ملغي' : 'cancelled'}
                </div>
              </div>
            </div>

            {/* Orders Header & Filter Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#0e0e0e] border border-[#222222]">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <span className="text-xs text-[#737373] flex items-center gap-1 px-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تصفية:' : 'Filter:'}</span>
                </span>

                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
                    orderFilter === 'all'
                      ? 'bg-[#222222] text-[#F5F3EF] border border-[#3a3a3a]'
                      : 'text-[#8c8c8c] hover:text-[#F5F3EF]'
                  }`}
                >
                  {isAr ? 'الكل' : 'All'} ({orderHistory.length})
                </button>

                <button
                  onClick={() => setOrderFilter('pending')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    orderFilter === 'pending'
                      ? 'bg-[#1e190b] text-[#C6A76A] border border-[#C6A76A]/50'
                      : 'text-[#8c8c8c] hover:text-[#C6A76A]'
                  }`}
                >
                  <Clock className="w-3 h-3 text-[#C6A76A]" />
                  <span>{isAr ? 'بانتظار التواصل' : 'Pending'}</span>
                  <span className="text-[10px] font-mono">({pendingCount})</span>
                </button>

                <button
                  onClick={() => setOrderFilter('confirmed')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    orderFilter === 'confirmed'
                      ? 'bg-[#0b1a0f] text-emerald-400 border border-emerald-500/50'
                      : 'text-[#8c8c8c] hover:text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{isAr ? 'مؤكد' : 'Confirmed'}</span>
                  <span className="text-[10px] font-mono">({confirmedCount})</span>
                </button>

                <button
                  onClick={() => setOrderFilter('paused')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    orderFilter === 'paused'
                      ? 'bg-[#1c1409] text-amber-400 border border-amber-500/50'
                      : 'text-[#8c8c8c] hover:text-amber-400'
                  }`}
                >
                  <PauseCircle className="w-3 h-3 text-amber-400" />
                  <span>{isAr ? 'معلق' : 'Paused'}</span>
                  <span className="text-[10px] font-mono">({pausedCount})</span>
                </button>

                <button
                  onClick={() => setOrderFilter('cancelled')}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    orderFilter === 'cancelled'
                      ? 'bg-[#1f0b0d] text-rose-400 border border-rose-500/50'
                      : 'text-[#8c8c8c] hover:text-rose-400'
                  }`}
                >
                  <XCircle className="w-3 h-3 text-rose-400" />
                  <span>{isAr ? 'ملغي' : 'Cancelled'}</span>
                  <span className="text-[10px] font-mono">({cancelledCount})</span>
                </button>
              </div>

              <button
                onClick={handleCreateSampleOrder}
                className="text-xs px-3 py-1.5 rounded bg-[#161616] hover:bg-[#202020] text-[#A3A3A3] hover:text-[#C6A76A] border border-[#2a2a2a] transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'إنشاء طلب تجريبي للاختبار' : 'Create Sample Test Order'}</span>
              </button>
            </div>

            {/* Concierge Workflow Notice */}
            <div className="p-3.5 rounded-lg bg-[#090909] border border-[#1c1c1c] text-xs text-[#8c8c8c] flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#161616] border border-[#2a2a2a] flex items-center justify-center text-[#C6A76A] shrink-0">
                i
              </div>
              <p className="leading-relaxed">
                {isAr
                  ? 'دورة الطلب: يقوم العميل بالطلب عبر السلة وتسجيل رقم جواله، فتنتقل الحالة مباشرة إلى "بانتظار التواصل". تواصل معه عبر واتساب لتأكيد الشحن، ثم اضغط "تأكيد" أو "تعليق" أو "إلغاء".'
                  : 'Concierge Cycle: Customer orders via checkout drawer. Status defaults to "Pending Review". Contact them via WhatsApp to confirm dispatch, then select "Confirm", "Pause", or "Cancel".'}
              </p>
            </div>

            {/* Orders List / Empty State */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#121212] border border-[#222222] flex items-center justify-center mx-auto text-[#666666]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-[#F5F3EF]">
                  {orderFilter === 'all'
                    ? (isAr ? 'لا توجد طلبات مسجلة بعد' : 'No customer orders recorded yet')
                    : (isAr ? `لا توجد طلبات في تصنيف (${orderFilter})` : `No orders found under ${orderFilter}`)}
                </h3>
                <p className="text-xs text-[#737373] max-w-md mx-auto">
                  {isAr 
                    ? 'عندما يقوم أي عميل بالضغط على إرسال الطلب وإضافة رقم جواله في المتجر، سيظهر طلبه هنا فوراً مع جميع التفاصيل لاتخاذ الإجراء المناسب.'
                    : 'When a customer places an order via the bag checkout, it will immediately appear here for your review and confirmation.'}
                </p>
                <button
                  onClick={handleCreateSampleOrder}
                  className="px-5 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إنشاء طلب تجريبي وتجربة التأكيد والتعليق' : 'Create Sample Order to Test Lifecycle'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isEditingThisNote = editingNotesId === order.id;

                  return (
                    <div
                      key={order.id}
                      className="rounded-xl bg-[#0c0c0c] border border-[#222222] hover:border-[#2e2e2e] transition-all overflow-hidden p-5 space-y-4 text-start"
                    >
                      {/* Order Card Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c1c1c] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#C6A76A]">
                            {order.id}
                          </span>
                          <span className="text-xs text-[#666666] font-mono">
                            {order.createdAt}
                          </span>
                        </div>

                        {/* Current Status Badge */}
                        <div className="flex items-center gap-2">
                          {order.status === 'confirmed' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 border border-emerald-500/50 text-emerald-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{isAr ? 'تم التأكيد والاعتماد' : 'Confirmed & Approved'}</span>
                            </span>
                          ) : order.status === 'paused' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 border border-amber-500/50 text-amber-300">
                              <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>{isAr ? 'الطلب معلق مؤقتاً' : 'Order Paused / On Hold'}</span>
                            </span>
                          ) : order.status === 'cancelled' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/70 border border-rose-500/50 text-rose-300">
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                              <span>{isAr ? 'تم إلغاء الطلب' : 'Order Cancelled'}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1f190a] border border-[#C6A76A] text-[#C6A76A]">
                              <Clock className="w-3.5 h-3.5 animate-pulse text-[#C6A76A]" />
                              <span>{isAr ? 'قيد المراجعة بانتظار التواصل' : 'Pending Concierge Contact'}</span>
                            </span>
                          )}

                          <button
                            onClick={() => removeDraftOrder(order.id)}
                            className="p-1.5 rounded hover:bg-red-950/30 text-[#555555] hover:text-red-400 transition-colors cursor-pointer"
                            title={isAr ? 'حذف من النظام' : 'Delete Order'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Order Core Info: 3 Columns Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        
                        {/* 1. Watch & Pricing */}
                        <div className="flex gap-3.5 items-start p-3.5 rounded-lg bg-[#111111] border border-[#1f1f1f]">
                          <img
                            src={order.productImage || PRESET_WATCH_IMAGES[0].src}
                            alt={order.productNameEn}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded object-cover bg-[#050505] border border-[#2a2a2a] shrink-0"
                          />
                          <div className="min-w-0 flex-1 space-y-1">
                            <h4 className="text-sm font-semibold text-[#F5F3EF] truncate" title={isAr ? order.productNameAr : order.productNameEn}>
                              {isAr ? order.productNameAr : order.productNameEn}
                            </h4>
                            <div className="text-xs text-[#8c8c8c]">
                              {order.items && order.items.length > 1
                                ? `${order.items.length} ${isAr ? 'موديلات مختلفة' : 'different models'} (${order.quantity} ${isAr ? 'قطع' : 'pcs'})`
                                : `${order.quantity} × ${order.unitPrice} ${isAr ? 'ر.س' : 'SAR'}`}
                            </div>
                            <div className="text-sm font-mono font-bold text-[#C6A76A]">
                              {isAr ? 'الإجمالي:' : 'Total:'} {order.subtotal} {isAr ? 'ر.س' : 'SAR'}
                            </div>
                          </div>
                        </div>

                        {/* 2. Customer Contact Coordinates */}
                        <div className="p-3.5 rounded-lg bg-[#111111] border border-[#1f1f1f] space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[#737373] text-[11px] font-semibold uppercase">
                            <span>{isAr ? 'بيانات العميل' : 'Customer Info'}</span>
                            <span className="text-[#C6A76A]">{order.preferredPayment || 'تحويل بنكي / مدى'}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                            <span className="text-[#F5F3EF] font-medium truncate">
                              {order.customerName || (isAr ? 'عميل أصول' : 'OSOOL Client')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 font-mono">
                            <Phone className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                            <a
                              href={`tel:${order.customerPhone}`}
                              className="text-[#F5F3EF] hover:text-[#C6A76A] underline font-bold"
                              dir="ltr"
                            >
                              {order.customerPhone}
                            </a>
                          </div>

                          {(order.customerCity || order.customerAddress) && (
                            <div className="flex items-start gap-2 text-[#A3A3A3] pt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-[#C6A76A] shrink-0 mt-0.5" />
                              <span className="truncate">
                                {order.customerCity} {order.customerAddress ? `— ${order.customerAddress}` : ''}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 3. Outreach & WhatsApp Concierge */}
                        <div className="p-3.5 rounded-lg bg-[#111111] border border-[#1f1f1f] flex flex-col justify-between space-y-3">
                          <div className="space-y-1">
                            <div className="text-[11px] font-semibold text-[#737373] uppercase">
                              {isAr ? 'التواصل المباشر مع العميل' : 'Direct Concierge Outreach'}
                            </div>
                            <p className="text-xs text-[#8c8c8c] leading-relaxed">
                              {isAr 
                                ? 'فتح محادثة واتساب موجهة للعميل مع نص ترحيبي يتضمن رقم الطلب والساعة والعنوان.' 
                                : 'Initiate WhatsApp dialogue with pre-filled greeting referencing order and watch.'}
                            </p>
                          </div>

                          <button
                            onClick={() => handleContactCustomer(order)}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#181818] hover:bg-[#222222] text-xs font-medium text-[#C6A76A] hover:text-[#D4B87D] border border-[#2e2e2e] transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{isAr ? 'مراسلة العميل عبر واتساب' : 'WhatsApp Customer'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>

                      {/* Admin Notes Section */}
                      <div className="pt-2 border-t border-[#181818] text-xs">
                        {isEditingThisNote ? (
                          <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-[#C6A76A]">
                              {isAr ? 'ملاحظة الإدارة على الطلب:' : 'Internal Concierge Note:'}
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={orderNotesText}
                                onChange={(e) => setOrderNotesText(e.target.value)}
                                placeholder={isAr ? 'مثال: تم الاتصال، العميل أكد الشحن يوم الأربعاء لحي النرجس' : 'e.g. Called client, delivery scheduled Wednesday'}
                                className="flex-1 px-3 py-1.5 text-xs rounded bg-[#141414] border border-[#333333] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveOrderNotes(order.id, order.status)}
                                className="px-3 py-1.5 text-xs font-semibold bg-[#C6A76A] text-[#050505] rounded hover:bg-[#D4B87D] cursor-pointer"
                              >
                                {isAr ? 'حفظ' : 'Save'}
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="px-3 py-1.5 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] cursor-pointer"
                              >
                                {isAr ? 'إلغاء' : 'Cancel'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-3 text-[#8c8c8c]">
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-[#C6A76A] shrink-0" />
                              <span className="truncate">
                                {order.adminNotes ? (
                                  <span className="text-[#F5F3EF]">
                                    <span className="text-[#C6A76A]">{isAr ? 'ملاحظة: ' : 'Note: '}</span>
                                    {order.adminNotes}
                                  </span>
                                ) : (
                                  <span className="text-[#555555] italic">
                                    {isAr ? 'لا توجد ملاحظات إدارة مسجلة بعد' : 'No concierge notes yet'}
                                  </span>
                                )}
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                setEditingNotesId(order.id);
                                setOrderNotesText(order.adminNotes || '');
                              }}
                              className="text-[11px] text-[#C6A76A] hover:underline cursor-pointer shrink-0"
                            >
                              {order.adminNotes ? (isAr ? 'تعديل الملاحظة' : 'Edit Note') : (isAr ? '+ إضافة ملاحظة' : '+ Add Note')}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* CORE REQUIREMENT: Action Controls to Confirm, Pause, or Cancel */}
                      <div className="pt-3 border-t border-[#1a1a1a] flex flex-wrap items-center justify-between gap-3 bg-[#080808] -mx-5 -mb-5 p-4 rounded-b-xl">
                        <span className="text-xs text-[#737373]">
                          {isAr ? 'تغيير حالة الطلب في النظام:' : 'Update Order Status in System:'}
                        </span>

                        <div className="flex items-center gap-2">
                          
                          {/* 1. CONFIRM ORDER */}
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                            disabled={order.status === 'confirmed'}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all cursor-pointer ${
                              order.status === 'confirmed'
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 opacity-90 cursor-default'
                                : 'bg-[#102214] hover:bg-[#16351d] text-emerald-300 border border-emerald-700/50 hover:border-emerald-500 shadow-sm'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تأكيد واعتماد الطلب' : 'Confirm Order'}</span>
                          </button>

                          {/* 2. PAUSE ORDER */}
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'paused')}
                            disabled={order.status === 'paused'}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all cursor-pointer ${
                              order.status === 'paused'
                                ? 'bg-amber-950/80 text-amber-400 border border-amber-500/50 opacity-90 cursor-default'
                                : 'bg-[#211809] hover:bg-[#30220d] text-amber-300 border border-amber-700/50 hover:border-amber-500 shadow-sm'
                            }`}
                          >
                            <PauseCircle className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تعليق مؤقت' : 'Pause Order'}</span>
                          </button>

                          {/* 3. CANCEL ORDER */}
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                            disabled={order.status === 'cancelled'}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition-all cursor-pointer ${
                              order.status === 'cancelled'
                                ? 'bg-rose-950/80 text-rose-400 border border-rose-500/50 opacity-90 cursor-default'
                                : 'bg-[#220e10] hover:bg-[#331417] text-rose-300 border border-rose-700/50 hover:border-rose-500 shadow-sm'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{isAr ? 'إلغاء الطلب' : 'Cancel Order'}</span>
                          </button>

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif-luxury font-medium text-[#F5F3EF]">
                  {isAr ? 'قائمة المنتجات المعروضة في المتجر' : 'Products in Storefront Catalog'}
                </h2>
                <p className="text-xs text-[#8c8c8c]">
                  {isAr 
                    ? 'يمكنك إضافة عدد غير محدود من ساعات أصول، وتعديل الأسعار والمواصفات والصور، أو إفراغ الكتالوج بالكامل.'
                    : 'Add, edit, or configure OSOOL watches with custom pricing and imagery.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm(isAr ? 'هل أنت متأكد من حذف جميع المنتجات من المتجر؟' : 'Are you sure you want to delete all products?')) {
                        deleteAllProducts();
                        showToast(isAr ? 'تم حذف جميع المنتجات وإفراغ الكتالوج' : 'All products deleted');
                      }
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حذف جميع المنتجات' : 'Delete All Products'}</span>
                  </button>
                )}

                <button
                  onClick={openAddForm}
                  className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة ساعة جديدة' : 'Add New Watch'}</span>
                </button>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="py-16 text-center space-y-4 bg-[#0c0c0c] rounded-2xl border border-[#222222] p-8 max-w-xl mx-auto my-4">
                <div className="w-16 h-16 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center mx-auto text-[#C6A76A]">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-[#F5F3EF]">
                  {isAr ? 'لا توجد منتجات في المتجر حالياً' : 'No products in catalog'}
                </h3>
                <p className="text-xs text-[#8c8c8c] max-w-md mx-auto leading-relaxed">
                  {isAr 
                    ? 'تم إفراغ جميع المنتجات بنجاح. يمكنك الآن البدء بإضافة ساعاتك ومنتجاتك الخاصة عبر زر "إضافة ساعة جديدة"، أو استعادة النماذج الست الجاهزة بنقرة واحدة.' 
                    : 'All products are cleared. You can now add your custom watches using the button below, or reload the 6 sample models.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={openAddForm}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAr ? 'إضافة أول ساعة للمتجر' : 'Add First Watch'}</span>
                  </button>
                  <button
                    onClick={() => {
                      loadSampleProducts();
                      showToast(isAr ? 'تم استيراد التشكيلة النموذجية (6 ساعات)' : 'Sample lineup loaded');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-[#A3A3A3] hover:text-[#F5F3EF] bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C6A76A]" />
                    <span>{isAr ? 'تحميل التشكيلة النموذجية (6 ساعات)' : 'Load 6 Sample Watches'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="rounded-lg bg-[#0c0c0c] border border-[#222222] hover:border-[#333333] transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Watch Image Banner */}
                      <div className="relative aspect-4/3 bg-[#111111] overflow-hidden">
                        <img
                          src={prod.images[0]?.src || PRESET_WATCH_IMAGES[0].src}
                          alt={prod.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <div className="absolute top-3 end-3 px-2.5 py-1 rounded bg-[#050505]/80 backdrop-blur-md border border-[#222222] text-[11px] font-mono text-[#C6A76A] font-bold">
                          {prod.priceSAR} {isAr ? prod.currencyAr : prod.currencyEn}
                        </div>

                        <div className="absolute bottom-3 start-3 px-2 py-0.5 rounded bg-[#050505]/80 backdrop-blur-md text-[10px] text-[#A3A3A3]">
                          {prod.inStock ? (isAr ? 'متوفر' : 'In Stock') : (isAr ? 'نفد' : 'Out')}
                        </div>
                      </div>

                      {/* Body Info */}
                      <div className="p-5 space-y-2 text-start">
                        <div className="text-[11px] text-[#C6A76A] font-mono uppercase tracking-wider">
                          {isAr ? prod.categoryAr : prod.categoryEn}
                        </div>
                        
                        <h3 className="text-base font-semibold text-[#F5F3EF]">
                          {isAr ? prod.nameAr : prod.nameEn}
                        </h3>

                        <p className="text-xs text-[#8c8c8c] line-clamp-2 leading-relaxed">
                          {isAr ? prod.shortDescriptionAr : prod.shortDescriptionEn}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 border-t border-[#1a1a1a] bg-[#090909] flex items-center justify-between gap-2">
                      <button
                        onClick={() => handlePreviewInStore(prod.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs text-[#A3A3A3] hover:text-[#F5F3EF] transition-colors cursor-pointer"
                        title={isAr ? 'معاينة في المتجر' : 'Preview in Store'}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C6A76A]" />
                        <span>{isAr ? 'معاينة' : 'Preview'}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditForm(prod)}
                          className="p-1.5 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs text-[#A3A3A3] hover:text-[#C6A76A] transition-colors cursor-pointer"
                          title={isAr ? 'تعديل' : 'Edit'}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded bg-[#141414] hover:bg-red-950/40 border border-[#262626] text-xs text-[#666666] hover:text-red-400 transition-colors cursor-pointer"
                          title={isAr ? 'حذف المنتج' : 'Delete'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: STORE SETTINGS & WHATSAPP */}
        {activeAdminTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            
            {/* Top Control Strip & KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-5 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C6A76A]" />
                  <span>{isAr ? 'إجمالي منتجات المتجر' : 'Total Catalog Products'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F3EF]">
                  {products.length}
                </div>
                <div className="text-[11px] text-[#555555]">
                  {products.filter(p => p.inStock).length} {isAr ? 'متوفر للطلب الفوري' : 'in stock'}
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C6A76A]" />
                  <span>{isAr ? 'نظام الحفظ الفوري' : 'Data Persistence'}</span>
                </div>
                <div className="text-sm font-semibold text-[#F5F3EF]">
                  {isAr ? 'محفوظ محلياً (localStorage)' : 'Saved in localStorage'}
                </div>
                <div className="pt-2 flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      if (window.confirm(isAr ? 'هل أنت متأكد من حذف جميع المنتجات وإفراغ الكتالوج؟' : 'Are you sure you want to delete all products?')) {
                        deleteAllProducts();
                        showToast(isAr ? 'تم إفراغ جميع المنتجات من المتجر' : 'Catalog cleared');
                      }
                    }}
                    className="text-[11px] text-rose-400 hover:text-rose-300 underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{isAr ? 'إفراغ الكتالوج (حذف جميع المنتجات)' : 'Clear Catalog (Delete All Products)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      loadSampleProducts();
                      showToast(isAr ? 'تم استيراد التشكيلة النموذجية (6 ساعات)' : 'Sample lineup loaded');
                    }}
                    className="text-[11px] text-[#C6A76A] hover:text-[#D4B87D] underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{isAr ? 'استيراد التشكيلة النموذجية الجاهزة (6 ساعات)' : 'Load Sample Lineup (6 Watches)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* WhatsApp Phone Quick Config Card */}
            <div className="p-6 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#F5F3EF] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C6A76A]" />
                  <span>{isAr ? 'تعديل رقم واتساب المتجر الرسمي' : 'Update Store WhatsApp Number'}</span>
                </h3>
                <span className="text-xs text-[#737373]">
                  {isAr ? 'صيغة دولية بدون + (مثال: 966512345678)' : 'Format without + or spaces'}
                </span>
              </div>

              <form onSubmit={handleSavePhone} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="9665XXXXXXXX"
                    className="w-full px-4 py-2.5 text-sm rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                    dir="ltr"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {phoneSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{phoneSaved ? (isAr ? 'تم الحفظ' : 'Saved!') : (isAr ? 'حفظ الرقم' : 'Save Line')}</span>
                </button>
              </form>
            </div>

            {/* Admin Security & Credentials Card */}
            <div className="p-6 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F3EF] flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#C6A76A]" />
                    <span>{isAr ? 'أمان الدخول وحساب الإدارة' : 'Admin Security & Credentials'}</span>
                  </h3>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">
                    {isAr 
                      ? 'يمكنك تعديل البريد الإلكتروني وكلمة المرور الخاصة بالدخول إلى لوحة التحكم' 
                      : 'Configure the email address and password required to access this dashboard'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161616] border border-[#262626] text-[11px] text-[#C6A76A]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isAr ? 'محمي بكلمة مرور' : 'Password Protected'}</span>
                </div>
              </div>

              {/* Security alerts */}
              {credsError && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{credsError}</span>
                </div>
              )}

              {credsSuccess && (
                <div className="p-3 rounded-lg bg-[#14130a] border border-[#C6A76A]/60 text-[#C6A76A] text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{isAr ? 'تم حفظ وتحديث بيانات حساب الإدارة بنجاح' : 'Admin credentials saved successfully'}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1.5">
                    {isAr ? 'البريد الإلكتروني المعتمد للمشرف' : 'Authorized Admin Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-[#737373]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={editAdminEmail}
                      onChange={(e) => setEditAdminEmail(e.target.value)}
                      placeholder="opticoreautomations@gmail.com"
                      className="w-full ps-9 pe-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1.5">
                      {isAr ? 'كلمة المرور الجديدة (اختياري)' : 'New Password (Optional)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-[#737373]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder={isAr ? 'اترك فارغاً للإبقاء على الحالية' : 'Leave blank to keep current'}
                        className="w-full ps-9 pe-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1.5">
                      {isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-[#737373]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={confirmAdminPassword}
                        onChange={(e) => setConfirmAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full ps-9 pe-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleResetCreds}
                    className="text-[11px] text-[#8c8c8c] hover:text-[#C6A76A] underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{isAr ? 'استعادة بيانات الدخول الأصلية' : 'Restore Default Credentials'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تحديث بيانات الحساب' : 'Update Credentials'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* TAB 3: PROMOTIONS, OFFERS & DISCOUNTS */}
        {activeAdminTab === 'offers' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Offers Header & Action bar */}
            <div className="p-6 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#16140d] border border-[#C6A76A]/30 flex items-center justify-center text-[#C6A76A]">
                    <Tag className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#F5F3EF]">
                    {isAr ? 'أكواد الخصم والعروض الخاصة' : 'Promotional Codes & Store Offers'}
                  </h2>
                </div>
                <p className="text-xs text-[#8c8c8c] mt-1 max-w-2xl leading-relaxed">
                  {isAr 
                    ? 'تحكم في إنشاء أكواد الخصم (نسبة مئوية أو مبلغ ثابت بالريال)، وحدد الحد الأدنى للطلب، وقم بتفعيل أو تعطيل الأكواد فوراً لتظهر في سلة تسوق العميل ورسائل تأكيد الواتساب.'
                    : 'Create and manage promotional discount codes (percentage or fixed SAR amount), set minimum order thresholds, and manage storefront banner announcements.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleResetPromoDefaults}
                  className="px-3.5 py-2 text-xs text-[#8c8c8c] hover:text-[#F5F3EF] bg-[#141414] hover:bg-[#1a1a1a] border border-[#2a2a2a] rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={isAr ? 'استعادة الأكواد الافتراضية' : 'Reset to default promo codes'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
                </button>

                <button
                  type="button"
                  onClick={openAddPromoModal}
                  className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'إضافة كود خصم جديد' : 'New Promo Code'}</span>
                </button>
              </div>
            </div>

            {/* Promo KPI Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>{isAr ? 'إجمالي الأكواد' : 'Total Codes'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F3EF]">
                  {promoCodes.length}
                </div>
                <div className="text-[11px] text-[#555555]">
                  {isAr ? 'أكواد مخزنة في النظام' : 'Registered discount codes'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0a140d] border border-emerald-900/40 space-y-1">
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'الأكواد المفعلة حالياً' : 'Active Codes'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-300">
                  {promoCodes.filter(c => c.isActive !== false).length}
                </div>
                <div className="text-[11px] text-emerald-500/70">
                  {isAr ? 'متاحة لتطبيق العملاء في السلة' : 'Available in customer bag'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#141208] border border-[#C6A76A]/30 space-y-1">
                <div className="text-xs text-[#C6A76A] flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>{isAr ? 'مرات الاستخدام' : 'Total Redemptions'}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-[#C6A76A]">
                  {promoCodes.reduce((sum, c) => sum + (c.usageCount || 0), 0)}
                </div>
                <div className="text-[11px] text-[#A39572]">
                  {isAr ? 'إجمالي استخدامات العملاء' : 'Customer checkout uses'}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] space-y-1">
                <div className="text-xs text-[#8c8c8c] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A76A]" />
                  <span>{isAr ? 'شريط الإعلانات أعلى المتجر' : 'Store Banner'}</span>
                </div>
                <div className="text-base font-bold text-[#F5F3EF] mt-1">
                  {storeBanner.enabled ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {isAr ? 'معروض للزوار' : 'Live on Store'}
                    </span>
                  ) : (
                    <span className="text-stone-500 text-sm">
                      {isAr ? 'مخفي' : 'Disabled'}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#555555] truncate font-mono">
                  {storeBanner.highlightCode ? `كود: ${storeBanner.highlightCode}` : (isAr ? 'بدون كود محدد' : 'No highlighted code')}
                </div>
              </div>
            </div>

            {/* Storefront Announcement Banner Card */}
            <div className="p-6 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c1c1c] pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F3EF] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C6A76A]" />
                    <span>{isAr ? 'شريط إعلانات العروض أعلى المتجر' : 'Storefront Top Offer Banner'}</span>
                  </h3>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">
                    {isAr 
                      ? 'يظهر هذا الشريط الترويجي الفاخر في أعلى صفحة المتجر لجذب الزوار وتوضيح الكود الحصري.'
                      : 'This elegant top banner appears on the storefront to announce current sales and featured promo codes.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={bannerEnabled}
                      onChange={(e) => setBannerEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#C6A76A] rounded"
                    />
                    <span className={bannerEnabled ? 'text-emerald-400 font-medium' : 'text-[#737373]'}>
                      {bannerEnabled ? (isAr ? 'الشريط مفعّل' : 'Banner Enabled') : (isAr ? 'الشريط معطّل' : 'Banner Disabled')}
                    </span>
                  </label>
                </div>
              </div>

              {/* Banner Live Preview */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-[#737373] uppercase tracking-wider block">
                  {isAr ? 'معاينة حية لشريط الإعلان أعلى المتجر:' : 'Storefront Banner Live Preview:'}
                </span>
                <div className={`p-3 rounded border text-xs text-center transition-all ${
                  bannerEnabled 
                    ? 'bg-gradient-to-r from-stone-950 via-[#14120e] to-stone-950 border-[#C6A76A]/30 text-stone-200 shadow-sm'
                    : 'bg-[#121212] border-[#222222] text-[#555555] opacity-60'
                }`}>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#C6A76A]/10 border border-[#C6A76A]/30 text-[#E8D7B5] text-[10px]">
                      {isAr ? 'عرض حصري' : 'Exclusive Offer'}
                    </span>
                    <span>{isAr ? bannerTextAr : bannerTextEn}</span>
                    {bannerHighlightCode && (
                      <span className="px-2 py-0.5 rounded bg-stone-900 border border-[#C6A76A]/40 text-[#E8D7B5] font-mono text-[11px] font-bold">
                        {bannerHighlightCode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Banner Form */}
              <form onSubmit={handleSaveBanner} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">
                      {isAr ? 'نص الإعلان بالعربية *' : 'Announcement Text (Arabic) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={bannerTextAr}
                      onChange={(e) => setBannerTextAr(e.target.value)}
                      placeholder="✨ عرض خاص: استخدم كود OSOOL10 للحصول على خصم 10% على جميع الساعات + توصيل مجاني"
                      className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">
                      {isAr ? 'نص الإعلان بالإنجليزية *' : 'Announcement Text (English) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={bannerTextEn}
                      onChange={(e) => setBannerTextEn(e.target.value)}
                      placeholder="✨ Special Offer: Use code OSOOL10 for 10% OFF all timepieces + free shipping"
                      className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">
                      {isAr ? 'الكود المميز القابل للنسخ السريع (اختياري)' : 'Highlighted Copyable Code (Optional)'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-[#737373]">
                        <Tag className="w-3.5 h-3.5 text-[#C6A76A]" />
                      </div>
                      <input
                        type="text"
                        value={bannerHighlightCode}
                        onChange={(e) => setBannerHighlightCode(e.target.value.toUpperCase())}
                        placeholder="OSOOL10"
                        className="w-full ps-9 pe-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono uppercase focus:border-[#C6A76A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-5">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {bannerSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                      <span>{bannerSaved ? (isAr ? 'تم الحفظ' : 'Saved!') : (isAr ? 'حفظ إعدادات الشريط' : 'Save Banner')}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Promo Codes List Card */}
            <div className="p-6 rounded-lg bg-[#0e0e0e] border border-[#222222] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#F5F3EF]">
                    {isAr ? 'قائمة أكواد الخصم المسجلة' : 'Configured Promo Codes'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#1c1c1c] border border-[#2c2c2c] text-[#C6A76A]">
                    {promoCodes.length}
                  </span>
                </div>
                <span className="text-xs text-[#737373]">
                  {isAr ? 'الأكواد المفعلة يمكن للعملاء إدخالها مباشرة في السلة' : 'Active codes can be redeemed by customers in bag'}
                </span>
              </div>

              {promoCodes.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Tag className="w-10 h-10 text-[#444444] mx-auto" />
                  <p className="text-sm text-[#8c8c8c]">
                    {isAr ? 'لا توجد أكواد خصم مسجلة حالياً' : 'No promo codes configured'}
                  </p>
                  <button
                    onClick={openAddPromoModal}
                    className="px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-colors cursor-pointer"
                  >
                    {isAr ? 'إضافة أول كود خصم' : 'Add First Promo Code'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {promoCodes.map((code) => {
                    const isActive = code.isActive !== false;
                    const dType = getPromoDiscountType(code);
                    const dValue = getPromoDiscountValue(code);
                    const expiry = getPromoExpiry(code);
                    const isPercentage = dType === 'percentage';
                    
                    return (
                      <div
                        key={code.id}
                        className={`p-4 rounded-lg bg-[#121212] border transition-all flex flex-col justify-between gap-3 ${
                          isActive 
                            ? 'border-[#262626] hover:border-[#C6A76A]/40' 
                            : 'border-[#1e1e1e] opacity-60'
                        }`}
                      >
                        {/* Header: Code Badge & Active status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-[#18150c] border border-[#C6A76A]/40 font-mono font-bold text-sm text-[#E8D7B5] tracking-wider">
                              {code.code}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              isPercentage 
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40' 
                                : 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                            }`}>
                              {isPercentage ? `خصم %${dValue}` : `خصم ${dValue} ر.س`}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleTogglePromoStatus(code)}
                            className="text-[#A3A3A3] hover:text-[#F5F3EF] transition-colors cursor-pointer p-1"
                            title={isActive ? (isAr ? 'تعطيل الكود' : 'Deactivate') : (isAr ? 'تفعيل الكود' : 'Activate')}
                          >
                            {isActive ? (
                              <ToggleRight className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <ToggleLeft className="w-6 h-6 text-[#555555]" />
                            )}
                          </button>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                          <p className="text-xs text-[#F5F3EF] font-medium">
                            {isAr ? code.descriptionAr : code.descriptionEn}
                          </p>
                          {isAr && code.descriptionEn && (
                            <p className="text-[11px] text-[#737373]">
                              {code.descriptionEn}
                            </p>
                          )}
                        </div>

                        {/* Details meta */}
                        <div className="pt-2 border-t border-[#1a1a1a] text-[11px] space-y-1 text-[#8c8c8c]">
                          <div className="flex justify-between">
                            <span>{isAr ? 'الحد الأدنى للطلب:' : 'Min Order:'}</span>
                            <span className="font-mono text-[#F5F3EF]">
                              {code.minOrderAmount ? `${code.minOrderAmount} ${isAr ? 'ر.س' : 'SAR'}` : (isAr ? 'بدون حد أدنى' : 'None')}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>{isAr ? 'تاريخ الانتهاء:' : 'Valid Until:'}</span>
                            <span className="font-mono text-[#F5F3EF]">
                              {expiry ? expiry : (isAr ? 'دائم / مستمر' : 'Never')}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>{isAr ? 'مرات الاستخدام الفعلي:' : 'Used Count:'}</span>
                            <span className="font-mono text-[#C6A76A] font-semibold">
                              {code.usageCount || 0} {isAr ? 'طلب' : 'orders'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                            isActive ? 'text-emerald-400' : 'text-stone-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                            {isActive ? (isAr ? 'مفعل وجاهز' : 'Active') : (isAr ? 'معطل مؤقتاً' : 'Inactive')}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditPromoModal(code)}
                              className="p-1.5 rounded bg-[#181818] hover:bg-[#252525] text-[#A3A3A3] hover:text-[#C6A76A] border border-[#262626] transition-colors cursor-pointer"
                              title={isAr ? 'تعديل الكود' : 'Edit Code'}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeletePromoCode(code)}
                              className="p-1.5 rounded bg-[#181818] hover:bg-red-950/60 text-[#A3A3A3] hover:text-red-400 border border-[#262626] transition-colors cursor-pointer"
                              title={isAr ? 'حذف الكود' : 'Delete Code'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Add / Edit Promo Code Modal */}
      {isPromoModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-lg bg-[#0d0d0d] border border-[#262626] rounded-xl shadow-2xl overflow-hidden text-start animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1f1f1f] bg-[#121212]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-[#C6A76A]">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#F5F3EF]">
                    {editingPromoId 
                      ? (isAr ? 'تعديل كود الخصم' : 'Edit Promo Code') 
                      : (isAr ? 'إضافة كود خصم ترويجي جديد' : 'Add New Promo Code')}
                  </h3>
                  <p className="text-xs text-[#8c8c8c]">
                    {isAr ? 'حدد رمز الكود ونوع التخفيض والشروط المطبقة' : 'Set code string, discount type, and conditions'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPromoModalOpen(false)}
                className="p-1.5 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePromoCode} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {promoModalError && (
                <div className="p-3 rounded bg-red-950/50 border border-red-800/70 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{promoModalError}</span>
                </div>
              )}

              {/* Code string */}
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                  {isAr ? 'رمز كود الخصم (Promo Code) *' : 'Promo Code String *'}
                </label>
                <input
                  type="text"
                  required
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  placeholder="e.g. OSOOL20 or RAMADAN"
                  className="w-full px-3 py-2 text-sm rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono uppercase tracking-wider focus:border-[#C6A76A] focus:outline-none"
                />
                <span className="text-[10px] text-[#737373] mt-1 block">
                  {isAr ? 'سيتم تحويل الأحرف إلى الإنجليزية الكبيرة تلقائياً' : 'Will be automatically converted to uppercase'}
                </span>
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'نوع الخصم *' : 'Discount Type *'}
                  </label>
                  <select
                    value={promoDiscountType}
                    onChange={(e) => setPromoDiscountType(e.target.value as DiscountType)}
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  >
                    <option value="percentage">
                      {isAr ? 'نسبة مئوية (%)' : 'Percentage (%)'}
                    </option>
                    <option value="fixed">
                      {isAr ? 'مبلغ ثابت (ر.س)' : 'Fixed Amount (SAR)'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {promoDiscountType === 'percentage' 
                      ? (isAr ? 'نسبة الخصم (%) *' : 'Discount Percentage (%) *')
                      : (isAr ? 'قيمة الخصم (ر.س) *' : 'Discount Value (SAR) *')}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={promoDiscountType === 'percentage' ? 90 : 5000}
                    value={promoDiscountValue}
                    onChange={(e) => setPromoDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Min Order & Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الحد الأدنى للطلب بالريال (0 = بدون حد)' : 'Min Order in SAR (0 = None)'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={promoMinOrder}
                    onChange={(e) => setPromoMinOrder(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'تاريخ انتهاء الصلاحية (اختياري)' : 'Expiration Date (Optional)'}
                  </label>
                  <input
                    type="date"
                    value={promoValidUntil}
                    onChange={(e) => setPromoValidUntil(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                  {isAr ? 'الوصف بالعربية' : 'Description (Arabic)'}
                </label>
                <input
                  type="text"
                  value={promoDescAr}
                  onChange={(e) => setPromoDescAr(e.target.value)}
                  placeholder="مثال: خصم خاص بمناسبة الافتتاح"
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">
                  {isAr ? 'الوصف بالإنجليزية' : 'Description (English)'}
                </label>
                <input
                  type="text"
                  value={promoDescEn}
                  onChange={(e) => setPromoDescEn(e.target.value)}
                  placeholder="e.g. Special launch discount"
                  className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                />
              </div>

              {/* Active status */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#1e1e1e]">
                <input
                  type="checkbox"
                  id="promoActiveCheck"
                  checked={promoIsActive}
                  onChange={(e) => setPromoIsActive(e.target.checked)}
                  className="w-4 h-4 accent-[#C6A76A] rounded"
                />
                <label htmlFor="promoActiveCheck" className="text-xs text-[#F5F3EF] cursor-pointer">
                  {isAr ? 'تفعيل الكود فوراً ليكون متاحاً للعملاء في السلة' : 'Activate promo code immediately for customers'}
                </label>
              </div>

              {/* Form Buttons */}
              <div className="p-4 border-t border-[#1f1f1f] bg-[#121212] flex items-center justify-end gap-3 -mx-6 -mb-6">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] rounded border border-[#2a2a2a] transition-colors cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingPromoId ? (isAr ? 'تحديث الكود' : 'Update Code') : (isAr ? 'حفظ الكود ونشره' : 'Save & Publish Code')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal Form */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative w-full max-w-3xl bg-[#0d0d0d] border border-[#262626] rounded-xl shadow-2xl overflow-hidden text-start"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1f1f1f] bg-[#121212]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#1c1c1c] border border-[#2a2a2a] flex items-center justify-center text-[#C6A76A]">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#F5F3EF]">
                    {editingProductId 
                      ? (isAr ? 'تعديل بيانات الساعة' : 'Edit Timepiece') 
                      : (isAr ? 'إضافة ساعة جديدة للمتجر' : 'Add New Timepiece to Store')}
                  </h3>
                  <p className="text-xs text-[#8c8c8c]">
                    {isAr ? 'أدخل تفاصيل ومواصفات الساعة باللغتين العربية والإنجليزية' : 'Configure Arabic & English product specifications'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded bg-[#1a1a1a] hover:bg-[#262626] text-[#A3A3A3] hover:text-[#F5F3EF] border border-[#2a2a2a] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Product Titles & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'اسم المنتج بالإنجليزية *' : 'Product Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. OSOOL Royale Gold"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'اسم المنتج بالعربية *' : 'Product Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="مثال: أصول رويال جولد"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'السعر بالريال السعودي (SAR) *' : 'Price in SAR *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={priceSAR}
                    onChange={(e) => setPriceSAR(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] font-mono focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'التصنيف' : 'Category'}
                  </label>
                  <input
                    type="text"
                    value={categoryAr}
                    onChange={(e) => setCategoryAr(e.target.value)}
                    placeholder="ساعة كلاسيكية بسيطة"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Taglines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الشعار الفرعي (عربي)' : 'Tagline (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={taglineAr}
                    onChange={(e) => setTaglineAr(e.target.value)}
                    placeholder="ساعة فاخرة بلمسات هادئة"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الشعار الفرعي (إنجليزي)' : 'Tagline (English)'}
                  </label>
                  <input
                    type="text"
                    value={taglineEn}
                    onChange={(e) => setTaglineEn(e.target.value)}
                    placeholder="Minimalist Luxury Timepiece"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الوصف المختصر (عربي)' : 'Short Description (Arabic)'}
                  </label>
                  <textarea
                    rows={2}
                    value={shortDescriptionAr}
                    onChange={(e) => setShortDescriptionAr(e.target.value)}
                    placeholder="تعبير راقٍ عن الفخامة الهادئة..."
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">
                    {isAr ? 'الوصف المختصر (إنجليزي)' : 'Short Description (English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={shortDescriptionEn}
                    onChange={(e) => setShortDescriptionEn(e.target.value)}
                    placeholder="Engineered for effortless everyday sophistication..."
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Selection Presets & Custom URL */}
              <div className="space-y-3 pt-2 border-t border-[#1e1e1e]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#C6A76A] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{isAr ? 'اختيار صورة المنتج' : 'Select Product Photography'}</span>
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    {isAr ? 'اختر من تصاميم أصول الجاهزة أو ضع رابط صورة خاص بك' : 'Choose luxury preset or custom URL'}
                  </span>
                </div>

                {/* Preset Thumbnails */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {PRESET_WATCH_IMAGES.map((preset, idx) => {
                    const isSelected = selectedImageSrc === preset.src && !customImageUrl;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setSelectedImageSrc(preset.src);
                          setCustomImageUrl('');
                        }}
                        className={`relative aspect-4/3 rounded overflow-hidden border transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#C6A76A] ring-2 ring-[#C6A76A]/40' 
                            : 'border-[#262626] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.src}
                          alt={preset.labelEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 end-1 w-4 h-4 rounded-full bg-[#C6A76A] text-[#050505] flex items-center justify-center text-[10px]">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Custom URL Input */}
                <div>
                  <label className="block text-xs text-[#8c8c8c] mb-1">
                    {isAr ? 'أو ضع رابط صورة مباشر (URL):' : 'Or paste a direct image URL:'}
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://example.com/watch-photo.jpg"
                    className="w-full px-3 py-2 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] placeholder-[#555555] focus:border-[#C6A76A] focus:outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3 pt-2 border-t border-[#1e1e1e]">
                <span className="text-xs font-semibold text-[#C6A76A] uppercase tracking-wider block">
                  {isAr ? 'المواصفات الفنية' : 'Technical Specifications'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A3A3A3] mb-1">
                      {isAr ? 'قطر الهيكل (Case Diameter)' : 'Case Diameter'}
                    </label>
                    <input
                      type="text"
                      value={caseDiameter}
                      onChange={(e) => setCaseDiameter(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A3A3A3] mb-1">
                      {isAr ? 'سُمك الهيكل (Case Profile)' : 'Case Profile'}
                    </label>
                    <input
                      type="text"
                      value={caseProfile}
                      onChange={(e) => setCaseProfile(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A3A3A3] mb-1">
                      {isAr ? 'الحزام (Strap Material)' : 'Strap Material'}
                    </label>
                    <input
                      type="text"
                      value={strapMaterial}
                      onChange={(e) => setStrapMaterial(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A3A3A3] mb-1">
                      {isAr ? 'ماكينة الساعة (Movement Type)' : 'Movement Type'}
                    </label>
                    <input
                      type="text"
                      value={movementType}
                      onChange={(e) => setMovementType(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded bg-[#141414] border border-[#2a2a2a] text-[#F5F3EF] focus:border-[#C6A76A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1e1e1e]">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#C6A76A] rounded"
                />
                <label htmlFor="inStockCheck" className="text-xs text-[#F5F3EF] cursor-pointer">
                  {isAr ? 'المنتج متوفر للطلب الفوري في المتجر (In Stock)' : 'Product is In Stock and ready for immediate WhatsApp orders'}
                </label>
              </div>

              {/* Form Buttons */}
              <div className="p-4 border-t border-[#1f1f1f] bg-[#121212] flex items-center justify-end gap-3 -mx-6 -mb-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs text-[#A3A3A3] hover:text-[#F5F3EF] rounded border border-[#2a2a2a] transition-colors cursor-pointer"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingProductId ? (isAr ? 'تحديث المنتج' : 'Update Watch') : (isAr ? 'نشر المنتج في المتجر' : 'Publish Watch to Store')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
