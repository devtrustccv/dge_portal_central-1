import React from "react";
import Image from "next/image";
import { Button } from "../../atoms/button";
import { ICarouselItem } from "@/services/homepage/type";
import Link from "next/link";

interface HighlightsItemProps extends ICarouselItem { }

export const HighlightsItem: React.FC<HighlightsItemProps> = (highlight) => {
    return (
        <div className="relative min-h-[470px] md:min-h-[600px]  rounded-[40px] aspect-stretch h-full w-full before:absolute before:inset-0 before:bg-gradient-linear-card before:z-10  before:rounded-[24px] lg:before:rounded-[40px]">
            <Image
                src={highlight.image?.url}
                alt={highlight.title}
                fill
                sizes="(max-width: 768px) 100vw, 264px"
                className="absolute inset-0 object-cover rounded-[24px] lg:rounded-[40px] w-full h-full z-0"
                priority
            />
            <div className="relative p-6 md:p-10 flex flex-col z-20 h-full justify-between gap-[60px]">
                <div>
                    {<span className="text-sm  text-white px-3 py-1 rounded-full self-start border border-white">
                        Oportunidades em Destaque
                    </span>}
                </div>
                <div>
                    <h3 className="text-3xl 3xl:text-[3.375rem] 3xl:leading-[3.75rem] font-semibold text-white mt-4 md:max-w-[80%] line-clamp-6">{highlight.title}</h3>
                    <p className="text-white text-lg mt-4 md:max-w-[80%] font-[300] line-clamp-8">{highlight.description}</p>
                    <Link href={highlight.button?.url || "#"} >
                        <Button variant="secondary" size={"sm"} className="mt-4 text-main-black text-base font-medium">
                            {highlight.button?.label}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
