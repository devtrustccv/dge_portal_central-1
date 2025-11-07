import {IApoiIncentivo} from "@/services/apoioIncentivo/types";

export const mapper = (response: any): IApoiIncentivo[] | null => {
    if (!response || !response?.apoioEIncentivos) return [];


    return response?.apoioEIncentivos.map((data:any)=>({
        slug: data?.slug || "",
        title: data?.title || "",
        description: data?.description || "",
        tabs: {
            title: data?.tabs?.title || "",
            description: data?.tabs?.description || "",
            tabs: data?.tabs?.tabs?.map((subTab: any) => ({
                label: subTab?.label || "",
                description: subTab?.description || "",
                list_contents: subTab?.list_contents?.map((content: any) => ({
                    questions: content?.questions || "",
                    response: content?.response || "",
                })) || [],
            })) || [],
        },
        medida: data?.medida || "",
        session_entity: {
            title: data?.session_entity?.title || "",
            description: data?.session_entity?.description || "",
            image: {
                formats: data?.session_entity?.image?.formats || "",
                url: data?.session_entity?.image?.url || "",
            },
            acion: {
                label: data?.session_entity?.button?.label || "",
                url: data?.session_entity?.button?.url || "",
                external_link: data?.session_entity?.button?.external_link || false,
            },
        },
        cms_topico: {
            slug: data?.cms_topico?.slug || "",
            name: data?.cms_topico?.name || "",
        },
        saiba_mais: data?.saiba_mais?.map((item: any) => ({
            title: item?.title || "",
            url: item?.url || "",
            button_label: item?.button_label || false,
        })) || [],
        image: {
            formats: data?.image?.formats || "",
            url: data?.image?.url || "",
        },

    }))


}