import { IPageListaProgramaEmpresarialData } from "@/services/page-list-programa-empresarial/type";
export const mapper = (data: any): IPageListaProgramaEmpresarialData | null => {
  if (!data || !data.pageProgramaEmpresarial) return null;

  const _data = data.pageProgramaEmpresarial;

  return {
    cms_topico: {
      name: _data?.PageInfo?.cms_topico?.name ?? "",
      slug: _data?.PageInfo?.cms_topico?.slug ?? "",
    },
    headerImage: {
      formats: _data.PageInfo.headerImage?.formats || {},
      url: _data.PageInfo.headerImage?.url || "",
    },
    title: _data.PageInfo.title || "",
    subtitle: _data.PageInfo.subtitle || "",
    description: _data.PageInfo.description || "",
    saiba_mais: _data.saiba_mais || [],
    session_service: {
      title: _data?.session_service?.title || "",
      description: _data?.session_service?.description || "",
      button: {
        label: _data?.session_service?.button?.label || "",
        url: _data?.session_service?.button?.url || "",
        external_link: _data?.session_service?.button?.external_link || false,
      },
    },
    session_statistic: {
      title: _data?.session_statistic?.title || "",
      description: _data?.session_statistic?.description || "",
      statistic_data:
        _data?.session_statistic?.statistic_data.map((item: any) => ({
          label: item?.label || "",
          number: item?.number || "",
        })) || [],
      acion: {
        label: _data?.session_statistic?.acion?.label || "",
        url: _data?.session_statistic?.acion?.url || "",
        external_link: _data?.session_statistic?.acion?.external_link || false,
      },
    },
    session_doc_relev: {
      label: _data?.session_doc_relev?.label || "",
      description: _data?.session_doc_relev?.description || "",
    },
    session_entity: {
      title: _data?.session_entity?.title || "",
      description: _data?.session_entity?.description || "",
      image: {
        formats: _data?.session_entity?.image?.formats || "",
        url: _data?.session_entity?.image?.url || "",
      },
      acion: {
        label: _data?.session_entity?.acion?.label || "",
        url: _data?.session_entity?.acion?.url || "",
        external_link: _data?.session_entity?.acion?.external_link || false,
      },
    },
  };
};
