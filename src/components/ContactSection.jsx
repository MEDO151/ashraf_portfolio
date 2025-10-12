import React from "react";
import Header from "./Header";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

export default function ContactSection() {

    const contact = [{
        "id" : 1,
      "title": t('cotact.title'),
      "content": "Riyadh KSA",
        "icon" : <FontAwesomeIcon className="text-black group-hover:text-white duration-300 transition-all" icon={faLocationArrow} size="xl" />

    },]

  return (
    <section id="contact" className="p-12 bg-white flex flex-col px-4 md:px-20 lg:px-40 ">
      <Header title="Contact Me" />
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center gap-3.5 group">
                <div className="w-15 h-15 bg-input rounded-full flex justify-center items-center group-hover:bg-[#1c1c1c] duration-300 transition-all ">
                    <FontAwesomeIcon className="text-black group-hover:text-white duration-300 transition-all" icon={faLocationArrow} size="xl" />
                    <h6></h6>
                </div>
            </div>
        </div>
      <from>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                className="w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full bg-input outline-0 p-2.5 rounded-sm text-[14px]"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="grid mt-4">
            <textarea
              className="w-full bg-input outline-0 p-2.5 rounded-sm text-[14px] max-h-40 h-40"
              placeholder="Message"
            >
            </textarea>
          </div>
          <input type="submit" className="rounded-sm mt-6 px-10 py-2 text-[13px] border-1 border-[#1c1c1c] bg-[#1c1c1c] text-white duration-300 transition-all cursor-pointer hover:bg-transparent hover:text-[#1c1c1c] focus-visible:ring-main/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60" value="submit" />
      </from>
    </section>
  );
}
