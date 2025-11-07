import { IPageProcessoAcreditacaoData } from "@/services/page-processo-de-acreditacao/types";

export const mapper = (response: any): IPageProcessoAcreditacaoData | null => {
    if (!response?.pageProcessoAcreditacao) return null;

    const data = response.pageProcessoAcreditacao;

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
        tabs: {
            id: data?.tabs?.id || "",
            title: data?.tabs?.title || "",
            description: data?.tabs?.description || "",
            tabs: data?.tabs?.tabs?.map((tab: any) => ({
                id: tab?.id || "",
                label: tab?.label || "",
                description: tab?.description || "",
                list_contents: tab?.list_contents?.map((content: any) => ({
                    id: content?.id || '',
                    questions: content?.questions || "",
                    response: content?.response || "",
                })) || [],
            })) || [],
        },
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
        session_entities_acredit: {
            title: data?.session_entities_acredit?.title || "",
            description: data?.session_entities_acredit?.description || "",
            button: {
                label: data?.session_entities_acredit?.button?.label || "",
                url: data?.session_entities_acredit?.button?.url || "",
                external_link: data?.session_entities_acredit?.button?.external_link || false,
            },
        },

        session_entity: {
            title: data?.session_entity?.title || "",
            description: data?.session_entity?.description || "",
            image: {
                formats: data?.session_entity?.image?.formats || "",
                url: data?.session_entity?.image?.url || "",
            },
            acion: {
                label: data?.session_entity?.acion?.label || "",
                url: data?.session_entity?.acion?.url || "",
                external_link: data?.session_entity?.acion?.external_link || false,
            },
        },
    };
};
