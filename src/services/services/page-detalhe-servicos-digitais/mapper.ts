import {IPageDetalheServicoData} from "@/services/services/page-detalhe-servicos-digitais/type";

export const mapper = (response: any): IPageDetalheServicoData | undefined => {

    const data = response?.pageDetalhesServico

    return {
        configs: data.PageInfo.configs || {},
        headerImage: {
            formats: data.PageInfo.headerImage?.formats || {},
            url: data.PageInfo.headerImage?.url || "",
        },
        title: data.PageInfo.title || "",
        subtitle: data.PageInfo.subtitle || "",
        description: data.PageInfo.description || "",
    };
};

