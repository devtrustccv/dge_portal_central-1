import Link from "next/link";
import React from "react";
import EntidadeList from "@/components/template/EntidadeListTemplate/EntidadeList";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/atoms/carousel"; // Importar sua biblioteca de carrossel

interface SectionServiceProps {
    session_entities_acredit: {
        title: string;
        description: string;
        button: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        };
    };
    entidades: {
        name: string;
        ilha?: string;
        documentId: string;
        slug?: string;
        concelho: string;
        zona: string;
        formacoes?: {
            name: string;
        }[];
    }[];
}

const SectionEntidade: React.FC<SectionServiceProps> = ({
    session_entities_acredit,
    entidades,
}) => {
    return (
        <section className="container flex flex-col gap-8">

            {/* Carrossel para EntidadeList */}
            <Carousel className="w-full mt-8">
                <div className="flex flex-wrap gap-2 justify-between ">
                    <p className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                        {session_entities_acredit?.title}
                    </p>
                    <div className="w-full md:w-auto flex  gap-2 items-center">
                        <Link href={session_entities_acredit?.button?.url || '#'} className="w-full md:w-auto">
                            <p className="w-full md:w-auto px-4 h-[44px] rounded-[32px] bg-[#EFF2F5] font-normal text-[12px] md:text-[16px] text-[#334155] leading-[100%] tracking-[0%] capitalize flex justify-center text-center items-center">
                                {session_entities_acredit?.button?.label}
                            </p>
                        </Link>
                        <div className="hidden md:flex  gap-1 ">
                            <CarouselPrevious className="relative"/>
                            <CarouselNext className="relative"/>
                        </div>
                    </div>


                </div>

                <p className="font-poppins font-light text-[16px] mt-8 leading-[28px] tracking-[1%]">
                    {session_entities_acredit?.description}
                </p>
                {/*<div className="flex md:hidden gap-1 justify-end mt-2 items-center">
                    <Link href={session_entities_acredit?.button?.url || '#'}>
                        <p className="w-full md:w-auto px-4 h-[44px] rounded-[32px] bg-[#EFF2F5] font-normal text-[12px] md:text-[16px] text-[#334155] leading-[100%] tracking-[0%] capitalize flex justify-center items-center">
                            {session_entities_acredit?.button?.label}
                        </p>
                    </Link>
                    <CarouselPrevious className="relative"/>
                    <CarouselNext className="relative"/>
                </div>*/}

                <CarouselContent>
                    {entidades.map((item, index) => (
                        <CarouselItem key={index} className="basis md:basis-1/2 lg:basis-1/3 pl-2 mt-4 md:mt-8">
                            <div
                                className="w-full h-full grid gap-2"> {/* Garanta que o conteúdo ocupe 100% da largura e altura */}
                                <EntidadeList entidades={[item]} className={"h-full flex gap-4"}/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>


            </Carousel>

        </section>
    );
}

export default SectionEntidade;


