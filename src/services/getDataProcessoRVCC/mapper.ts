import { IProcessoRvccProps } from "@/services/getDataProcessoRVCC/types/type";

export function mapper(response: any): IProcessoRvccProps | null {
    if (!response) return null;

    const data = response?.pageProcessoRvcc || {};

    return {
        homeBanner: {
            banner: {
                configs: data?.PageInfo?.configs || {},
                headerImage: {
                    formats: data?.PageInfo?.headerImage?.formats || {},
                    url: data?.PageInfo?.headerImage?.url || "",
                },
                title: data?.PageInfo?.title || "",
                subtitle: data?.PageInfo?.subtitle || "",
                subtitle2: data?.PageInfo?.subtitle2 || "",
                description: data?.PageInfo?.description || "",
                saiba_mais: data?.saiba_mais || [],
                cms_topico: data?.PageInfo?.cms_topico || [],
            },
            description: data?.PageInfo?.description || ""
        },

        certificacao_config: {
            id: data?.certificacao_config?.id || "",
            title: data?.certificacao_config?.title || "",
            description: data?.certificacao_config?.description || "",
            tabs: data?.certificacao_config?.tabs?.map((tab: any) => ({
                id: tab?.id || "",
                label: tab?.label || "",
                description: tab?.description || "",
                list_contents: tab?.list_contents?.map((content: any) => ({
                    id: content?.id || "",
                    title: content?.questions || "",
                    description: content?.response || ""
                })) || []
            })) || []
        },

        session_entities_cert: {
            id: data?.session_entities_cert?.id || "",
            title: data?.session_entities_cert?.title || "",
            description: data?.session_entities_cert?.description || "",
            button: data?.session_entities_cert?.button || ""
        },

        tabs_certificacao_comp_profissionais: {
            id: data?.tabs?.id || "",
            title: data?.tabs?.title || "",
            description: data?.tabs?.description || "",
            tabs: data?.tabs?.tabs?.map((tab: any) => ({
                id: tab?.id || "",
                label: tab?.label || "",
                description: tab?.description || "",
                list_contents: tab?.list_contents?.map((content: any) => ({
                    id: content?.id || "",
                    title: content?.questions || "",
                    description: content?.response || ""
                })) || []
            })) || []
        },

        session_doc_relevant: {
            id: data?.session_doc_relev?.id || "",
            label: data?.session_doc_relev?.label || "",
            description: data?.session_doc_relev?.description || "",
            list_contents: data?.session_doc_relev?.list_contents?.map((content: any) => ({
                id: content?.id || "",
                title: content?.label || "",
                url: content?.url || "",
                file: content?.file?.formats || {}
            })) || []
        },

        session_entity: {
            title: data?.session_entity?.title || "",
            description: data?.session_entity?.description || "",
            image: {
                url: data?.session_entity?.image?.formats?.thumbnail?.url || "",
            },
            acion: {
                label: data?.session_entity?.acion?.label || "",
                url: data?.session_entity?.acion?.url || "",
                external_link: data?.session_entity?.acion?.external_link || false,
            },
        },

        estatisticas: {
            id: data?.statistics?.id || "",
            title: data?.statistics?.title || "",
            description: data?.statistics?.description || "",
            action: data?.statistics?.acion || "",
            statistic_data: data?.statistics?.statistic_data?.map((statistic: any) => ({
                id: statistic?.id || "",
                label: statistic?.label || "",
                number: statistic?.number || ""
            })) || []
        },

        session_services: {
            id: data?.session_service?.id || "",
            title: data?.session_service?.title || "",
            description: data?.session_service?.description || "",
            button: data?.session_service?.button || ""
        }
    };
}