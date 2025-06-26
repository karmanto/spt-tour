import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types/language';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type TranslationMap = { [key: string]: string };

const translations: { [lang in Language]: TranslationMap } = {
  en: {
    // Header
    'header.title': 'Tour Packages',
    
    // Common
    'common.backToTours': 'Back to Tours',
    'common.bookNow': 'Book Now',
    'common.viewDetails': 'View Details',
    'common.perAdult': 'per adult',
    'common.groupTour': 'Group Tour',
    'common.free': 'FREE',
    'common.adult': 'Adult',
    'common.child': 'Child',
    'common.infant': 'Infant',
    'common.total': 'Total',
    'common.loading': 'Loading...',
    'common.processing': 'Processing...',
    'common.openTrip': 'Open Trip',
    'common.dayTrip': 'Day Trip',
    'common.other': 'Other',
    'common.all': 'All',
    
    // Filters
    'filter.tourType': 'Tour Type',
    'filter.priceRange': 'Price Range',
    'filter.minPrice': 'Min Price',
    'filter.maxPrice': 'Max Price',
    'filter.apply': 'Apply Filters',
    'filter.clear': 'Clear Filters',
    
    // Tour Details
    'tour.overview': 'Overview',
    'tour.itinerary': 'Itinerary',
    'tour.pricing': 'Pricing & Info',
    'tour.booking': 'Book Now',
    'tour.highlights': 'Tour Highlights',
    'tour.included': "What's Included",
    'tour.excluded': "What's Not Included",
    'tour.itineraryTitle': 'Detailed Itinerary',
    'tour.activitiesSchedule': 'Activities & Schedule',
    'tour.mealsIncluded': 'Meals Included',
    'tour.accommodation': 'Accommodation',
    'tour.pricingInfo': 'Pricing Information',
    'tour.ageRange': 'Age Range',
    'tour.pricePerPerson': 'Price per Person',
    'tour.category': 'Category',
    'tour.faq': 'Frequently Asked Questions',
    'tour.cancellationPolicy': 'Cancellation & Refund Policy',
    'tour.specialPromotion': 'Special Promotion!',
    'tour.bookAndSave': 'Book Now & Save!',
    'tour.openTripDate': 'Trip Date',
    
    // Age ranges
    'age.adult': '12+ years',
    'age.child': '4-11 years',
    'age.infant': '0-3 years',
    
    // Booking Form
    'booking.title': 'Day Trip Booking Form',
    'booking.packageSelection': 'Tour Package Selection',
    'booking.packageName': 'Package Name',
    'booking.dateOfTour': 'Date of Tour',
    'booking.participants': 'Participants',
    'booking.pricePerPerson': 'Price per Person',
    'booking.quantity': 'Quantity',
    'booking.totalCost': 'Total Cost',
    'booking.discountApplied': 'discount applied!',
    'booking.guestInfo': 'Guest Information',
    'booking.familyName': 'Family Name',
    'booking.firstName': 'First Name',
    'booking.email': 'Email Address',
    'booking.phone': 'Phone Number',
    'booking.nationality': 'Nationality',
    'booking.hotelPickup': 'Hotel Pick-up From',
    'booking.roomNumber': 'Room Number (Optional)',
    'booking.pickupTime': 'Pick-up Time (Optional)',
    'booking.autoAssign': 'Auto-assign based on hotel',
    'booking.addOns': 'Optional Add-ons',
    'booking.whatsappGroup': 'Join WhatsApp group reminder',
    'booking.vegetarianMeal': 'Request Vegetarian Meal',
    'booking.actionButtons': 'Action Buttons',
    'booking.confirmBooking': 'Confirm Booking',
    'booking.resetForm': 'Reset Form',
    'booking.importantNotes': 'Important Notes',
    'booking.required': '*',
    'booking.selectCountry': 'Select Country',
    'booking.selectHotel': 'Select Hotel',
    'booking.openTripWarning': 'This is an open trip scheduled for',
    'booking.lastBookingDate': 'Last booking date',
    
    // Booking Success
    'success.title': 'Booking Confirmed!',
    'success.message': "Thank you for booking with us. You'll receive a confirmation email shortly with all the details.",
    'success.summary': 'Booking Summary',
    'success.tour': 'Tour:',
    'success.date': 'Date:',
    'success.participants': 'Participants:',
    'success.adults': 'Adult(s)',
    'success.children': 'Child(ren)',
    'success.bookAnother': 'Book Another Tour',
    
    // Call to Action
    'cta.title': "Can't Find What You're Looking For?",
    'cta.subtitle': 'We can customize any tour package to meet your specific needs and preferences.',
    'cta.button': 'Contact Our Travel Experts',
    
    // Cancellation Policy
    'policy.item1': 'Free cancellation up to 24 hours before the tour',
    'policy.item2': '50% refund for cancellations within 24 hours',
    'policy.item3': 'No refund for no-shows or same-day cancellations',
    'policy.item4': 'Weather-related cancellations: Full refund or reschedule',
    'policy.item5': 'Changes to booking subject to availability and price difference',
    
    // Notes
    'notes.item1': 'Form is mobile-friendly with automatic validation for email and phone numbers',
    'notes.item2': 'Pick-up time can be auto-filled based on hotel location or selected manually',
    'notes.item3': 'Total price is calculated dynamically based on number of participants',
    'notes.item4': 'You will receive confirmation email within 24 hours',
    'notes.item5': 'Please arrive at pick-up point 10 minutes early'
  },
  
  id: {
    // Header
    'header.title': 'Paket Tour',
    
    // Common
    'common.backToTours': 'Kembali ke Tour',
    'common.bookNow': 'Pesan Sekarang',
    'common.viewDetails': 'Lihat Detail',
    'common.perAdult': 'per dewasa',
    'common.groupTour': 'Tour Grup',
    'common.free': 'GRATIS',
    'common.adult': 'Dewasa',
    'common.child': 'Anak',
    'common.infant': 'Bayi',
    'common.total': 'Total',
    'common.loading': 'Memuat...',
    'common.processing': 'Memproses...',
    'common.openTrip': 'Open Trip',
    'common.dayTrip': 'Day Trip',
    'common.other': 'Lainnya',
    'common.all': 'Semua',
    
    // Filters
    'filter.tourType': 'Jenis Tour',
    'filter.priceRange': 'Rentang Harga',
    'filter.minPrice': 'Harga Min',
    'filter.maxPrice': 'Harga Max',
    'filter.apply': 'Terapkan Filter',
    'filter.clear': 'Hapus Filter',
    
    // Tour Details
    'tour.overview': 'Ringkasan',
    'tour.itinerary': 'Itinerary',
    'tour.pricing': 'Harga & Info',
    'tour.booking': 'Pesan Sekarang',
    'tour.highlights': 'Highlight Tour',
    'tour.included': 'Yang Termasuk',
    'tour.excluded': 'Yang Tidak Termasuk',
    'tour.itineraryTitle': 'Itinerary Lengkap',
    'tour.activitiesSchedule': 'Aktivitas & Jadwal',
    'tour.mealsIncluded': 'Makanan Termasuk',
    'tour.accommodation': 'Akomodasi',
    'tour.pricingInfo': 'Informasi Harga',
    'tour.ageRange': 'Rentang Usia',
    'tour.pricePerPerson': 'Harga per Orang',
    'tour.category': 'Kategori',
    'tour.faq': 'Pertanyaan yang Sering Diajukan',
    'tour.cancellationPolicy': 'Kebijakan Pembatalan & Pengembalian',
    'tour.specialPromotion': 'Promosi Khusus!',
    'tour.bookAndSave': 'Pesan Sekarang & Hemat!',
    'tour.openTripDate': 'Tanggal Trip',
    
    // Age ranges
    'age.adult': '12+ tahun',
    'age.child': '4-11 tahun',
    'age.infant': '0-3 tahun',
    
    // Booking Form
    'booking.title': 'Formulir Pemesanan Tour',
    'booking.packageSelection': 'Pilihan Paket Tour',
    'booking.packageName': 'Nama Paket',
    'booking.dateOfTour': 'Tanggal Tour',
    'booking.participants': 'Peserta',
    'booking.pricePerPerson': 'Harga per Orang',
    'booking.quantity': 'Jumlah',
    'booking.totalCost': 'Total Biaya',
    'booking.discountApplied': 'diskon diterapkan!',
    'booking.guestInfo': 'Informasi Tamu',
    'booking.familyName': 'Nama Keluarga',
    'booking.firstName': 'Nama Depan',
    'booking.email': 'Alamat Email',
    'booking.phone': 'Nomor Telepon',
    'booking.nationality': 'Kewarganegaraan',
    'booking.hotelPickup': 'Penjemputan Hotel Dari',
    'booking.roomNumber': 'Nomor Kamar (Opsional)',
    'booking.pickupTime': 'Waktu Penjemputan (Opsional)',
    'booking.autoAssign': 'Otomatis berdasarkan hotel',
    'booking.addOns': 'Tambahan Opsional',
    'booking.whatsappGroup': 'Bergabung dengan grup WhatsApp pengingat',
    'booking.vegetarianMeal': 'Minta Makanan Vegetarian',
    'booking.actionButtons': 'Tombol Aksi',
    'booking.confirmBooking': 'Konfirmasi Pemesanan',
    'booking.resetForm': 'Reset Formulir',
    'booking.importantNotes': 'Catatan Penting',
    'booking.required': '*',
    'booking.selectCountry': 'Pilih Negara',
    'booking.selectHotel': 'Pilih Hotel',
    'booking.openTripWarning': 'Ini adalah open trip yang dijadwalkan pada',
    'booking.lastBookingDate': 'Tanggal terakhir pemesanan',
    
    // Booking Success
    'success.title': 'Pemesanan Dikonfirmasi!',
    'success.message': 'Terima kasih telah memesan dengan kami. Anda akan menerima email konfirmasi segera dengan semua detail.',
    'success.summary': 'Ringkasan Pemesanan',
    'success.tour': 'Tour:',
    'success.date': 'Tanggal:',
    'success.participants': 'Peserta:',
    'success.adults': 'Dewasa',
    'success.children': 'Anak',
    'success.bookAnother': 'Pesan Tour Lain',
    
    // Call to Action
    'cta.title': 'Tidak Menemukan Yang Anda Cari?',
    'cta.subtitle': 'Kami dapat menyesuaikan paket tour apa pun untuk memenuhi kebutuhan dan preferensi spesifik Anda.',
    'cta.button': 'Hubungi Ahli Perjalanan Kami',
    
    // Cancellation Policy
    'policy.item1': 'Pembatalan gratis hingga 24 jam sebelum tour',
    'policy.item2': 'Pengembalian 50% untuk pembatalan dalam 24 jam',
    'policy.item3': 'Tidak ada pengembalian untuk tidak hadir atau pembatalan hari yang sama',
    'policy.item4': 'Pembatalan terkait cuaca: Pengembalian penuh atau penjadwalan ulang',
    'policy.item5': 'Perubahan pemesanan tergantung ketersediaan dan selisih harga',
    
    // Notes
    'notes.item1': 'Formulir ramah mobile dengan validasi otomatis untuk email dan nomor telepon',
    'notes.item2': 'Waktu penjemputan dapat diisi otomatis berdasarkan lokasi hotel atau dipilih manual',
    'notes.item3': 'Harga total dihitung secara dinamis berdasarkan jumlah peserta',
    'notes.item4': 'Anda akan menerima email konfirmasi dalam 24 jam',
    'notes.item5': 'Harap tiba di titik penjemputan 10 menit lebih awal'
  },
  
  ru: {
    // Header
    'header.title': 'Туристические пакеты',
    
    // Common
    'common.backToTours': 'Назад к турам',
    'common.bookNow': 'Забронировать',
    'common.viewDetails': 'Подробнее',
    'common.perAdult': 'за взрослого',
    'common.groupTour': 'Групповой тур',
    'common.free': 'БЕСПЛАТНО',
    'common.adult': 'Взрослый',
    'common.child': 'Ребенок',
    'common.infant': 'Младенец',
    'common.total': 'Итого',
    'common.loading': 'Загрузка...',
    'common.processing': 'Обработка...',
    'common.openTrip': 'Открытая поездка',
    'common.dayTrip': 'Однодневная поездка',
    'common.other': 'Другое',
    'common.all': 'Все',
    
    // Filters
    'filter.tourType': 'Тип тура',
    'filter.priceRange': 'Диапазон цен',
    'filter.minPrice': 'Мин. цена',
    'filter.maxPrice': 'Макс. цена',
    'filter.apply': 'Применить фильтры',
    'filter.clear': 'Очистить фильтры',
    
    // Tour Details
    'tour.overview': 'Обзор',
    'tour.itinerary': 'Маршрут',
    'tour.pricing': 'Цены и информация',
    'tour.booking': 'Забронировать',
    'tour.highlights': 'Основные моменты тура',
    'tour.included': 'Что включено',
    'tour.excluded': 'Что не включено',
    'tour.itineraryTitle': 'Подробный маршрут',
    'tour.activitiesSchedule': 'Мероприятия и расписание',
    'tour.mealsIncluded': 'Питание включено',
    'tour.accommodation': 'Размещение',
    'tour.pricingInfo': 'Информация о ценах',
    'tour.ageRange': 'Возрастной диапазон',
    'tour.pricePerPerson': 'Цена за человека',
    'tour.category': 'Категория',
    'tour.faq': 'Часто задаваемые вопросы',
    'tour.cancellationPolicy': 'Политика отмены и возврата',
    'tour.specialPromotion': 'Специальная акция!',
    'tour.bookAndSave': 'Забронируйте и сэкономьте!',
    'tour.openTripDate': 'Дата поездки',
    
    // Age ranges
    'age.adult': '12+ лет',
    'age.child': '4-11 лет',
    'age.infant': '0-3 года',
    
    // Booking Form
    'booking.title': 'Форма бронирования тура',
    'booking.packageSelection': 'Выбор туристического пакета',
    'booking.packageName': 'Название пакета',
    'booking.dateOfTour': 'Дата тура',
    'booking.participants': 'Участники',
    'booking.pricePerPerson': 'Цена за человека',
    'booking.quantity': 'Количество',
    'booking.totalCost': 'Общая стоимость',
    'booking.discountApplied': 'скидка применена!',
    'booking.guestInfo': 'Информация о госте',
    'booking.familyName': 'Фамилия',
    'booking.firstName': 'Имя',
    'booking.email': 'Адрес электронной почты',
    'booking.phone': 'Номер телефона',
    'booking.nationality': 'Национальность',
    'booking.hotelPickup': 'Трансфер из отеля',
    'booking.roomNumber': 'Номер комнаты (необязательно)',
    'booking.pickupTime': 'Время трансфера (необязательно)',
    'booking.autoAssign': 'Автоматически на основе отеля',
    'booking.addOns': 'Дополнительные услуги',
    'booking.whatsappGroup': 'Присоединиться к группе WhatsApp для напоминаний',
    'booking.vegetarianMeal': 'Запросить вегетарианское питание',
    'booking.actionButtons': 'Кнопки действий',
    'booking.confirmBooking': 'Подтвердить бронирование',
    'booking.resetForm': 'Сбросить форму',
    'booking.importantNotes': 'Важные заметки',
    'booking.required': '*',
    'booking.selectCountry': 'Выберите страну',
    'booking.selectHotel': 'Выберите отель',
    'booking.openTripWarning': 'Это открытая поездка, запланированная на',
    'booking.lastBookingDate': 'Последняя дата бронирования',
    
    // Booking Success
    'success.title': 'Бронирование подтверждено!',
    'success.message': 'Спасибо за бронирование у нас. Вы получите подтверждающее письмо в ближайшее время со всеми деталями.',
    'success.summary': 'Сводка бронирования',
    'success.tour': 'Тур:',
    'success.date': 'Дата:',
    'success.participants': 'Участники:',
    'success.adults': 'Взрослых',
    'success.children': 'Детей',
    'success.bookAnother': 'Забронировать другой тур',
    
    // Call to Action
    'cta.title': 'Не можете найти то, что ищете?',
    'cta.subtitle': 'Мы можем настроить любой туристический пакет в соответствии с вашими конкретными потребностями и предпочтениями.',
    'cta.button': 'Связаться с нашими экспертами по путешествиям',
    
    // Cancellation Policy
    'policy.item1': 'Бесплатная отмена до 24 часов до тура',
    'policy.item2': '50% возврат при отмене в течение 24 часов',
    'policy.item3': 'Без возврата за неявку или отмену в тот же день',
    'policy.item4': 'Отмена из-за погоды: полный возврат или перенос',
    'policy.item5': 'Изменения в бронировании зависят от наличия мест и разницы в цене',
    
    // Notes
    'notes.item1': 'Форма адаптирована для мобильных устройств с автоматической проверкой email и телефонных номеров',
    'notes.item2': 'Время трансфера может быть заполнено автоматически на основе местоположения отеля или выбрано вручную',
    'notes.item3': 'Общая цена рассчитывается динамически на основе количества участников',
    'notes.item4': 'Вы получите подтверждающее письмо в течение 24 часов',
    'notes.item5': 'Пожалуйста, прибудьте к месту трансфера на 10 минут раньше'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};