import { IPageMedidasApoio } from "../type";
export const mapper = (rawData: any): IPageMedidasApoio | null => {
    
  if (!rawData || !rawData.pageMedidasApoio) return null;

  const data = rawData.pageMedidasApoio;



  return {
    ...data,
    medidas : data.cms_medidas_de_apoio_fp_tipo_medidas,

  };
};
