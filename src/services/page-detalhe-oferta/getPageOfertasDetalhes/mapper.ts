import {IPageInfoModal} from "@/services/page-detalhe-oferta/type";

export function mapper(response: any): IPageInfoModal | null {
    if (!response) return null;

    const data = response?.detalhesOfertaForm?.PageInfo;

    if (!data) return null;

    return {
        pageInfo: {
            title: data.title,
            subtitle: data.subtitle,
            subtitle2: data.subtitle2,
            description: data.description,
            headerImage: {
                formats: data?.headerImage?.formats,
                url: data?.headerImage?.url,
            },
        },
    }
}
