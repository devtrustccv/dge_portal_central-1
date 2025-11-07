import Image from "next/image";
import React from "react";
import Link from "next/link";
import {IEntity} from "@/services/page-extra-info/type";


interface SectionEntidadeAcreditadaProps{
    data: IEntity | undefined
}


const SectionEntidadeAcreditada: React.FC<SectionEntidadeAcreditadaProps> = ({data}) => {
    return (
        <section className="h-auto md:h-[623px] lg:h-full bg-[#F8FAFC] w-full">
            <div className="container flex flex-col h-auto max-w-[1430px] p-24 items-center gap-4 md:gap-8 lg:gap-8 overflow-hidden">
                <p className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-9 md:leading-[56px] tracking-[0]">
                    {data?.title}
                </p>

                {data?.image?.url && (
                    <Image
                        src={data?.image?.url || ''}
                        width={371}
                        height={121}
                        alt={""}
                        className="w-auto max-h-[140px]"
                        sizes="(max-width: 371px) 100vw, 371px"
                    />
                )}

                <h1 className="text-editor text-center font-poppins font-light text-[16px] leading-[28px] tracking-[1%]"
                    dangerouslySetInnerHTML={{__html: data?.description || ""}}
                />

                <Link
                    href={data?.acion?.url || ''}
                    target={data?.acion?.external_link ? '_blank' : '_self'}
                    className="flex justify-center items-center rounded-[38px] w-[154px] h-[43px] bg-main-blue text-white text-[16px]"
                >
                    {data?.acion?.label}
                </Link>
            </div>
        </section>
    );
}
export default SectionEntidadeAcreditada