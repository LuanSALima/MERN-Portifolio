import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Portuguese as pt } from './languages/pt';
import { English as en } from './languages/en';

export const I18N_KEY = "@nodePortifolio-Language";

export const getLanguage = () => {
  return localStorage.getItem(I18N_KEY);
}

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: false,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en,
      pt
    },
    detection: {
      lookupLocalStorage: I18N_KEY
    }
  });

export default i18n;