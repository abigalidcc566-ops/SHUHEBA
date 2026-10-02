import React from 'react';
import { ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';
import { CAFE_IMAGES } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Media with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={CAFE_IMAGES.hero}
          alt="Artisanal Cafe Interior with warm sunlight and espresso bar"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Scrim: deep dark warm tone at bottom and left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171310]/95 via-[#1A1411]/80 to-[#1A1411]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15110E] via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-left space-y-6">
          {/* Quiet sub-header with typographic separators */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#E4D1BF] tracking-wider uppercase">
            <span>Specialty Micro-Roastery</span>
            <span aria-hidden="true" className="text-[#8C5D38]">·</span>
            <span>Slow-Ferment Bakery</span>
            <span aria-hidden="true" className="text-[#8C5D38]">·</span>
            <span>Est. 2021</span>
          </div>

          {/* Hindi Welcome Subtitle */}
          <p className="text-sm sm:text-base font-serif italic text-[#DEC2A7]">
            "ताज़ा कॉफ़ी, दिलकश खुशबू और सुकून का आशियाना"
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FDFBFA] tracking-tight leading-[1.1] text-balance">
            Where Craft Meets the Daily Coffee Ritual
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#D6C5B5] leading-relaxed max-w-xl font-normal">
            Hand-selected single-origin beans roasted weekly in micro-batches, silky microfoam espresso, and buttery slow-laminated pastries fresh out of the oven every morning at dawn.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreMenu}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1F1914] bg-[#F1DCC9] hover:bg-[#F9EDE0] rounded-md transition-all shadow-md active:scale-98 whitespace-nowrap"
            >
              <span>Explore Cafe Menu</span>
              <ArrowRight className="w-4 h-4 text-[#8C5D38]" />
            </button>

            <button
              onClick={onBookTable}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#FDFBFA] bg-[#3B2E24]/80 hover:bg-[#4E3D30] border border-[#78614E] rounded-md transition-all active:scale-98 whitespace-nowrap"
            >
              <span>Reserve a Table</span>
            </button>
          </div>

          {/* Subtle claim markers adjacent to hero */}
          <div className="pt-6 border-t border-[#4E3F33]/60 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#C5B4A4]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-medium text-[#E8DFD7]">Fresh Roast Batch: Today, 6:00 AM</span>
            </div>
            <span aria-hidden="true" className="text-[#6D5A4B]">·</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Civil Lines & High Street Avenue</span>
            </div>
            <span aria-hidden="true" className="text-[#6D5A4B]">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Open today until 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
