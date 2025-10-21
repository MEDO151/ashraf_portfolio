import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
    faLocationArrow,
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import i18next, { t } from "i18next";

export default function ContactSection() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null); // ✅ حالة للرد من السيرفر
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    const contact = [
        {
            icon: (
                <FontAwesomeIcon
                    icon={faLocationArrow}
                    size='xl'
                    className='text-black group-hover:text-white duration-300 transition-all'
                />
            ),
            title: t("contact.1.title"),
            content:  info.address?.[currentLang],
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
            content: info.email,
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
            content: info.phone,
        },
    ];

    return (
        <section
            id='contact'
            className='p-12 bg-white flex flex-col px-4 md:px-20 lg:px-40'
        >
            <Header title={t("contact.title")} />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 my-15'>
                {contact.map((el, i) => (
                    <div
                        key={i}
                        className='text-center flex flex-col items-center gap-2 group'
                    >
                        <div className='w-15 h-15 bg-input rounded-full flex justify-center items-center group-hover:bg-[#1c1c1c] duration-300 transition-all'>
                            {el.icon}
                        </div>
                        <h6 className='font-extrabold text-xl'>{el.title}</h6>
                        <p className='text-[#748182] text-xl' dir='ltr'>
                            {el.content}
                        </p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]'
                        placeholder={t("contact.nameInput")}
                        required
                    />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]'
                        placeholder={t("contact.emailInput")}
                        required
                    />
                </div>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='w-full bg-input outline-0 p-2.5 rounded-sm text-[14px] max-h-40 h-40 mt-4'
                    placeholder={t("contact.texterea")}
                    required
                ></textarea>

                <input
                    type='submit'
                    className='rounded-sm mt-6 px-10 py-2 text-[13px] border border-[#1c1c1c] bg-[#1c1c1c] text-white duration-300 transition-all cursor-pointer hover:bg-transparent hover:text-[#1c1c1c]'
                    value={
                        status === "loading"
                            ? "Sending..."
                            : t("contact.button")
                    }
                    disabled={status === "loading"}
                />
            </form>

            {status === "success" && (
                <p className='text-green-600 mt-4 text-sm'>
                    {t("contact.successMessage")}
                </p>
            )}
            {status === "error" && (
                <p className='text-red-600 mt-4 text-sm'>
                    {t("contact.errorMessage")}
                </p>
            )}
        </section>
    );
}
