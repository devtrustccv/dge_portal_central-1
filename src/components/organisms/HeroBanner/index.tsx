'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../atoms/button';
import { HeroRightShape } from './HeroRightShape';
import { IBanner } from '@/services/homepage/type';
import Icon from '@/components/atoms/Icons';
import Link from "next/link";
import SimuladorChatBot from '../SimuladorChatBot';

interface HeroCarouselProps {
    slidesData: IBanner[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slidesData }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSimuladorOpen, setIsSimuladorOpen] = useState(false);
    const [simuladorUrl, setSimuladorUrl] = useState("");

    const handleOpenSimulador = (url: string) => {
        setSimuladorUrl(url);
        setIsSimuladorOpen(true);
    };

    const handleCloseSimulador = () => {
        setIsSimuladorOpen(false);
        setSimuladorUrl("");
    };
    const totalSlides = slidesData.length;
    const allSlides = Array.from({ length: totalSlides }, (_, i) => i);
    //linear-gradient(270deg, rgba(97, 195, 168, 0.69) -5.71%,  118.87%);
    const gradientConfigs = [
        { start: '#61C3A8', startOp: 1, end: '#1E73C3', endOp: 0.69 },
        { start: '#2470B8', startOp: 0.4, end: '#2470B8', endOp: 1 },
        { start: '#61C3A8', startOp: 0.4, end: '#61C3A8', endOp: 1 },
    ];
    const grad = gradientConfigs[currentSlide % gradientConfigs.length];
    const transition = { duration: 0.8, ease: 'easeInOut' };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 6000);
        return () => clearTimeout(timeout);
    }, [currentSlide, totalSlides]);

    const handleSlideSelect = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <section className="overflow-hidden bg-[#F8FAFC] relative" key="herobanner">
                <div className="max-w-[1992px] relative mx-auto">
                    <HeroRightShape
                        gradientStartColor={grad.start}
                        gradientStartOpacity={grad.startOp}
                        gradientEndColor={grad.end}
                        gradientEndOpacity={grad.endOp}
                        className="pointer-events-none absolute right-[-60%] sm:right-[-30%] md:right-[-100px] top-[-180px] xl:right-[-49px] 3xl:top-[-180px] 3xl:right-[-58px] w-[450px] h-[1508px]"
                    />

                    <div className="relative container h-full min-h-screen min-h926:min-h-[926px] flex flex-col justify-center pt-48 xl:pt-0">
                        <div className="hidden xl:block absolute max-h-[90vh] 2lg:bg-blue-500 bottom-0 right-[-80px] xl:right-[-40px]  3xl:right-0 xl:w-[621px] 3xl:w-[847px] xl:h-[703px] 3xl:h-[777px] pointer-events-none">
                            {slidesData.map((slide, idx) => (
                                <motion.img
                                    key={idx}
                                    src={slide.image?.url}
                                    alt={slide.title}
                                    initial={false}
                                    animate={{
                                        opacity: idx === currentSlide ? 1 : 0,
                                        x: idx === currentSlide ? 0 : 50,
                                    }}
                                    transition={transition}
                                    className="absolute inset-0 w-full h-full object-contain object-right-bottom"
                                />
                            ))}
                        </div>

                        <div className=" z-10 flex flex-col items-center justify-between  xl:justify-center gap-6 md:items-start pr-6 h-full">
                            <div className="flex flex-col gap-5 items-center xl:items-start xl:py-[200px] lg:pr-6 max-w-[744px]  2xl:max-w-[792px] 3xl:max-w-[744px] mx-auto xl:mx-0 text-center xl:text-start">
                                <AnimatePresence mode="wait">
                                    <motion.h1
                                        key={`title-${currentSlide}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="font-neulis text-main-black font-semibold md:font-medium  text-[2rem] md:text-[3rem] 2xl:text-[4rem] leading-[2.5rem] md:leading-[4.75rem] 2xl:leading-[4.875rem] uppercase line-clamp-3 md:line-clamp-2 2xl:line-clamp-3"
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
                                        className="text-lg 2xl:text-xl xl:line-clamp-4"
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
                                            className="mt-4"
                                        >
                                            {slidesData[currentSlide].abrir_simulador ? <Button
                                                variant="gradient"
                                                className="rounded-[12px] px-4 uppercase text-start text-wrap h-auto"
                                                style={currentSlide != 0 ? {
                                                    background: `linear-gradient(
                                                    270deg,
                                                    ${grad.start} ${grad.startOp * 100}%,
                                                    ${grad.end} ${grad.endOp * 100}%
                                                    )`,
                                                } : {}}
                                                iconRight={<Icon name='arrow-rigth-45' className='text-white' />}
                                                onClick={() => handleOpenSimulador(slidesData[currentSlide].button?.url || "")}

                                            >
                                                {slidesData[currentSlide].button.label}
                                            </Button>
                                                :
                                                <Link href={slidesData[currentSlide].button?.url || "#"} target={slidesData[currentSlide].button?.external_link ? '_blank' : '_self'}>
                                                    <Button
                                                        variant="gradient"
                                                        className="rounded-[12px] px-4 uppercase"
                                                        style={currentSlide != 0 ? {
                                                            background: `linear-gradient(
                                                270deg,
                                                ${grad.start} ${grad.startOp * 100}%,
                                                ${grad.end} ${grad.endOp * 100}%
                                                )`,
                                                        } : {}}
                                                        iconRight={<Icon name='arrow-rigth-45' className='text-white' />}
                                                    >
                                                        {slidesData[currentSlide].button.label}
                                                    </Button>
                                                </Link>
                                            }
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mx-auto xl:hidden mt-4">
                                <AnimatePresence mode="wait">
                                    {allSlides.map((slideIndex) => (
                                        <motion.button
                                            key={`pagination-${slideIndex}`}
                                            layout
                                            onClick={() => handleSlideSelect(slideIndex)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden flex items-center gap-2 text-sm md:text-base"
                                        >
                                            <div className="relative cursor-pointer w-[87px] h-[3px] bg-gray-300 rounded-full overflow-hidden">
                                                <motion.div
                                                    key={currentSlide}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: slideIndex === currentSlide ? '100%' : 0 }}
                                                    transition={{ duration: 6, ease: 'linear' }}
                                                    className={`absolute top-0 left-0 h-full ${slideIndex === currentSlide ? 'bg-primary' : 'bg-transparent'}`}
                                                />
                                            </div>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div
                                className="
                                relative
                                xl:hidden
                                w-full h-full
                                max-h-[429px]
                                aspect-[273/391]
                                overflow-hidden
                                pointer-events-none
                                mx-auto
                            "
                            >
                                {slidesData.map((slide, idx) => (
                                    <motion.img
                                        key={idx}
                                        src={slide.image?.url}
                                        alt={slide.title}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{
                                            opacity: idx === currentSlide ? 1 : 0,
                                            x: idx === currentSlide ? 0 : 50,
                                        }}
                                        transition={transition}
                                        className="absolute inset-0 w-full h-full object-contain object-bottom"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 xl:bottom-[80px] lg:left-0 lg:translate-x-0 z-30 gap-2 px-4 w-full max-w-[90vw]">
                            <div className="hidden xl:flex items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <AnimatePresence mode="wait">
                                        {allSlides.map((slideIndex) => (
                                            <motion.button
                                                key={`pagination-${slideIndex}`}
                                                layout
                                                onClick={() => handleSlideSelect(slideIndex)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="w-[180px] h-full xl:w-[200px] 2xl:w-[273px] overflow-hidden flex items-center gap-2 text-sm md:text-base text-left p-2"
                                            >
                                                <div className="relative flex flex-col gap-3 h-[64px] w-full ">
                                                    <div className="relative cursor-pointer w-full h-[3px] bg-gray-300 rounded-full overflow-hidden">
                                                        <motion.div
                                                            key={currentSlide}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: slideIndex === currentSlide ? '100%' : 0 }}
                                                            transition={{ duration: 6, ease: 'linear' }}
                                                            className={`absolute top-0 w-full left-0 h-full ${slideIndex === currentSlide ? 'bg-primary' : 'bg-transparent'}`}
                                                        />
                                                    </div>
                                                    <span
                                                        className={`${slideIndex === currentSlide ? 'text-primary' : ''} overflow-hidden w-full line-clamp-2 text-xs 2xl:text-base font-[400] uppercase`}
                                                    >
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
                </div>
            </section>
            {<SimuladorChatBot onClose={handleCloseSimulador} isOpen={isSimuladorOpen} url={simuladorUrl || ''} />}
        </>
    );
};
