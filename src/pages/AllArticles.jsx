import React from "react";
import PagesHeader from "@/components/PagesHeader.jsx";
import articlesImage from "@/assets/HeroImg03.jpg";
import ArticleCard from "@/components/Cards/ArticleCard";
import { useState, useEffect } from "react";
import i18next from "i18next";
import { t } from "i18next";

export default function AllArticles({ articles }) {
    let allArticles = articles || t("articles.items", { returnObjects: true });

    const allArticlesArray = Array.isArray(allArticles)
        ? allArticles
        : Object.values(allArticles);

    let [filteredArticles, setFilteredArticles] = useState(allArticlesArray);
    let [searchQuery, setSearchQuery] = useState("");

    function filterArticles() {
        if (searchQuery === "") {
            setFilteredArticles(allArticlesArray);
            return;
        }
        const query = searchQuery.toLocaleLowerCase();
        const filtered = allArticlesArray.filter((article) => {
            return (
                article.title.toLocaleLowerCase().includes(query) ||
                article.description.toLocaleLowerCase().includes(query)
            );
        });
        setFilteredArticles(filtered);
    }

    useEffect(() => {
        filterArticles();
    }, [searchQuery, articles, i18next.language]);

    return (
        <>
            <PagesHeader
                img={articlesImage}
                title={t("articles.sectionTitle")}
                subtitle={t("articles.allrticlesSlogan")}
            />
            <section className='allArticles bg-background py-8'>
                {/* search input*/}
                <div className='flex justify-center items-center '>
                    <input
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        type='text'
                        placeholder={`${t("articles.search")}...`}
                        className='border border-gray-300 rounded-md p-2 w-1/2 mb-6'
                    />
                </div>

                {filteredArticles.length === 0 && (
                    <h3 className='text-2xl font-semibold mb-4 text-secondary text-center p-12 '>
                        No articles found
                    </h3>
                )}

                {/* pinned articles */}
                {filteredArticles.filter((article) => article.isPinned).length > 0 && (
                    <div className='relative  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 border border-gray-300 container rounded-sm '>
                        <span className='absolute -top-3 left-5 bg-background px-3 text-sm font-bold text-gray-700'>
                            🧷 {t("articles.pinnedArticles")}
                        </span>
                        {filteredArticles
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
                )}

                {/* All articles */}
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-12 '>
                    {filteredArticles.map((article, id) => (
                        <ArticleCard
                            key={id}
                            title={article.title}
                            description={article.description}
                            image={article.image}
                            id={article.id}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
