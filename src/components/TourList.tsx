import React, { useState, useMemo } from 'react';
import { MapPin, Clock, Users, Star, ArrowRight, Filter, X } from 'lucide-react';
import { TourPackage, TranslatedTourPackage } from '../types/language';
import { useLanguage } from '../contexts/LanguageContext';
import { transformTourForLanguage, isPromotionValid } from '../utils/tourUtils';
import LanguageSelector from './LanguageSelector';
import toursData from '../data/tours.json';

interface TourListProps {
  onTourSelect: (tour: TourPackage) => void;
}

interface FilterState {
  tourType: 'all' | 'day-trip' | 'open-trip' | 'other';
  minPrice: number;
  maxPrice: number;
}

const TourList: React.FC<TourListProps> = ({ onTourSelect }) => {
  const { currentLanguage, t } = useLanguage();
  const translatedTours = toursData as TranslatedTourPackage[];
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    tourType: 'all',
    minPrice: 0,
    maxPrice: 10000
  });

  const tours = translatedTours.map(tour => transformTourForLanguage(tour, currentLanguage));

  // Get price range for filter
  const priceRange = useMemo(() => {
    const prices = tours.map(tour => tour.price.adult);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [tours]);

  // Filter tours based on current filters
  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      // Filter by tour type
      if (filters.tourType !== 'all' && tour.tourType !== filters.tourType) {
        return false;
      }

      // Filter by price range
      if (tour.price.adult < filters.minPrice || tour.price.adult > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [tours, filters]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      tourType: 'all',
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    });
  };

  const getTourTypeLabel = (type?: string) => {
    switch (type) {
      case 'day-trip': return t('common.dayTrip');
      case 'open-trip': return t('common.openTrip');
      case 'other': return t('common.other');
      default: return '';
    }
  };

  const formatOpenTripDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Floating Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('header.title')}
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tour Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.tourType')}
                </label>
                <select
                  value={filters.tourType}
                  onChange={(e) => handleFilterChange('tourType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">{t('common.all')}</option>
                  <option value="day-trip">{t('common.dayTrip')}</option>
                  <option value="open-trip">{t('common.openTrip')}</option>
                  <option value="other">{t('common.other')}</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.priceRange')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t('filter.minPrice')}
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder={t('filter.maxPrice')}
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value) || 10000)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-end gap-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('filter.clear')}
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            const hasValidPromotion = tour.promotions && isPromotionValid(tour.promotions.validUntil);
            
            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
                onClick={() => onTourSelect(tour)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {hasValidPromotion && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {tour.promotions!.discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                  {tour.tourType && (
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {getTourTypeLabel(tour.tourType)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {tour.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {tour.overview}
                  </p>

                  {/* Open Trip Date */}
                  {tour.tourType === 'open-trip' && tour.openTripDate && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">
                        {t('tour.openTripDate')}: {formatOpenTripDate(tour.openTripDate)}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="flex-col items-center gap-2">
                        {tour.originalPrice && hasValidPromotion && (
                          <div className="text-md text-gray-400 line-through">
                            ฿{tour.originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-gray-900">
                          ฿{tour.price.adult.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 group/btn whitespace-nowrap">
                      {t('common.viewDetails')}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No tours found matching your filters</div>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('filter.clear')}
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t('cta.subtitle')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
            {t('cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourList;