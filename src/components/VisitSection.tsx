import React, { useMemo } from 'react';
import { MapPin, Clock, Phone, Mail, Wifi, ShieldCheck, Dog, Bike, Sparkles } from 'lucide-react';
import { CAFE_HOURS, CAFE_AMENITIES } from '../data/cafeData';

export const VisitSection: React.FC = () => {
  // Real-time cafe open status check
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const hour = now.getHours();
    // Cafe open 07:30 to 22:00
    return hour >= 7 && hour < 22;
  }, []);

  return (
    <section id="visit" className="py-20 bg-[#FAF8F5] border-t border-[#E5DDD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Hours & Location */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5D38]">
                Visit Us · हमारे कैफ़े में आइए
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1B]">
                Hours, Roastery & Location
              </h2>
              <p className="text-xs sm:text-sm text-[#6E5F53] leading-relaxed">
                Step into a serene space filled with the aroma of freshly ground coffee, warm timber tables, and vinyl records spinning quietly.
              </p>
            </div>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E0D4C5] text-xs">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-[#10B981] animate-pulse' : 'bg-[#EF4444]'}`} />
              <span className="font-semibold text-[#241F1B]">
                {isOpenNow ? 'Open Now for Dine-in & Takeaway' : 'Closed Now · Reopening at 7:30 AM'}
              </span>
              <span className="text-[#8C7A6D]">· Today until 10:00 PM</span>
            </div>

            {/* Hours Table */}
            <div className="bg-white rounded-lg border border-[#E7DFD4] p-5 space-y-4 text-xs">
              <h3 className="font-semibold text-[#241F1B] uppercase tracking-wider text-[11px] text-[#8C5D38]">
                Weekly Schedule
              </h3>
              {CAFE_HOURS.map((item) => (
                <div key={item.days} className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2EDE6] last:border-none last:pb-0 gap-1">
                  <span className="font-semibold text-[#241F1B]">{item.days}</span>
                  <div className="text-right text-[#69594E]">
                    <span className="font-mono font-medium">{item.hours}</span>
                    <span className="block text-[11px] text-[#917E72]">(Roastery runs {item.roastery})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Contact */}
            <div className="space-y-3 text-xs text-[#524439]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#8C5D38] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#241F1B]">Velvet Roast & Café</p>
                  <p>Plot 42, Heritage Quarter, High Street Promenade, Civil Lines</p>
                  <p className="text-[#8C7A6D]">Opposite Queen’s Botanical Pavilion · Valet & Free Parking</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8C5D38] shrink-0" />
                <span className="font-mono font-medium text-[#241F1B]">+91 (0) 98201 84720</span>
                <span className="text-[#8C7A6D]">(Orders & Table Inquiries)</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8C5D38] shrink-0" />
                <span className="font-mono text-[#241F1B]">hello@velvetroastcafe.com</span>
              </div>
            </div>
          </div>

          {/* Right Column: Amenities & Space Guide */}
          <div className="bg-[#FAF6F0] rounded-xl border border-[#E2D6C7] p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#8C5D38] tracking-widest uppercase">
                Atmosphere & Amenities
              </span>
              <h3 className="text-xl font-serif font-bold text-[#241F1B] mt-1">
                Thoughtfully Designed For You
              </h3>
              <p className="text-xs text-[#6A5A4D] mt-1">
                We believe a great cafe is a sanctuary where you can pause, write, talk, or simply savor a perfect cup.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAFE_AMENITIES.map((amenity) => (
                <div key={amenity.name} className="p-4 bg-white rounded-lg border border-[#E8DFD3] space-y-1">
                  <h4 className="text-xs font-semibold text-[#241F1B]">{amenity.name}</h4>
                  <p className="text-[11px] text-[#7A6A5E] leading-relaxed">{amenity.desc}</p>
                </div>
              ))}
            </div>

            {/* Coffee Catering or Events banner */}
            <div className="p-4 rounded-lg bg-[#2B231D] text-white flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[#F7ECE1]">Private Cuppings & Coffee Catering</h4>
                <p className="text-[11px] text-[#D4C3B4]">Host your morning workshop or private gathering in our roastery loft.</p>
              </div>
              <a
                href="#reserve"
                className="px-3 py-1.5 text-[11px] font-semibold bg-[#EFE4D6] hover:bg-[#FAF4ED] text-[#241F1B] rounded transition-colors whitespace-nowrap shrink-0"
              >
                Inquire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
