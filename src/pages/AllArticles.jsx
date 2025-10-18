import React, { useState, useEffect } from "react";
import PagesHeader from "@/components/PagesHeader.jsx";
import articlesImage from "@/assets/HeroImg03.jpg";
import ArticleCard from "@/components/Cards/ArticleCard";
import i18next, { t } from "i18next";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentLang = i18next.language || "en";

  const getAllArticles = async () => {
    try {
      const res = await fetch("http://16.171.133.67:8080/articles");
      const data = await res.json();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (!articles) return;

    // لو المستخدم ما كتبش حاجة في البحث
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
  }, [searchQuery, articles, i18next.language]);

  return (
    <>
      <PagesHeader
        img={articlesImage}
        title={t("articles.sectionTitle")}
        subtitle={t("articles.allrticlesSlogan")}
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

        {/* 🚫 لو مفيش مقالات */}
        {filteredArticles.length === 0 && (
          <h3 className="text-2xl font-semibold mb-4 text-secondary text-center p-12">
            {t("articles.noResults") || "No articles found"}
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
                  key={article._id}
                  title={article.header.title[currentLang]}
                  description={article.header.desc[currentLang]}
                  image={article.header.imgUrl}
                  id={article.slug}
                />
              ))}
          </div>
        )}

        {/* 📰 كل المقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-12">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.header.title[currentLang]}
              description={article.header.desc[currentLang]}
              image={article.header.imgUrl}
              id={article.slug}
            />
          ))}
        </div>
      </section>
    </>
  );
}
