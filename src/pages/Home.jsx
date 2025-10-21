import React, { useState, useEffect } from "react";
import AboutMeSection from "@/components/AboutMeSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ArticlesSection from "@/components/ArticlesSection";

export default function Home() {
  const [homeData, setHomeData] = useState([]);

  const getHomeData = async () => {
    const res = await fetch(`/api/home-page`);
    const data = await res.json();
    setHomeData(data);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <>
      <HeroSection homeData={homeData} />
      <AboutMeSection homeData={homeData} />
      <ArticlesSection />
      <ContactSection />
    </>
  );
}
