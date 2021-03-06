import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import Backend from 'i18next-xhr-backend'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'gb',
    fallbackLng: 'gb',
    whitelist: ['gb', 'us'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })

export default i18n
