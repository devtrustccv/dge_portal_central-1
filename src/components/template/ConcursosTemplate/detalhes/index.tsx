"use client"
import {Banner} from "../../../atoms/banner";
import {Card} from "@/components/atoms/card";
import {IPageDetalheConcurso} from "@/services/concursos/pageDetalheConcurso/types";
import {IConcurso} from "@/services/concursos/types";
import {DocumentsBetaTest} from "@/components/template/ConcursosTemplate/detalhes/documenteBetaTeste";
import ConcursoList from "@/components/organisms/Concursos/concursoList";
import * as React from "react";
import NotFound from "@/app/not-found";
import Link from "next/link";



export default function DetalhesConcursosTemplate({
    pageInfo,
    dataFindId,
    initialConcursos
}:{
    initialConcursos: {
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    dataFindId: IConcurso [],
    pageInfo : IPageDetalheConcurso | undefined,
}){

    if (!dataFindId.length) return <NotFound/>

    return (
        <section>
            {dataFindId?.map((item, index) => {
                const uniqueKey = item?.documentId ? item?.documentId : `${index}-${item?.title}`;
          return(
                <div key={uniqueKey} className="mb-24">

                    <Banner title={pageInfo?.title}
                            subTitle={item?.title}
                            image={pageInfo?.headerImage?.formats.medium?.url}
                    >
                        {item?.estado && (
                            <Link href={item?.url || "#"} target={item?.url_externo ? "_blank" : "_self"}>
                                <button
                                    /* onClick={() => {
                                         if (hasSession) {
                                             router.push(`/ofertas-formativas/candidatura?cursos=${data?.nodes[0]?.documentId}`);
                                         } else {
                                             handleLogin();
                                         }
                                     }}*/
                                    className="flex justify-center items-center w-[250px] md:w-[300px] mt-4 h-[20px] md:h-[40px] top-[184px] left-[1562px] rounded-[50px] border uppercase
                           border-white p-[20px_28px] md:p-[24px_32px] gap-[32px] bg-white/25 font-poppins font-semibold text-[14px] md:text-[16px] leading-[30px] tracking-[0%]"
                                >
                                    realizar candidatura
                                </button>
                            </Link>

                        )}

                    </Banner>
                    <div className="container mt-16">
                        <p className="font-poppins font-medium text-[24px] md:text-[36px] text-[#334155] leading-[34px] md:leading-[50px] lg:leading-[63px] tracking-[0%]">
                            {item?.title}
                        </p>
                        <p className="font-poppins font-normal text-[20px] leading-[30px] tracking-[0%] text-[#334155] mt-4">
                            Medida {item?.medida}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            {item?.edital && (
                                <Card
                                    className="shadow-none border-[0.4px] border-[#BFC4CD] gap-1 flex flex-col p-[20px]">
                                <p className="font-poppins font-medium text-[16px] text-[#334155] leading-[32px] tracking-[0%] ">Edital</p>
                                    <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[24px] tracking-[0%]">{item?.edital}</p>
                                </Card>
                            )}
                            {item?.prazo && (
                                <Card
                                    className="shadow-none border-[0.4px] border-[#BFC4CD] gap-1 flex flex-col p-[20px]">
                                    <p className="font-poppins font-medium text-[16px] text-[#334155] leading-[32px] tracking-[0%] ">Prazo
                                        Envio Proposta</p>
                                    <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[24px] tracking-[0%]">{item?.prazo}</p>
                                </Card>
                            )}
                            {item?.publico_alvo && (
                                <Card
                                    className="shadow-none border-[0.4px] border-[#BFC4CD] gap-1 flex flex-col p-[20px]">
                                    <p className="font-poppins font-medium text-[16px] text-[#334155] leading-[32px] tracking-[0%] ">Publico
                                        - Alvo</p>
                                    <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[24px] tracking-[0%]">{item?.publico_alvo}</p>
                                </Card>
                            )}
                            {item?.data_publicacao && (
                                <Card
                                    className="shadow-none border-[0.4px] border-[#BFC4CD] gap-1 flex flex-col p-[20px]">
                                    <p className="font-poppins font-medium text-[16px] text-[#334155] leading-[32px] tracking-[0%] ">Data
                                        de Publicação </p>
                                    <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[24px] tracking-[0%]">{item?.data_publicacao}</p>
                                </Card>
                            )}
                            {item?.fonte_recursos && (
                                <Card
                                    className="shadow-none border-[0.4px] border-[#BFC4CD] gap-1 flex flex-col p-[20px]">
                                    <p className="font-poppins font-medium text-[16px] text-[#334155] leading-[32px] tracking-[0%] ">Fonte
                                        de Recursos</p>
                                    <p className="font-poppins font-light text-[16px] text-[#616E85] leading-[24px] tracking-[0%]">{item?.fonte_recursos}</p>
                                </Card>
                            )}


                        </div>
                    </div>
                    <div className="w-full md:h-auto lg:h-[437px] bg-[#F8FAFC] mt-28">
                        <div className="container py-20">
                            <p className="font-poppins font-medium text-[26px] md:text-[36px] text-[#334155] leading-[30px] tracking-[0%] ">
                                Descrição do Concurso
                            </p>
                            <p className="mt-8 text-[#616E85] font-light text-[16px] text-editor"
                               dangerouslySetInnerHTML={{__html: item?.concurso_description || ""}}
                            />

                        </div>
                    </div>


                    <div className="container mt-20">
                        {item?.documentos &&(
                            <DocumentsBetaTest title={"Documentos do Concurso"} dataFindId={item?.documentos}/>
                        )}
                        {initialConcursos?.hits && (
                            <div className="w-full lg:w-auto border-t-[0.5px] mt-24">
                                <h2 className="text-[26px] md:text-[36px] w-auto font-[500] leading-[30px] text-[#334155] font-poppins mt-16 mb-12">
                                    Outros Concursos
                                </h2>

                                {/* Filtrando concursos aqui */}
                                <ConcursoList
                                    concursos={initialConcursos.hits.filter(
                                        (c) =>
                                            !dataFindId.some(
                                                (mainConcurso) => mainConcurso.documentId === c.documentId
                                            )
                                    )}
                                />
                            </div>
                        )}



                    </div>


                </div>
          )
            })}
        </section>

    )
}