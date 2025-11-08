import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">{t('home')}</Link>
        </li>
        <li>
          <Link to="/quests">{t('quests')}</Link>
        </li>
        <li>
          <Link to="/chatbot">{t('chatbot')}</Link>
        </li>
        <li>
          <Link to="/tasks">{t('tasks')}</Link>
        </li>
        <li>
          <Link to="/profile">{t('profile')}</Link>
        </li>
        <li>
          <Link to="/contact">{t('contact')}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;