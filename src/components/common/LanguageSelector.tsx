import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Get current language base (e.g. 'es-ES' -> 'es')
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'es';
  const baseLanguage = currentLanguage.split('-')[0].toLowerCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-auto h-8 px-2 bg-transparent border-none text-white focus:outline-none flex items-center gap-2"
      >
        <Globe className="w-5 h-5 text-white" />
        <span className="hidden min-[930px]:inline-block uppercase font-medium">
          {baseLanguage}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-24 bg-black border border-yellow rounded-md shadow-lg overflow-hidden z-50">
          <button 
            onClick={() => changeLanguage('es')}
            className="block w-full text-left px-4 py-2 text-white hover:bg-yellow hover:text-black transition-colors text-sm"
          >
            ES
          </button>
          <button 
            onClick={() => changeLanguage('ca')}
            className="block w-full text-left px-4 py-2 text-white hover:bg-yellow hover:text-black transition-colors text-sm"
          >
            CA
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className="block w-full text-left px-4 py-2 text-white hover:bg-yellow hover:text-black transition-colors text-sm"
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};
