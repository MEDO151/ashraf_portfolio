import { useTranslation } from 'react-i18next';
// import './App.css'
import LanguageSwitcher from './components/LanguageSwitcher'
import { useDirection } from './hooks/useDirection';

function App() {
  useDirection()
    // useTranslation hook provides access to the translation function 't'
    const { t } = useTranslation()

  return (
    <>
    <LanguageSwitcher/>
      <h1 className='text-4xl font-extrabold text-gradient-violet'>
                {t("hero.greeting")}
            </h1>
            <h1 className='text-4xl font-extrabold text-gradient-amber'>
                {t("hero.intro")}
            </h1>
    </>
  )
}

export default App
