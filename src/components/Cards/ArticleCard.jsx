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
                className=' group relative flex flex-col my-6 bg-secondary shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300'
                style={{ perspective: "1000px" }} // enables 3D effect
            >
                <div className='relative h-64 m-2.5 overflow-hidden rounded-md'>
                    {/* Image */}
                    <img
                        className='w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform group-hover:scale-110'
                        src={img}
                        alt='investment-seed-round'
                    />

                    {/* Overlay (will flip in from left and fade) */}
                    <div
                        className='overlay absolute inset-0 flex items-center justify-center'
                        aria-hidden='false'>
                        <Button  size='lg'>View More </Button>
                    </div>
                </div>

                <div className='p-3 text-center text-background'>
                    <h6 className='mb-2 text-2xl font-semibold'>
                        {cardTitle}
                    </h6>
                    <p className='font-medium'>
                        {cardDescription}
                    </p>
                </div>
            </div>
        </>
    );
}

export default ArticleCard;
