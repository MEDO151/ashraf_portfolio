import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { t } from "i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navFixed, setNavFixed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setNavFixed(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav
        className={`w-full left-0 z-50 transition-all duration-300 ${
          navFixed
            ? "fixed top-0 bg-white text-black shadow-lg"
            : "absolute top-0 bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-5 py-4">
          <Link
            to="/"
            className={`font-extrabold text-lg transition-colors duration-300 ${
              navFixed ? "text-black" : "text-white"
            }`}
          >
            {t("nav.name")}
          </Link>

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

          <ul className="hidden md:flex gap-8 items-center">
            {["home", "about", "articles", "contact"].map((item) => (
              <li
                key={item}
                className={` text-[15px] relative font-medium transition-colors duration-300 before:content-[''] before:absolute before:left-0 before:-bottom-1 
                            before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 
                            hover:before:w-full ${
                              navFixed ? "text-black" : "text-white"
                            } hover:opacity-80  `}
              >
                <Link to={`/${item === "home" ? "" : item}`}>
                  {t(`nav.${item}`)}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>

        <div
          className={`md:hidden fixed left-0 top-[60px] w-full bg-white text-black shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-y-0" : "-translate-y-[150%]"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 py-8">
            {["home", "about", "articles", "contact"].map((item) => (
              <li
                key={item}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium"
              >
                <Link to={`/${item === "home" ? "" : item}`}>
                  {t(`nav.${item}`)}
                </Link>
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
