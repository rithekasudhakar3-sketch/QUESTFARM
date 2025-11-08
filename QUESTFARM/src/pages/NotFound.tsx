import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.message")}</p>
    </div>
  );
};

export default NotFound;