import React from 'react';
import { useTranslation } from 'react-i18next';

const Tasks = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("tasksTitle")}</h1>
      <p>{t("tasksDescription")}</p>
      {/* Add more task-related content here */}
    </div>
  );
};

export default Tasks;