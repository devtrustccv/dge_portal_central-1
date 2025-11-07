'use client'
import { useEffect, useState } from "react";
import { SidebarFilter } from "@/components/molecules/FiltersBeta";
import { SaibaMais } from "@/components/atoms/saiba-mais";
import {
    CardFormacaoItem
} from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";
import { SearchCard } from "@/components/molecules/SearchCard";
import { Pagination } from "@/components/molecules/PaginationBeta";
import { NoItemsFound } from "@/components/organisms/NotItemnsFound";
import CardSkeleton from "../OfertaEmpregoTemplate/CardSkeleton";
import { getOfertaFormativaByMeiliSearch } from "@/services/ofertas/getDataMeilliSearchOferta";
import { IPageListaServicoData } from "@/services/page-list-oferta/type";
import {CardInfo} from "@/components/organisms/OfertaFormativas/components/features/CardInfo";
import {usePathname} from "next/navigation";
import {setCookie} from "nookies";

export interface IPageOfertaFormativaData extends IPageListaServicoData {
    searchParams: { [key: string]: string | string[] | undefined };
}

export function ListaOfertaFormativaTemplates({
  configs,
  saiba_mais,
  searchParams,
}: IPageOfertaFormativaData) {
    const [loading, setLoading] = useState(true);
    const [oferta, setOferta] = useState<{
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    }>({ hits: [], total: 0, page: 1, perPage: 3 });
    const pathname = usePathname();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    const page = searchParams?.page ? Number(searchParams.page) : 1;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const searchQuery = String(searchParams?.search || "");
            const entidade = searchParams?.denominacao_entidade ? String(searchParams.denominacao_entidade) : undefined;
            const nivel = searchParams?.nivel ? String(searchParams.nivel) : undefined;
            const familia = searchParams?.familia ? String(searchParams.familia) : undefined;
            const concelho = searchParams?.ilha ? String(searchParams.ilha) : undefined;
            const modalidade = searchParams?.modalidade ? String(searchParams.modalidade) : undefined;
            const periodo_formacao = searchParams?.periodo_formacao ? String(searchParams.periodo_formacao) : undefined;
            const saida_profissional = searchParams?.saidas_profissionais ? String(searchParams.saidas_profissionais) : undefined;
            const data_inicio = searchParams?.inicio_candidatura ? String(searchParams.inicio_candidatura) : undefined;
            const data_fim = searchParams?.fim_candidatura ? String(searchParams.fim_candidatura) : undefined;

            const filterObject = {
                entidade,
                concelho,
                familia,
                periodo_formacao,
                nivel,
                modalidade,
                saida_profissional,
                data_inicio,
                data_fim,
            };

            try {
                const result = await getOfertaFormativaByMeiliSearch({
                    search: searchQuery,
                    page,
                    perPage: 10,
                    filterObject
                });

                setOferta(result);
            } catch (error) {
                console.error("Erro ao buscar ofertas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams, page]);

    const handleLogin = () => {
        const redirectPath = `${process.env.NEXT_PUBLIC_SITE_URL}/ofertas-formativas/candidatura?cursos=${selectedItems?.join(",")}`;
        setCookie(null, "redirect_path", redirectPath, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        const callbackUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
        const loginUrl = `${process.env.NEXT_PUBLIC_CENTRAL_BASE_URL}/api/auth/external/login?redirectUrl=${encodeURIComponent(callbackUrl)}`;
        window.location.href = loginUrl;
    };

    // Funçao para selecionar os cards
    const handleSelectCard = (documentId: string) => {
        if (selectedItems.includes(documentId)) {
            const updatedItems = selectedItems.filter(item => item !== documentId);
            setSelectedItems(updatedItems);

            // Esconde o alerta se a quantidade de itens selecionados for menor que 3
            if (showAlert && updatedItems.length < 3) {
                setShowAlert(false);
            }
        } else if (selectedItems.length < 3) {
            // Adiciona o card se o número de itens selecionados for menor que 3
            setSelectedItems([...selectedItems, documentId]);
        } else {
            // Exibe o alerta se tentar selecionar mais de 3 cards
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 10000); // O alerta será fechado após 10 segundos
        }

    };

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
        <div className="container w-auto h-auto mt-16 flex flex-col justify-center">
            <div className="grid grid-cols-0 lg:grid-cols-[auto_1fr] gap-x-0 md:gap-x-12">
                {configs && (
                    <div className="text-white hidden lg:block h-auto py-3">
                        <SidebarFilter data={(formattedConfigs as any) ?? []}/>
                    </div>
                )}

                <div className="w-full h-full overflow-hidden">
                    <SearchCard configs={formattedConfigs}/>

                    {loading ? (
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 px-4">
                            <CardSkeleton/>
                            <CardSkeleton/>
                        </div>
                    ) : oferta.hits.length > 0 ? (
                        <div>
                            <div>
                                <CardInfo
                                    pathname={pathname}
                                    handleLogin={handleLogin}
                                    showAlert={showAlert}
                                    setShowAlert={setShowAlert}
                                    isSelect={true}
                                    selectedItems={selectedItems}
                                />
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                    {oferta?.hits.map(item => (
                                        <CardFormacaoItem
                                            key={item?.documentId}
                                            isSelect={true}
                                            item={item}
                                            onSelect={handleSelectCard}
                                            selectedItems={selectedItems}
                                        />
                                    ))}
                                </div>
                            </div>

                            {oferta.total > oferta.perPage && (
                                <div
                                    className="max-w-[350px] sm:max-w-full md:w-auto md:h-auto flex justify-center items-start">
                                    <Pagination
                                        searchParams={searchParams}
                                        totalCountOfRegisters={oferta.total}
                                        currentPage={page}
                                        registerPerPage={oferta.perPage}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <NoItemsFound
                            title="Nenhuma oferta encontrada."
                            description="Tenta pesquisar por outro termo."
                        />
                    )}

                </div>
            </div>

            <div className="mt-16">
                {saiba_mais && (
                    <SaibaMais
                        title="Saiba Mais"
                        data={saiba_mais}
                    />
                )}
            </div>
        </div>
    );
}
