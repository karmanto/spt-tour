import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types/language';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as Language, name: 'EN', flagClass: 'fi fi-us' },
    { code: 'id' as Language, name: 'ID', flagClass: 'fi fi-id' },
    { code: 'ru' as Language, name: 'RU', flagClass: 'fi fi-ru' }
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => setLanguage(language.code)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentLanguage === language.code 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          <span className={`${language.flagClass} text-sm`}></span>
          <span className="text-sm font-medium">{language.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;