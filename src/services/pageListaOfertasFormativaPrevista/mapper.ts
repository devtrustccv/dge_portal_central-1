import {IPageListaServicoData} from "@/services/page-list-oferta/type";
export const mapper = (data: any): IPageListaServicoData | null => {
    if (!data || !data.pageListaOfertaFormativasPrevista) return null;

    return {
        configs: data.pageListaOfertaFormativasPrevista.PageInfo.configs || {},
        headerImage: {
            formats: data.pageListaOfertaFormativasPrevista.PageInfo.headerImage?.formats || {},
            url: data.pageListaOfertaFormativasPrevista.PageInfo.headerImage?.url || "",
        },
        title: data.pageListaOfertaFormativasPrevista.PageInfo.title || "",
        subtitle: data.pageListaOfertaFormativasPrevista.PageInfo.subtitle || "",
        description: data.pageListaOfertaFormativasPrevista.PageInfo.description || "",
        saiba_mais: data.pageListaOfertaFormativasPrevista.SaibaMais || [],
    };
};