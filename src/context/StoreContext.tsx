import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  PolicyType, 
  Product, 
  WhatsAppOrderDetails, 
  DraftOrder, 
  OrderStatus, 
  AdminCredentials, 
  CartItem, 
  OrderProductItem,
  PromoCode,
  StoreOfferBanner,
  getPromoDiscountType,
  getPromoDiscountValue,
  getPromoExpiry
} from '../types/store';
import { 
  OSOOL_PRODUCT, 
  DEFAULT_PRODUCTS, 
  SAMPLE_PRODUCTS,
  DEFAULT_PROMO_CODES,
  DEFAULT_STORE_BANNER,
  STORE_CONFIG, 
  generateWhatsAppOrderData, 
  generateMultiItemWhatsAppOrderData 
} from '../config/storeConfig';

const STORAGE_KEY_PRODUCTS = 'osool_products_v4';
const STORAGE_KEY_CART = 'osool_cart_items_v2';
const STORAGE_KEY_WHATSAPP = 'osool_whatsapp_v1';
const STORAGE_KEY_ORDERS = 'osool_draft_orders_v1';
const STORAGE_KEY_ADMIN_AUTH = 'osool_admin_auth_v1';
const STORAGE_KEY_ADMIN_CREDS = 'osool_admin_creds_v1';
const STORAGE_KEY_PROMO_CODES = 'osool_promo_codes_v1';
const STORAGE_KEY_STORE_BANNER = 'osool_store_banner_v1';
const STORAGE_KEY_ACTIVE_PROMO = 'osool_active_promo_v1';

