import React, { useState } from 'react';
import { Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import { TourPackage } from '../types/language';
import { useLanguage } from '../contexts/LanguageContext';
import { getMinBookingDate, getMaxBookingDateForOpenTrip, isPromotionValid } from '../utils/tourUtils';

interface BookingFormProps {
  tour: TourPackage;
}

interface BookingData {
  selectedDate: string;
  participants: {
    adult: number;
    child: number;
    infant: number;
  };
  guestInfo: {
    familyName: string;
    firstName: string;
    email: string;
    phone: string;
    nationality: string;
    hotelPickup: string;
    roomNumber: string;
    pickupTime: string;
  };
  addOns: {
    whatsappGroup: boolean;
    vegetarianMeal: boolean;
  };
}

const countries = [
  'Thailand', 'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 
  'Australia', 'Canada', 'Singapore', 'Malaysia', 'China', 'India', 'Indonesia', 'Russia', 'Other'
];

const hotels = [
  'Patong Beach Hotel', 'Kata Beach Resort', 'Karon Beach Hotel', 
  'Phuket Town Hotel', 'Kamala Beach Resort', 'Surin Beach Hotel',
  'Nai Harn Beach Resort', 'Bang Tao Beach Hotel', 'Other / Manual Input'
];

const BookingForm: React.FC<BookingFormProps> = ({ tour }) => {
  const { t, currentLanguage } = useLanguage();
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: '',
    participants: {
      adult: 1,
      child: 0,
      infant: 0
    },
    guestInfo: {
      familyName: '',
      firstName: '',
      email: '',
      phone: '',
      nationality: '',
      hotelPickup: '',
      roomNumber: '',
      pickupTime: ''
    },
    addOns: {
      whatsappGroup: false,
      vegetarianMeal: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const hasValidPromotion = tour.promotions && isPromotionValid(tour.promotions.validUntil);

  // Calculate date constraints
  const minBookingDate = getMinBookingDate(tour.minBookingHours);
  const maxBookingDate = tour.tourType === 'open-trip' && tour.openTripDate 
    ? getMaxBookingDateForOpenTrip(tour.openTripDate, tour.minBookingHours)
    : undefined;

  const updateParticipants = (type: 'adult' | 'child' | 'infant', change: number) => {
    setBookingData(prev => ({
      ...prev,
      participants: {
        ...prev.participants,
        [type]: Math.max(0, prev.participants[type] + change)
      }
    }));
  };

  const calculateTotal = () => {
    const { adult, child } = bookingData.participants;
    let total = (adult * tour.price.adult) + (child * tour.price.child);
    
    if (hasValidPromotion) {
      total = total * (1 - tour.promotions!.discount / 100);
    }
    
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const resetForm = () => {
    setBookingData({
      selectedDate: '',
      participants: { adult: 1, child: 0, infant: 0 },
      guestInfo: {
        familyName: '', firstName: '', email: '', phone: '', nationality: '',
        hotelPickup: '', roomNumber: '', pickupTime: ''
      },
      addOns: { whatsappGroup: false, vegetarianMeal: false }
    });
    setShowSuccess(false);
  };

  const formatOpenTripDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastBookingDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('success.title')}</h2>
        <p className="text-lg text-gray-600 mb-6">
          {t('success.message')}
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t('success.summary')}</h3>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span>{t('success.tour')}</span>
              <span className="font-medium">{tour.name}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('success.date')}</span>
              <span className="font-medium">
                {tour.tourType === 'open-trip' && tour.openTripDate 
                  ? formatOpenTripDate(tour.openTripDate)
                  : bookingData.selectedDate
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('success.participants')}</span>
              <span className="font-medium">
                {bookingData.participants.adult} {t('success.adults')}, {bookingData.participants.child} {t('success.children')}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>{t('common.total')}:</span>
              <span>฿{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={resetForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          {t('success.bookAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📋 {t('booking.title')}</h2>
        <p className="text-lg text-gray-600">{tour.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tour Package Selection */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🛒 {t('booking.packageSelection')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.packageName')}
              </label>
              <input
                type="text"
                value={tour.name}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 {t('booking.dateOfTour')}
              </label>
              {tour.tourType === 'open-trip' && tour.openTripDate ? (
                <div>
                  <input
                    type="text"
                    value={formatOpenTripDate(tour.openTripDate)}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 text-blue-800 font-medium"
                  />
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <div className="font-medium">{t('booking.openTripWarning')} {formatOpenTripDate(tour.openTripDate)}</div>
                        {maxBookingDate && (
                          <div className="mt-1">
                            {t('booking.lastBookingDate')}: {formatLastBookingDate(maxBookingDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <input
                  type="date"
                  value={bookingData.selectedDate}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    selectedDate: e.target.value
                  }))}
                  required
                  min={minBookingDate}
                  max={maxBookingDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            👤 {t('booking.participants')}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-sm font-medium text-gray-700">{t('tour.category')}</div>
              <div className="text-sm font-medium text-gray-700 text-center">{t('booking.pricePerPerson')}</div>
              <div className="text-sm font-medium text-gray-700 text-center">{t('booking.quantity')}</div>
            </div>
            
            {/* Adult */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{t('common.adult')} ({t('age.adult')})</div>
              </div>
              <div className="text-center font-bold text-gray-900">
                ฿{tour.price.adult.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateParticipants('adult', -1)}
                  disabled={bookingData.participants.adult <= 1}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {bookingData.participants.adult}
                </span>
                <button
                  type="button"
                  onClick={() => updateParticipants('adult', 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Child */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{t('common.child')} ({t('age.child')})</div>
              </div>
              <div className="text-center font-bold text-gray-900">
                ฿{tour.price.child.toLocaleString()}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateParticipants('child', -1)}
                  disabled={bookingData.participants.child <= 0}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {bookingData.participants.child}
                </span>
                <button
                  type="button"
                  onClick={() => updateParticipants('child', 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Infant */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{t('common.infant')} ({t('age.infant')})</div>
              </div>
              <div className="text-center font-bold text-green-600">
                {t('common.free')}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => updateParticipants('infant', -1)}
                  disabled={bookingData.participants.infant <= 0}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {bookingData.participants.infant}
                </span>
                <button
                  type="button"
                  onClick={() => updateParticipants('infant', 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2">{t('booking.totalCost')}</div>
              <div className="text-3xl font-bold text-blue-600">
                ฿{calculateTotal().toLocaleString()}
              </div>
              {hasValidPromotion && (
                <div className="text-sm text-green-600 mt-2">
                  ({tour.promotions!.discount}% {t('booking.discountApplied')})
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📌 {t('booking.guestInfo')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.familyName')} {t('booking.required')}
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.familyName}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, familyName: e.target.value }
                }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.firstName')} {t('booking.required')}
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.firstName}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, firstName: e.target.value }
                }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.email')} {t('booking.required')}
              </label>
              <input
                type="email"
                value={bookingData.guestInfo.email}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, email: e.target.value }
                }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.phone')} {t('booking.required')}
              </label>
              <input
                type="tel"
                value={bookingData.guestInfo.phone}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, phone: e.target.value }
                }))}
                required
                placeholder="+66 XX XXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.nationality')} {t('booking.required')}
              </label>
              <select
                value={bookingData.guestInfo.nationality}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, nationality: e.target.value }
                }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('booking.selectCountry')}</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.hotelPickup')} {t('booking.required')}
              </label>
              <select
                value={bookingData.guestInfo.hotelPickup}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, hotelPickup: e.target.value }
                }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('booking.selectHotel')}</option>
                {hotels.map((hotel) => (
                  <option key={hotel} value={hotel}>{hotel}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.roomNumber')}
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.roomNumber}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, roomNumber: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.pickupTime')}
              </label>
              <select
                value={bookingData.guestInfo.pickupTime}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  guestInfo: { ...prev.guestInfo, pickupTime: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{t('booking.autoAssign')}</option>
                <option value="06:30">06:30 AM</option>
                <option value="07:00">07:00 AM</option>
                <option value="07:30">07:30 AM</option>
                <option value="08:00">08:00 AM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🧩 {t('booking.addOns')}
          </h3>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={bookingData.addOns.whatsappGroup}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  addOns: { ...prev.addOns, whatsappGroup: e.target.checked }
                }))}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium text-gray-900">{t('booking.whatsappGroup')}</span>
            </label>
            
            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={bookingData.addOns.vegetarianMeal}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  addOns: { ...prev.addOns, vegetarianMeal: e.target.checked }
                }))}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium text-gray-900">{t('booking.vegetarianMeal')}</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            ✅ {t('booking.actionButtons')}
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              {isSubmitting ? t('common.processing') : `${t('booking.confirmBooking')} - ฿${calculateTotal().toLocaleString()}`}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              {t('booking.resetForm')}
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            📱 {t('booking.importantNotes')}
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• {t('notes.item1')}</li>
            <li>• {t('notes.item2')}</li>
            <li>• {t('notes.item3')}</li>
            <li>• {t('notes.item4')}</li>
            <li>• {t('notes.item5')}</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;