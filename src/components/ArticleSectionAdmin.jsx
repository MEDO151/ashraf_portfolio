import React, { useEffect, useState } from "react";
import HeroAdminCom from "./HeroAdminCom";

export default function ArticleSectionAdmin() {
  const [articlesData, setArticlesData] = useState(null);

  const getArticlesData = async () => {
    try {
      const res = await fetch(`/api/articles-page`);
      const data = await res.json();
      setArticlesData(data);
    } catch (err) {
      console.error("حدث خطأ أثناء جلب البيانات:", err);
    }
  };

  useEffect(() => {
    getArticlesData();
  }, []);

  if (!articlesData || !articlesData.header) {
    return (
      <p className="flex justify-center items-center min-h-screen text-xl font-semibold">
        جارٍ تحميل البيانات...
      </p>
    );
  }

  const apiPath = "/articles-page";

  return (
    <HeroAdminCom
      key={apiPath}
      initialData={
        articlesData?.header
          ? {
              titleAr: articlesData.header.title?.ar || "",
              titleEn: articlesData.header.title?.en || "",
              subtitleAr: articlesData.header.desc?.ar || "",
              subtitleEn: articlesData.header.desc?.en || "",
              image: articlesData.header.imgUrl || "",
            }
          : null
      }
      apiPath="/articles-page"
      inHome={false}
      title="تحرير قسم المقالات"
      description="إدارة محتوى قسم المقالات"
      sectionTitle="قسم المقالات"
    />
  );
}