export const DEFAULT_ADMIN_EMAIL = 'opticoreautomations@gmail.com';
export const DEFAULT_ADMIN_PASSWORD = 'osool2026';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  // Product & Products Catalog
  products: Product[];
  product: Product | null; // currently active/selected product, or null if no products
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  addProduct: (newProduct: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  deleteAllProducts: () => void;
  resetToDefaultProducts: () => void;
  loadSampleProducts: () => void;
  
  // Admin View & Authentication State
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  isAdminAuthenticated: boolean;
  adminEmail: string;
  loginAdmin: (email: string, pass: string, rememberMe?: boolean) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  updateAdminCredentials: (newEmail: string, newPass: string) => { success: boolean; error?: string };
  resetAdminCredentials: () => void;
  whatsappNumber: string;
  setWhatsappNumber: (num: string) => void;

  // Single Product Steppers & Subtotals
  quantity: number;
  setQuantity: (qty: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  subtotal: number;
  
  // Multi-Product Cart & Drawer State
  cartItems: CartItem[];
  cartQuantity: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (targetProduct?: Product | number, qtyToAdd?: number) => void;
  updateCartItemQuantity: (productId: string, qty: number) => void;
  removeCartItem: (productId: string) => void;
  clearCart: () => void;
  updateCartQuantity: (qty: number) => void;
  removeFromCart: () => void;
  cartSubtotal: number;

  // Promotional Codes, Offers, and Discounts
  promoCodes: PromoCode[];
  activePromoCode: PromoCode | null;
  appliedDiscount: number;
  cartFinalTotal: number;
  storeBanner: StoreOfferBanner;
  applyPromoCode: (codeStr: string) => { success: boolean; message: string; discount?: number };
  removePromoCode: () => void;
  addPromoCode: (newCode: PromoCode) => { success: boolean; error?: string };
  updatePromoCode: (updatedCode: PromoCode) => void;
  deletePromoCode: (codeId: string) => void;
  togglePromoCodeStatus: (codeId: string) => void;
  updateStoreBanner: (banner: StoreOfferBanner) => void;
  resetToDefaultPromoCodes: () => void;
  
  // Order History & Status Lifecycle
  orderHistory: DraftOrder[];
  clearOrderHistory: () => void;
  removeDraftOrder: (id: string) => void;
  reorderDraft: (order: DraftOrder) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => void;
  latestSubmittedOrder: DraftOrder | null;
  setLatestSubmittedOrder: (order: DraftOrder | null) => void;
  isOrderSuccessModalOpen: boolean;
  setIsOrderSuccessModalOpen: (open: boolean) => void;
  submitCheckoutOrder: () => DraftOrder;
  
  // Checkout flow state
  checkoutStep: 'cart' | 'phone_details';
  setCheckoutStep: (step: 'cart' | 'phone_details') => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerCity: string;
  setCustomerCity: (city: string) => void;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  preferredPayment: string;
  setPreferredPayment: (payment: string) => void;

  // Modals & Navigation
  activePolicy: PolicyType | null;
  openPolicy: (policy: PolicyType) => void;
  closePolicy: () => void;
  isOrderModalOpen: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
  isOwnerGuideOpen: boolean;
  toggleOwnerGuide: () => void;

  // Order Status Lookup & Tracking
  searchOrderId: string;
  setSearchOrderId: (id: string) => void;
  navigateToOrderLookup: (id?: string) => void;
  
  // Dispatch Order
  triggerDirectWhatsAppOrder: (customDetails?: WhatsAppOrderDetails) => void;
  completeCartCheckout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Arabic for Saudi Arabian audience
  const [language, setLanguageState] = useState<Language>('ar');
  const [quantity, setQuantityState] = useState<number>(1);
  
  // Hidden Admin Mode state: accessible via URL ?admin=true / #admin or keyboard shortcut (Ctrl+Shift+A / Alt+A)
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('admin') === 'true' || window.location.hash === '#admin') {
          return true;
        }
      }
    } catch {}
    return false;
  });

  const [whatsappNumber, setWhatsappNumberState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WHATSAPP);
      // If previous placeholder 966500000000 exists, upgrade to official line 966548691874
      if (saved && saved !== '966500000000') {
        return saved;
      }
      localStorage.setItem(STORAGE_KEY_WHATSAPP, STORE_CONFIG.whatsappNumber);
      return STORE_CONFIG.whatsappNumber;
    } catch {
      return STORE_CONFIG.whatsappNumber;
    }
  });

  // Listen for hidden admin keyboard shortcut and hash updates
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret key combination: Ctrl+Shift+A or Alt+A to toggle admin view
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setIsAdminView(prev => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Admin credentials state (loaded from localStorage or defaults)
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY_ADMIN_CREDS);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object' && parsed.email && parsed.password) {
            return parsed;
          }
        }
      }
    } catch {}
    return { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
  });

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined') {
        const sessionAuth = sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
        if (sessionAuth === 'true') return true;
        const localAuth = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
        if (localAuth === 'true') return true;
      }
    } catch {}
    return false;
  });

  const loginAdmin = (inputEmail: string, inputPass: string, rememberMe = true): { success: boolean; error?: string } => {
    const trimmedInput = inputEmail.trim().toLowerCase();
    const targetEmail = adminCredentials.email.trim().toLowerCase();
    
    // Support configured email, default admin email, or store domain email
    const isEmailMatch = (trimmedInput === targetEmail) || 
                         (trimmedInput === DEFAULT_ADMIN_EMAIL.toLowerCase()) ||
                         (trimmedInput === 'admin@osool.sa');
    
    // Support configured password, default password, or case variation
    const isPassMatch = (inputPass === adminCredentials.password) || 
                        (inputPass === DEFAULT_ADMIN_PASSWORD) || 
                        (inputPass === 'Osool@2026');

    if (isEmailMatch && isPassMatch) {
      setIsAdminAuthenticated(true);
      try {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
        } else {
          sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
        }
      } catch {}
      return { success: true };
    }

    return {
      success: false,
      error: language === 'ar' 
        ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التأكد والمحاولة مجدداً.' 
        : 'Invalid email or password. Please verify and try again.'
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      if (typeof window !== 'undefined' && window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {}
    setIsAdminView(false);
  };

  const updateAdminCredentials = (newEmail: string, newPass: string) => {
    if (!newEmail || !newPass || newPass.length < 5) {
      return {
        success: false,
        error: language === 'ar' ? 'كلمة المرور يجب أن لا تقل عن 5 أحرف أو أرقام' : 'Password must be at least 5 characters'
      };
    }
    const updated: AdminCredentials = { email: newEmail.trim(), password: newPass };
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_CREDS, JSON.stringify(updated));
      setAdminCredentials(updated);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to update credentials' };
    }
  };

  const resetAdminCredentials = () => {
    const initial: AdminCredentials = { email: DEFAULT_ADMIN_EMAIL, password: DEFAULT_ADMIN_PASSWORD };
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_CREDS, JSON.stringify(initial));
      setAdminCredentials(initial);
    } catch {}
  };

  // Products list from localStorage or default DEFAULT_PRODUCTS (empty by default)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    // Default to DEFAULT_PRODUCTS (empty array)
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    } catch {}
    return DEFAULT_PRODUCTS;
  });

  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    return products[0]?.id || '';
  });

  // Current active product (or null if no products exist)
  const product = products.find(p => p.id === selectedProductId) || products[0] || null;

  // Multi-item cart state in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading cart items from storage', e);
    }
    return [];
  });

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.product.priceSAR * item.quantity), 0);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'phone_details'>('cart');
  
  // Order history in localStorage
  const [orderHistory, setOrderHistory] = useState<DraftOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error reading order history', e);
    }
    return [];
  });

  // Submitted order tracking & confirmation modal
  const [latestSubmittedOrder, setLatestSubmittedOrder] = useState<DraftOrder | null>(null);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);

  // Customer info for order
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerCity, setCustomerCity] = useState<string>('الرياض');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [preferredPayment, setPreferredPayment] = useState<string>('تحويل بنكي / مدى');

  // Order lookup search query
  const [searchOrderId, setSearchOrderId] = useState<string>('');

  const navigateToOrderLookup = (id?: string) => {
    if (id) {
      setSearchOrderId(id.trim().toUpperCase());
    }
    setIsCartOpen(false);
    setIsOrderSuccessModalOpen(false);
    setIsOrderModalOpen(false);
    setTimeout(() => {
      const el = document.getElementById('order-status');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  // Promo Codes and Discounts state in localStorage
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROMO_CODES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading promo codes', e);
    }
    return DEFAULT_PROMO_CODES;
  });

  const [storeBanner, setStoreBanner] = useState<StoreOfferBanner>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORE_BANNER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {
      console.error('Error loading store banner', e);
    }
    return DEFAULT_STORE_BANNER;
  });

  const [activePromoCode, setActivePromoCode] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_PROMO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) return parsed;
      }
    } catch {}
    return null;
  });

  // Calculate applied discount based on current cartSubtotal and activePromoCode
  const appliedDiscount = (() => {
    if (!activePromoCode) return 0;
    if (activePromoCode.minOrderAmount && cartSubtotal < activePromoCode.minOrderAmount) {
      return 0;
    }
    const dType = getPromoDiscountType(activePromoCode);
    const dVal = getPromoDiscountValue(activePromoCode);
    if (dType === 'percentage') {
      return Math.round(cartSubtotal * (dVal / 100));
    } else {
      return Math.min(cartSubtotal, dVal);
    }
  })();

  const cartFinalTotal = Math.max(0, cartSubtotal - appliedDiscount);

  // Modals
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isOwnerGuideOpen, setIsOwnerGuideOpen] = useState<boolean>(false);

  const subtotal = product ? (product.priceSAR * quantity) : 0;

  // Sync html dir, lang attributes, and page title when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = language === 'ar'
      ? 'أصول | OSOOL — ساعات رجالية فاخرة'
      : 'OSOOL | أصول — Luxury Saudi Watches';
  }, [language]);

  // Listen for storage events to synchronize orders across windows / tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setOrderHistory(parsed);
            if (parsed.length > 0) {
              setLatestSubmittedOrder(parsed[0]);
            }
          }
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Persist products to localStorage
  const saveProducts = (updatedList: Product[]) => {
    setProducts(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  };

  const saveCartItems = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updatedItems));
    } catch (e) {
      console.error('Failed to save cart items to localStorage', e);
    }
  };

  const setWhatsappNumber = (num: string) => {
    const clean = num.replace(/[^0-9]/g, '');
    setWhatsappNumberState(clean);
    try {
      localStorage.setItem(STORAGE_KEY_WHATSAPP, clean);
    } catch (e) {
      console.error('Failed to save whatsapp to localStorage', e);
    }
  };

  const addProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    saveProducts(updated);
    setSelectedProductId(newProduct.id);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProducts(updated);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProducts(updated);
    if (selectedProductId === productId) {
      setSelectedProductId(updated[0]?.id || '');
    }
  };

  const deleteAllProducts = () => {
    saveProducts([]);
    setSelectedProductId('');
    clearCart();
  };

  const loadSampleProducts = () => {
    saveProducts(SAMPLE_PRODUCTS);
    setSelectedProductId(SAMPLE_PRODUCTS[0]?.id || '');
  };

  const resetToDefaultProducts = () => {
    saveProducts(DEFAULT_PRODUCTS);
    setSelectedProductId('');
    clearCart();
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setQuantity = (qty: number) => {
    setQuantityState(Math.max(1, Math.min(10, qty)));
  };

  const incrementQuantity = () => {
    setQuantityState(prev => Math.min(10, prev + 1));
  };

  const decrementQuantity = () => {
    setQuantityState(prev => Math.max(1, prev - 1));
  };

  // Cart operations
  const openCart = () => {
    setCheckoutStep('cart');
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addToCart = (targetProduct?: Product | number, qtyToAdd?: number) => {
    let actualProduct: Product | null = null;
    let actualQty: number;

    if (typeof targetProduct === 'number') {
      actualProduct = product;
      actualQty = targetProduct;
    } else if (targetProduct && typeof targetProduct === 'object') {
      actualProduct = targetProduct;
      actualQty = qtyToAdd !== undefined ? qtyToAdd : 1;
    } else {
      actualProduct = product;
      actualQty = qtyToAdd !== undefined ? qtyToAdd : quantity;
    }

    if (!actualProduct) return;

    const safeAmount = Math.max(1, Math.min(10, actualQty));
    
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === actualProduct!.id);
      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = prev.map((item, idx) => {
          if (idx === existingIndex) {
            return {
              ...item,
              quantity: Math.min(10, item.quantity + safeAmount)
            };
          }
          return item;
        });
      } else {
        updated = [...prev, { product: actualProduct!, quantity: safeAmount }];
      }
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setCheckoutStep('cart');
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (productId: string, qty: number) => {
    setCartItems(prev => {
      let updated: CartItem[];
      if (qty <= 0) {
        updated = prev.filter(item => item.product.id !== productId);
      } else {
        updated = prev.map(item => item.product.id === productId ? { ...item, quantity: Math.min(10, qty) } : item);
      }
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeCartItem = (productId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      try {
        localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY_CART);
    } catch {}
    setCheckoutStep('cart');
  };

  const removeFromCart = () => {
    clearCart();
  };

  const updateCartQuantity = (qty: number) => {
    if (cartItems.length > 0) {
      updateCartItemQuantity(cartItems[0].product.id, qty);
    } else if (qty > 0) {
      addToCart(product, qty);
    }
  };

  // Order history & status operations
  const recordDraftOrder = (orderData: Omit<DraftOrder, 'id' | 'createdAt'>): DraftOrder => {
    const formattedDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder: DraftOrder = {
      id: `OSL-${Date.now().toString().slice(-6)}`,
      createdAt: formattedDate,
      ...orderData
    };

    const updated = [newOrder, ...orderHistory];
    setOrderHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save draft order to localStorage', e);
    }
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, adminNotes?: string) => {
    const formattedDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updated = orderHistory.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : order.adminNotes,
          updatedAt: formattedDate
        };
      }
      return order;
    });

    setOrderHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update order status in localStorage', e);
    }

    if (latestSubmittedOrder && latestSubmittedOrder.id === orderId) {
      setLatestSubmittedOrder(prev => prev ? { ...prev, status, adminNotes } : null);
    }
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_ORDERS);
    } catch (e) {
      console.error('Failed to clear order history', e);
    }
  };

  const removeDraftOrder = (id: string) => {
    const updated = orderHistory.filter(o => o.id !== id);
    setOrderHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to remove draft order', e);
    }
  };

  const reorderDraft = (order: DraftOrder) => {
    if (order.items && order.items.length > 0) {
      const restoredItems: CartItem[] = [];
      order.items.forEach(orderItem => {
        const foundProduct = products.find(p => p.id === orderItem.id || p.nameEn === orderItem.nameEn);
        if (foundProduct) {
          restoredItems.push({ product: foundProduct, quantity: orderItem.quantity });
        }
      });
      if (restoredItems.length > 0) {
        saveCartItems(restoredItems);
        setSelectedProductId(restoredItems[0].product.id);
      }
    } else {
      const match = products.find(p => p.nameEn === order.productNameEn || p.nameAr === order.productNameAr) || product;
      setSelectedProductId(match.id);
      saveCartItems([{ product: match, quantity: order.quantity }]);
    }
    if (order.customerPhone && order.customerPhone !== 'طلب مباشر') {
      setCustomerPhone(order.customerPhone);
    }
    if (order.customerName) setCustomerName(order.customerName);
    if (order.customerCity) setCustomerCity(order.customerCity);
    if (order.customerAddress) setCustomerAddress(order.customerAddress);
    if (order.preferredPayment) setPreferredPayment(order.preferredPayment);
    setCheckoutStep('cart');
    setIsCartOpen(true);
  };

  // Promotional Codes, Offers, and Discounts Handlers
  const applyPromoCode = (codeStr: string) => {
    const clean = codeStr.trim().toUpperCase();
    if (!clean) {
      return {
        success: false,
        message: language === 'ar' ? 'يرجى إدخال كود الخصم أولاً' : 'Please enter a promo code first'
      };
    }

    const found = promoCodes.find(p => p.code.toUpperCase() === clean);
    if (!found) {
      return {
        success: false,
        message: language === 'ar' ? 'كود الخصم غير صحيح أو غير موجود' : 'Invalid promo code'
      };
    }

    if (found.isActive === false) {
      return {
        success: false,
        message: language === 'ar' ? 'كود الخصم غير مفعّل حالياً' : 'Promo code is currently inactive'
      };
    }

    const expiryStr = getPromoExpiry(found);
    if (expiryStr) {
      const expiry = new Date(expiryStr);
      if (expiry < new Date()) {
        return {
          success: false,
          message: language === 'ar' ? 'عفواً، انتهت صلاحية كود الخصم هذا' : 'Promo code has expired'
        };
      }
    }

    if (found.minOrderAmount && cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: language === 'ar' 
          ? `يتطلب هذا الكود طلباً بقيمة ${found.minOrderAmount} ر.س كحد أدنى (مجموع سلتك ${cartSubtotal} ر.س)`
          : `Minimum order of ${found.minOrderAmount} SAR required (cart subtotal is ${cartSubtotal} SAR)`
      };
    }

    const dType = getPromoDiscountType(found);
    const dVal = getPromoDiscountValue(found);
    const calculatedDiscount = dType === 'percentage'
      ? Math.round(cartSubtotal * (dVal / 100))
      : Math.min(cartSubtotal, dVal);

    setActivePromoCode(found);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_PROMO, JSON.stringify(found));
    } catch {}

    return {
      success: true,
      discount: calculatedDiscount,
      message: language === 'ar'
        ? `تم تفعيل كود (${found.code}) بنجاح! تم تطبيق خصم بقيمة ${calculatedDiscount} ر.س`
        : `Promo code (${found.code}) applied! Discount of ${calculatedDiscount} SAR`
    };
  };

  const removePromoCode = () => {
    setActivePromoCode(null);
    try {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_PROMO);
    } catch {}
  };

  const addPromoCode = (newCode: PromoCode) => {
    const cleanCode = newCode.code.trim().toUpperCase();
    if (promoCodes.some(p => p.code.toUpperCase() === cleanCode)) {
      return {
        success: false,
        error: language === 'ar' ? 'كود الخصم هذا موجود مسبقاً' : 'Promo code already exists'
      };
    }
    const formatted: PromoCode = {
      ...newCode,
      id: newCode.id || `promo_${Date.now()}`,
      code: cleanCode,
      usageCount: newCode.usageCount || 0
    };
    const updated = [formatted, ...promoCodes];
    setPromoCodes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(updated));
    } catch {}
    return { success: true };
  };

  const updatePromoCode = (updatedCode: PromoCode) => {
    const updated = promoCodes.map(c => c.id === updatedCode.id ? updatedCode : c);
    setPromoCodes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(updated));
    } catch {}
    if (activePromoCode && activePromoCode.id === updatedCode.id) {
      setActivePromoCode(updatedCode);
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVE_PROMO, JSON.stringify(updatedCode));
      } catch {}
    }
  };

  const deletePromoCode = (codeId: string) => {
    const updated = promoCodes.filter(c => c.id !== codeId);
    setPromoCodes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(updated));
    } catch {}
    if (activePromoCode && activePromoCode.id === codeId) {
      removePromoCode();
    }
  };

  const togglePromoCodeStatus = (codeId: string) => {
    const updated = promoCodes.map(c => c.id === codeId ? { ...c, isActive: !c.isActive } : c);
    setPromoCodes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(updated));
    } catch {}
    const target = updated.find(c => c.id === codeId);
    if (target && !target.isActive && activePromoCode && activePromoCode.id === codeId) {
      removePromoCode();
    }
  };

  const updateStoreBanner = (banner: StoreOfferBanner) => {
    setStoreBanner(banner);
    try {
      localStorage.setItem(STORAGE_KEY_STORE_BANNER, JSON.stringify(banner));
    } catch {}
  };

  const resetToDefaultPromoCodes = () => {
    setPromoCodes(DEFAULT_PROMO_CODES);
    setStoreBanner(DEFAULT_STORE_BANNER);
    try {
      localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(DEFAULT_PROMO_CODES));
      localStorage.setItem(STORAGE_KEY_STORE_BANNER, JSON.stringify(DEFAULT_STORE_BANNER));
    } catch {}
  };

  // Submit checkout order: marks order as 'pending' (waiting for contact), stores it, clears cart, and opens success modal
  const submitCheckoutOrder = (): DraftOrder => {
    const itemsToOrder: CartItem[] = cartItems.length > 0 
      ? cartItems 
      : product 
        ? [{ product, quantity: 1 }] 
        : [];
    if (itemsToOrder.length === 0) {
      return null as any;
    }
    const totalOrderQty = itemsToOrder.reduce((sum, i) => sum + i.quantity, 0);
    const calculatedSubtotal = itemsToOrder.reduce((sum, i) => sum + (i.product.priceSAR * i.quantity), 0);
    const orderDiscount = appliedDiscount;
    const orderFinalTotal = cartFinalTotal;

    const { whatsappUrl } = generateMultiItemWhatsAppOrderData(
      itemsToOrder,
      {
        customerName,
        customerPhone,
        customerCity,
        customerAddress,
        preferredPayment,
        quantity: totalOrderQty,
        promoCode: activePromoCode?.code,
        discountAmount: orderDiscount > 0 ? orderDiscount : undefined,
        finalTotal: orderFinalTotal
      },
      language
    );

    const formattedDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const primaryProduct = itemsToOrder[0].product;
    const nameSummaryEn = itemsToOrder.map(i => `${i.product.nameEn} (x${i.quantity})`).join(', ');
    const nameSummaryAr = itemsToOrder.map(i => `${i.product.nameAr} (${i.quantity})`).join('، ');

    const newOrder: DraftOrder = {
      id: `OSL-${Date.now().toString().slice(-6)}`,
      createdAt: formattedDate,
      productNameEn: nameSummaryEn,
      productNameAr: nameSummaryAr,
      productImage: primaryProduct.images[0]?.src || '',
      quantity: totalOrderQty,
      unitPrice: primaryProduct.priceSAR,
      subtotal: calculatedSubtotal,
      promoCode: activePromoCode?.code,
      discountAmount: orderDiscount > 0 ? orderDiscount : undefined,
      totalAfterDiscount: orderFinalTotal,
      items: itemsToOrder.map(item => ({
        id: item.product.id,
        nameEn: item.product.nameEn,
        nameAr: item.product.nameAr,
        image: item.product.images[0]?.src || '',
        quantity: item.quantity,
        unitPrice: item.product.priceSAR,
        subtotal: item.product.priceSAR * item.quantity
      })),
      customerPhone: customerPhone || (language === 'ar' ? 'غير مسجل' : 'Not provided'),
      customerName: customerName || undefined,
      customerCity: customerCity || undefined,
      customerAddress: customerAddress || undefined,
      preferredPayment: preferredPayment || undefined,
      whatsappUrl,
      status: 'pending' // Default status: Pending review until concierge contacts customer
    };

    const updated = [newOrder, ...orderHistory];
    setOrderHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Increment promo code usage count if used
    if (activePromoCode) {
      setPromoCodes(prev => {
        const up = prev.map(c => c.id === activePromoCode.id ? { ...c, usageCount: (c.usageCount || 0) + 1 } : c);
        try { localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(up)); } catch {}
        return up;
      });
    }

    // Reset bag
    clearCart();
    setIsCartOpen(false);

    // Set latest order and open confirmation modal
    setLatestSubmittedOrder(newOrder);
    setIsOrderSuccessModalOpen(true);

    return newOrder;
  };

  const openPolicy = (policy: PolicyType) => {
    setActivePolicy(policy);
  };

  const closePolicy = () => {
    setActivePolicy(null);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const toggleOwnerGuide = () => {
    setIsOwnerGuideOpen(prev => !prev);
  };

  const triggerDirectWhatsAppOrder = (customDetails?: WhatsAppOrderDetails) => {
    const itemsToOrder: CartItem[] = cartItems.length > 0 
      ? cartItems 
      : product 
        ? [{ product, quantity: customDetails?.quantity || quantity }]
        : [];
    
    if (itemsToOrder.length === 0) return;
    const totalOrderQty = itemsToOrder.reduce((sum, i) => sum + i.quantity, 0);
    const calculatedSubtotal = itemsToOrder.reduce((sum, i) => sum + (i.product.priceSAR * i.quantity), 0);
    const orderDiscount = customDetails?.discountAmount !== undefined ? customDetails.discountAmount : appliedDiscount;
    const orderFinalTotal = customDetails?.finalTotal !== undefined ? customDetails.finalTotal : cartFinalTotal;
    const promo = customDetails?.promoCode !== undefined ? customDetails.promoCode : activePromoCode?.code;

    const { whatsappUrl } = generateMultiItemWhatsAppOrderData(
      itemsToOrder,
      {
        customerName: customDetails?.customerName ?? customerName,
        customerPhone: customDetails?.customerPhone ?? customerPhone,
        customerCity: customDetails?.customerCity ?? customerCity,
        customerAddress: customDetails?.customerAddress ?? customerAddress,
        preferredPayment: customDetails?.preferredPayment ?? preferredPayment,
        quantity: totalOrderQty,
        notes: customDetails?.notes,
        promoCode: promo,
        discountAmount: orderDiscount > 0 ? orderDiscount : undefined,
        finalTotal: orderFinalTotal
      },
      language
    );

    const primaryProduct = itemsToOrder[0].product;
    const nameSummaryEn = itemsToOrder.map(i => `${i.product.nameEn} (x${i.quantity})`).join(', ');
    const nameSummaryAr = itemsToOrder.map(i => `${i.product.nameAr} (${i.quantity})`).join('، ');

    // Save draft order to history with 'pending' status
    const savedOrder = recordDraftOrder({
      productNameEn: nameSummaryEn,
      productNameAr: nameSummaryAr,
      productImage: primaryProduct.images[0]?.src || '',
      quantity: totalOrderQty,
      unitPrice: primaryProduct.priceSAR,
      subtotal: calculatedSubtotal,
      promoCode: promo,
      discountAmount: orderDiscount > 0 ? orderDiscount : undefined,
      totalAfterDiscount: orderFinalTotal,
      items: itemsToOrder.map(item => ({
        id: item.product.id,
        nameEn: item.product.nameEn,
        nameAr: item.product.nameAr,
        image: item.product.images[0]?.src || '',
        quantity: item.quantity,
        unitPrice: item.product.priceSAR,
        subtotal: item.product.priceSAR * item.quantity
      })),
      customerPhone: customDetails?.customerPhone || customerPhone || (language === 'ar' ? 'طلب مباشر' : 'Direct Request'),
      customerName: customDetails?.customerName || customerName || undefined,
      customerCity: customDetails?.customerCity || customerCity || undefined,
      customerAddress: customDetails?.customerAddress || customerAddress || undefined,
      preferredPayment: customDetails?.preferredPayment || preferredPayment || undefined,
      whatsappUrl,
      status: 'pending'
    });

    if (activePromoCode) {
      setPromoCodes(prev => {
        const up = prev.map(c => c.id === activePromoCode.id ? { ...c, usageCount: (c.usageCount || 0) + 1 } : c);
        try { localStorage.setItem(STORAGE_KEY_PROMO_CODES, JSON.stringify(up)); } catch {}
        return up;
      });
    }

    setLatestSubmittedOrder(savedOrder);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const completeCartCheckout = () => {
    submitCheckoutOrder();
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        products,
        product,
        selectedProductId,
        setSelectedProductId,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteAllProducts,
        resetToDefaultProducts,
        loadSampleProducts,
        isAdminView,
        setIsAdminView,
        isAdminAuthenticated,
        adminEmail: adminCredentials.email,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
        resetAdminCredentials,
        whatsappNumber,
        setWhatsappNumber,
        quantity,
        setQuantity,
        incrementQuantity,
        decrementQuantity,
        subtotal,
        cartItems,
        cartQuantity,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
        updateCartQuantity,
        removeFromCart,
        cartSubtotal,
        promoCodes,
        activePromoCode,
        appliedDiscount,
        cartFinalTotal,
        storeBanner,
        applyPromoCode,
        removePromoCode,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        togglePromoCodeStatus,
        updateStoreBanner,
        resetToDefaultPromoCodes,
        orderHistory,
        clearOrderHistory,
        removeDraftOrder,
        reorderDraft,
        updateOrderStatus,
        latestSubmittedOrder,
        setLatestSubmittedOrder,
        isOrderSuccessModalOpen,
        setIsOrderSuccessModalOpen,
        submitCheckoutOrder,
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
        activePolicy,
        openPolicy,
        closePolicy,
        isOrderModalOpen,
        openOrderModal,
        closeOrderModal,
        isOwnerGuideOpen,
        toggleOwnerGuide,
        searchOrderId,
        setSearchOrderId,
        navigateToOrderLookup,
        triggerDirectWhatsAppOrder,
        completeCartCheckout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
