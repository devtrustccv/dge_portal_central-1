import {IPageListaServicoData} from "@/services/page-list-oferta/type";
export const mapper = (data: any): IPageListaServicoData | null => {
    if (!data || !data.listaOfertaFormativa) return null;

    return {
        configs: data.listaOfertaFormativa.PageInfo.configs || {},
        headerImage: {
            formats: data.listaOfertaFormativa.PageInfo.headerImage?.formats || {},
            url: data.listaOfertaFormativa.PageInfo.headerImage?.url || "",
        },
        title: data.listaOfertaFormativa.PageInfo.title || "",
        subtitle: data.listaOfertaFormativa.PageInfo.subtitle || "",
        description: data.listaOfertaFormativa.PageInfo.description || "",
        saiba_mais: data.listaOfertaFormativa.SaibaMais || [],
    };
};
