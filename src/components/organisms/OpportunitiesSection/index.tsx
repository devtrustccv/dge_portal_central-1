"use client";


import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../atoms/carousel";
import { Headline } from "../../atoms/headline";
import { OpportunityItem } from "./OpportunityItem";
import { HighlightsItem } from "./HighlightsItem";
import { ISectionOpportunity } from "@/services/homepage/type";
import Link from "next/link";
import {useState} from "react";

interface OpportunitiesSectionProps extends ISectionOpportunity { }

export function OpportunitiesSection({ caroucel, opportunity, description, title, highlight_title_word }: OpportunitiesSectionProps) {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // esconde após 3s
    };

    return (
        <section id="opportunities" className="container pt-16 md:pt-20 3xl:pt-[100px]">
            {showAlert && (
                <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                    ⚠️ Serviço brevemente disponível.
                </div>
            )}
            <Headline
                title={title}
                highlight={highlight_title_word}
                description={description}
                align="center"
                highlightType="gradient"
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-4 mt-12 md:mt-24 h-full">
                <div className="hidden lg:grid grid-cols-2 gap-x-3 gap-y-2">
                    {opportunity?.map((item, index) => (
                        item.link  ? (
                            <Link  href={item?.link} target={item?.link_externo ? "_blank" : "_self"} key={index}>
                                <OpportunityItem key={index} {...item} />
                            </Link>
                        ):(
                            <div onClick={handleClick}  key={index}>
                                <OpportunityItem key={index} {...item} />
                            </div>
                        )

                    ))}
                </div>

                <div className="block lg:hidden">
                    <Carousel className="w-full h-full">
                        <CarouselContent className="relative h-full w-full snap-x snap-mandatory">
                            {opportunity?.map((item, index) => (
                                <CarouselItem key={index} className={`basis-[95%] md:basis-[100%] p-0 ${index > 0 && "pl-4 "}`}>
                                    <Link href={item?.link} target={item?.link_externo ? "_blank" : "_self"} key={index}>
                                        <OpportunityItem key={index} {...item} />
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <div className="relative w-full h-full">
                    <Carousel className="w-full h-full relative p-0">
                        <CarouselContent className="relative h-full w-full snap-x snap-mandatory ">
                            {caroucel?.map((highlight, index) => (
                                <CarouselItem key={index} className={`relative rounded-xl  basis-[95%] md:basis-[100%] p-0 pl-4 ${index > 0 ? "" : "-ml-2"}`}>
                                    <HighlightsItem {...highlight} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {caroucel?.length > 1 && <div className="hidden lg:flex absolute top-10 right-10  gap-2">
                            <CarouselPrevious className="m-0 relative text-white bg-transparent w-[36px]  h-[36px] border border-white  p-2 rounded-full" />
                            <CarouselNext className="m-0 relative text-white  bg-transparent border  w-[36px]  h-[36px] border-white p-2 rounded-full" />
                        </div>}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

