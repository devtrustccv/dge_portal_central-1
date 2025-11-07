"use client"
import React, { useRef, useState } from "react";
import { GraphicItem } from "@/components/organisms/SectionNosStoria/graphicItem";
import { VideoItem } from "@/components/organisms/SectionNosStoria/VideoItem";
import Autoplay from "embla-carousel-autoplay"


import {
    Carousel,
    CarouselContent,
} from "../../atoms/carousel"
import { ISectionNosStoria } from "@/services/homepage/type";
import { HeroVideoDialog } from "@/components/atoms/hero-video-dialog";


interface NosStoriaSectionProps extends ISectionNosStoria { }

export default function SectionNosStoria({ title, description, graphic, testimunhos }: NosStoriaSectionProps) {
    const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [video, setVideo] = useState("");

    return (
        <>

            <section className="overflow-hidden">

                <div className="container grid grid-cols-12 md:space-x-12 lg:space-x-24 space-y-12 md:space-y-0  mt-20 md:mt-40 mb-24 md:mb-40">
                    <div className="col-span-12 md:col-span-6 lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-8 max-w-[639px]">
                        <h1 className="font-semibold italic text-[44px] md:text-[60px] lg:text-[5rem] leading-[60px] md:leading-[69px] lg:leading-[85px] text-main-black w-[300px] md:w-[400px] lg:w-[548px]">
                            {title}
                        </h1>

                        <p className="font-light text-sm md:text-base leading-6 line-clamp-4">

                            {description}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {graphic?.map((item, index) => (
                                <GraphicItem key={index} {...item} />
                            ))}
                        </div>
                    </div>

                    <Carousel
                        className="col-span-12 md:col-span-6 lg:col-span-7 w-full flex gap-4 overflow-x-auto whitespace-nowrap cursor-grab active:cursor-grabbing"
                        plugins={[plugin.current]}

                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent className="flex gap-4">
                            {testimunhos?.map((item, index) => (
                                <VideoItem key={index} {...item} setIsVideoOpen={setIsVideoOpen}
                                    isVideoOpen={isVideoOpen}
                                    setVideo={setVideo}
                                />
                            ))}
                        </CarouselContent>

                    </Carousel>


                </div>


            </section>
            <HeroVideoDialog
                className="block"
                animationStyle="top-in-bottom-out"
                videoSrc={video}
                setIsVideoOpen={setIsVideoOpen}
                isVideoOpen={isVideoOpen}
            />
        </>
    )
}