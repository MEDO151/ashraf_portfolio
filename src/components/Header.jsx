import React from "react";
import Dots from "@/assets/dots.png";

export default function Header({ title }) {
  return (
    <div className="text-center relative">
      <h2 className="relative z-2 w-fit mx-auto text-4xl font-black text-primary">
        {title}.
        <span
          className="absolute -bottom-3 left-0 w-full h-[30px]"
          style={{
            backgroundImage: `url(${Dots})`,
            zIndex: -1,
          }}
        ></span>
      </h2>
    </div>
  );
}
