/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductSection } from './components/ProductSection';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { StickyMobileOrderBar } from './components/StickyMobileOrderBar';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { PolicyModal } from './components/PolicyModal';
import { StoreOwnerGuideModal } from './components/StoreOwnerGuideModal';
import { AdminPage } from './components/AdminPage';
import { AdminLoginPage } from './components/AdminLoginPage';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { PromoAnnouncementBar } from './components/PromoAnnouncementBar';
import { OrderStatusLookup } from './components/OrderStatusLookup';

function StoreAppContent() {
  const { isAdminView, isAdminAuthenticated } = useStore();

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F3EF] flex flex-col font-sans-modern selection:bg-[#C6A76A]/20 selection:text-[#F5F3EF]">
      {/* Promotional Top Announcement Banner */}
      <PromoAnnouncementBar />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <ProductSection />
        <BrandPhilosophy />
        <OrderStatusLookup />
        <FAQSection />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer />

      {/* Sticky Mobile Order Bar (<= 15% viewport height) */}
      <StickyMobileOrderBar />

      {/* Cart & Checkout Drawer (Add to Bag -> Add Phone Number -> WhatsApp) */}
      <CartDrawer />

      {/* Interactive Modals */}
      <WhatsAppOrderModal />
      <PolicyModal />
      <StoreOwnerGuideModal />
      <OrderConfirmationModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreAppContent />
    </StoreProvider>
  );
}
