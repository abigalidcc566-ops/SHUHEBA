import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { ReservationData } from '../types';

const TIME_SLOTS = [
  '08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', 
  '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'
];

const SEATING_AREAS: { id: ReservationData['area']; label: string; desc: string }[] = [
  { id: 'Sunlit Window Bench', label: 'Sunlit Window Bench', desc: 'Natural sunlight, street view, high tables' },
  { id: 'Cozy Hearth Nook', label: 'Cozy Hearth Nook', desc: 'Soft leather chairs, quiet corner for reading/work' },
  { id: 'Garden Terrace (Pet Friendly)', label: 'Garden Terrace', desc: 'Covered leafy courtyard, dogs warmly welcome' },
  { id: 'Main Coffee Bar', label: 'Main Coffee Bar', desc: 'Barista counter view, aroma of fresh roasts' }
];

export const ReservationSection: React.FC = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:30 AM');
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<ReservationData['area']>('Sunlit Window Bench');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newRes: ReservationData = {
        id: Math.random().toString(36).substr(2, 9),
        bookingRef: `VR-RES-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        phone,
        email,
        date,
        timeSlot,
        guests,
        area,
        specialRequests: specialRequests.trim() || undefined,
        createdAt: new Date().toLocaleDateString(),
      };
      setConfirmedReservation(newRes);
      setIsSubmitting(false);
    }, 500);
  };

  const handleBookAnother = () => {
    setConfirmedReservation(null);
    setName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
  };

  return (
    <section id="reserve" className="py-20 bg-[#F4EFEB] border-t border-[#E3D9CC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#8C5D38]">
            Reserve Your Corner · टेबल बुकिंग
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241F1B]">
            Table & Coffee Tasting Bookings
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5E52] leading-relaxed">
            Whether for deep work with fast Wi-Fi, an afternoon coffee date, or brunch with friends, we reserve a designated table for you.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Voucher */
          <div className="bg-white rounded-xl border border-[#D9CEC1] p-8 max-w-lg mx-auto shadow-md text-center space-y-6">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto border border-[#A7F3D0]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#059669] uppercase">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#241F1B]">
                {confirmedReservation.bookingRef}
              </h3>
              <p className="text-xs text-[#736357]">
                We have saved a table for you at Velvet Roast & Café.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-[#6D5E53]">Guest Name:</span>
                <span className="font-semibold text-[#241F1B]">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D5E53]">Date & Time:</span>
                <span className="font-mono font-semibold text-[#241F1B]">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D5E53]">Party Size:</span>
                <span className="font-semibold text-[#241F1B]">{confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D5E53]">Reserved Area:</span>
                <span className="font-medium text-[#8C5D38]">{confirmedReservation.area}</span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className="pt-2 border-t border-[#EAE1D7] text-[11px] text-[#78695E]">
                  <span className="font-medium text-[#4A3D33]">Note: </span>
                  {confirmedReservation.specialRequests}
                </div>
              )}
            </div>

            <div className="text-[11px] text-[#8C7A6D] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8C5D38]" />
              <span>We hold reserved tables for 15 minutes past scheduled time.</span>
            </div>

            <button
              onClick={handleBookAnother}
              className="w-full py-2.5 text-xs font-semibold text-[#2B231D] bg-[#EFE8DF] hover:bg-[#E2D6C7] rounded-md transition-colors border border-[#D5C7B7]"
            >
              Make Another Reservation
            </button>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-[#D9CEC1] p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* Step 1: Date & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8C5D38]" />
                  <span>Select Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                />
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C5D38]" />
                  <span>Time Preference</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#8C5D38]" />
                  <span>Number of Guests</span>
                </label>
                <div className="flex items-center border border-[#D9CEC1] rounded-md bg-[#FAF7F2] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="px-4 py-2 text-xs font-bold text-[#5A4E44] hover:bg-[#EFE7DE] transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-mono font-bold text-[#2B231D] tabular-nums">
                    {guests} {guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="px-4 py-2 text-xs font-bold text-[#5A4E44] hover:bg-[#EFE7DE] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Seating Area Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider block">
                Preferred Seating Ambience
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SEATING_AREAS.map((item) => {
                  const isSelected = area === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setArea(item.id)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[#2B231D] bg-[#2B231D] text-white shadow-xs'
                          : 'border-[#D9CEC1] bg-[#FAF8F5] text-[#3E3228] hover:bg-[#EFE8DF]'
                      }`}
                    >
                      <h4 className="text-xs font-semibold leading-tight">{item.label}</h4>
                      <p className={`text-[11px] mt-1 line-clamp-2 ${isSelected ? 'text-[#D9CEC1]' : 'text-[#7A6B5F]'}`}>
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Guest Contact Info */}
            <div className="pt-2 border-t border-[#EDE4DA] space-y-4">
              <h4 className="text-xs font-semibold text-[#3D3228] uppercase tracking-wider">
                Contact & Special Notes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Special requests: high chair, quiet laptop nook, birthday celebration, allergy notes..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  maxLength={120}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#D9CEC1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#8C5D38]"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] text-[#78695E]">
                <span>No reservation fee · Free cancellation anytime</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#2B231D] hover:bg-[#43372D] text-white text-xs font-semibold rounded-md shadow-xs transition-colors disabled:opacity-70 whitespace-nowrap"
              >
                {isSubmitting ? 'Confirming Table...' : 'Confirm Reservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
