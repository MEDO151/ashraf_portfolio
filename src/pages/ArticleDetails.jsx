import PagesHeader from "@/components/PagesHeader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import i18next from "i18next";
import { t } from "i18next";

export default function ArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentLang = i18next.language || "en";

  const getArticleBySlug = async (slug) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${slug}`
      );
      const data = await res.json();
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticleBySlug(slug);
  }, [slug]);

  // ✅ تنظيف المحتوى حسب اللغة
  const cleanHTML =
    article?.content?.[currentLang] &&
    DOMPurify.sanitize(article.content[currentLang]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        {t("articlesDetails.loading")}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        {t("articlesDetails.notFound")}
      </div>
    );
  }

  return (
    <section id="article">
      <PagesHeader
        img={article.header?.imgUrl}
        title={article.header?.title?.[currentLang]}
        subtitle={article.header?.desc?.[currentLang]}
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-2 items-center">
          {cleanHTML ? (
            <div className="prose flex flex-col gap-5 col-span-1 lg:col-span-2 prose-lg max-w-none text-gray-800 leading-relaxed">
              <div
                className="not-tailwind"
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
              />
            </div>
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              لا يوجد محتوى لهذا المقال بعد.
            </p>
          )}

          {cleanHTML && (
            <div className="col-span-1">
              <img
                loading="lazy"
                src={article.contentImgUrl}
                className="h-full rounded-sm shadow-[0_0_30px_5px_rgba(0,0,0,0.055)] hover:-translate-y-2 duration-300 transition-all"
                alt={article.header?.title?.[currentLang]}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
