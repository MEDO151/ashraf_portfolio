import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import i18next, { t } from "i18next";

export default function ArticleAdmin({ articles }) {
  const initialArticles = Array.isArray(articles)
    ? articles
    : Object.values(
        articles || t("articles.items", { returnObjects: true })
      );

  const [allArticles, setAllArticles] = useState(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      setFilteredArticles(allArticles);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
  }, [searchQuery, allArticles]);

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      const updated = allArticles.filter((_, index) => index !== id);
      setAllArticles(updated);
      setFilteredArticles(updated);
    }
  };

  const renderArticleCard = (article, id) => (
    <div
      key={id}
      className="group flex flex-col bg-white shadow-[0_0_30px_5px_rgba(0,0,0,0.055)] border border-slate-200 rounded-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="overflow-hidden">
        <img
          className="w-full h-[200px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:scale-110"
          src={article.image}
          alt={article.title}
        />
      </div>

      <div className="px-3 py-4 flex flex-col justify-between gap-4 flex-grow text-center text-secondary">
        <h6 className="text-2xl font-semibold text-primary">
          {article.title.split(" ").slice(0,3).join(' ')}
        </h6>
        <p className="font-medium">{article.description.split(" ").slice(0,6).join(' ')}</p>

        <div className="flex justify-between items-center">
          <Link to={`/admin/articleadmin/${id}`} className="w-fit">
            <Button className="py-2 px-3" size="lg">
              تعديل
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-square-pen h-4 w-4 ml-2"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </Button>
          </Link>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleDelete(id)}
          >
            حذف
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash2 h-4 w-4 ml-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );

  const pinnedArticles = filteredArticles.filter((a) => a.isPinned);
  const otherArticles = filteredArticles.filter((a) => !a.isPinned);

  return (
    <main>
      <div className="flex justify-center items-center">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="بحث..."
          className="border border-gray-300 rounded-md p-2 w-1/2 mb-6"
        />
      </div>

      {filteredArticles.length === 0 ? (
        <h3 className="text-2xl font-semibold mb-4 text-secondary text-center p-12">
          لا توجد مقالات مطابقة
        </h3>
      ) : (
        <>
          {pinnedArticles.length > 0 && (
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 border border-gray-300 container rounded-md">
              <span className="absolute -top-3 left-5 bg-background px-3 text-sm font-bold text-gray-700">
                🧷 {t("articles.pinnedArticles")}
              </span>
              {pinnedArticles.map(renderArticleCard)}
            </div>
          )}

          {/* 📚 all */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
            {otherArticles.map(renderArticleCard)}
          </div>
        </>
      )}
    </main>
  );
}
