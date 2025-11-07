export interface IOfertaEmprego {
  documentId?: string;
  concelho?: string;
  condicoes_acesso?: string;
  fim_candidatura?: string;
  inicio_candidatura?: string;
  slug?: string;
  ilha?: string;

  modelo?: string;

  area_profissional?: string;
  entidade?: string;
  duracao?: string;

  horario?: string;
  idiomas?: {
    label?: string;
  }[];

  n_vagas?: number;
  ref_oferta?: string;
  entidade_image_url?: string;
  title: string;
  description?: string;

  tabs_definicao?:IOfertaEmpregoTabsDefinicao
}

export interface IOfertaEmpregoTabsDefinicao {
  title:string;
  description?:string;
  tabs?:IOfertaEmpregoTabsDefinicaoTab[]

}
export interface IOfertaEmpregoTabsDefinicaoTab {
  label?:string;
  description?:string;
  list_contents:{
    questions?:string;
    response?:string;
  }[]
  
}