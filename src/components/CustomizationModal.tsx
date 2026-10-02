import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types';

interface CustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CustomizationOptions, quantity: number) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'Regular' | 'Large'>('Regular');
  const [milk, setMilk] = useState<'Whole Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹40)' | 'No Milk'>('Whole Milk');
  const [sweetness, setSweetness] = useState<'0% Unsweetened' | '50% Mild Sweet' | '100% Standard'>('0% Unsweetened');
  const [extraShot, setExtraShot] = useState(false);
  const [notes, setNotes] = useState('');

  // Calculate unit price based on options
  const calculateUnitPrice = () => {
    let price = item.price;
    if (size === 'Large') price += 40;
    if (milk === 'Oat Milk (+₹40)' || milk === 'Almond Milk (+₹40)') price += 40;
    if (extraShot) price += 50;
    return price;
  };

  const unitPrice = calculateUnitPrice();
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(
      item,
      {
        size,
        milk: item.hasMilkOption ? milk : undefined,
        sweetness: item.hasSweetnessOption ? sweetness : undefined,
        extraShot: item.category === 'espresso' ? extraShot : undefined,
        notes: notes.trim() || undefined,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#FAF8F5] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E3DACF] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] w-full bg-[#EDE6DE] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded text-white text-xs font-mono">
            ₹{item.price} base
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5D38] uppercase">
              <span>{item.category}</span>
              {item.hindiName && (
                <>
                  <span>·</span>
                  <span className="font-serif font-normal">{item.hindiName}</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-serif font-bold text-[#241F1B] mt-1">
              {item.name}
            </h2>
            <p className="text-xs text-[#6A5A4E] mt-1.5 leading-relaxed">
              {item.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Size Selector */}
            {item.hasSizeOption && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#382E25] uppercase tracking-wider block">
                  Select Size
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Regular', 'Large'] as const).map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSize(s)}
                      className={`p-2.5 rounded-md border text-xs font-medium flex items-center justify-between transition-colors ${
                        size === s
                          ? 'border-[#2B231D] bg-[#2B231D] text-white'
                          : 'border-[#D9CEC1] bg-white text-[#4A3D33] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      <span>{s}</span>
                      <span className="font-mono text-[11px] opacity-80">
                        {s === 'Large' ? '+₹40' : 'Std'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Milk Option */}
            {item.hasMilkOption && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#382E25] uppercase tracking-wider block">
                  Milk Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Whole Milk', 'Oat Milk (+₹40)', 'Almond Milk (+₹40)', 'No Milk'] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`p-2 rounded-md border text-xs font-medium text-left transition-colors ${
                        milk === m
                          ? 'border-[#2B231D] bg-[#2B231D] text-white'
                          : 'border-[#D9CEC1] bg-white text-[#4A3D33] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sweetness */}
            {item.hasSweetnessOption && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#382E25] uppercase tracking-wider block">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['0% Unsweetened', '50% Mild Sweet', '100% Standard'] as const).map((sw) => (
                    <button
                      type="button"
                      key={sw}
                      onClick={() => setSweetness(sw)}
                      className={`p-2 rounded-md border text-xs font-medium text-center transition-colors ${
                        sweetness === sw
                          ? 'border-[#2B231D] bg-[#2B231D] text-white'
                          : 'border-[#D9CEC1] bg-white text-[#4A3D33] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      {sw.replace(' Unsweetened', '').replace(' Mild Sweet', ' Mild').replace(' Standard', ' Regular')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Espresso Shot */}
            {item.category === 'espresso' && (
              <label className="flex items-center justify-between p-3 rounded-md border border-[#D9CEC1] bg-white cursor-pointer hover:bg-[#F7F2EC]">
                <span className="text-xs font-medium text-[#2B231D]">
                  Add Extra Ristretto Shot (+₹50)
                </span>
                <input
                  type="checkbox"
                  checked={extraShot}
                  onChange={(e) => setExtraShot(e.target.checked)}
                  className="rounded text-[#8C5D38] focus:ring-[#8C5D38] w-4 h-4 cursor-pointer"
                />
              </label>
            )}

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4A3D33] block">
                Special Barista Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Extra hot, warm croissant, less ice..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={80}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
              />
            </div>

            {/* Footer with quantity and Add to cart */}
            <div className="pt-4 border-t border-[#E8DFD5] flex items-center justify-between gap-4">
              <div className="flex items-center border border-[#D9CEC1] rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-semibold text-[#5A4E44] hover:bg-[#F0EAE2]"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-mono font-bold text-[#2B231D] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-semibold text-[#5A4E44] hover:bg-[#F0EAE2]"
                >
                  +
                </button>
              </div>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-[#2B231D] hover:bg-[#43372D] text-white text-xs font-semibold rounded-md shadow-xs flex items-center justify-between transition-colors"
              >
                <span>Add to Order</span>
                <span className="font-mono tabular-nums">₹{totalPrice}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
