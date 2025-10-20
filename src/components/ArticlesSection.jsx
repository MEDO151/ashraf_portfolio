import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/Cards/ArticleCard";
import i18next, { t } from "i18next";
import { Button } from "./ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

function ArticlesSection({  title, subTitle }) {

  const [articles,setArticles] = useState([])

  let titleText = title || t("articles.sectionTitle");
  let subTitleText = subTitle || t("articles.sectionSubtitle");
   const currentLang = i18next.language || "en";
   const getAllArticles = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/articles-page`);
        const data = await res.json();
  
        setArticles(data.articleDtoList || []);;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    console.log(articles);
    
  
    useEffect(() => {
      getAllArticles();
    }, []);

  

  return (
    <>
      <section id="articles" className="bg-background  ">
        <div className="container py-12">
          <div className="articles__header mt-8 md:mt-0 flex flex-col justify-center text-center ">
            <Header title={titleText} />
            <h3 className="text-2xl font-semibold mb-4 text-secondary">
              {subTitleText}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 ">
            {articles.filter((article) => article.isPinned).length >
              0 &&
              articles
                .filter((article) => article.isPinned)
                .map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.header.title?.[currentLang]}
                    description={article.header.desc?.[currentLang].split(' ').slice(0,20).join(' ') + '....'}
                    image={article.header?.imgUrl}
                    id={article.slug}
                  />
                ))}
          </div>
          <div className="buttons w-60 px-10 mx-auto my-4">
            <Link to={"/articles"}>
              <Button variant="outline" size="lg">
                {t("articles.viewAll")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticlesSection;
