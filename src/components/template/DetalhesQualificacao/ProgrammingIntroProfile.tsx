import React, { useState, useEffect } from "react";
import { INode } from "@/services/catalogo/getDetalheQualificacao/Types/type";
import { TabsData } from "@/components/organisms/DetalheQualificacao/TabsData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/atoms/accordion";
import EntidadeList from "@/components/template/EntidadeListTemplate/EntidadeList";
import { IOfertasFormativasData } from "@/services/ofertas/types";
import { CardFormacaoItem } from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";
import { SaibaMais } from "@/components/atoms/saiba-mais";

export function ProgrammingIntroProfile({
    data,
    dataTabs,
    catalogo
}: {
    dataTabs: INode[] | undefined;
    data: INode | undefined;
    catalogo: IOfertasFormativasData | null;
}) {
    const [windowWidth, setWindowWidth] = useState(0);
    const code = catalogo?.nodes?.map(item => item?.codigo_qualificacao);

    useEffect(() => {
        setWindowWidth(window.innerWidth); // Captura a largura da janela ao montar o componente

        // Atualiza a largura da janela ao redimensionar
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isTelaGrande = windowWidth > 1026;

    return (
        <div className="w-full md:container flex p-4">

            <div className={`${isTelaGrande ? 'mt-20 mr-4 border-r border-[#e5e7eb] block' : 'mt-20 mr-9 border-r border-[#e5e7eb] hidden'}`}>
                <h1 className={`'flex flex-col mr-14 gap-y-24 justify-center items-center font-medium text-[44px] leading-[30px] tracking-[3%] text-[#61C3A8] uppercase' ${isTelaGrande && 'flex mr-11'}`}>
                    Nível
                    <span className="font-medium text-[200px] leading-[30px] tracking-[0%] uppercase text-[#61C3A8]">
                        {data?.nivel}
                    </span>
                </h1>
            </div>

            <div className={`container`}>{/* container */}
                <div className="mt-16 grid gap-y-16 ">
                    <div className="grid gap-y-8">
                        <h1 className="font-poppins font-medium text-[28px] md:text-[32px] leading-8 tracking-[0%] text-[#334155] capitalize">
                            {data?.name}
                        </h1>
                        <div className="grid gap-y-5">
                            <p>{data?.description}</p>
                            <p>Código da Qualificação: <span>{data?.codigo_qualificacao}</span></p>
                        </div>
                    </div>

                    {data?.questions && data?.questions?.length > 0 && (
                        <div className="grid gap-y-10 ">
                            <h1 className="font-poppins font-medium text-[28px] md:text-[32px] leading-[30px] tracking-[0%] text-[#334155] capitalize">
                                Perfil Profissional
                            </h1>
                            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
                                {data?.questions?.map((item, index) => {
                                    const hasResponse = !!item?.response?.trim();
                                    return (
                                        <AccordionItem key={index} value={"iten - " + index} display="custom">
                                            <AccordionTrigger
                                                hasResponse={hasResponse}>{item?.questions}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="text-editor"
                                                     dangerouslySetInnerHTML={{__html: item?.response || ""}}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        </div>
                    )}
                </div>

                {(dataTabs?.[0]?.formacao && dataTabs?.[0]?.formacao?.length > 0 || dataTabs?.[0]?.certificado && dataTabs?.[0]?.certificado?.length > 0) && (
                    <TabsData data={dataTabs} />
                )}

                {data?.entidades_connection && data?.entidades_connection?.nodes?.length > 0 && (
                    <div className="mt-24 ">
                        <h1 className="font-poppins font-medium text-[28px] md:text-[32px] leading-[30px] tracking-[0%] text-[#334155] capitalize">
                            Lista de Entidades Acreditadas
                        </h1>
                        <div className="mt-10 mb-28">
                            <EntidadeList
                                entidades={data?.entidades_connection?.nodes || []}
                                className={"w-full grid grid-cols-1 md:grid-cols-2  gap-4"}
                            />
                        </div>
                    </div>
                )}

                <div className="mt-10 mb-28">
                    {data?.codigo_qualificacao && code?.includes(data.codigo_qualificacao) && (
                        <div className='grid grid-cols-2 gap-4'>
                            {(catalogo?.nodes?.filter(item => item.codigo_qualificacao === data.codigo_qualificacao) || []).map((item) => (
                                <CardFormacaoItem
                                    key={item.documentId}
                                    isSelect={true}
                                    item={item}
                                />
                            ))}
                        </div>
                    )}

                </div>
                <SaibaMais title={'Saiba Mais'} data={data?.SaibaMais}/>
            </div>
        </div>
    );
}
