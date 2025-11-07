import {CardContent} from "./card";
import * as React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/atoms/carousel";
import Link from "next/link";

export interface ISaibaMais {
    id: string,
    title: string,
    url: string,
    url_externo: string,
    button_label: string
}

export function SaibaMaisBeta({
                              data,
    title
                          }: {
    title: string
    data: ISaibaMais[] | undefined
}) {

    return (
        <div className="text-black w-full h-auto flex-shrink-0 z-50 border-t-[0.5px]">
            <Carousel className="w-full ">
                <div className="flex items-center justify-between w-full lg:w-auto ">
                    <h2 className="text-[26px] md:text-[36px] w-auto font-[500] leading-[30px] text-[#334155] font-poppins mt-12 mb-12">
                        {title}
                    </h2>
                    <div className="flex  gap-x-10 w-20 h-[40px]  overflow-hidden ">
                        <div>
                            <CarouselPrevious className="bg-[#F8FAFC]"/>
                        </div>
                        <div>
                            <CarouselNext className="bg-[#F8FAFC]"/>
                        </div>
                    </div>
                </div>
                <CarouselContent>
                    {
                        data?.map((value, index) => (
                            <CarouselItem key={index} className="pl-3 md:basis-1/3 lg:basis-1/4">
                                <CardContent className="rounded-[16px] p-4 flex flex-col gap-4 bg-[#F8FAFC]">
                                    <p className="font-poppins font-light text-[16px] text-[#334155] leading-[28px] tracking-[0%] truncate">
                                        {value?.title}
                                    </p>
                                    <div className="flex justify-end">
                                        <Link
                                            target={'_blank'}
                                            href={value?.url}
                                            className="w-[96px] h-[28px] bg-[#0454A01A] rounded-[8px] gap-[10px] flex justify-center text-[#0454A0] font-poppins font-semibold text-[12px] leading-[30px] tracking-[0%]"
                                        >
                                            {value?.button_label}
                                        </Link>
                                    </div>
                                </CardContent>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}
