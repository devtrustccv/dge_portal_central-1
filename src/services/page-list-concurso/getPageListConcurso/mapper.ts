import {IPageListaConcurso} from "@/services/page-list-concurso/type";

export const mapper =(data: any): IPageListaConcurso | null => {
    if (!data || !data.pageConcursosEditais) return null;


    return {
        configs: data.pageConcursosEditais.PageInfo.configs || {},
        headerImage: {
            formats: data.pageConcursosEditais.PageInfo.headerImage?.formats || {},
            url: data.pageConcursosEditais.PageInfo.headerImage?.url || "",
        },
        title: data.pageConcursosEditais.PageInfo.title || "",
        subtitle: data.pageConcursosEditais.PageInfo.subtitle || "",
        subTilte2: data.pageConcursosEditais.PageInfo.subTilte2 || "",
        description: data.pageConcursosEditais.PageInfo.description || "",
        saiba_mais: data?.pageConcursosEditais?.SaibaMais?.map((item:any)=> ({
            title: item?.title || "",
            button_label: item?.button_label || "",
            url: item?.url || "",
            url_externo: item?.title || false,
        }))


    };
};