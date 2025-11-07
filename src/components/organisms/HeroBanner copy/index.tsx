"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../atoms/button";
import { HeroLeftShape } from "./HeroLeftShape";
import { HeroRightShape } from "./HeroRightShape";
import { IBanner } from "@/services/homepage/type";

interface HeroCarouselProps {
    slidesData: IBanner[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slidesData }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slidesData.length;
    const allSlides = Array.from({ length: totalSlides }, (_, i) => i);

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 6000);
        return () => clearInterval(interval);
    }, [currentSlide, totalSlides]);

    return (
        <section className="overflow-hidden bg-[#F8FAFC]" key="herobanner">
            <div
                className="
          relative
          container
          lg:py-8
          
          min-h-[720px] 2xl:min-h-[926px]
          md:grid md:grid-cols-12
          flex flex-col items-stretch pt-36
        "
            >
                <div className="col-span-12 lg:col-span-7 2xl:col-span-8 z-10 flex flex-col justify-start md:justify-center gap-6 items-start pr-6">
                    <div className="flex flex-col gap-5 items-start xl:py-[200px] lg:pr-6">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={`title-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="
                                font-neulis text-main-black text-4xl lg:text-4xl
                                2xl:text-[4rem] 2xl:leading-[4.875rem] uppercase xl:line-clamp-3
                                "
                            >
                                {slidesData[currentSlide]?.title}
                            </motion.h1>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={`desc-${currentSlide}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-lg 2xl:text-xl max-w-[778px] xl:line-clamp-4"
                            >
                                {slidesData[currentSlide]?.description}
                            </motion.p>
                        </AnimatePresence>

                        {slidesData[currentSlide].button && (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`btn-wrapper-${currentSlide}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 hidden md:flex"
                                >
                                    <Button
                                        variant="gradient"
                                        isSimulador={slidesData[currentSlide].abrir_simulador}
                                    >
                                        {slidesData[currentSlide].button.label}
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 2xl:col-span-4 relative flex flex-col gap-6 items-center justify-center w-full py-20 lg:h-full lg:py-0 lg:flex lg:items-center lg:justify-center">
                    <HeroRightShape
                        className="
              absolute md:top-16 right-0 mt-[220px] md:mt-0
              -mr-[50%] md:-mr-[28%] lg:mr-[-120px] 2xl:-mr-[120px]
              w-[396px] h-[1065px] lg:h-full lg:w-[58%] xl:w-auto
            "
                    />
                    <div
                        className="
              w-full max-w-[440px] lx:w-[440px]
              lg:absolute lg:top-1/2 lg:left-1/2
              lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2
              3xl:max-w-full 3xl:h-[558px] 2xl:mr-[14px]
            "
                    >
                        <HeroLeftShape imageUrl={slidesData[currentSlide].image?.url} />
                    </div>

                    {slidesData[currentSlide].button && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`btn-wrapper-mobile-${currentSlide}`}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mt-4 md:hidden z-20"
                            >
                                <Button className="z-20" isSimulador={slidesData[currentSlide].abrir_simulador}>
                                    {slidesData[currentSlide].button.label}
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2  xl:bottom-[80px] lg:left-0 lg:translate-x-0 z-30 gap-2 px-4 w-full max-w-[90vw]">
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <AnimatePresence mode="wait">
                                {allSlides.map((slideIndex) => (
                                    <motion.button
                                        key={`pagination-${slideIndex}`}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        onClick={() => setCurrentSlide(slideIndex)}
                                        className={`
                                        w-[180px] xl:w-[273px] overflow-hidden flex items-center gap-2
                                        text-sm md:text-base text-left p-2
                                        `}
                                    >

                                        <div className="relative flex flex-col gap-3 ">
                                            <div
                                                className="relative cursor-pointer w-full h-[3px] bg-gray-300 overflow-hidden rounded-full "
                                            >
                                                <motion.div
                                                    key={currentSlide}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: slideIndex === currentSlide ? '100%' : 0 }}
                                                    transition={{ duration: 6, ease: 'linear' }}
                                                    className={`absolute top-0 left-0 h-full ${slideIndex === currentSlide ? 'bg-primary' : 'bg-transparent'}`}
                                                />
                                            </div>
                                            <span className={`${slideIndex === currentSlide ? 'text-primary' : ''} overflow-hidden line-clamp-2 text-xs  2xl:text-base font-[400] uppercase `}>

                                                {slidesData[slideIndex].title}
                                            </span>
                                        </div>

                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>

                       
                    </div>
                </div>
            </div>
        </section >
    );
};
