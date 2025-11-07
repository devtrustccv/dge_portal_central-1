import {Separator} from "@/components/atoms/separator";
import {IEntidade} from "@/services/entidades/entidades/types";
import Image from "next/image";
import Link from "next/link";

export default function SectionAlvaras({dataFindId}:{dataFindId : IEntidade}){
    return(
        <section className="flex flex-col gap-12">
            <h1 className="text-[24px] md:text-[36px] font-[500] leading-10 text-[#334155] font-poppins">
                Alvarás
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {dataFindId?.alvara_entidade?.map((item, index)=>(
                    <div key={index} className="flex gap-8">
                        <div className='flex flex-col justify-center'>
                            <Image src="/imagAlvara.png" alt="" className='max-w-[60px] h-[90px]' width={60} height={90} sizes="(max-width: 768px) 100vw, 60px"/>
                            {item.url_alvara && (<Link href={item?.url_alvara} target="_blank" className='text-[11px] md:text-sm underline'>Ver Alvará</Link>)}
                        </div>

                        <div className='flex flex-col gap-8 '>

                            <div className="flex gap-2 font-poppins font-normal text-[16px] leading-[24px] tracking-[0%] text-[#334155] w-full">
                                {item?.number && item?.address ? (
                                    <div className=''>
                                        <span>Nº {item.number}</span> - <span>{item.address}</span>
                                    </div>
                                ) : (
                                    <>
                                        {item?.number && <span>Nº {item.number}</span>}
                                        {item?.address && <span>{item.address}</span>}
                                    </>
                                )}
                            </div>

                            <div className="flex h-5 items-center space-x-4 text-sm">
                                <div className="flex flex-col font-poppins font-light text-[16px] leading-[24px] tracking-[0%] gap-4 md:mr-2 lg:mr-12">
                                    <p>Data de Emissão</p>
                                    <p>{item?.date_init ? new Date(item.date_init).toLocaleDateString("pt-PT") : "Data não disponível"}</p>
                                </div>

                                <Separator orientation="vertical" className="h-16"/>

                                <div className="flex flex-col font-poppins font-light text-[16px] leading-[24px] tracking-[0%] gap-4">
                                    <p>Data de Validade</p>
                                    <p>{item?.date_end ? new Date(item.date_end).toLocaleDateString("pt-PT") : "Data não disponível"}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}


            </div>
        </section>
    )
}