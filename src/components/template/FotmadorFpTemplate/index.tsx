import {Banner} from "@/components/atoms/banner";
import React from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/atoms/accordion";
import {IPageFormadorFp} from "@/services/page-formador-fp/types";
import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import {SaibaMais} from "../../atoms/saiba-mais";
import {IServiceNode} from "@/services/services/type";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/atoms/carousel";
import FormadorList from "@/components/template/FotmadorFpTemplate/formadorList";

interface FotmadorFpTemplateProps{
    data: IPageFormadorFp
    serviceData: IServiceNode[] | undefined
    documentoData:  IAllDocumenNode[] | undefined
}

const FotmadorFpTemplate: React.FC<FotmadorFpTemplateProps> = ({data, documentoData, serviceData})=>{
    return(
        <section>
            <Banner title={data?.title} subTitle={data?.subtitle} image={data?.headerImage?.url}/>
            <div className="container">
                <h1 className="py-12 text-editor text-[#616E85] font-poppins font-light text-[16px] leading-[28px] tracking-[1%]"
                    dangerouslySetInnerHTML={{__html: data?.description || ""}}/>
                <h1 className="font-poppins font-medium text-[24px] md:text-[36px] leading-[36px] md:leading-[56px] text-[#334155]  tracking-[0%]">
                    {data?.session_desc?.label}
                </h1>
                <h1 className="text-editor mt-8 font-poppins font-light text-[16px] leading-[28px] tracking-[1%]"
                    dangerouslySetInnerHTML={{__html: data?.session_desc?.description || ""}}/>
                <div className="mt-8">
                    <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                        {data?.perguntas
                            ?.filter((content) => content?.response) // Renderiza apenas os conteúdos com response no Accordion
                            .map((content, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`} display="custom">
                                    <AccordionTrigger hasResponse={true}>{content?.questions}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="text-editor" dangerouslySetInnerHTML={{ __html: content?.response || "" }} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                    </Accordion>

                    {/* Exibir os conteúdos sem response em uma div separada */}
                    <div className="w-full flex flex-col gap-4 mt-4 ">
                        {data?.perguntas
                            ?.filter((content) => !content?.response) // Filtra os conteúdos sem response
                            .map((content, idx) => (
                                <div key={idx} className="px-3 py-1.5 border-[0.5px] rounded-[24px]">
                                    <p className="font-light  text-[16px]">{content?.questions}</p>
                                </div>
                            ))}
                    </div>

                </div>
                {data?.formadores && data?.formadores.length > 0 &&(
                    <Carousel className="w-full mt-16">
                        <div className="flex justify-between">
                            <h1 className="  font-poppins font-medium text-[24px] md:text-[36px] leading-[36px] md:leading-[56px] text-[#334155] tracking-[0%]">
                                {data?.session_oferta?.label}
                            </h1>
                            <div className="flex">
                                <CarouselPrevious className="relative"/>
                                <CarouselNext className="relative"/>
                            </div>

                        </div>
                        <CarouselContent className="mt-6">
                            {data?.formadores?.map((item, index) => (
                                <CarouselItem key={index} className="basis md:basis-1/2 lg:basis-1/3 pl-3 mt-8">
                                    <div className="w-full h-full grid gap-2"> {/* Garanta que o conteúdo ocupe 100% da largura e altura */}
                                        <FormadorList formadores={[item]} className={"w-[full]"}/>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </div>
            <div className="flex flex-col mt-16 md:mt-24 gap-16 md:gap-24">
                {documentoData && documentoData?.length > 0 && (
                    <div>
                        <SectionDocumentosRelevantes data={data?.session_doc_relev} documentos={documentoData || []}/>
                    </div>
                )}
                {serviceData && serviceData.length > 0 && data?.session_service?.title  && (
                    <div>
                        <SectionServicos session_service={data?.session_service} services={serviceData || []}/>
                    </div>
                )}
                {data?.saiba_mais && data?.saiba_mais?.length > 0 && (
                    <div className="container ">
                        <SaibaMais title={"Saiba Mais"} data={data?.saiba_mais}/>
                    </div>
                )}
            </div>
        </section>
    )
}
export default FotmadorFpTemplate