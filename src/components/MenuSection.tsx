import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal, Check, Sparkles } from 'lucide-react';
import { MenuItem, CategoryType } from '../types';
import { MENU_ITEMS } from '../data/cafeData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: CategoryType; label: string; hindi: string }[] = [
  { id: 'all', label: 'All Offerings', hindi: 'सभी' },
  { id: 'espresso', label: 'Specialty Espresso', hindi: 'एस्प्रेसो' },
  { id: 'brews', label: 'Pour-Over & Brews', hindi: 'पोर-ओवर' },
  { id: 'cold', label: 'Cold Signatures', hindi: 'कोल्ड ड्रिंक्स' },
  { id: 'bakery', label: 'Artisan Bakery', hindi: 'ताज़ा बेकरी' },
  { id: 'brunch', label: 'All-Day Brunch', hindi: 'ब्रंच' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hindiName && item.hindiName.includes(searchQuery)) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.flavorNotes && item.flavorNotes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDietary =
        dietaryFilter === 'all' || (item.dietary && item.dietary.includes(dietaryFilter as any));

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, dietaryFilter]);

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (item.hasMilkOption || item.hasSizeOption) {
      onSelectItem(item);
    } else {
      onQuickAdd(item);
      setAddedAnimationId(item.id);
      setTimeout(() => setAddedAnimationId(null), 1200);
    }
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF8F5] border-t border-[#EAE3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E5DDD4]">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5D38]">
              Crafted Fresh Daily · ताज़ा मेनू
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1B]">
              The Roastery & Bakery Menu
            </h2>
            <p className="text-sm text-[#736356] max-w-xl">
              Ethically sourced single origins roasted in-house, hand-pulled espresso beverages, and slow-proved European pastries.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search coffee, pastry, tasting notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F4EFEB] border border-[#DDD3C7] rounded-md text-[#2B231D] placeholder-[#9C8B7F] focus:outline-none focus:ring-1 focus:ring-[#8C5D38] focus:border-[#8C5D38] transition-all"
            />
          </div>
        </div>

        {/* Filter Controls: Category Buttons and Dietary Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2B231D] text-white shadow-xs'
                      : 'bg-[#EFEAE2] text-[#5C4F44] hover:bg-[#E5DDCF] hover:text-[#2B231D]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dietary Sub-filter */}
          <div className="flex items-center gap-2 text-xs text-[#6B5C51]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C5D38]" />
            <span>Filter:</span>
            <div className="flex items-center gap-1 bg-[#EFEAE2] p-1 rounded-md">
              {['all', 'Vegetarian', 'Vegan', 'Gluten-Free'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    dietaryFilter === diet
                      ? 'bg-white text-[#2B231D] shadow-xs'
                      : 'text-[#6B5C51] hover:text-[#2B231D]'
                  }`}
                >
                  {diet === 'all' ? 'All Diets' : diet}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column on desktop with generous whitespace */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#F4EFEB] rounded-lg border border-[#E0D5C9]">
            <p className="text-sm font-medium text-[#5A4E44]">No menu items found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-3 text-xs font-semibold text-[#8C5D38] hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedAnimationId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group bg-[#FFFFFF] rounded-lg border border-[#E7DFD5] overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* Image Slot: 65% height on neutral backdrop with fallback */}
                  <div className="relative aspect-[4/3] bg-[#F2EDE8] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Subtle status tag if popular or roast level */}
                    {item.popular && (
                      <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide bg-[#2B231D]/90 backdrop-blur-xs text-[#F5EDE4] px-2.5 py-1 rounded">
                        House Favorite
                      </span>
                    )}

                    {item.roastLevel && !item.popular && (
                      <span className="absolute top-3 left-3 text-[11px] font-medium tracking-wide bg-[#FAF8F5]/90 backdrop-blur-xs text-[#52443A] px-2.5 py-1 rounded border border-[#E0D5C7]">
                        {item.roastLevel} Roast
                      </span>
                    )}

                    {item.calories && (
                      <span className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-[#4A3D34] bg-white/90 px-1.5 py-0.5 rounded shadow-xs">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {/* Quiet unboxed category metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8C5D38] uppercase tracking-wider">
                        <span>{item.category}</span>
                        {item.hindiName && (
                          <>
                            <span aria-hidden="true" className="text-[#BAA697]">·</span>
                            <span className="font-normal font-serif text-[#786457]">{item.hindiName}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-[#241F1B] leading-snug group-hover:text-[#8C5D38] transition-colors">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#6A5A4E] leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tasting Notes / Origin */}
                      {item.flavorNotes && (
                        <p className="text-[11px] text-[#7A6B60] italic pt-1">
                          <span className="font-medium text-[#4D3F35] not-italic">Notes:</span> {item.flavorNotes}
                        </p>
                      )}
                    </div>

                    {/* Price and Action Baseline */}
                    <div className="pt-3 border-t border-[#F2ECE6] flex items-center justify-between">
                      <div>
                        <span className="text-base font-bold font-mono text-[#2B231D] tabular-nums">
                          ₹{item.price}
                        </span>
                        <span className="text-[11px] text-[#8C7A6D] ml-1">tax incl.</span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAddClick(e, item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                          isAdded
                            ? 'bg-[#10B981] text-white'
                            : item.hasMilkOption || item.hasSizeOption
                            ? 'bg-[#EFEAE2] hover:bg-[#2B231D] hover:text-white text-[#382E25]'
                            : 'bg-[#2B231D] hover:bg-[#43372D] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added!</span>
                          </>
                        ) : item.hasMilkOption || item.hasSizeOption ? (
                          <span>Customize</span>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
