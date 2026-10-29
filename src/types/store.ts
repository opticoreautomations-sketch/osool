export type Language = 'ar' | 'en';

export interface ProductSpecification {
  id: string;
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
  isPlaceholderNote?: boolean;
}

export interface ProductImage {
  id: string;
  src: string;
  altEn: string;
  altAr: string;
  labelEn: string;
  labelAr: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  categoryEn: string;
  categoryAr: string;
  priceSAR: number;
  currencyEn: string;
  currencyAr: string;
  inStock: boolean;
  stockStatusEn: string;
  stockStatusAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  fullDescriptionEn: string;
  fullDescriptionAr: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  isConfigurableNote?: boolean;
}

export interface WhatsAppOrderDetails {
  customerName?: string;
  customerPhone?: string;
  customerCity?: string;
  customerAddress?: string;
  preferredPayment?: string;
  quantity: number;
  notes?: string;
  promoCode?: string;
  discountAmount?: number;
  finalTotal?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'paused' | 'cancelled';

export interface OrderProductItem {
  id: string;
  nameEn: string;
  nameAr: string;
  image: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type DiscountType = 'percentage' | 'fixed';

export interface PromoCode {
  id: string;
  code: string;
  type?: DiscountType;
  discountType?: DiscountType;
  value?: number;
  discountValue?: number;
  minOrderAmount?: number;
  isActive: boolean;
  descriptionAr?: string;
  descriptionEn?: string;
  expiryDate?: string;
  validUntil?: string;
  usageCount: number;
  createdAt?: string;
}

export function getPromoDiscountType(code: PromoCode): DiscountType {
  return code.discountType || code.type || 'percentage';
}

export function getPromoDiscountValue(code: PromoCode): number {
  return code.discountValue ?? code.value ?? 0;
}

export function getPromoExpiry(code: PromoCode): string | undefined {
  return code.validUntil || code.expiryDate;
}

export interface StoreOfferBanner {
  enabled: boolean;
  textAr: string;
  textEn: string;
  highlightCode?: string;
}

export interface DraftOrder {
  id: string;
  createdAt: string;
  updatedAt?: string;
  productNameEn: string;
  productNameAr: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  items?: OrderProductItem[];
  promoCode?: string;
  discountAmount?: number;
  totalAfterDiscount?: number;
  customerPhone: string;
  customerName?: string;
  customerCity?: string;
  customerAddress?: string;
  preferredPayment?: string;
  whatsappUrl: string;
  status: OrderStatus;
  adminNotes?: string;
}

export type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms' | 'configGuide';

export interface AdminCredentials {
  email: string;
  password: string;
}


