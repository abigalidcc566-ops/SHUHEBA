import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { RoasteryStory } from './components/RoasteryStory';
import { ReservationSection } from './components/ReservationSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { MenuItem, CartItem, CustomizationOptions } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Quick add for simple items
  const handleQuickAdd = (item: MenuItem) => {
    const defaultOptions: CustomizationOptions = {
      size: 'Regular',
      milk: item.hasMilkOption ? 'Whole Milk' : undefined,
      sweetness: item.hasSweetnessOption ? '0% Unsweetened' : undefined,
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.options.size === 'Regular' && !ci.options.extraShot
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const existing = next[existingIndex];
        const updatedQty = existing.quantity + 1;
        next[existingIndex] = {
          ...existing,
          quantity: updatedQty,
          totalPrice: existing.unitPrice * updatedQty,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `${item.id}-${Date.now()}`,
          menuItem: item,
          quantity: 1,
          options: defaultOptions,
          unitPrice: item.price,
          totalPrice: item.price,
        };
        return [...prev, newItem];
      }
    });
  };

  // Add customized item
  const handleAddToCartWithOptions = (
    item: MenuItem,
    options: CustomizationOptions,
    quantity: number
  ) => {
    let unitPrice = item.price;
    if (options.size === 'Large') unitPrice += 40;
    if (options.milk === 'Oat Milk (+₹40)' || options.milk === 'Almond Milk (+₹40)') unitPrice += 40;
    if (options.extraShot) unitPrice += 50;

    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      options,
      unitPrice,
      totalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: item.unitPrice * nextQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#24211E]">
      {/* Top Bar Contract compliant navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reserve')}
        activeSection="home"
      />

      <main className="flex-1">
        {/* Hero Section with generated media and direct CTAs */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reserve')}
        />

        {/* Menu & Food Ordering Section */}
        <MenuSection
          onSelectItem={(item) => setCustomizingItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Roastery Craft & Beans Story */}
        <RoasteryStory />

        {/* Table Reservation Section */}
        <ReservationSection />

        {/* Operating Hours, Location & Amenities */}
        <VisitSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Customization Modal */}
      <CustomizationModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCartWithOptions}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
