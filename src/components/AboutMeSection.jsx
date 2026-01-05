import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

function AboutMeSection({ homeData }) {
  // 🔹 ALL hooks first, unconditionally
  const { t } = useTranslation();
  const [cvLink, setCvLink] = useState("");
  const [loading, setLoading] = useState(false);

  const currentLang = i18next.language || "en";

  // 🔹 derive data safely with fallbacks (no conditional returns)
  const aboutData = homeData?.aboutMe;
  const image = aboutData?.imgUrl ?? "";
  const title = t("about-me.title");
  const subTitle = aboutData?.title?.[currentLang] ?? "";
  const desc = aboutData?.desc?.[currentLang] ?? "";
  const slogan = aboutData?.keywords?.[currentLang] ?? "";
  const initialCv = aboutData?.cvLink ?? "";

  // 🔹 initialize cvLink from props once
  useEffect(() => {
    setCvLink(initialCv);
  }, [initialCv]);

  // 🔹 fetch CV link (always called in the same hook order)
  useEffect(() => {
    const getContactData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/info`);
        const data = await res.json();
        if (data?.cvLink) setCvLink(data.cvLink);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getContactData();
  }, []);

  // 🔹 safe render guard without changing hook order
  const notReady = !homeData || !homeData.header || !aboutData;

  if (notReady) {
    return null;
  }

  return (
    <section id="about" className="pt-20 pb-12 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-5 md:gap-10 px-0 md:px-10">
          <div className="about__img-wrapper lg:col-span-1">
            <img
              loading="lazy"
              src={image}
              alt={subTitle || "About image"}
              className="about__img w-full object-cover"
            />
          </div>

          <div className="about__content lg:col-span-2 mt-8 md:mt-0 flex flex-col justify-center text-center md:text-start">
            <h2 className="text-4xl font-extrabold mb-4 text-primary">
              {title}.
            </h2>

            <h3 className="text-2xl font-semibold mb-4 text-secondary">
              {subTitle}
            </h3>

            <p className="mb-6 text-xl md:text-2xl lg:text-justify font-medium text-muted leading-9">
              {desc}
            </p>

            <h3 className="text-2xl font-medium md:font-semibold mb-4 text-secondary">
              “{slogan}”
            </h3>

            <div className="flex gap-4 justify-center md:justify-start flex-col md:flex-row">
              <Button
                size="cv"
                disabled={loading || !cvLink}
                onClick={() => cvLink && window.open(cvLink)}
              >
                <FontAwesomeIcon icon={faCircleDown} className="animate-bounce" />
                {t("about-me.cvButton")}
              </Button>

              <a href="#contact">
                <Button variant="outline" size="cv">
                  {t("about-me.contactButton")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMeSection;
