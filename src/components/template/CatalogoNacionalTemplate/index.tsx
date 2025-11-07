"use client"
import {Banner} from "@/components/atoms/banner";
import {SidebarFilter} from "@/components/molecules/FiltersBeta";
import {SearchCard} from "@/components/molecules/SearchCard";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import {ListaCards} from "@/components/organisms/ListCatalogoAndFormacaoAcred/ListCatalogoAndFormacaoAcred";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {INode} from "@/services/catalogo/getDetalheQualificacao/Types/type";
import {IPageListaCatalogoData} from "@/services/catalogo/page-list-catalogo";

export interface ICatalogoDataMeilli extends IPageListaCatalogoData {
    initialDataMeilli?: {
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    searchParams: { [key: string]: string | string[] | undefined };
    highlightedData?: INode[];
}
export function FormacoesCatalogoTemplate({
    title,
    subtitle,
    description,
    configs = {},
    saiba_mais,
    headerImage,
    initialDataMeilli,
    searchParams,
 }: ICatalogoDataMeilli){

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

    return(
        <div>
            <Banner
                title={title}
                subTitle={subtitle}
                image={headerImage?.formats?.medium?.url}
            />

            <div className="container mt-12 mb-8">
                <h1

                    className="text-editor text-[#616E85]"
                    dangerouslySetInnerHTML={
                        {__html: description || ''}
                    }
                />
            </div>

            <div className="container w-auto h-auto mt-16 flex flex-col justify-center">
                <div className="flex md:gap-x-12 overflow-hidden  h-auto">
                {configs && (
                        <div className="text-white hidden lg:block h-auto py-3">
                            <SidebarFilter data={(formattedConfigs as any) ?? []}/>
                        </div>
                    )}

                    <div className="w-full h-full overflow-hidden">
                        <SearchCard configs={formattedConfigs}/>

                        {/* Div Formação */}
                        {(initialDataMeilli?.hits ?? []).length > 0 ? <>
                            <ListaCards
                                data={initialDataMeilli?.hits || []}
                                isButton={true}
                            />

                            {initialDataMeilli!.total > initialDataMeilli!.perPage && (
                                <Pagination
                                    searchParams={searchParams}
                                    totalCountOfRegisters={initialDataMeilli!.total}
                                    currentPage={searchParams?.page ? Number(searchParams?.page) : initialDataMeilli!.page}
                                    registerPerPage={initialDataMeilli!.perPage}
                                />
                            )}

                        </> : <NoItemsFound
                            title="Nenhum Oferta Encontrado"
                            description="Tente pesquisar por outro termo"
                        />
                        }
                    </div>
                </div>

                <div className="mt-8 md:mt-16">
                    <SaibaMais
                        title={'Saiba Mais'}
                        data={saiba_mais}
                    />
                </div>
            </div>
        </div>
    )
}