import React from "react";
import { t } from "i18next";
import { Button } from "@/components/ui/button";
import profilePic from "@/assets/ProfilePic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import ArticleCard from "@/components/Cards/ArticleCard";

function AboutMeSection({ image, title, subTitle, desc, slogan, cvLink }) {
    image = image || profilePic;
    title = title || t("about-me.title");
    subTitle = subTitle || t("about-me.subTitle");
    desc = desc || t("about-me.content");
    slogan = slogan || t("about-me.slogan");
    cvLink = cvLink || "https://www.linkedin.com/in/ibnibrahem/";

    // about-me w-full flex flex-col lg:flex-row justify-center items-center gap-5
    // md:w-4/5 lg:w-2/4
    return (
        <>
            <section id='about' className=' pt-20 pb-12  bg-white'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 justify-center items-center  gap-5 md:gap-10 px-0 md:px-10 '>
                        <div className='about__img-wrapper lg:col-span-1 '>
                            <img
                                src={image}
                                alt='Ashraf Almuhtaseb'
                                className='about__img  w-full object-cover '
                            />
                        </div>
                        <div className='about__content lg:col-span-2 mt-8 md:mt-0 flex flex-col justify-center text-center md:text-start '>
                            <h2 className='text-4xl font-extrabold mb-4 text-primary'>
                                {title}.
                            </h2>
                            <h3 className='text-2xl font-semibold mb-4 text-secondary'>
                                {subTitle}
                            </h3>
                            <p className='mb-6 text-xl md:text-2xl lg:text-justify font-medium text-muted leading-9'>
                                {desc}
                            </p>
                            <h3 className='text-2xl font-medium md:font-semibold mb-4 text-secondary'>
                                "{slogan}"
                            </h3>
                            <div className='flex gap-4 justify-center md:justify-start flex-col md:flex-row'>
                                <Button
                                    size='cv'
                                    onClick={() => window.open(cvLink)}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleDown}
                                        className='animate-bounce'
                                    />
                                    {t("about-me.cvButton")}
                                </Button>
                                <Button variant='outline' size='cv'>
                                    {t("about-me.contactButton")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutMeSection;
