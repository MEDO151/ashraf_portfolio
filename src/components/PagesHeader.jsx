import React from "react";
import HeaderImg from "@/assets/HeroImg02.jpg";

export default function PagesHeader({ img, title, subtitle }) {
  img = img || HeaderImg;

  return (
    <header
      id="allArticles"
      className="relative min-h-[60vh] py-12 px-8 flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* طبقة الغلاف الداكنة */}
      <div className="absolute inset-0 bg-foreground/70"></div>

      {/* النص */}
      <div className="relative z-10 container flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white text-center">{subtitle}</p>
      </div>
    </header>
  );
}
