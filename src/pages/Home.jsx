import AboutMeSection from '@/components/AboutMeSection'
import ContactSection from '@/components/ContactSection'
import HeroSection from '@/components/HeroSection'
import ArticlesSection from '@/components/ArticlesSection'

import React from 'react'

export default function Home() {
  return (
    <>
        <HeroSection />
        <AboutMeSection />
        <ArticlesSection />
        <ContactSection />
    </>
  )
}
