export type CategoryType = 'all' | 'espresso' | 'brews' | 'cold' | 'bakery' | 'brunch';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: CategoryType;
  price: number;
  description: string;
  calories?: string;
  image: string;
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free')[];
  flavorNotes?: string;
  origin?: string;
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark';
  popular?: boolean;
  hasMilkOption?: boolean;
  hasSizeOption?: boolean;
  hasSweetnessOption?: boolean;
}

export interface CustomizationOptions {
  size: 'Regular' | 'Large';
  milk?: 'Whole Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹40)' | 'No Milk';
  sweetness?: '0% Unsweetened' | '50% Mild Sweet' | '100% Standard';
  extraShot?: boolean;
  notes?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  options: CustomizationOptions;
  unitPrice: number;
  totalPrice: number;
}

export interface ReservationData {
  id: string;
  bookingRef: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  area: 'Sunlit Window Bench' | 'Cozy Hearth Nook' | 'Garden Terrace (Pet Friendly)' | 'Main Coffee Bar';
  specialRequests?: string;
  createdAt: string;
}
