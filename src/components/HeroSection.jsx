import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const HeroSection =  function ({ homeData }) {
    if (!homeData || !homeData.header) return null;

    const [linkedIn, setLinkedIn] = useState([]);

    const getLinkedIn = async function(){
        const res = await fetch(`/api/info`)
        const data = await res.json()
        setLinkedIn(data.linkedInLink)
    }

    useEffect(()=>{
        getLinkedIn()
    },[])

    const linLink = linkedIn;
    const heroData = homeData.header ;

    const currentLang = i18next.language || "en";

    const title = heroData.title[currentLang];
    const desc = heroData.desc[currentLang];
    const img = heroData.imgUrl;
    return (
        <header
            id='heroSection'
            className='relative min-h-screen bg-cover bg-center'
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className='absolute inset-0 bg-black/70'></div>
            <div className='relative text-white z-10 flex flex-col min-h-screen justify-center items-center text-center'>
                <h2 className='text-4xl md:text-[50px] font-extrabold'>
                    {title}
                </h2>
                <h1 className='!font-light leading-[1.2] text-4xl md:text-6xl'>
                    {desc}
                </h1>
                <div className='flex gap-4npm'>
                    <a
                        href={linLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block text-white bg-[#0000003f] p-1.5 rounded-full hover:scale-110 transition-all duration-300'
                    >
                        <FontAwesomeIcon icon={faLinkedinIn} size='lg' />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default HeroSection;
