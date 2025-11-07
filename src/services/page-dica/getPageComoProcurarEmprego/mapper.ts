import {IPageDicasCarreiraEComoProcurarEmprego} from "@/services/page-dica/types";

export const mapper = (response: any): IPageDicasCarreiraEComoProcurarEmprego | null => {
    if (!response?.pageComoProcurarEmprego) return null;

    const data = response.pageComoProcurarEmprego;

    return {
        configs: data?.PageInfo?.configs || {},
        headerImage: {
            formats: data?.PageInfo?.headerImage?.formats || {},
            url: data?.PageInfo?.headerImage?.url || "/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png",
        },
        title: data?.PageInfo?.title || "",
        subtitle: data?.PageInfo?.subtitle || "",
        description: data?.PageInfo?.description || "",
        cms_topico: data?.PageInfo?.cms_topico
            ? {
                name: data.PageInfo.cms_topico?.name ?? "",
                slug: data.PageInfo.cms_topico?.slug ?? "",
            }
            : { name: "", slug: "" },
        saiba_mais: data?.saiba_mais?.map((item: any) => ({
            title: item?.title || "",
            button_label: item?.button_label || "",
            url: item?.url || "",
            url_externo: item?.url_externo || false,
        })) || [],


        session_dicas: data?.session_dicas?.map((item:any)=>({
            title: item?.title || "",
            description: item?.description || "",
            image: {
                formats: item?.image?.formats || {},
                url: item?.image?.url || "",
            },
        })) || [],

        conclusao: {
            label: data?.conclusao?.label || "",
            description: data?.conclusao?.description || "",

        },

    };
};
