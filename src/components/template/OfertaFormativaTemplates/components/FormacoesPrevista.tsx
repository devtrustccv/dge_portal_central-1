import {SearchCard} from "@/components/molecules/SearchCard";
import CardSkeleton from "@/components/template/OfertaEmpregoTemplate/CardSkeleton";
import {CardFormacaoItem} from "@/components/organisms/OfertaFormativas/components/features/CoreComponent";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {Dispatch, SetStateAction, useEffect} from "react";
import {getOfertaFormativaPrevistaByMeiliSearch} from "@/services/ofertas/getDataMeilliSearchOfertaPrevista";
import {CardInfo} from "@/components/organisms/OfertaFormativas/components/features/CardInfo";
import {usePathname} from "next/navigation";
import {Alert} from "@/components/template/OfertaFormativaTemplates/Alert";
import {AlertTriangle} from "lucide-react";

interface FormacoesPrevistaProps{
    formattedConfigs: any
    loading: boolean
    ofertaFormacaoPrevista: {
        hits: any[]
        total: number
        page: number
        perPage: number
    },
    setOfertaFormacaoPrevista: Dispatch<SetStateAction<{
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
    page: number,
    searchParams: {
        [p: string]: string | string[] | undefined
    }
}

export function FormacoesPrevista({
    ofertaFormacaoPrevista,
    setOfertaFormacaoPrevista,
    formattedConfigs,
    loading,
    setLoading,
    page,
    searchParams,
    handleLogin,
    showAlert,
    setShowAlert,
    selectedItems,
}: FormacoesPrevistaProps){
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
                const result = await getOfertaFormativaPrevistaByMeiliSearch({
                    search: searchQuery,
                    page,
                    perPage: 10,
                    filterObject
                });

                setOfertaFormacaoPrevista(result);
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
            ) : ofertaFormacaoPrevista.hits.length > 0 ? (
                <div>
                    <CardInfo
                        pathname={pathname}
                        handleLogin={handleLogin}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                        isSelect={true}
                        selectedItems={selectedItems}
                        alert={
                            <Alert icon={AlertTriangle}>
                                <p>
                                    Apresentação das formações previstas para o ano de 2026.{" "}
                                    <strong>
                                        O período de candidaturas terá início no mês de maio
                                    </strong>
                                </p>
                            </Alert>
                        }
                    />
                    <div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            {ofertaFormacaoPrevista?.hits.map(item => (
                                <CardFormacaoItem
                                    key={item?.documentId}
                                    isSelect={true}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>

                    {ofertaFormacaoPrevista.total > ofertaFormacaoPrevista.perPage && (
                        <div
                            className="max-w-[350px] sm:max-w-full md:w-auto md:h-auto flex justify-center items-start">
                            <Pagination
                                searchParams={searchParams}
                                totalCountOfRegisters={ofertaFormacaoPrevista.total}
                                currentPage={page}
                                registerPerPage={ofertaFormacaoPrevista.perPage}
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