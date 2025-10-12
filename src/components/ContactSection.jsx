import React from "react";
import Header from "./Header";
import {
    faLocationArrow,
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

export default function ContactSection() {
    const contant = [
        {
            icon: (
                <FontAwesomeIcon
                    className='text-black group-hover:text-white duration-300 transition-all'
                    icon={faLocationArrow}
                    size='xl'
                />
            ),
            title: t("contact.1.title"),
            content: t("contact.1.content"),
        },
        {
            icon: (
                <FontAwesomeIcon
                    icon={faEnvelope}
                    size='xl'
                    className='text-black group-hover:text-white duration-300 transition-all'
                />
            ),
            title: t("contact.2.title"),
            content: t("contact.2.content"),
        },
        {
            icon: (
                <FontAwesomeIcon
                    icon={faPhone}
                    size='xl'
                    className='text-black group-hover:text-white duration-300 transition-all'
                />
            ),
            title: t("contact.3.title"),
            content: t("contact.3.content"),
        },
    ];

    return (
        <>
            <section
                id='contact'
                className=' p-12 bg-white flex flex-col px-4 md:px-20 lg:px-40 '
            >
                <Header title={t("contact.title")} />
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-15'>
                    {contant.map((el, i) => (
                        <div
                            key={i}
                            className=' text-center flex flex-col items-center gap-2 group'
                        >
                            <div className='w-15 h-15 bg-input rounded-full flex justify-center items-center group-hover:bg-[#1c1c1c] duration-300 transition-all '>
                                {el.icon}
                            </div>
                            <h6 className='font-extrabold text-xl'>
                                {el.title}
                            </h6>
                            <p className='text-[#748182] text-xl' dir='ltr'>
                                {el.content}
                            </p>
                        </div>
                    ))}
                </div>
                <form>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div>
                            <input
                                type='text'
                                className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]'
                                placeholder={`${t("contact.nameInput")}`}
                            />
                        </div>
                        <div>
                            <input
                                type='email'
                                className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]'
                                placeholder={`${t("contact.emailInput")}`}
                            />
                        </div>
                    </div>
                    <div className='grid mt-4'>
                        <textarea
                            className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px] max-h-40 h-40'
                            placeholder={`${t("contact.texterea")}`}
                        ></textarea>
                    </div>
                    <input
                        type='submit'
                        className='rounded-sm mt-6 px-10 py-2 text-[13px] border-1 border-[#1c1c1c] bg-[#1c1c1c] text-white duration-300 transition-all cursor-pointer hover:bg-transparent hover:text-[#1c1c1c] focus-visible:ring-main/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'
                        value={t("contact.button")}
                    />
                </form>
            </section>
            <div className='mx-auto py-10 bg-[#212529]'>
                <p className='text-white text-center'>{t("copyRight")}</p>
            </div>
        </>
    );
}
