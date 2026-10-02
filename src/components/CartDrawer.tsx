import React, { useState } from 'react';
import { X, Trash2, ArrowRight, CheckCircle2, Coffee, Clock, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('04');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    type: string;
    time: string;
    prepMinutes: number;
  } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsCheckingOut(true);

    // Simulate fast order submission
    setTimeout(() => {
      const orderNumber = `VR-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrder({
        orderId: orderNumber,
        total: grandTotal,
        type: orderType === 'dine-in' ? `Dine-In (Table #${tableNumber})` : orderType === 'takeaway' ? 'Counter Takeaway' : 'Express Delivery',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        prepMinutes: 10 + items.length * 2,
      });
      setIsCheckingOut(false);
      onClearCart();
    }, 600);
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2D8CD] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E8E1D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#8C5D38]" />
              <h2 className="text-lg font-serif font-bold text-[#241F1B]">
                Your Cafe Order
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 rounded-md text-[#78695E] hover:text-[#241F1B] hover:bg-[#F2EDE6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {confirmedOrder ? (
              /* Confirmed Order State */
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto border border-[#A7F3D0]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono tracking-widest text-[#059669] uppercase font-bold">
                    Order Received & Brewing
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#241F1B]">
                    {confirmedOrder.orderId}
                  </h3>
                  <p className="text-xs text-[#6B5A4E]">
                    Sent directly to the barista espresso bar.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="p-4 bg-white rounded-lg border border-[#E7DFD5] text-left space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#241F1B] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8C5D38]" />
                      Estimated Preparation
                    </span>
                    <span className="font-mono font-bold text-[#8C5D38] tabular-nums">
                      ~{confirmedOrder.prepMinutes} minutes
                    </span>
                  </div>

                  <div className="w-full bg-[#EFEAE2] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#8C5D38] h-full rounded-full w-2/5 animate-pulse" />
                  </div>

                  <div className="grid grid-cols-3 text-[10px] text-center text-[#7A6B60] pt-1">
                    <span className="font-semibold text-[#241F1B]">1. Grinding Beans</span>
                    <span>2. Pulling Shot</span>
                    <span>3. Ready</span>
                  </div>
                </div>

                {/* Order Summary Receipt */}
                <div className="p-4 bg-[#F5EFE8] rounded-lg text-xs space-y-2 text-left border border-[#E0D5C7]">
                  <div className="flex justify-between text-[#594A3F]">
                    <span>Fulfillment Type:</span>
                    <span className="font-medium text-[#241F1B]">{confirmedOrder.type}</span>
                  </div>
                  <div className="flex justify-between text-[#594A3F]">
                    <span>Time Placed:</span>
                    <span className="font-mono text-[#241F1B]">{confirmedOrder.time}</span>
                  </div>
                  <div className="flex justify-between text-[#594A3F] border-t border-[#DECFC1] pt-2 font-semibold">
                    <span>Total Paid:</span>
                    <span className="font-mono text-[#241F1B] text-sm tabular-nums">
                      ₹{confirmedOrder.total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-3 text-xs font-semibold text-white bg-[#2B231D] hover:bg-[#43372D] rounded-md transition-colors"
                >
                  Order Something Else
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 bg-[#EFEAE2] text-[#8C7A6D] rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#4A3D33]">Your order bag is currently empty</p>
                <p className="text-xs text-[#7A6A5E] max-w-xs mx-auto">
                  Add some freshly roasted coffee or slow-fermented bakery goods from our menu.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-[#8C5D38] hover:text-[#5E3C21] hover:underline"
                >
                  Browse Menu Items
                </button>
              </div>
            ) : (
              /* Items List & Order Config */
              <div className="space-y-6">
                {/* Fulfillment Tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider block">
                    Select Order Mode
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#ECE5DC] rounded-lg">
                    {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`py-2 text-xs font-medium rounded-md capitalize transition-colors ${
                          orderType === type
                            ? 'bg-white text-[#2B231D] shadow-xs'
                            : 'text-[#6A5A4E] hover:text-[#2B231D]'
                        }`}
                      >
                        {type === 'dine-in' ? 'Table Dine-In' : type === 'takeaway' ? 'Takeaway' : 'Delivery'}
                      </button>
                    ))}
                  </div>

                  {orderType === 'dine-in' && (
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-[#6B5A4E]">Table Number:</span>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Table #"
                        className="w-18 px-2.5 py-1 text-xs font-mono font-bold bg-white border border-[#D9CEC1] rounded text-center"
                      />
                      <span className="text-[11px] text-[#8C7A6D]">(Look at table brass coin)</span>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-3 divide-y divide-[#EFE7DE]">
                  {items.map((cartItem) => (
                    <div key={cartItem.id} className="pt-3 first:pt-0 flex items-start gap-3 justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="text-xs font-semibold text-[#241F1B]">
                            {cartItem.menuItem.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-[#241F1B] tabular-nums ml-2">
                            ₹{cartItem.totalPrice}
                          </span>
                        </div>

                        {/* Customization Details */}
                        <div className="text-[11px] text-[#7A695C] space-x-1.5">
                          <span>{cartItem.options.size}</span>
                          {cartItem.options.milk && (
                            <>
                              <span>·</span>
                              <span>{cartItem.options.milk}</span>
                            </>
                          )}
                          {cartItem.options.sweetness && (
                            <>
                              <span>·</span>
                              <span>{cartItem.options.sweetness}</span>
                            </>
                          )}
                          {cartItem.options.extraShot && (
                            <>
                              <span>·</span>
                              <span>+Extra Shot</span>
                            </>
                          )}
                        </div>

                        {cartItem.options.notes && (
                          <p className="text-[10px] text-[#8C5D38] italic">
                            Note: "{cartItem.options.notes}"
                          </p>
                        )}

                        {/* Quantity and Remove */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-[#D9CEC1] rounded bg-white">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#5A4E44] hover:bg-[#F2ECE6]"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-mono tabular-nums font-semibold">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#5A4E44] hover:bg-[#F2ECE6]"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(cartItem.id)}
                            className="text-[11px] text-[#9E3A3A] hover:text-[#7A1F1F] inline-flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Contact Details */}
                <div className="space-y-3 pt-4 border-t border-[#E8E1D9]">
                  <h4 className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider">
                    Guest Contact
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="px-3 py-2 text-xs bg-white border border-[#D9CEC1] rounded focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="px-3 py-2 text-xs bg-white border border-[#D9CEC1] rounded focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer with Totals and Checkout CTA */}
          {!confirmedOrder && items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E1D9] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B5A4E]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-medium text-[#241F1B]">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-[#6B5A4E]">
                  <span>GST (5%)</span>
                  <span className="font-mono tabular-nums font-medium text-[#241F1B]">
                    ₹{tax}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#241F1B] border-t border-[#F0EAE2] pt-2">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums text-base">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isCheckingOut}
                className="w-full py-3 px-4 bg-[#2B231D] hover:bg-[#43372D] text-white text-xs font-semibold rounded-md shadow-xs flex items-center justify-between transition-colors disabled:opacity-70"
              >
                <span>{isCheckingOut ? 'Transmitting to Barista...' : 'Confirm & Send Order'}</span>
                <span className="font-mono tabular-nums flex items-center gap-1">
                  ₹{grandTotal}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </button>

              <p className="text-[10px] text-center text-[#8C7A6D]">
                Cash or Card on pickup/counter · No online pre-charge required
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
