import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import i18n from "../i18n";

/**
 * LanguageSwitcher Component
 * 
 * This component provides a toggle button to switch between English and Arabic languages.
 * It uses i18next's useTranslation hook to access the current language and changeLanguage function.
 * The selected language is automatically saved to localStorage by i18next configuration.
 */
const LanguageSwitcher = () => {
  // useTranslation hook provides access to:
  // - t: translation function
  // - i18n: i18next instance with methods like changeLanguage
  const { t } = useTranslation();

  /**
   * Handle language switching
   * This function toggles between English ('en') and Arabic ('ar')
   * The language change is automatically persisted to localStorage
   * by the i18next LanguageDetector plugin
   */
  const handleLanguageSwitch = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  {/* Language toggle button */ }
  return (
    <Button
      onClick={handleLanguageSwitch}
      className=""
      role="switch"
      aria-checked={i18n.language === 'ar'}
      aria-label={t('language.switch')}
      dir='rtl'
    >
      {i18n.language === "ar" ? "EN" : "عربي"}
    </Button>


  );
};

export default LanguageSwitcher;
