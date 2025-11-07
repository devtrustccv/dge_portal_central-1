import { IGetCSNQ, Nivel } from "@/services/getDataSNQ/types/type";

export function mapper(response: any): IGetCSNQ | null {
    const data = response?.pageSnq;

    if (!response) {
        return null;
    }

    return {
        homeBanner: {
            banner: {
                configs: data?.PageInfo?.configs || {},
                cms_topico: data?.PageInfo?.cms_topico || {},
                headerImage: {
                    formats: data?.PageInfo?.headerImage?.formats || {},
                    url: data?.PageInfo?.headerImage?.url || "",
                },
                title: data?.PageInfo?.title || "",
                subtitle: data?.PageInfo?.subtitle || "",
                subtitle2: data?.PageInfo?.subtitle2 || "",
                description: data?.PageInfo?.description || "",
                saiba_mais: data?.SaibaMais || [],
            },
            description: data?.PageInfo?.description || "",
        },

        qualificao_title: {
            id: data?.qualificao_title?.id || "",
            label: data?.qualificao_title?.label || "",
            denominacao: data?.qualificao_title?.denominacao || "",
        },

        nivels_connection: {
            estruturaTitle: data?.estrutura_title || "",
            niveis: data?.nivels_connection?.nodes?.map((node: any): Nivel => ({
                documentId: node?.documentId || "",
                title: node?.title || "",
                descriptions: node?.description?.map((desc: any) => ({
                    id: desc?.id || "",
                    label: desc?.questions || "",
                    denominacao: desc?.response || "",
                })) || [],
            })) || [],
        },

        section_catalogo: {
            id: data?.section_catalogo?.id || "",
            title: data?.section_catalogo?.title || "",
            description: data?.section_catalogo?.description || "",
            button: data?.section_catalogo?.button || "",
        },

        section_doc_relevante: {
            id: data?.session_doc_relev?.id || "",
            label: data?.session_doc_relev?.label || "",
            description: data?.session_doc_relev?.description || "",
        },

        familia_profissional: {
            nodes: data?.familia_proficionals_connection?.nodes?.map((node: any) => ({
                code: node?.code || "",
                documentId: node?.documentId || "",
                title: node?.title || "",
            })) || [],
        },

        outros_componentes: {
            outros_title: data?.outros_title || "",
            componentes: data?.componentes?.map((componente: any) => ({
                id: componente?.id || "",
                title: componente?.title || "",
                description: componente?.description || "",
                button: componente?.button || "",
            })) || [],
        },
    };
}