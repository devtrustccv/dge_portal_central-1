"use client";

import {Card} from "@/components/atoms/card";
import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";

interface SectionEstatisticaProps{
    statistics :{
        title: string;
        description: string;
        statistic_data :{
            label: string;
            number: string;
        }[],
        acion: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        },
    },
}

const SectionEstatistica: React.FC<SectionEstatisticaProps> = ({
                                                                statistics,

                                                        })=>{
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // esconde após 3s
    };
    return (
        <section className="h-auto md:h-[387px] bg-[#F8FAFC] w-full ">
            {showAlert && (
                <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                    ⚠️ Serviço brevemente disponível.
                </div>
            )}
            <div className="container flex flex-col h-full p-4 md:p-0 justify-center  gap-10 md:gap-8 lg:gap-14 ">
                <p className="ml-4 font-poppins font-medium text-[24px] md:text-[36px] leading-[36px] md:leading-[56px] text-[#334155]  tracking-[0%] ">
                    {statistics?.title}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 px-4 lg:gap-8">
                    {statistics?.statistic_data?.map((item, index)=>(
                        <Card key={index} className="border-none min-h-[95px] w-auto flex gap-4 items-center p-1 bg-[#FFFFFF] overflow-hidden">
                            <Image src={"/assets/estatistica.svg"} width={79} height={79} alt={"estatistica"} className="ml-1" />
                            <div className="flex flex-col gap-1 md:gap-3">
                                <p className="font-neulis font-normal text-[14px] md:text-[16px] text-[#616E85] leading-[20px] tracking-[0%] uppercase">
                                    {item?.label}
                                </p>
                                <p className="font-neulis font-medium text-[24px] md:text-[33px] text-[#334155] leading-[30px] tracking-[0%] uppercase">
                                    {item?.number}
                                </p>
                            </div>
                        </Card>
                    ))}
                    <Card className="border-none cursor-pointer h-[80px] md:h-[95px] bg-[#0454A0] flex items-center justify-center">
                        {statistics?.acion?.external_link ? (
                            <Link href={statistics?.acion?.url || ""} className="font-poppins font-normal text-[20px] md:text-[24px] text-white leading-[30px] tracking-[0%] uppercase">
                                {statistics?.acion?.label}
                            </Link>
                        ):(
                            <div onClick={handleClick}  className="font-poppins  font-normal text-[20px] md:text-[24px] text-white leading-[30px] tracking-[0%] uppercase">
                                {statistics?.acion?.label}
                            </div>
                        )}

                    </Card>
                </div>
            </div>


        </section>

    );
}
export default SectionEstatistica;