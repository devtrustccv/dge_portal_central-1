import {IPageApoioIncentivoData} from "@/services/page-apoio-incentivo/types";

export const mapper = (response: any): IPageApoioIncentivoData | null => {
    if (!response?.pageListaDeApoio) return null;

    const data = response.pageListaDeApoio;

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
        },
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
        statistics: {
            title: data?.statistics?.title || "",
            description: data?.statistics?.description || "",
            statistic_data: data?.statistics?.statistic_data?.map((item: any) => ({
                label: item?.label || "",
                number: item?.number || "",
            })) || [],
            acion: {
                label: data?.statistics?.acion?.label || "",
                url: data?.statistics?.acion?.url || "",
                external_link: data?.statistics?.acion?.external_link || false,
            },
        },
        session_doc_relev: {
            label: data?.session_doc_relev?.label || "",
            description: data?.session_doc_relev?.description || "",

        },

        cms_instituicao_entidades_do_setor: {
            title: data?.cms_instituicao_entidades_do_setor?.title || "",
            description: data?.cms_instituicao_entidades_do_setor?.description || "",
            image: {
                formats: data?.cms_instituicao_entidades_do_setor?.image?.formats || "",
                url: data?.cms_instituicao_entidades_do_setor?.image?.url || "",
            },
            acion: {
                label: data?.cms_instituicao_entidades_do_setor?.button?.label || "",
                url: data?.cms_instituicao_entidades_do_setor?.button?.url || "",
                external_link: data?.cms_instituicao_entidades_do_setor?.button?.external_link || false,
            },
        },
    };
};
