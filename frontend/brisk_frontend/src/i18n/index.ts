import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslations from './locales/en.json';
import enGbTranslations from './locales/en-gb.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import itTranslations from './locales/it.json';
import ptTranslations from './locales/pt.json';
import arTranslations from './locales/ar.json';
import hiTranslations from './locales/hi.json';
import zhCnTranslations from './locales/zh-cn.json';
import zhTwTranslations from './locales/zh-tw.json';

const resources = {
  en: {
    translation: enTranslations
  },
  'en-gb': {
    translation: enGbTranslations
  },
  es: {
    translation: esTranslations
  },
  fr: {
    translation: frTranslations
  },
  de: {
    translation: deTranslations
  },
  it: {
    translation: itTranslations
  },
  pt: {
    translation: ptTranslations
  },
  ar: {
    translation: arTranslations
  },
  hi: {
    translation: hiTranslations
  },
  'zh-cn': {
    translation: zhCnTranslations
  },
  'zh-tw': {
    translation: zhTwTranslations
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
  });

export default i18n;
