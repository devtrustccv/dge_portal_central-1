import {IDetalhesEntidades} from "@/services/entidades/pageDetalhesEntidades/types";

export function mapper(response: any): IDetalhesEntidades | null {
    if (!response) return null;

    const data = response?.pageDetalhesEntidade?.PageInfo;

    if (!data) return null;

    return {
        listaDetalhesFormadoras: {
            PageInfo: {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                subtitle2: data.subtitle2,
                description: data.description,
                headerImage: {
                    formats: data?.headerImage?.formats,
                    url: data?.headerImage?.url,
                },
                configs: Array.isArray(data.configs)
                    ? data.configs.map((item: any) => ({
                        items: item?.items || [],
                        label: item?.label || '',
                        value: item?.value || ''
                    }))
                    : []
            },
            SaibaMais: response?.pageDetalhesEntidade?.SaibaMais?.map((item:any)=>({
                id: item?.id,
                title : item?.title,
                url : item?.url,
                url_externo : item?.url_externo,
                button_label : item?.button_label,
            }))
        }
    };
}
