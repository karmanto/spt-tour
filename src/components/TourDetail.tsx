import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Star, Camera, CheckCircle, XCircle } from 'lucide-react';
import { TourPackage } from '../types/language';
import { useLanguage } from '../contexts/LanguageContext';
import { isPromotionValid } from '../utils/tourUtils';
import LanguageSelector from './LanguageSelector';
import BookingForm from './BookingForm';

interface TourDetailProps {
  tour: TourPackage;
  onBack: () => void;
}

const TourDetail: React.FC<TourDetailProps> = ({ tour, onBack }) => {
  const { t, currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'pricing' | 'booking'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const hasValidPromotion = tour.promotions && isPromotionValid(tour.promotions.validUntil);

  const tabs = [
    { id: 'overview', label: t('tour.overview') },
    { id: 'itinerary', label: t('tour.itinerary') },
    { id: 'pricing', label: t('tour.pricing') },
    { id: 'booking', label: t('tour.booking') }
  ];

  const formatOpenTripDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('common.backToTours')}</span>
            </button>
            
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={tour.images[selectedImageIndex]}
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
                {hasValidPromotion && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                    {tour.promotions!.discount}% OFF - Limited Time!
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Camera className="w-4 h-4" />
                  {selectedImageIndex + 1} / {tour.images.length}
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {tour.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tour.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.location}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {tour.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  {tour.tourType === 'day-trip' && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{t('common.groupTour')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 (124 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Open Trip Date */}
              {tour.tourType === 'open-trip' && tour.openTripDate && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('tour.openTripDate')}</h3>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatOpenTripDate(tour.openTripDate)}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('tour.highlights')}</h3>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {hasValidPromotion && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">{t('tour.specialPromotion')}</h3>
                  <p className="text-orange-100 mb-3">
                    Save {tour.promotions!.discount}% on this tour - {tour.promotions!.type} offer valid until {tour.promotions!.validUntil}
                  </p>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {t('tour.bookAndSave')}
                  </button>
                </div>
              )}

              {/* Price and Book Button */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ฿{tour.price.adult.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{t('common.perAdult')}</div>
                </div>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  {t('common.bookNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('tour.overview')}</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {tour.overview}
              </p>
            </div>

            {/* What's Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  {t('tour.included')}
                </h3>
                <ul className="space-y-3">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-red-500" />
                  {t('tour.excluded')}
                </h3>
                <ul className="space-y-3">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('tour.itineraryTitle')}</h2>
            {tour.itinerary.map((day, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{day.title}</h3>
                    <p className="text-gray-600">Day {day.day}</p>
                  </div>
                </div>
                
                <div className="ml-16 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">{t('tour.activitiesSchedule')}</h4>
                    <ul className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="text-gray-700 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{t('tour.mealsIncluded')}</h4>
                      <div className="flex gap-2">
                        {day.meals.map((meal, mealIndex) => (
                          <span
                            key={mealIndex}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {day.accommodation && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('tour.accommodation')}</h4>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {day.accommodation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-8">
            {/* Pricing Table */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('tour.pricingInfo')}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">{t('tour.category')}</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">{t('tour.ageRange')}</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-900">{t('tour.pricePerPerson')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">{t('common.adult')}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{t('age.adult')}</td>
                      <td className="py-4 px-6 text-right text-xl font-bold text-gray-900">
                        ฿{tour.price.adult.toLocaleString()}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 px-6 font-medium text-gray-900">{t('common.child')}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{t('age.child')}</td>
                      <td className="py-4 px-6 text-right text-xl font-bold text-gray-900">
                        ฿{tour.price.child.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-900">{t('common.infant')}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{t('age.infant')}</td>
                      <td className="py-4 px-6 text-right text-xl font-bold text-green-600">
                        {t('common.free')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('tour.faq')}</h2>
              <div className="space-y-6">
                {tour.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-yellow-50 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('tour.cancellationPolicy')}</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('policy.item1')}</li>
                <li>• {t('policy.item2')}</li>
                <li>• {t('policy.item3')}</li>
                <li>• {t('policy.item4')}</li>
                <li>• {t('policy.item5')}</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'booking' && (
          <BookingForm tour={tour} />
        )}
      </div>
    </div>
  );
};

export default TourDetail;