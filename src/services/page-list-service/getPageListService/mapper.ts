import { IPageListaServicoData } from "../type";

export const mapper = (data: any): IPageListaServicoData | null => {
  if (!data || !data.pageListaServico) return null;

  return {
    configs: data.pageListaServico.PageInfo.configs || {},
    headerImage: {
      formats: data.pageListaServico.PageInfo.headerImage?.formats || '',
      url: data.pageListaServico.PageInfo.headerImage?.url || "",
    },
    title: data.pageListaServico.PageInfo.title || "",
    subtitle: data.pageListaServico.PageInfo.subtitle || "",
    description: data.pageListaServico.PageInfo.description || "",
  };
};
