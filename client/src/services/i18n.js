import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          Navbar: {
            change_language: 'Change language',
            dashboard: 'Dashboard',
            about_project: 'About Project',
            plans_project: 'Project Plans',
            register: 'Register',
            login: 'Login',
            logout: 'Logout',
            edit_account: 'Edit Account',
            change_password: 'Change Password',
            account: 'Account'
          }
        }
      },
      pt: {
        translation: {
          Navbar: {
            change_language: 'Trocar Idioma',
            dashboard: 'Dashboard',
            about_project: 'Sobre o Projeto',
            plans_project: 'Planos para o Projeto',
            register: 'Registrar-se',
            login: 'Login',
            logout: 'Sair',
            edit_account: 'Editar Conta',
            change_password: 'Alterar Senha',
            account: 'Conta'
          }
        }
      }
    }
  });

export default i18n;