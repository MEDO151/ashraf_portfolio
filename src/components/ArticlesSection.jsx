import React from "react";
import ArticleCard from "@/components/Cards/ArticleCard";
import { t } from "i18next";
import { Button } from "./ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

function ArticlesSection({ articles, title, subTitle }) {
  let titleText = title || t("articles.sectionTitle");
  let subTitleText = subTitle || t("articles.sectionSubtitle");
  let homeArticles = articles || t("articles.items", { returnObjects: true });

  const allArticlesArray = Array.isArray(homeArticles)
    ? homeArticles
    : Object.values(homeArticles);

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
            {allArticlesArray.filter((article) => article.isPinned).length >
              0 &&
              allArticlesArray
                .filter((article) => article.isPinned)
                .map((article, id) => (
                  <ArticleCard
                    key={id}
                    title={article.title}
                    description={article.description}
                    image={article.image}
                    id={article.id}
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
