import {IPageDetalheConcurso} from "./types";

export const mapper =(data: any): IPageDetalheConcurso | null => {
    if (!data || !data.pageDetalhesConcursosEditais) return null;

    return {
        configs: data.pageDetalhesConcursosEditais.PageInfo.configs || {},
        headerImage: {
            formats: data.pageDetalhesConcursosEditais?.PageInfo.headerImage?.formats || {},
            url: data.pageDetalhesConcursosEditais?.PageInfo.headerImage?.url || "",
        },
        title: data.pageDetalhesConcursosEditais?.PageInfo.title || "",
        subtitle: data.pageDetalhesConcursosEditais?.PageInfo.subtitle || "",
        subTilte2: data.pageDetalhesConcursosEditais?.PageInfo.subTilte2 || "",
        description: data.pageDetalhesConcursosEditais?.PageInfo.description || "",
    };
};