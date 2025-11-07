import {IPageListaServicoData} from "@/services/page-list-oferta/type";
export const mapper = (data: any): IPageListaServicoData | null => {

    if (!data || !data.pageCnq?.PageInfo) return null;

    return {
        configs: data.pageCnq?.PageInfo.configs || {},
        headerImage: {
            formats: data.pageCnq?.PageInfo.headerImage?.formats || {},
            url: data.pageCnq?.PageInfo.headerImage?.url || "",
        },
        title: data.pageCnq?.PageInfo.title || "",
        subtitle: data.pageCnq?.PageInfo.subtitle || "",
        description: data.pageCnq?.PageInfo.description || "",
        saiba_mais: data.pageCnq?.SaibaMais || [],
    };
};
