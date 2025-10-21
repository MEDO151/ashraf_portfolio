import React, { useState, useEffect } from "react";
const AboutMeSection = React.lazy(() => import("@/components/AboutMeSection"));
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
const ArticlesSection = React.lazy(() =>
  import("@/components/ArticlesSection")
);

import { Suspense } from "react";

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
