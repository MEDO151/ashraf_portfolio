import PagesHeader from '@/components/PagesHeader';
import { t } from 'i18next'
import React from 'react'
import { useParams } from 'react-router-dom';
import DOMPurify from "dompurify"; 

export default function ArticleDetails() {

    const { id } = useParams()

    const articles = t("articles.items", { returnObjects: true });

    const article =  Object.values(articles).find(
    (item) => String(item.id) === String(id)
  );

    const cleanHTML = article?.content
    ? DOMPurify.sanitize(article.content)
    : "";
    

  return (
    <section id='article'>
        <PagesHeader img={article.image} title={article.title} subtitle={article.description}  />
        <div className="container py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-2 items-center">
            {cleanHTML ? (
          <div className='prose flex flex-col gap-5 col-span-1 lg:col-span-2 prose-lg max-w-none text-gray-800 leading-relaxed'>
            <div
            className="not-tailwind "
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
          </div>
        ) : (
          <p className="text-center text-gray-500">لا يوجد محتوى لهذا المقال بعد.</p>
        )}
        <div className="col-span-1">
            <img src={t(article.image)} className='h-full rounded-sm shadow-[0_0_30px_5px_rgba(0,0,0,0.055)] hover:-translate-y-2 duration-300 transition-all' alt={t(article.title)} />
        </div>

        </div>
      </div>
    </section>
  )
}
