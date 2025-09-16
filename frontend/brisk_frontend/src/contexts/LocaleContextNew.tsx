import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n';

interface LocaleContextType {
  locale: string;
  formatDate: (date: Date | string) => string;
  formatDateTime: (date: Date | string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const localeMap: Record<string, string> = {
  'en': 'en-US',
  'en-gb': 'en-GB', 
  'es': 'es-ES',
  'fr': 'fr-FR',
  'de': 'de-DE',
  'it': 'it-IT',
  'pt': 'pt-PT',
  'ar': 'ar-SA',
  'hi': 'hi-IN',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW'
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>('en-US');

  useEffect(() => {
    const updateLocale = () => {
      const currentLanguage = i18n.language || 'en';
      const mappedLocale = localeMap[currentLanguage] || 'en-US';
      setLocale(mappedLocale);
    };

    updateLocale();
    i18n.on('languageChanged', updateLocale);
    
    return () => {
      i18n.off('languageChanged', updateLocale);
    };
  }, []);

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString(locale);
  };

  const formatDateTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleString(locale);
  };

  return (
    <LocaleContext.Provider value={{ locale, formatDate, formatDateTime }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
