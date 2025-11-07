import {Banner} from "@/components/atoms/banner";
import Image from "next/image";
import {IPageDicasCarreiraEComoProcurarEmprego} from "@/services/page-dica/types";
import React from "react";

interface DicasCarreiraTemplateProps {
    data: IPageDicasCarreiraEComoProcurarEmprego
}

const ComoProcurarEmpregoTemplate: React.FC<DicasCarreiraTemplateProps> = ({data}) => {

    return (
        <section>
            <Banner title={data?.title} subTitle={data?.subtitle} subTitle2={data?.subtitle2} image={data?.headerImage?.url}/>

            <div className="container py-12"
                dangerouslySetInnerHTML={
                    { __html: data?.description || ''}
                }
            />
            <div className="container mb-32">
                <div className="columns-1 md:columns-2 gap-8 space-y-8 mt-4">
                    {data?.session_dicas.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#F8FAFC] rounded-3xl p-[40px] flex flex-col break-inside-avoid"
                        >
                            <h1 className="font-poppins font-medium text-[24px] text-[#334155] mb-4">
                                {item.title}
                            </h1>
                            <div className="flex flex-col gap-3">
                                {item.description.split("\n").map((paragraph, idx) =>
                                        paragraph.trim() && (
                                            <p key={idx} className="font-poppins text-[16px] leading-6 text-[#475569]">
                                                {paragraph}
                                            </p>
                                        )
                                )}
                            </div>
                            {item?.image?.url && (
                                <Image
                                    src={item.image.url || ""}
                                    alt="image"
                                    width={772}
                                    height={515}
                                    className="w-full mt-2"
                                    sizes="(max-width: 772px) 100vw, 772px"
                                />
                            )}
                        </div>
                    ))}
                </div>


                <div className="mt-24">
                    <h1 className="font-poppins font-medium text-[36px] text-[#334155] leading-[56px] tracking-[0%]">
                        {data?.conclusao?.label}
                    </h1>
                    <h1 className="text-editor font-poppins font-light text-[16px] leading-[28px] tracking-[1%]"
                        dangerouslySetInnerHTML={{__html: data?.conclusao?.description || ""}}/>
                </div>


            </div>
        </section>
    )
}
export default ComoProcurarEmpregoTemplate;