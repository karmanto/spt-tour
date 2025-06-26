import { TranslatedTourPackage, Language, LanguageContent } from '../types/language';

export const getLocalizedContent = (content: LanguageContent, language: Language): string => {
  return content[language] || content.en;
};

export const getLocalizedArray = (contentArray: LanguageContent[], language: Language): string[] => {
  return contentArray.map(content => getLocalizedContent(content, language));
};

export const transformTourForLanguage = (tour: TranslatedTourPackage, language: Language) => {
  return {
    id: tour.id,
    name: getLocalizedContent(tour.name, language),
    duration: getLocalizedContent(tour.duration, language),
    location: getLocalizedContent(tour.location, language),
    price: tour.price,
    originalPrice: tour.originalPrice,
    images: tour.images,
    overview: getLocalizedContent(tour.overview, language),
    highlights: getLocalizedArray(tour.highlights, language),
    itinerary: tour.itinerary.map(day => ({
      day: day.day,
      title: getLocalizedContent(day.title, language),
      activities: getLocalizedArray(day.activities, language),
      meals: getLocalizedArray(day.meals, language),
      accommodation: day.accommodation ? getLocalizedContent(day.accommodation, language) : undefined
    })),
    included: getLocalizedArray(tour.included, language),
    excluded: getLocalizedArray(tour.excluded, language),
    promotions: tour.promotions ? {
      type: getLocalizedContent(tour.promotions.type, language),
      discount: tour.promotions.discount,
      validUntil: tour.promotions.validUntil
    } : undefined,
    faqs: tour.faqs.map(faq => ({
      question: getLocalizedContent(faq.question, language),
      answer: getLocalizedContent(faq.answer, language)
    })),
    tourType: tour.tourType,
    openTripDate: tour.openTripDate,
    minBookingHours: tour.minBookingHours
  };
};

export const isPromotionValid = (validUntil: string): boolean => {
  const today = new Date();
  const expiryDate = new Date(validUntil);
  return expiryDate >= today;
};

export const getMinBookingDate = (minBookingHours?: number): string => {
  const now = new Date();
  const minHours = minBookingHours || 0;
  const minDate = new Date(now.getTime() + (minHours * 60 * 60 * 1000));
  return minDate.toISOString().split('T')[0];
};

export const getMaxBookingDateForOpenTrip = (openTripDate: string, minBookingHours?: number): string => {
  const tripDate = new Date(openTripDate);
  const minHours = minBookingHours || 0;
  const maxBookingDate = new Date(tripDate.getTime() - (minHours * 60 * 60 * 1000));
  return maxBookingDate.toISOString().split('T')[0];
};