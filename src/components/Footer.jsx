import React from "react";
import { t } from "i18next";

export default function Footer() {
    return (
        <>
            <div className='py-10 bg-[#212529]'>
                <p className='text-white text-center'>{t("copyRight")}</p>
            </div>
        </>
    );
}
