import React from "react";
import "./ArticleCard.css";
import { Button } from "@/components/ui/button";

function ArticleCard({image, title, description}) {
    let img = image || 'https://img.freepik.com/free-photo/futuristic-computer-lab-equipment-row-generated-by-ai_188544-28056.jpg';
    let cardTitle = title || 'Successful Seed Round';
    let cardDescription = description || 'We are thrilled to announce the completion of our seed round, securing $2M in investment to fuel product development and market expansion.';
    return (
        <>
            <div
                className=' group relative flex flex-col my-6 bg-white shadow-[0_0_30px_5px_rgba(0,0,0,0.055)] border border-slate-200 rounded-b-md w-96 hover:shadow-lg transition-shadow duration-300'
                style={{ perspective: "1000px" }}
            >
                <div className='relative overflow-hidden'>

                    <img
                        className='w-full max-h-[220px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:scale-110'
                        src={img}
                        alt='investment-seed-round'
                    />

                    <div
                        className='overlay  absolute inset-0 hidden md:flex items-center justify-center'
                        aria-hidden='false'>
                        <Button  size='lg'>View More </Button>
                    </div>
                </div>

                <div className='px-4 py-6 flex flex-col gap-5 text-center text-secondary'>
                    <h6 className='text-2xl font-semibold text-primary'>
                        {cardTitle}
                    </h6>
                    <p className='font-medium'>
                        {cardDescription}
                    </p>
                    <Button   size='lg'>View More </Button>
                </div>
                
            </div>
        </>
    );
}

export default ArticleCard;
