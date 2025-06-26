export type Language = 'en' | 'id' | 'ru';

export interface LanguageContent {
  en: string;
  id: string;
  ru: string;
}

export interface TranslatedTourPackage {
  id: string;
  name: LanguageContent;
  duration: LanguageContent;
  location: LanguageContent;
  price: {
    adult: number;
    child: number;
    infant: number;
  };
  originalPrice?: number;
  images: string[];
  overview: LanguageContent;
  highlights: LanguageContent[];
  itinerary: {
    day: number;
    title: LanguageContent;
    activities: LanguageContent[];
    meals: LanguageContent[];
    accommodation?: LanguageContent;
  }[];
  included: LanguageContent[];
  excluded: LanguageContent[];
  promotions?: {
    type: LanguageContent;
    discount: number;
    validUntil: string;
  };
  faqs: {
    question: LanguageContent;
    answer: LanguageContent;
  }[];
  tourType?: 'day-trip' | 'open-trip' | 'other';
  openTripDate?: string;
  minBookingHours?: number;
}

export interface TourPackage {
  id: string;
  name: string;
  duration: string;
  location: string;
  price: {
    adult: number;
    child: number;
    infant: number;
  };
  originalPrice?: number;
  images: string[];
  overview: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
  }[];
  included: string[];
  excluded: string[];
  promotions?: {
    type: string;
    discount: number;
    validUntil: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  tourType?: 'day-trip' | 'open-trip' | 'other';
  openTripDate?: string;
  minBookingHours?: number;
}