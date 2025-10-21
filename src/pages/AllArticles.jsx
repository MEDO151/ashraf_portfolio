import React, { useState, useEffect } from "react";
import PagesHeader from "@/components/PagesHeader.jsx";
import ArticleCard from "@/components/Cards/ArticleCard";
import { useTranslation } from "react-i18next";

export default function AllArticles() {
  const [pageData, setPageData] = useState(null); // كل بيانات الصفحة
  const [articles, setArticles] = useState([]); // المقالات فقط
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const getAllArticles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/articles-page`);
      const data = await res.json();

      setPageData(data.header);
      setArticles(data.articleDtoList || []);
      setFilteredArticles(data.articleDtoList || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (!articles) return;

    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = articles.filter((article) => {
      const title = article.header.title[currentLang]?.toLowerCase() || "";
      const desc = article.header.desc[currentLang]?.toLowerCase() || "";
      return title.includes(query) || desc.includes(query);
    });

    setFilteredArticles(filtered);
  }, [searchQuery, articles, currentLang]);

  return (
    <>
      {/* ✅ قسم الهيدر */}
      <PagesHeader
        img={pageData?.imgUrl}
        title={pageData?.title?.[currentLang]}
        subtitle={pageData?.desc?.[currentLang]}
      />

      <section className="allArticles bg-background py-8">
        {/* 🔍 مربع البحث */}
        <div className="flex justify-center items-center">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder={`${t("articles.search")}...`}
            className="border border-gray-300 rounded-md p-2 w-1/2 mb-6"
          />
        </div>

        {/* 🚫 لا توجد نتائج */}
        {filteredArticles.length === 0 && (
          <h3 className="text-2xl font-semibold mb-4 text-secondary text-center p-12">
            {t("articles.noResults")}
          </h3>
        )}

        {/* 📌 المقالات المثبتة */}
        {filteredArticles.filter((article) => article.isPinned).length > 0 && (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 border border-gray-300 container rounded-sm">
            <span className="absolute -top-3 left-5 bg-background px-3 text-sm font-bold text-gray-700">
              🧷 {t("articles.pinnedArticles")}
            </span>
            {filteredArticles
              .filter((article) => article.isPinned)
              .map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.header.title[currentLang]}
                  description={article.header.desc[currentLang].split(' ').slice(0,10).join(' ')+'.....'}
                  image={article.header.imgUrl}
                  id={article.slug}
                />
              ))}
          </div>
        )}

        {/* 📰 باقي المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-12">
          {filteredArticles
            .filter((article) => !article.isPinned)
            .map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.header.title[currentLang]}
                description={article.header.desc[currentLang].split(' ').slice(0,10).join(' ')+'.....'}
                image={article.header.imgUrl}
                id={article.slug}
              />
            ))}
        </div>
      </section>
    </>
  );
}
