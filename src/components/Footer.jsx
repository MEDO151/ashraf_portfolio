import React, { useEffect, useState } from "react";
import i18next from "i18next";

export default function Footer() {
    const [info, setInfo] = useState({});
        const currentLang = i18next.language || "en";

    const getInfo = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/info`);
            const data = await res.json();
            setInfo(data);
        };

    
        useEffect(() => {
            getInfo();
        }, []);

    return (
        <>
            <div className='py-10 bg-[#212529]'>
                <p className='text-white text-center'>{info.footer?.[currentLang]}</p>
            </div>
        </>
    );
}
