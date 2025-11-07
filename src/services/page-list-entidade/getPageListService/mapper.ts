import {IPageListaEntidadeData} from "@/services/page-list-entidade/type";

export const mapper =(data: any): IPageListaEntidadeData | null => {
    if (!data || !data.pageListaEntidade) return null;


    return {
        configs: data.pageListaEntidade.PageInfo.configs || {},
        headerImage: {
            formats: data.pageListaEntidade.PageInfo.headerImage?.formats || {},
            url: data.pageListaEntidade.PageInfo.headerImage?.url || "",
        },
        title: data.pageListaEntidade.PageInfo.title || "",
        subtitle: data.pageListaEntidade.PageInfo.subtitle || "",
        subTilte2: data.pageListaEntidade.PageInfo.subTilte2 || "",
        description: data.pageListaEntidade.PageInfo.description || "",
        saiba_mais: data?.pageListaEntidade?.SaibaMais?.map((item:any)=> ({
            title: item?.title || "",
            button_label: item?.button_label || "",
            url: item?.url || "",
            url_externo: item?.url_externo || false,
        }))


    };
};
