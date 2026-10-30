import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ChevronUp, Check, X } from 'lucide-react';

export const StickyMobileOrderBar: React.FC = () => {
  const { 
    language, 
    products,
    product, 
    selectedProductId,
    setSelectedProductId,
    addToCart,
    openCart,
    cartQuantity
  } = useStore();

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const isAr = language === 'ar';

  if (!product || products.length === 0) {
    return null;
  }

  const handleAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      {/* Mobile Model Picker Sheet */}
      {isPickerOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setIsPickerOpen(false)}
        >
          <div 
            className="bg-[#0f0f0f] border-t border-[#2a2a2a] rounded-t-2xl p-4 space-y-3 max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#222222]">
              <span className="text-xs font-semibold text-[#F5F3EF]">
                {isAr ? `اختر موديل الساعة (${products.length} موديلات):` : `Select Model (${products.length} models):`}
              </span>
              <button 
                onClick={() => setIsPickerOpen(false)}
                className="p-1 text-[#8c8c8c] hover:text-[#F5F3EF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {products.map((p) => {
                const isSelected = p.id === selectedProductId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setIsPickerOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-start transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#181818] border-[#C6A76A] ring-1 ring-[#C6A76A]/40' 
                        : 'bg-[#121212] border-[#222222]'
                    }`}
                  >
                    <img 
                      src={p.images[0]?.src} 
                      alt={p.nameEn} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded object-cover bg-black border border-white/5 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-[#F5F3EF] truncate">
                        {isAr ? p.nameAr.split('(')[0].trim() : p.nameEn}
                      </div>
                      <div className="text-[10px] font-mono text-[#C6A76A] font-bold">
                        {p.priceSAR} {isAr ? 'ر.س' : 'SAR'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Mobile Bar */}
      <div 
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#080808]/95 backdrop-blur-md border-t border-[#262626] px-4 py-2.5 shadow-2xl safe-area-bottom"
        style={{ maxHeight: '72px' }}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          {/* Left: Product & Model Selector */}
          <button 
            type="button"
            onClick={() => setIsPickerOpen(prev => !prev)}
            className="flex items-center gap-2.5 min-w-0 text-start cursor-pointer hover:opacity-90"
          >
            <img 
              src={product.images[0]?.src} 
              alt={product.nameEn} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded object-cover bg-black border border-[#2a2a2a] shrink-0" 
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 text-xs text-[#A3A3A3] truncate">
                <span className="font-semibold text-[#F5F3EF] truncate">{isAr ? product.nameAr.split('(')[0].trim() : product.nameEn}</span>
                <ChevronUp className="w-3 h-3 text-[#C6A76A]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#C6A76A]">
                {product.priceSAR} {isAr ? 'ر.س' : 'SAR'} · <span className="text-[10px] text-[#737373] font-sans">{isAr ? 'اضغط لتغيير الموديل' : 'tap to switch'}</span>
              </span>
            </div>
          </button>

          {/* Right: Add to Bag Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#050505] bg-[#C6A76A] hover:bg-[#D4B87D] rounded transition-all active:scale-95 shrink-0 shadow-sm cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#050505]" />
                  <span>{isAr ? 'تمت الإضافة ✓' : 'Added ✓'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">
                    {isAr ? 'أضف للسلة' : 'Add to Bag'}
                  </span>
                </>
              )}
            </button>

            {cartQuantity > 0 && (
              <button
                onClick={openCart}
                className="relative p-2 rounded bg-[#161616] border border-[#2a2a2a] text-[#C6A76A] cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -end-1 w-3.5 h-3.5 rounded-full bg-[#C6A76A] text-[#050505] text-[9px] font-bold font-mono flex items-center justify-center">
                  {cartQuantity}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
