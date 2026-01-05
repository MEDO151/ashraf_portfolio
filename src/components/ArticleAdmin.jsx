import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { t } from "i18next";

export default function ArticleAdmin() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 🧠 دالة لجلب كل المقالات من السيرفر
  const getAllArticles = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
      const data = await res.json();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // 🕓 تحميل المقالات أول مرة
  useEffect(() => {
    getAllArticles();
  }, []);

  // 🔍 فلترة المقالات حسب البحث
  useEffect(() => {
    if (!articles) return;

    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = articles.filter((article) => {
      const title = article.header.title.ar?.toLowerCase() || "";
      const desc = article.header.desc.ar?.toLowerCase() || "";
      return title.includes(query) || desc.includes(query);
    });

    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  // 🗑️ حذف مقال
  const handleDelete = async (slug) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟")) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
        setFilteredArticles((prev) => prev.filter((a) => a.slug !== slug));
        alert("✅ تم حذف المقال بنجاح");
      } else {
        const errorData = await res.json();
        alert(errorData?.error || "حدث خطأ أثناء الحذف!");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("تعذر حذف المقال، حاول مرة أخرى");
    }
  };

  // ✅ المقالات المثبتة وغير المثبتة
  const pinnedArticles = filteredArticles.filter((a) => a.isPinned);
  const otherArticles = filteredArticles.filter((a) => !a.isPinned);

  return (
    <main className="p-8">
      {/* ✅ الهيدر */}
      <div className="flex justify-between mb-10 items-center">
        <h1 className="text-2xl text-primary font-bold mb-1">إدارة المقالات</h1>

        <Link to="/admin/article/create">
          <Button size="cv" className="py-2 text-md flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus h-4 w-4 ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            اضافه مقال جديد
          </Button>
        </Link>
      </div>

      {/* 🔍 مربع البحث */}
      <div className="flex justify-center items-center">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="بحث..."
          className="border border-gray-300 rounded-md p-2 w-1/2 mb-6"
        />
      </div>

      {/* 🚫 في حالة عدم وجود نتائج */}
      {filteredArticles.length === 0 && (
        <h3 className="text-2xl font-semibold mb-4 text-secondary text-center p-12">
          لا توجد مقالات مطابقة
        </h3>
      )}

      {/* 📌 المقالات المثبتة */}
      {pinnedArticles.length > 0 && (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 border border-gray-300 container rounded-md">
          <span className="absolute -top-3 left-5 bg-background px-3 text-sm font-bold text-gray-700">
            🧷 {t("articles.pinnedArticles")}
          </span>

          {pinnedArticles.map((article) => (
            <div
              key={article._id}
              className="group flex flex-col bg-white shadow border border-slate-200 rounded-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  className="w-full h-[200px] object-cover transition-transform duration-700 transform group-hover:scale-110"
                  src={article.header.imgUrl}
                  alt={article.header.title.ar}
                />
              </div>
              <div className="px-3 py-4 flex flex-col justify-between gap-4 flex-grow text-center text-secondary">
                <h6 className="text-2xl font-semibold text-primary">
                  {article.header.title.ar}
                </h6>
                <p className="font-medium line-clamp-3">
                  {article.header.desc.ar}
                </p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/admin/article/edit/${article.slug}`}
                    className="w-fit"
                  >
                    <Button className="py-2 px-3" size="lg">
                      تعديل
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleDelete(article.slug)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📰 باقي المقالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
        {otherArticles.map((article) => (
          <div
            key={article._id}
            className="group flex flex-col bg-white shadow border border-slate-200 rounded-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="overflow-hidden">
              <img
                className="w-full h-[200px] object-cover transition-transform duration-700 transform group-hover:scale-110"
                src={article.header.imgUrl}
                alt={article.header.title.ar}
              />
            </div>
            <div className="px-3 py-4 flex flex-col justify-between gap-4 flex-grow text-center text-secondary">
              <h6 className="text-2xl font-semibold text-primary">
                {article.header.title.ar}
              </h6>
              <p className="font-medium line-clamp-3">
                {article.header.desc.ar}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/admin/article/edit/${article.slug}`}
                  className="w-fit"
                >
                  <Button className="py-2 px-3" size="lg">
                    تعديل
                  </Button>
                </Link>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleDelete(article.slug)}
                >
                  حذف
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
