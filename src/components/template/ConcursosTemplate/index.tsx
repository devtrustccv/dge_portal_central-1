"use client"
import { useState, useEffect } from "react";
import { Banner } from "@/components/atoms/banner";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { SearchCard } from "@/components/molecules/SearchCard";
import ConcursoList from "@/components/organisms/Concursos/concursoList";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import { IPageListaConcurso } from "@/services/page-list-concurso/type";
import { NoItemsFound } from "@/components/organisms/NotItemnsFound";
import { Pagination } from "@/components/molecules/PaginationBeta";

import CardSkeleton from "@/components/template/OfertaEmpregoTemplate/CardSkeleton";
import {getConcursoByMeiliSearch} from "@/services/concursos/getConcursoByMeiliSearch";

interface ConcursoListTemplateProps extends IPageListaConcurso {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ConcursosTemplate: React.FC<ConcursoListTemplateProps> = ({
    title,
    subtitle,
    headerImage,
    description,
    saiba_mais,
    configs,
    searchParams,

}) => {
    const [concursos, setConcursos] = useState<{
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
                const medida = searchParams?.medida ? String(searchParams.medida) : undefined;
                const filterObject = medida ? { medida } : {};
                const searchQuery = String(searchParams?.search || "");
                const concursosData = await getConcursoByMeiliSearch({ page, perPage: 10, filterObject, search: searchQuery,  });

                setConcursos({
                    hits: concursosData?.hits || [],
                    total: concursosData?.total || 0,
                    page: concursosData?.page || 1,
                    perPage: concursosData?.perPage || 10,
                });
            } catch (error) {
                console.error("Erro ao buscar concursos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams]);

    const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'
    return (
        <section>
            <Banner title={title} subTitle={subtitle} image={imagem} />
            <div className="container">

                <div className="mt-12 mb-8 text-editor text-[#616E85]" dangerouslySetInnerHTML={{__html: description || ""}}/>
                <div className="flex md:gap-x-24 mb-24">

                        <div className="sticky top-[120px] hidden lg:block mr-4">
                            {configs && <SidebarFilter data={configs as any} />}
                        </div>

                    <div className="w-full flex flex-col gap-4 mb-2">
                        <SearchCard configs={configs}/>
                        {loading ? (
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <CardSkeleton />
                                <CardSkeleton />
                            </div>
                        ) : concursos.hits.length > 0 ? (
                            <>
                                <ConcursoList concursos={concursos.hits} />
                                {concursos.total > concursos.perPage && (
                                    <Pagination
                                        searchParams={searchParams}
                                        totalCountOfRegisters={concursos.total}
                                        currentPage={searchParams?.page ? Number(searchParams?.page) : concursos.page}
                                        registerPerPage={concursos.perPage}
                                    />
                                )}
                            </>
                        ) : (
                            <NoItemsFound title={"Nenhuma Entidade Encontrada"} description="Tente pesquisar por outro termo" />
                        )}
                    </div>
                </div>
                <SaibaMais title={"Saiba Mais"} data={saiba_mais} />
            </div>
        </section>
    );
};

export default ConcursosTemplate;
