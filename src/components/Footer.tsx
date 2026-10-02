import React, { useState } from 'react';
import { Coffee, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#1E1915] text-[#D8CBC0] border-t border-[#3B3028]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#C98E5E]" />
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                Velvet Roast & Café
              </span>
            </div>
            <p className="text-xs text-[#AB9B8E] max-w-sm leading-relaxed">
              An independent micro-roastery and European-style bakery dedicated to seasonal single-origin coffees, honest slow baking, and mindful hospitality.
            </p>
            <p className="text-xs font-serif italic text-[#C98E5E]">
              "हर घूंट में ताज़गी, हर निवाले में प्यार।"
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#AB9B8E]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Specialty Menu</a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">Roastery & Sourcing</a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-white transition-colors">Book a Table</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Hours & Location</a>
              </li>
            </ul>
          </div>

          {/* Micro-newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              The Morning Dispatch
            </h4>
            <p className="text-xs text-[#AB9B8E]">
              Receive announcements when fresh green crop micro-lots arrive from origin.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-1.5">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-[#2B231D] border border-[#4A3D34] rounded text-white placeholder-[#857568] focus:outline-none focus:border-[#C98E5E]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3 py-2 bg-[#C98E5E] hover:bg-[#DE9E69] text-[#1E1915] font-semibold text-xs rounded transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#34D399]">
                  Thank you! You are subscribed to our roast releases.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Quiet copyright & metadata */}
        <div className="pt-8 border-t border-[#322720] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7C70] gap-4">
          <p>© {new Date().getFullYear()} Velvet Roast & Café. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Specialty Coffee Association Member</span>
            <span aria-hidden="true">·</span>
            <span>Organic Certified Grains</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
