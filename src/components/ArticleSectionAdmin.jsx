import React from 'react'
import HeroAdminCom from './HeroAdminCom'

export default function ArticleSectionAdmin() {
  return (
    <>
        <HeroAdminCom
        title="تحرير قسم المقالات" 
        description="إدارة  محتوى قسم المقالات"
        sectionTitle="قسم المقالات"
        initialData={{
          titleAr: "المقالات",
          titleEn: "Articles",
          subtitleAr: "اكتشف أحدث المقالات والتوصيات في العالم الخاص بتنظيف مراكز البيانات.",
          subtitleEn: "Discover the latest news and updates in the world of Data Center Cleaning.",
          image:
            "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        }}
      />
    </>
  )
}
