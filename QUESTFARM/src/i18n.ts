import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to QUESTFARM",
          startQuest: "Start your quest",
          uploadProof: "Upload your proof",
        },
      },
      hi: {
        translation: {
          welcome: "QUESTFARM में आपका स्वागत है",
          startQuest: "अपना क्वेस्ट शुरू करें",
          uploadProof: "अपना प्रमाण अपलोड करें",
        },
      },
      ta: {
        translation: {
          welcome: "QUESTFARM-க்கு வரவேற்கிறேன்",
          startQuest: "உங்கள் குவெஸ்டை தொடங்குங்கள்",
          uploadProof: "உங்கள் ஆதாரத்தை பதிவேற்றவும்",
        },
      },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;