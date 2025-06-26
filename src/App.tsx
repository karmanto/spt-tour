import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import TourList from './components/TourList';
import TourDetail from './components/TourDetail';
import { TourPackage } from './types/language';

function App() {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  const handleTourSelect = (tour: TourPackage) => {
    setSelectedTour(tour);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedTour(null);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'list' ? (
          <TourList onTourSelect={handleTourSelect} />
        ) : (
          selectedTour && (
            <TourDetail tour={selectedTour} onBack={handleBackToList} />
          )
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;