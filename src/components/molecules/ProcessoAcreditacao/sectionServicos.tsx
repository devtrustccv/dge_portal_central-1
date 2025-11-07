import Link from "next/link";
import React from "react";
import {IServiceNode} from "@/services/services/type";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/atoms/carousel";
import {ServiceItem} from "@/components/template/ServicesDetailsTemplate/ServiceItem";

interface SectionServiceProps {
    session_service: {
        title: string;
        description: string;
        button: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        },
    } | undefined,
    services: IServiceNode[];
}


const SectionServicos: React.FC<SectionServiceProps> = ({
    session_service,
    services
}) => {
    return (
        <section className="h-auto container flex flex-col gap-8">

            <Carousel className="w-full">
                <div className="flex flex-wrap gap-2 justify-between">
                    <p className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                        {session_service?.title}
                    </p>
                    <div className="w-full md:w-auto flex gap-2 items-center">
                        {session_service?.button?.label && (
                            <Link href={session_service.button.url || '#'} className="w-full md:w-auto">
                                <p className="w-full md:w-auto px-4 h-[44px] rounded-[32px] bg-[#EFF2F5] font-normal text-[12px] md:text-[16px] text-[#334155] leading-[100%] tracking-[0%] capitalize flex justify-center text-center items-center">
                                    {session_service?.button?.label}
                                </p>
                            </Link>
                        )} {/* Add this line -- KJ */}
                        <div className="hidden md:flex gap-1">
                            <CarouselPrevious className="relative"/>
                            <CarouselNext className="relative"/>
                        </div>
                    </div>
                </div>
                {session_service?.description && (
                    <p className="mt-8 font-poppins font-light text-[16px] leading-[28px] tracking-[1%]">
                        {session_service?.description}
                    </p>
                )}

               {/* <div className="flex md:hidden mt-2  gap-1 justify-end items-center">
                    {session_service?.button?.label && (
                        <Link href={session_service.button.url || '#'}>
                            <p className="w-[238px] h-[44px] rounded-[32px] bg-[#EFF2F5] font-normal text-[16px] text-[#334155] leading-[100%] tracking-[0%] capitalize flex justify-center items-center">
                                {session_service?.button?.label}
                            </p>
                        </Link>
                    )}  Add this line -- KJ
                    <div className="flex gap-1">
                        <CarouselPrevious className="relative"/>
                        <CarouselNext className="relative"/>
                    </div>
                </div>*/}

                <CarouselContent className="mt-0 md:mt-6 mb-2">
                    {services.map((item, index) => (
                        <CarouselItem key={index} className="basis md:basis-1/2 lg:basis-1/3 flex-shrink-0 pl-2 mt-8">
                            <Link href={`/servicos/${item?.slug}`} key={item?.slug}>
                                <ServiceItem  {...item} style='border'/>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>


            </Carousel>


        </section>

    );
}

export default SectionServicos;




