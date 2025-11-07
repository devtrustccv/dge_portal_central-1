import {SearchCard} from "@/components/molecules/SearchCard";
import CardSkeleton from "@/components/template/OfertaEmpregoTemplate/CardSkeleton";
import {CardInfo} from "@/components/organisms/OfertaFormativas/components/features/CardInfo";
import {CardFormacaoItem} from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {Dispatch, SetStateAction, useEffect} from "react";
import {usePathname} from "next/navigation";
import {getOfertaFormativaByMeiliSearch} from "@/services/ofertas/getDataMeilliSearchOfertaAbertas";

interface CandidaturasAbertasProps{
    formattedConfigs: any
    loading: boolean
    oferta: {
        hits: any[]
        total: number
        page: number
        perPage: number
    },
    setOferta: Dispatch<SetStateAction<{
        hits: any[]
        total: number
        page: number
        perPage: number
    }>>,
    pathname: string
    handleLogin: () => void,
    showAlert: boolean
    setShowAlert: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    selectedItems: string[],
    handleSelectCard: (documentId: string) => void
    page: number,
    searchParams: {
        [p: string]: string | string[] | undefined
    }
}

export function CandidaturasAbertas({
    formattedConfigs,
    loading,
    setLoading,
    oferta,
    setOferta,
    handleLogin,
    showAlert,
    setShowAlert,
    selectedItems,
    handleSelectCard,
    page,
    searchParams,
}: CandidaturasAbertasProps){
    const pathname = usePathname();

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

    return(
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
    )
}