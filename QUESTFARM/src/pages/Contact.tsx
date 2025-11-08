import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t("contactUs")}</h1>
      <p>{t("contactDescription")}</p>
      <form>
        <div>
          <label htmlFor="name">{t("name")}</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">{t("email")}</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">{t("message")}</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">{t("send")}</button>
      </form>
    </div>
  );
};

export default Contact;