

export enum ViewState {
  HOME = 'HOME',
  SWIPE = 'SWIPE',
  MATCH = 'MATCH',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE'
}

export interface UserPreferences {
  vibes: string[];
  placeTypes: string[];
  maxDistance: number; // km
}

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photoUrl: string;
  isVerified: boolean;
  distance: string;
  location: { lat: number; lng: number };
  preferences: UserPreferences;
  country?: string;
}

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface Place {
  id: string;
  name: string;
  type: string;
  vibe: string; // e.g., 'Romantic', 'Lively', 'Cozy'
  priceLevel: string; // '$', '$$', '$$$', '$$$$'
  description: string;
  photoUrl: string; // Main thumbnail
  photos: string[]; // Gallery
  rating: number;
  lat: number;
  lng: number;
  features: string[];
  // New Details
  menu?: MenuSection[];
  isOpen?: boolean;
  busyLevel?: 'Quiet' | 'Moderate' | 'Busy' | 'Very Busy';
  openTime?: string;
  closeTime?: string;
  address?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'me' or 'partner' or 'system'
  text: string;
  timestamp: Date;
}

export interface AppContextType {
  view: ViewState;
  setView: (view: ViewState) => void;
  currentUser: User;
  matchedPlace: Place | null;
  setMatchedPlace: (place: Place | null) => void;
  partner: User;
}