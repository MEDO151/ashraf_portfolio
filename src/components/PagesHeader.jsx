import React from "react";
import HeaderImg from "@/assets/HeroImg02.jpg";

export default function PagesHeader({ img, title, subtitle }) {
  img = img || HeaderImg;
  return (
    <>
      <header id="allArticles" className="relative min-h-[60vh]">
        <img
          loading="lazy"
          src={img}
          alt="Header Image"
          className=" absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70">
          <div className="header-text container h-full flex flex-col justify-center items-center text-center gap-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white text-center">
              {subtitle}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
