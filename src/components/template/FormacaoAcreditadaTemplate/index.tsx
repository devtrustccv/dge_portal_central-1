"use client"
import {Banner} from "@/components/atoms/banner";
import {SearchCard} from "@/components/molecules/SearchCard";
import {SaibaMais} from "@/components/atoms/saiba-mais";
import {ListaCards} from "@/components/organisms/ListCatalogoAndFormacaoAcred/ListCatalogoAndFormacaoAcred";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {INode} from "@/services/catalogo/getDetalheQualificacao/Types/type";
import {IPageListaCatalogoData} from "@/services/catalogo/page-list-catalogo";
import {SidebarFilter} from "@/components/molecules/FiltersBeta";

export interface ICatalogoDataMeilli extends IPageListaCatalogoData {
    initialDataMeilli: {
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    searchParams: { [key: string]: string | string[] | undefined };
    highlightedData?: INode[];

}
export function FormacaoAcreditadaTemplate({
    title,
    subtitle,
    description,
    configs = {},
    saiba_mais,
    headerImage,
    initialDataMeilli,
    searchParams,
 }: ICatalogoDataMeilli){

    const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'

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
                image={imagem}
            />

            <div className="container py-7">
                <div
                    className="text-editor text-[#616E85]"
                    dangerouslySetInnerHTML={
                        {__html: description || ''}
                    }
                />
            </div>

            <div className="container w-auto h-auto">
                <div className="flex md:gap-x-12 overflow-hidden">

                    {configs && (
                        <div className="text-white hidden lg:block h-auto py-3">
                            <SidebarFilter data={(formattedConfigs as any) ?? []}/>
                        </div>
                    )}

                    <div className="w-[1286px] py-4 h-full overflow-hidden">
                        <SearchCard configs={formattedConfigs}/>

                        {/* Div Formação */}
                        {initialDataMeilli?.hits?.length > 0 ? <>
                            <ListaCards
                                data={initialDataMeilli?.hits || []}
                                isButton={false}
                            />

                            {initialDataMeilli?.total > initialDataMeilli?.perPage && (
                                <Pagination
                                    searchParams={searchParams}
                                    totalCountOfRegisters={initialDataMeilli?.total || 0}
                                    currentPage={searchParams?.page ? Number(searchParams?.page) : initialDataMeilli?.page || 1}
                                    registerPerPage={initialDataMeilli?.perPage}
                                />
                            )}

                        </> : <div className="mt-6">
                            <NoItemsFound
                                title="Nenhuma Oferta Encontrada"
                                description="Tente pesquisar por outro termo"
                            />
                        </div>
                        }
                    </div>
                </div>

                {saiba_mais && <div><SaibaMais title={"Saiba Mais"} data={saiba_mais}/></div>}
            </div>
        </div>
    )
}