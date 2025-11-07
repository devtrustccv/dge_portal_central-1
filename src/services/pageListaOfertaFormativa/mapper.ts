import { IListaOfertaFormativa } from "@/services/pageListaOfertaFormativa/types";

export function mapper(response: any): IListaOfertaFormativa | null {
    if (!response) return null;

    const data = response?.listaOfertaFormativa?.PageInfo;

    if (!data) return null;

    return {
        listaOfertaFormativa: {
            PageInfo: {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                headerImage: data.headerImage ? { formats: data.headerImage.formats } : { formats: {} }, // Garante que formats não seja undefined
                configs: Array.isArray(data.configs)
                    ? data.configs.map((item: any) => ({
                        items: item?.items || [],
                        label: item?.label || '',
                        value: item?.value || ''
                    }))
                    : []
            }
        }
    };
}
