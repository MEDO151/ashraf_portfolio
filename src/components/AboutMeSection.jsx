import React from "react";
import { t } from "i18next";
import { Button } from "@/components/ui/button";
import profilePic from "@/assets/ProfilePic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "@/components/Cards/ArticleCard";

function AboutMeSection() {
    return (
        <>
            <section id='about' className='container p-12 bg-background'>
                <div className='about-me  w-full flex flex-col lg:flex-row justify-center items-center gap-5 '>
                    <div className='about__img-wrapper'>
                        <img
                            src={profilePic}
                            alt='Ashraf Almuhtaseb'
                            className='about__img  object-cover'
                        />
                    </div>
                    <div className='about__content md:ml-12 mt-8 md:mt-0 flex flex-col gap-5 text-center md:text-start md:w-4/5 lg:w-2/4'>
                        <h2 className='text-4xl font-extrabold mb-4 text-primary'>
                            {t("about-me.title")}
                        </h2>
                        <h3 className='text-2xl font-semibold mb-4 text-secondary'>
                            {t("about-me.subTitle")}
                        </h3>
                        <p className='mb-6 text-2xl text-justify font-medium text-muted leading-9'>
                            {t("about-me.content")}
                        </p>
                        <h3 className='text-2xl font-semibold mb-4 text-secondary'>
                            "{t("about-me.slogan")}"
                        </h3>
                        <div className='flex gap-4 justify-center md:justify-start'>
                            <Button size='cv'><FontAwesomeIcon icon={faCircleDown} className="animate-bounce" /> {t("about-me.cvButton")}</Button>
                            <Button variant='outline' size='cv' >
                                {t("about-me.contactButton")}
                            </Button>
                        </div>
                    </div>
                </div>
                <ArticleCard />
            </section>
        </>
    );
}

export default AboutMeSection;
