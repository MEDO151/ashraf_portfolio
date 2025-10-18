import React from "react";
const AboutMeSection = React.lazy(() => import("@/components/AboutMeSection"));
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
const ArticlesSection = React.lazy(() =>
  import("@/components/ArticlesSection")
);

import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading...</div>}>
        <AboutMeSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesSection />
      </Suspense>
      <ContactSection />
    </>
  );
}
