import React from "react";
import ArticleCard from "@/components/Cards/ArticleCard";
import { t } from "i18next";
import { Button } from "./ui/button";
import Header from "@/components/Header";

function ArticlesSection({ articles, title, subTitle }) {
    let titleText = title || t("articles.sectionTitle");
    let subTitleText = subTitle || t("articles.sectionSubtitle");
    let homeArticles = articles || t("articles.items", { returnObjects: true });

    return (
        <>
            <section id='articles' className='bg-background  '>
                <div className='container py-12'>
                    <div className='articles__header mt-8 md:mt-0 flex flex-col justify-center text-center '>
                        <Header title={titleText} />
                        <h3 className='text-2xl font-semibold mb-4 text-secondary'>
                            {subTitleText}
                        </h3>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 '>
                        {Object.entries(homeArticles).map(([id, article]) => (
                            <ArticleCard
                                key={id}
                                title={article.title}
                                description={article.description}
                                image={article.image}
                            />
                        ))}
                    </div>
                    <div className='buttons w-fit mx-auto my-4'>
                        <Button variant='outline' size='lg'>
                            {t("articles.viewAll")}
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ArticlesSection;
