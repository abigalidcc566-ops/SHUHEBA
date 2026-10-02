import React, { useState } from 'react';
import { Coffee, Flame, Compass, Award, Droplets } from 'lucide-react';

const BEAN_ORIGINS = [
  {
    id: 'ethiopia',
    name: 'Ethiopia Yirgacheffe Gedeo',
    region: 'Gedeo Zone, Southern Nations',
    altitude: '1,950m – 2,200m',
    process: 'Fully Washed & Sun Dried',
    roast: 'Light Nordic Style',
    notes: 'Jasmine Blossom, White Peach, Meyer Lemon, Bergamot',
    story: 'Sourced directly from smallholder farms in Gedeo. The high altitude and mineral-rich volcanic soil produce an exceptionally floral, tea-like cup with pristine citrus clarity.'
  },
  {
    id: 'colombia',
    name: 'Colombia Huila Geisha',
    region: 'San Agustín, Huila',
    altitude: '1,750m – 1,900m',
    process: 'Anaerobic Honey Fermentation (48h)',
    roast: 'Light-Medium',
    notes: 'Passionfruit, Lemongrass, Panela Sugar, Papaya',
    story: 'Fermented in sealed tanks for 48 hours to unlock tropical sweetness without losing the crisp Geisha cultivar delicacy. Direct trade with the Rivera family estate.'
  },
  {
    id: 'india',
    name: 'Monsoon Malabar AA',
    region: 'Western Ghats, Chikmagalur',
    altitude: '1,200m – 1,400m',
    process: 'Monsooned Natural',
    roast: 'Medium-Dark French',
    notes: 'Earth & Cedar, Dark Cocoa, Cardamom Pod, Heavy Crema',
    story: 'Exposed to salty Arabian monsoon winds for 12 weeks. This historical Indian specialty process yields a velvety, heavy-bodied brew with virtually zero acidity and rich spicy aroma.'
  }
];

export const RoasteryStory: React.FC = () => {
  const [activeBean, setActiveBean] = useState(BEAN_ORIGINS[0]);

  return (
    <section id="craft" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5D38]">
            01. Philosophy & Sourcing · हमारी कॉफ़ी का सफर
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1B] leading-tight">
            Micro-Roasting with Uncompromising Integrity
          </h2>
          <p className="text-sm text-[#6B5A4E] leading-relaxed">
            We don't buy commodity coffee. Every green coffee lot in our hopper is 100% direct-trade, purchased from independent generational farmers at more than double fair-trade minimum prices.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg bg-white border border-[#E8E0D5] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#F4EFEB] flex items-center justify-center text-[#8C5D38]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#241F1B]">1. Direct Origin Sourcing</h3>
            <p className="text-xs text-[#6B5B4E] leading-relaxed">
              We travel to origin harvest seasons in Ethiopia, Colombia, and the Western Ghats to cup fresh lots alongside growers and select micro-lots with exceptional terroir.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E8E0D5] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#F4EFEB] flex items-center justify-center text-[#8C5D38]">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#241F1B]">2. Cast-Iron Drum Roasting</h3>
            <p className="text-xs text-[#6B5B4E] leading-relaxed">
              Roasting inside our cafe on a 15kg Giesen cast-iron drum. We tailor specific heat curves to celebrate the bean's intrinsic fruit acids, never masking them with burnt bitterness.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E8E0D5] space-y-3">
            <div className="w-10 h-10 rounded-md bg-[#F4EFEB] flex items-center justify-center text-[#8C5D38]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#241F1B]">3. Water Chemistry & Extraction</h3>
            <p className="text-xs text-[#6B5B4E] leading-relaxed">
              Our brew bar water is custom re-mineralized to 125 ppm hardness with balanced magnesium and calcium ions to extract optimum sweetness and silky crema.
            </p>
          </div>
        </div>

        {/* Interactive Single-Origin Explorer */}
        <div className="bg-[#FFFFFF] rounded-xl border border-[#E3D8CC] p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#EFE7DE]">
            <div>
              <span className="text-xs font-semibold text-[#8C5D38] tracking-widest uppercase">
                Featured Terroir Explorer
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#241F1B] mt-1">
                Explore Current Seasonal Crops
              </h3>
            </div>

            {/* Origin selector buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              {BEAN_ORIGINS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBean(b)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeBean.id === b.id
                      ? 'bg-[#2B231D] text-white shadow-xs'
                      : 'bg-[#F2ECE4] text-[#54473D] hover:bg-[#E5DCD1]'
                  }`}
                >
                  {b.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Bean Specs */}
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xl font-serif font-bold text-[#241F1B]">
                {activeBean.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#5C4C41] leading-relaxed">
                {activeBean.story}
              </p>

              <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#EDE3D8] space-y-1">
                <span className="text-[11px] font-semibold text-[#8C5D38] uppercase tracking-wider">
                  Cup Profile & Sensory Notes
                </span>
                <p className="text-sm font-serif font-semibold text-[#241F1B] italic">
                  "{activeBean.notes}"
                </p>
              </div>
            </div>

            {/* Technical specs */}
            <div className="bg-[#FAF7F2] p-6 rounded-lg border border-[#EDE3D8] space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-[#EAE0D4] pb-2">
                <span className="text-[#706054]">Region:</span>
                <span className="font-semibold text-[#241F1B] text-right">{activeBean.region}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE0D4] pb-2">
                <span className="text-[#706054]">Elevation:</span>
                <span className="font-mono font-semibold text-[#241F1B]">{activeBean.altitude}</span>
              </div>
              <div className="flex justify-between border-b border-[#EAE0D4] pb-2">
                <span className="text-[#706054]">Processing:</span>
                <span className="font-semibold text-[#241F1B]">{activeBean.process}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#706054]">Roast Level:</span>
                <span className="font-medium text-[#8C5D38]">{activeBean.roast}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
