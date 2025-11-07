import {IPageListaDocumentos} from "@/services/page-list-documentos/type";
import {Banner} from "@/components/atoms/banner";
import {FilterOption, SidebarFilter} from "@/components/molecules/FiltersBeta";
import {SearchCard} from "@/components/molecules/SearchCard";
import DocumentosLista from "@/components/template/DocumentoListaTemplate/documentosLista";
import {NoItemsFound} from "@/components/organisms/NotItemnsFound";
import {Pagination} from "@/components/molecules/PaginationBeta";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/atoms/carousel";
import DocComponente from "@/components/template/DocumentoListaTemplate/doc";

interface DocumentoListTemplateProps extends IPageListaDocumentos{
    initialDocumentos: {
        hits: any[];
        total: number;
        page: number;
        perPage: number;
    };
    searchParams: { [key: string]: string | string[] | undefined };
    filtersConfigs: FilterOption[];
}
const DocumentosTemplate: React.FC<DocumentoListTemplateProps> = ({
    title,
    subtitle,
    headerImage,
    doc_destaque,
    initialDocumentos,
    searchParams,
    filtersConfigs
}) => {

    const documentosUnicos = doc_destaque.filter(
        (doc, index, self) =>
            index === self.findIndex((d) => d.documentId === doc.documentId)
    );

    const configF = [
        {
            "type": "daterange",
            "items": [
                {
                    "label": "De",
                    "value": "data_inicio"
                },
                {
                    "label": "Até",
                    "value": "data_fim"
                }
            ],
            "label": "Ano",
            "value": "ano"
        }
    ]

    const imagem = headerImage?.formats?.medium?.url || '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png'
    const documentosUnicosVisible =
        Object.keys(searchParams).length === 0 ||
        (searchParams.data_inicio && !searchParams.data_fim);


    return(
        <section>
            <Banner title={title} subTitle={subtitle} image={imagem}/>

            <div className="container flex justify-between mt-8  md:gap-x-12 mb-16 md:mb-32">
                <aside className="hidden md:block max-w-[312px]">
                    <div className="sticky top-[80px]">
                        {filtersConfigs && configF && (
                            <SidebarFilter data={[...filtersConfigs, ...configF as any, ]} />
                        )}
                    </div>
                </aside>
                <div className="w-[1286px] flex flex-col gap-3 mb-2">
                    <SearchCard configs={filtersConfigs}/>

                    {documentosUnicosVisible &&(
                        <div>
                        <Carousel className="w-full ">
                            <div className="flex justify-between items-center">
                                <h1 className="font-poppins font-normal text-[28px] md:text-[32px] text-[#334155] leading-[80px] tracking-[0%]">
                                    Em destaque
                                </h1>
                                <div className="relative flex gap-2">
                                    <CarouselPrevious className="relative"/>
                                    <CarouselNext className="relative"/>
                                </div>
                            </div>

                            <CarouselContent className="w-full">
                                {documentosUnicos.map((documento, index) => (
                                    <CarouselItem
                                        key={`${documento?.documentId}-${index}`}
                                        className="flex justify-center max-w-full overflow-hidden"
                                    >
                                        <DocComponente documentos={[documento]} className="w-full"/>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    )}
                    <div>
                        {initialDocumentos?.hits?.length > 0 ? <>
                            <h1 className="font-poppins font-normal text-[28px] md:text-[32px] border-t-[1px] mt-6  text-[#334155] leading-[108px] tracking-[0%]">
                                Lista de Documentos
                            </h1>
                            <DocumentosLista className={"flex flex-col gap-4"} documentos={initialDocumentos?.hits}/>
                            {initialDocumentos.total > initialDocumentos?.perPage && (
                                <Pagination
                                    searchParams={searchParams}
                                    totalCountOfRegisters={initialDocumentos?.total || 0}
                                    currentPage={searchParams?.page ? Number(searchParams?.page) : initialDocumentos?.page || 1}
                                    registerPerPage={initialDocumentos?.perPage}
                                />
                            )}

                        </> : <NoItemsFound title={"Nenhum Documento Encontrada"}
                                            description="Tente pesquisar por outro termo"/>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DocumentosTemplate;