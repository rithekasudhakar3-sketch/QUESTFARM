import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("profile.title")}</h1>
      <p>{t("profile.description")}</p>
      {/* Additional profile information can be added here */}
    </div>
  );
};

export default Profile;