import {IPageDetalheApoioIncentivoData} from "@/services/apoioIncentivo/page-detalhe-apoio-incentivo/types";

export const mapper = (response: any): IPageDetalheApoioIncentivoData | null => {
    if (!response?.pageDetalhesApoio) return null;

    const data = response.pageDetalhesApoio;

    return {
        configs: data?.PageInfo?.configs || {},
        headerImage: {
            formats: data?.PageInfo?.headerImage?.formats || {},
            url: data?.PageInfo?.headerImage?.url || "",
        },
        title: data?.PageInfo?.title || "",
        subtitle: data?.PageInfo?.subtitle || "",
        description: data?.PageInfo?.description || "",
        cms_topico : {
            name : data?.PageInfo?.cms_topico?.name ?? "",
            slug : data?.PageInfo?.cms_topico?.slug ?? "",
        } ,
        saiba_mais: data?.saiba_mais?.map((item: any) => ({
            title: item?.title || "",
            button_label: item?.button_label || "",
            url: item?.url || "",
            url_externo: item?.url_externo || false,
        })) || [],

        session_service: {
            title: data?.session_service?.title || "",
            description: data?.session_service?.description || "",
            button: {
                label: data?.session_service?.button?.label || "",
                url: data?.session_service?.button?.url || "",
                external_link: data?.session_service?.button?.external_link || false,
            },
        },

        session_doc_relev: {
            label: data?.session_doc_relev?.label || "",
            description: data?.session_doc_relev?.description || "",

        },


    };
};
