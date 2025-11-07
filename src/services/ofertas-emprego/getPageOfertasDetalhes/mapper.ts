import { IPageInfoModal } from "@/services/page-detalhe-oferta/type";

export function mapper(response: any): IPageInfoModal | null {
  if (!response) return null;

  const data = response?.pageDetalhesOfertaEmpregoEstagio;

  if (!data) return null;

  return {
    pageInfo: {
      title: data.PageInfo?.title,
      subtitle: data.PageInfo?.subtitle,
      subtitle2: data.PageInfo?.subtitle2,
      description: data.PageInfo?.description,
      headerImage: {
        formats: data?.PageInfo?.headerImage?.formats,
        url: data?.PageInfo?.headerImage?.url,
      },
      saiba_mais: data.saiba_mais || [],
    },
   
  };
}
