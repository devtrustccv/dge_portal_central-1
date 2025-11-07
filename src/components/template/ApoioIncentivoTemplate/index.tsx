"use client"
import React, { useState, useEffect } from "react";
import { Banner } from "@/components/atoms/banner";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { SearchCard } from "@/components/molecules/SearchCard";
import { IPageApoioIncentivoData } from "@/services/page-apoio-incentivo/types";
import SectionEstatistica from "@/components/molecules/ProcessoAcreditacao/sectionEstatistica";
import SectionDocumentosRelevantes from "@/components/molecules/ProcessoAcreditacao/sectionDocumentos";
import { IAllDocumenNode } from "@/services/getDocumentoList/getAllDocumentos/types";
import { IServiceNode } from "@/services/services/type";
import SectionServicos from "@/components/molecules/ProcessoAcreditacao/sectionServicos";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import SectionEntidadeAcreditada from "@/components/molecules/ProcessoAcreditacao/sectionEntidadeAcreditada";
import { Pagination } from "@/components/molecules/PaginationBeta";
import { NoItemsFound } from "@/components/organisms/NotItemnsFound";
import {getApoioByMeiliSearch} from "@/services/apoioIncentivo/getApoioByMeiliSearch";
import CardSkeleton from "@/components/template/OfertaEmpregoTemplate/CardSkeleton";
import { CardFormacaoItem} from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";

interface PageApoioIncentivoProps {
    data: IPageApoioIncentivoData;
    documentoData: IAllDocumenNode[] | undefined;
    serviceData: IServiceNode[] | undefined;
    searchParams: { [key: string]: string | string[] | undefined };
}

const ApoioIncentivoTemplate: React.FC<PageApoioIncentivoProps> = ({
   data,
   documentoData,
   serviceData,
   searchParams,
}) => {
    const [apoios, setApoios] = useState<{
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    }>({
        hits: [],
        total: 0,
        page: 1,
        perPage: 10,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const page = searchParams?.page ? Number(searchParams.page) || 1 : 1;
                const searchQuery = String(searchParams?.search || "");
                const medida = searchParams?.medidas ? String(searchParams.medidas) : undefined;

                const filterObject = {
                    medida,
                }
                const apoioData = await getApoioByMeiliSearch({ page, perPage: 10, filterObject, search: searchQuery, });
                setApoios(apoioData);
            } catch (error) {
                console.error("Erro ao buscar dados de apoio:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams]);

    return (
        <section>
            <Banner title={data?.title} subTitle={data?.subtitle} image={data?.headerImage?.url} />

            <div className="container mb-36">
                {data?.description && (
                    <h1 className="mt-12 mb-8 text-editor text-[#616E85] font-poppins font-light text-[16px] leading-[28px] tracking-[1%]"
                        dangerouslySetInnerHTML={{__html: data?.description || ""}}
                    />
                )}


                <div className="flex md:gap-x-12 mb-24 ">
                    <aside className="hidden lg:block">
                        <div className="sticky top-[80px]">
                            {data?.configs && <SidebarFilter data={data?.configs as any}/>}
                        </div>
                    </aside>
                    <div className="w-full flex flex-col gap-8 mb-2">
                        <SearchCard configs={data?.configs}/>
                        {loading ? (
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <CardSkeleton />
                                <CardSkeleton />
                            </div>
                        ) : apoios?.hits?.length > 0 ? (
                            <>
                                <div className='grid grid-cols-2 gap-4'>
                                    {apoios?.hits?.map(item => (
                                        <CardFormacaoItem
                                            key={item?.id}
                                            isSelect={false}
                                            item={item}
                                        />
                                    ))}
                                </div>
                                {apoios.total > apoios.perPage && (
                                    <Pagination
                                        searchParams={searchParams}
                                        totalCountOfRegisters={apoios.total || 0}
                                        currentPage={searchParams?.page ? Number(searchParams?.page) : apoios.page || 1}
                                        registerPerPage={apoios.perPage}
                                    />
                                )}
                            </>
                        ) : (
                            <NoItemsFound title={"Nenhum Apoio Encontrado"} description="Tente pesquisar por outro termo" />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-16 md:gap-24">
                {data?.statistics?.title && (
                    <div>
                        <SectionEstatistica statistics={data?.statistics} />
                    </div>
                )}

                {documentoData && documentoData.length > 0 && (
                    <div>
                        <SectionDocumentosRelevantes
                            data={data?.session_doc_relev}
                            documentos={documentoData || []}
                        />
                    </div>
                )}

                {data?.session_service?.title && (
                    <div>
                        <SectionServicos
                            session_service={data?.session_service}
                            services={serviceData || []}
                        />
                    </div>
                )}

                {data?.cms_instituicao_entidades_do_setor?.title && (
                    <div>
                        <SectionEntidadeAcreditada data={data?.cms_instituicao_entidades_do_setor} />
                    </div>
                )}


                {data?.saiba_mais && data?.saiba_mais?.length > 0 && (
                        <div className="container">
                            <SaibaMais title={"Saiba Mais"} data={data?.saiba_mais}/>
                        </div>
                    )}
            </div>
        </section>
    );
};

export default ApoioIncentivoTemplate;
