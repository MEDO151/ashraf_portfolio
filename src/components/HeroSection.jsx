import React from "react";
import HeroImg from "@/assets/HeroImg01.jpg";
import { t } from "i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const HeroSection = function ({img,linLink}) {

  img = img || HeroImg
  linLink = linLink || "https://www.linkedin.com/in/ibnibrahem/"

  return (
    <header
      id="hero"
      className="relative min-h-screen bg-black/70 bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative text-white z-10 flex flex-col min-h-screen justify-center items-center gap-4 text-center">
        <h2 className="text-4xl md:text-[50px] font-extrabold">{t("hero.welcome")}</h2>
        <h1 className="!font-light text-4xl md:text-6xl">{t("hero.intro")}</h1>

        <div className="flex gap-4npm">
           <a
            href={linLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-[#0000003f] p-1.5 rounded-full hover:scale-110 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
