import React, { useState, useEffect } from "react";
const AboutMeSection = React.lazy(() => import("@/components/AboutMeSection"));
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
const ArticlesSection = React.lazy(() =>
  import("@/components/ArticlesSection")
);

import { Suspense } from "react";

export default function Home() {

  const [homeData,setHomeData] = useState([]);

  const getHomeData = async () => {
    const res = await fetch("http://16.171.133.67:8080/home-page");
    const data = await res.json();
    setHomeData(data);
  }

  useEffect(() => {
    getHomeData()
  },[])


  return (
    <>
      <HeroSection homeData={homeData} />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutMeSection homeData={homeData} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesSection />
      </Suspense>
      <ContactSection />
    </>
  );
}
