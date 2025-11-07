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

export function SaibaMais({
  data,
  title
}: {
    data: ISaibaMais[] | undefined,
    title?: string
}) {

    return (
        data && data.length > 0 ? (
            <div className="text-black w-full h-auto flex-shrink-0  border-t-[1px] border-[#616E85] py-14 container">
                <Carousel className="w-full">
                    <div className="flex items-center justify-between w-full lg:w-auto ">
                        <h2 className="text-[26px] md:text-[36px] font-poppins  font-medium mb-5 tracking-[0] text-[#334155]">

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
                                        <p title={value?.title}
                                           className="font-poppins font-light text-[16px] text-[#334155] leading-[24px] tracking-[0%] line-clamp-2 min-h-[48px]">
                                            {value?.title}
                                        </p>
                                        <div className="flex justify-end">
                                            <Link
                                                target={value?.url_externo ? '_blank' : '_self'}
                                                href={value?.url || ''}
                                                className="w-[96px] h-[28px] bg-[#0454A01A] rounded-[8px] gap-[10px] flex justify-center text-[#0454A0] font-poppins font-normal text-[12px] leading-[30px] tracking-[0%]"
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
        ) : (
            <></>
        )
    )
}
