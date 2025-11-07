import {IEntidadeNode} from "@/services/entidades/type";
import {IPageListaEntidadeData} from "@/services/page-list-entidade/type";

import {Banner} from "@/components/atoms/banner";
import {SidebarFilter} from "@/components/molecules/FiltersBeta";
import {SearchCard} from "@/components/molecules/SearchCard";
import EntidadeList from "@/components/template/EntidadeListTemplate/EntidadeList";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/atoms/tabs";
import MapaEntidades from "@/components/organisms/EntidadesFormadoras/mapEntidadesDormadoras";
import {SaibaMais} from "@/components/atoms/saiba-mais";

interface EntidadeListTemplateProps extends IPageListaEntidadeData {
    initialEntidades: {
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    allEntidades: {  // Adicionando a propriedade `allEntidades`
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    searchParams: { [key: string]: string | string[] | undefined };
    highlightedEntidades: IEntidadeNode[]
}

const EntidadeListTemplate: React.FC<EntidadeListTemplateProps> = ({
   title,
   subtitle,
   headerImage,
   initialEntidades,
   saiba_mais,
   configs,
   searchParams,
   description,
   allEntidades,
}) => {

    const long_latitude = allEntidades?.hits.map((entidade: { long_latitude: string }) => entidade.long_latitude);
    const name = allEntidades?.hits.map((entidade: { name: string }) => entidade.name);
    const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'

    return (
        <div>
            <Banner title={title} subTitle={subtitle} image={imagem}/>
            <div className="container">
                <div className="py-12 text-editor text-[#616E85]" dangerouslySetInnerHTML={{__html: description || ""}}/>


            <section className="container mx-auto px-4">
                <div className="flex justify-between md:gap-x-12 mb-28">
                        <div className="sticky top-[120px]">
                            {configs && <SidebarFilter data={configs as any}/>}
                        </div>
                    <Tabs defaultValue="lista" className="w-full md:w-full lg:w-[1286px] flex flex-col gap-4">
                        <TabsList className="grid w-full border-none h-[44px] grid-cols-2 rounded-[16px] bg-[#EFF2F5]">
                            <TabsTrigger value="lista"
                                         className="w-full h-[36px] rounded-[13px] data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#334155]">
                                Ver Lista
                            </TabsTrigger>
                            <TabsTrigger value="map"
                                         className="w-full h-[36px] rounded-[13px] data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#334155]">
                                Ver Mapa
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="lista" className="flex flex-col gap-8 w-full ">
                            <div className={`w-full lg:flex-1 flex flex-col gap-8`}>
                                <SearchCard configs={configs}/>
                                {initialEntidades?.hits?.length > 0 ? <>
                                    <EntidadeList entidades={initialEntidades?.hits || []}
                                                  className={"w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"}/>
                                    {initialEntidades?.total > initialEntidades?.perPage && (
                                        <Pagination
                                            searchParams={searchParams}
                                            totalCountOfRegisters={initialEntidades?.total || 0}
                                            currentPage={searchParams?.page ? Number(searchParams?.page) : initialEntidades?.page || 1}
                                            registerPerPage={initialEntidades?.perPage}/>
                                    )}
                                </> : <NoItemsFound title={"Nenhuma Entidade Encontrada"}
                                          description="Tente pesquisar por outro termo"/>
                                }
                            </div>
                        </TabsContent>

                            <TabsContent value="map" className=" w-full h-[500px] md:h-[616px] overflow-hidden">
                                {long_latitude?.length ? (
                                    <MapaEntidades names={name} locations={long_latitude}/>) :
                                    (
                                        <div className="fixed top-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow z-50 transition-all duration-300">
                                            Esta Entidade não possui um Alvará Válido.
                                        </div>
                                    )
                                }
                            </TabsContent>

                    </Tabs>

                </div>
                {saiba_mais && (
                    <SaibaMais title={"Saiba Mais"} data={saiba_mais}/>
                )}
            </section>
            </div>
        </div>
    )
}

export default EntidadeListTemplate;
