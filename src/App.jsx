import { useTranslation } from "react-i18next";
// import './App.css'
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useDirection } from "./hooks/useDirection";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import { useEffect, useRef, useState } from "react";

function App() {
  useDirection();
  const { t } = useTranslation();

  return (
    <>
      <Nav />
    <Routes>
      <Route path='/' element={<HeroSection />} />
      
    </Routes>
    <div className="container mt-150">
        <LanguageSwitcher />
        <h1 className="text-4xl font-extrabold text-gradient-violet">
          {t("hero.greeting")}
        </h1>
        <h1 className="text-4xl font-extrabold text-gradient-amber">
          {t("hero.intro")}
        </h1>
      </div>
    </>
  );
}

export default App;
