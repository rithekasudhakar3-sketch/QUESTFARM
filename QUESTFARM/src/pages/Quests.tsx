import React from 'react';
import { useTranslation } from 'react-i18next';

const Quests = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("quests.title")}</h1>
      <p>{t("quests.description")}</p>
      {/* Additional content related to quests can be added here */}
    </div>
  );
};

export default Quests;