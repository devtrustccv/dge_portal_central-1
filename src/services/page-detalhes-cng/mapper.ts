import {IPageDetalheCnq} from "@/services/page-detalhes-cng/type/page-info";
export const mapper = (data: any): IPageDetalheCnq | null => {
    if (!data || !data.pageDetalhesCnq) return null;

    return {
        title: data?.pageDetalhesCnq?.PageInfo?.title || "",
        headerImage: {
            formats: data.pageDetalhesCnq.PageInfo.headerImage?.formats || {},
            url: data.pageDetalhesCnq.PageInfo.headerImage?.url || "",
        },
    };
};
