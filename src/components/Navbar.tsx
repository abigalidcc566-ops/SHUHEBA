import React from 'react';
import { ShoppingBag, Coffee, Calendar } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl font-serif font-bold tracking-tight text-[#2B231D] hover:opacity-85 transition-opacity flex items-center gap-2"
        >
          <Coffee className="w-5 h-5 text-[#8C5D38]" strokeWidth={2} />
          <span>Velvet Roast</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5A4E44]">
          <a 
            href="#menu" 
            className="hover:text-[#2B231D] transition-colors relative py-1 hover:border-b-2 hover:border-[#8C5D38]"
          >
            Menu
          </a>
          <a 
            href="#craft" 
            className="hover:text-[#2B231D] transition-colors relative py-1 hover:border-b-2 hover:border-[#8C5D38]"
          >
            Our Craft
          </a>
          <a 
            href="#reserve" 
            className="hover:text-[#2B231D] transition-colors relative py-1 hover:border-b-2 hover:border-[#8C5D38]"
          >
            Reservations
          </a>
          <a 
            href="#visit" 
            className="hover:text-[#2B231D] transition-colors relative py-1 hover:border-b-2 hover:border-[#8C5D38]"
          >
            Visit & Hours
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-[#2B231D] bg-[#EFE8DF] hover:bg-[#E4D9CC] rounded-md transition-colors whitespace-nowrap border border-[#D9CEC1]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8C5D38]" />
            <span>Book Table</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#2B231D] hover:bg-[#3E332B] rounded-md transition-colors shadow-xs whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#E6CDB6]" />
            <span>Order Bag</span>
            {cartItemCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-[#2B231D] bg-[#E8B482] rounded-full tabular-nums">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
