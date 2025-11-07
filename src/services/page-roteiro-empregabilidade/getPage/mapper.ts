import { IPageRoteiroEmpregabilidadeData } from "../type";
export const mapper = (data: any): IPageRoteiroEmpregabilidadeData | null => {
  if (!data || !data.pageRoteiroEmpreg) return null;

  const { pageRoteiroEmpreg } = data;

  return {
    configs: pageRoteiroEmpreg?.PageInfo.configs || [],
    headerImage: {
      formats: pageRoteiroEmpreg?.PageInfo.headerImage?.formats || {},
      url: pageRoteiroEmpreg?.PageInfo.headerImage?.url || "",
    },
    title: pageRoteiroEmpreg?.PageInfo.title || "",
    subtitle: pageRoteiroEmpreg?.PageInfo.subtitle || "",
    description: pageRoteiroEmpreg?.PageInfo.description || "",
    saiba_mais: pageRoteiroEmpreg?.saiba_mais || [],

    cards: pageRoteiroEmpreg?.cards || [],
    caroucel:pageRoteiroEmpreg.caroucel,
    soft_skills_info: pageRoteiroEmpreg.soft_skills_info,
    
  };
};
