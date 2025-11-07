import {IPageListaServicoData} from "@/services/page-list-oferta/type";
export const mapper = (data: any): IPageListaServicoData | null => {
    if (!data || !data.pageListaOfertaEmpregoEstagio) return null;

    const  { pageListaOfertaEmpregoEstagio } = data;

    return {
        configs: pageListaOfertaEmpregoEstagio?.PageInfo.configs || [],
        headerImage: {
            formats: pageListaOfertaEmpregoEstagio?.PageInfo.headerImage?.formats || {},
            url: pageListaOfertaEmpregoEstagio?.PageInfo.headerImage?.url || "",
        },
        title: pageListaOfertaEmpregoEstagio?.PageInfo.title || "",
        subtitle: pageListaOfertaEmpregoEstagio?.PageInfo.subtitle || "",
        description: pageListaOfertaEmpregoEstagio?.PageInfo.description || "",
        saiba_mais: pageListaOfertaEmpregoEstagio?.saiba_mais || [],
    };
};
