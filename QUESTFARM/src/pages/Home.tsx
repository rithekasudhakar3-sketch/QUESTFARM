import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="p-6">
      <h1>{t("welcome")}</h1>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ta")}>தமிழ்</button>
      <button onClick={() => changeLanguage("hi")}>हिन्दी</button>
      
      <p>{t("startQuest")}</p>
      <button>{t("uploadProof")}</button>
    </div>
  );
};

export default Home;