import React from "react";
import "./ArticleCard.css";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { Link } from "react-router-dom";

function ArticleCard({ image, title, description, id }) {
  let img =
    image ||
    "https://img.freepik.com/free-photo/futuristic-computer-lab-equipment-row-generated-by-ai_188544-28056.jpg";
  let cardTitle = title || "Successful Seed Round";
  let cardDescription =
    description ||
    "We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.";
  return (
    <>
      <div
        className=" group relative flex flex-col bg-white shadow-[0_0_30px_5px_rgba(0,0,0,0.055)] border border-slate-200 rounded-b-md  hover:shadow-lg transition-shadow duration-300"
        style={{ perspective: "1000px" }}
      >
        <div className="relative overflow-hidden">
          <img
            className="w-full h-[280px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:scale-110"
            src={img}
            alt="investment-seed-round"
          />

          <div
            className="overlay  absolute inset-0 hidden md:flex items-center justify-center"
            aria-hidden="false"
          >
            <Link to={`/articles/${id}`}>
              <Button size="lg">{t("articles.readMore")}</Button>
            </Link>
          </div>
        </div>

        <div className="px-2 py-4 flex flex-col flex-grow-1 justify-between gap-5 text-center text-secondary">
          <h6 className="text-2xl font-semibold text-primary">{cardTitle}</h6>
          <p className="font-medium">{cardDescription}</p>
          <Link to={`/articles/${id}`}>
            <Button size="lg">{t("articles.readMore")}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
