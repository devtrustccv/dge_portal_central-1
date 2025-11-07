import {IPageFormadorFp} from "@/services/page-formador-fp/types";

export const mapper = (response: any): IPageFormadorFp | null => {
    if (!response?.pageFormadorDeFp) return null;

    const data = response.pageFormadorDeFp;

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

        session_desc : {
            label : data?.session_desc?.label ?? "",
            description : data?.session_desc?.description ?? "",
        },
        perguntas : data?.perguntas?.map((item:any)=>({
            questions : item?.questions ?? "",
            response : item?.response ?? "",
        })) || [],

        session_doc_relev: {
            label: data?.session_doc_relev?.label || "",
            description: data?.session_doc_relev?.description || "",

        },
        session_oferta: {
            label: data?.session_oferta?.label || "",
            description: data?.session_oferta?.description || "",
        },
        formadores: data.formadores?.map((item:any)=>({
            location: item?.location ?? "",
            name: item?.name ?? "",
            button: {
                label: item?.button?.label || "",
                url: item?.button?.url || "",
                external_link: item?.button?.external_link || false,
            },
    }))|| [],
        session_service: {
            title: data?.session_service?.title || "",
            description: data?.session_service?.description || "",
            button: {
                label: data?.session_service?.button?.label || "",
                url: data?.session_service?.button?.url || "",
                external_link: data?.session_service?.button?.external_link || false,
            },

        },


    };
};
