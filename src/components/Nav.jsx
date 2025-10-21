import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { t } from "i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navFixed, setNavFixed] = useState(true);
  const location = useLocation();

  const navItems = ["home", "about", "articles", "contact"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // منع التمرير عند فتح القائمة في الموبايل
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // مراقبة الأقسام لتبديل حالة الـ nav (تتحدث مع تغيّر الصفحة)
  useEffect(() => {
    setNavFixed(false); // إعادة التهيئة عند كل تنقّل

    const timeout = setTimeout(() => {
      const sections = ["#heroSection", "#allArticles", "#article"]
        .map((id) => document.querySelector(id))
        .filter(Boolean);

      if (sections.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const anyVisible = entries.some((entry) => entry.isIntersecting);
          setNavFixed(!anyVisible);
        },
        { threshold: 0.1 }
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, 2000); // انتظار بسيط لتأكّد من تحميل الـ DOM

    return () => clearTimeout(timeout);
  }, [location.pathname]); //  يعيد التنفيذ عند تغيّر الصفحة

  return (
    <>
      {/* Overlay للموبايل */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Navbar */}
      <nav
        className={`w-full left-0 z-50 transition-all duration-300 ${
          navFixed
            ? "fixed top-0 bg-white text-black shadow-lg"
            : "absolute top-0 bg-transparent text-white"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-5 py-4">
          {/* Logo */}
          <Link
            to="/"
            className={`font-extrabold text-lg transition-colors duration-300 ${
              navFixed ? "text-black" : "text-white"
            }`}
          >
            {t("nav.name")}
          </Link>

          {/* زر الموبايل */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden transition-colors duration-300 ${
              navFixed ? "text-black" : "text-white"
            }`}
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* قائمة الديسكتوب */}
          <ul className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <li
                key={item}
                className={`text-[15px] relative font-medium transition-colors duration-300 
                  before:content-[''] before:absolute before:left-0 before:-bottom-1 
                  before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 
                  hover:before:w-full ${
                    navFixed ? "text-black" : "text-white"
                  } hover:opacity-80`}
              >
                <a href={`/#${item === "home" ? "" : item}`}>
                  {t(`nav.${item}`)}
                </a>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        {/* قائمة الموبايل */}
        <div
          className={`md:hidden fixed left-0 top-[60px] w-full bg-white text-black shadow-lg z-40 transform transition-all duration-500 ease-out ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <li
                key={item}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium"
              >
                <a href={`/#${item === "home" ? "" : item}`}>
                  {t(`nav.${item}`)}
                </a>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
