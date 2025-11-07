"use client";

import {useState, useEffect} from "react";
import {SidebarFilter} from "@/components/molecules/FiltersBeta";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import {SearchCard} from "@/components/molecules/SearchCard";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {Banner} from "@/components/atoms/banner";
import {getOfertasEmpregoByMili} from "@/services/ofertas-emprego/getDataMeilliSearchOferta";
import TipoOfertaTabs from "./TipoOfertasTabs";
import {useTipoOferta} from "@/app/(layout-with-banner)/emprego/tipo-oferta-context";
import CardSkeleton from "./CardSkeleton";
import {IPageOfertaEmpregoData} from ".";
import {
    CardFormacaoItem
} from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";

export default function OfertasContent({
   title,
   subtitle,
   description,
   configs,
   saiba_mais,
   headerImage,
   searchParams,
}: IPageOfertaEmpregoData) {
    const {tipoOferta} = useTipoOferta();
    const [data, setData] = useState<{
        initialOferta: {
            hits: any[];
            total: number;
            page: number;
            perPage: number;
        };
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const page = searchParams?.page ? Number(searchParams.page) || 1 : 1;
                const searchQuery = String(searchParams?.search || "");

                const modelo = searchParams?.modelo ? String(searchParams.modelo) : undefined;
                const experiencia = searchParams?.experiencia ? String(searchParams.experiencia) : undefined;
                const area_profissional = searchParams?.area_profissional ? String(searchParams.area_profissional) : undefined;
                const fim_candidatura = searchParams?.fim_candidatura ? String(searchParams.fim_candidatura) : undefined;
                const inicio_candidatura = searchParams?.inicio_candidatura ? String(searchParams.inicio_candidatura) : undefined;
                const entidade = searchParams?.entidades ? String(searchParams.entidades) : undefined;
                const concelho = searchParams?.concelho ? String(searchParams.concelho) : undefined;
                const ilha = searchParams?.ilha ? String(searchParams.ilha) : undefined;
                const idiomas = searchParams?.idiomas ? String(searchParams.idiomas) : undefined;

                const filterObject = {
                    area_profissional,
                    modelo,
                    experiencia,
                    fim_candidatura,
                    inicio_candidatura,
                    entidade,
                    concelho,
                    ilha,
                    idiomas,
                };


                const ofertas = await getOfertasEmpregoByMili({
                    search: searchQuery,
                    page,
                    perPage: 10,
                    tipo_oferta_emprego: tipoOferta,
                    filterObject,
                });

                setData({
                    initialOferta: ofertas,
                });
            } catch (error) {
                console.error("Error fetching job offers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams, tipoOferta]);

    function capitalizeFirstLetter(str: string) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const formattedConfigs = configs?.map((group: any) => ({
        ...group,
        items: group.items.map((item: any) => ({
            ...item,
            label: capitalizeFirstLetter(item.label)
        }))
    }));

    return (
        <div>
            <Banner
                title={title}
                subTitle={subtitle}
                image={
                    headerImage?.url ||
                    "/unsplash_d3nKNw1ILdM.png"
                }
            />

            <div className="container mt-10 mb-11"
                 dangerouslySetInnerHTML={{
                     __html: description || ''
                 }}
            />

            <div className="container w-auto h-auto">
                <div className="flex md:gap-x-12 mb-10 h-auto">
                    <div className="hidden lg:block text-white mt-8">
                        {formattedConfigs && <SidebarFilter data={(formattedConfigs as any) ?? []}/>}
                    </div>

                    <div className="grid gap-y-6 py-4 h-full overflow-hidden">
                        <SearchCard configs={formattedConfigs}/>
                        <TipoOfertaTabs/>
                        {loading ? (
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                                <CardSkeleton/>
                                <CardSkeleton/>
                            </div>
                        ) : data && data.initialOferta.hits.length > 0 ? (
                            <div>
                                <div className='grid grid-cols-2 gap-4'>
                                    {data?.initialOferta?.hits.map(item => (
                                        <CardFormacaoItem
                                            key={item.id}
                                            isSelect={false}
                                            item={item}
                                        />
                                    ))}
                                </div>

                                {data?.initialOferta?.total > data?.initialOferta?.perPage && (
                                    <Pagination
                                        searchParams={searchParams}
                                        totalCountOfRegisters={data?.initialOferta?.total || 0}
                                        currentPage={
                                            searchParams?.page
                                                ? Number(searchParams?.page)
                                                : data?.initialOferta?.page || 1
                                        }
                                        registerPerPage={data?.initialOferta?.perPage}
                                    />
                                )}
                            </div>
                        ) : (
                            <NoItemsFound
                                title="Nenhuma Oferta Encontrada"
                                description="Tente pesquisar por outro termo"
                            />
                        )}
                    </div>
                </div>

                <div className="mt-24">
                    {saiba_mais && <SaibaMais title={"Saiba Mais"} data={saiba_mais}/>}
                </div>
            </div>
        </div>
    );
}
