export interface ProfilesAPIResponseDoc {

  tipoDocumentos: Array<{
    title: string;
    codigo: string;
  }>;
  topicServices: Array<{
    name: string;
    slug: string;
  }>;
  activePolicies: Array<{
    label: string;
    slug: string;
  }>;

}

export interface IFilterOptionDoc {
  type?: "group" | "nested" | "select" | "date" | "checkbox";
  value: string;
  label?: string;
  items?: {
    value: string;
    label?: string;
    items?: { value: string; label?: string }[];
  }[];
}

export function mapper(
  response: ProfilesAPIResponseDoc
): IFilterOptionDoc[] {
  const { tipoDocumentos, topicServices, activePolicies} = response;
  const config: IFilterOptionDoc[] = [
  {
    type: "nested",
    value: "tipo_documento",
    label: "Tipo Documento",
    items: tipoDocumentos.map((tip_doc) => ({
      value: tip_doc.title,
      label: tip_doc.title,
    })),
  },
  {
    type: "nested",
    value: "topicos_servicos",
    label: "Topicos Servicos",
    items: topicServices.map((top_servicos) => ({
      value: top_servicos.name,
      label: top_servicos.name,
    })),
  },
  {
    type: "nested",
    value: "politicas_ativas",
    label: "Politicas Ativas",
    items: activePolicies.map((pol_at) => ({
      value: pol_at.label,
      label: pol_at.label,
    })),
  },

  ]
  return [
    ...config,
    /*{
      type: "date",
      value: "date",
      label: "Data",
    },*/
  ];
}
