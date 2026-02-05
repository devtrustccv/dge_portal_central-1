
import {IPageListaServicoData} from "@/services/page-list-oferta/type";
export const mapper = (data: any): IPageListaServicoData | null => {
    if (!data || !data.pageListaOfertaFormativaArquivada) return null;

    return {
        configs: data.pageListaOfertaFormativaArquivada.PageInfo.configs || {},
        headerImage: {
            formats: data.pageListaOfertaFormativaArquivada.PageInfo.headerImage?.formats || {},
            url: data.pageListaOfertaFormativaArquivada.PageInfo.headerImage?.url || "",
        },
        title: data.pageListaOfertaFormativaArquivada.PageInfo.title || "",
        subtitle: data.pageListaOfertaFormativaArquivada.PageInfo.subtitle || "",
        description: data.pageListaOfertaFormativaArquivada.PageInfo.description || "",
        saiba_mais: data.pageListaOfertaFormativaArquivada.SaibaMais || [],
    };
};
