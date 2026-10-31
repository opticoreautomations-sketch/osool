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

function StoreAppContent() {
  const { isAdminView, isAdminAuthenticated } = useStore();

  if (isAdminView) {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }
    return <AdminPage />;
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F3EF] flex flex-col font-sans-modern selection:bg-[#C6A76A]/20 selection:text-[#F5F3EF]">
      {/* Global Luxury Ambient Background Backdrop */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/website_luxury_bg_1793460868026.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 select-none scale-105"
        />
        {/* Soft dark vignette gradients to ensure impeccable text clarity and contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/75 via-[#050505]/40 to-[#050505]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,transparent_25%,#050505_95%)] pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
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
          <FAQSection />
        </main>

        {/* Minimal Luxury Footer */}
        <Footer />
      </div>

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
