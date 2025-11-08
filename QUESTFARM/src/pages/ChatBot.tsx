import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatBot = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("chatBotTitle")}</h1>
      <p>{t("chatBotDescription")}</p>
      {/* Add your chatbot implementation here */}
    </div>
  );
};

export default ChatBot;