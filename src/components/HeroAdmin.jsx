import React from 'react'
import HeroAdminCom from './HeroAdminCom'

export default function HeroAdmin() {
  return (
    <HeroAdminCom 
      initialData={{
        titleAr: "مرحباً",
          titleEn: "Hello",
          subtitleAr: "أنا أشرف المحتسب",
          subtitleEn: "I'm Ashraf Almuhtaseb",
          image:
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      }}
    />
    
  )
}
