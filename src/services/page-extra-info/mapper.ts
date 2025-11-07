import { IPageExtraInfo } from "./type";
export const mapper = (rawData: any): IPageExtraInfo  => {
  const key: string = Object.keys(rawData)[0];

  const data = rawData[key];
  
  return {
    cms_topico: {
      name: data?.PageInfo?.cms_topico?.name ?? "",
      slug: data?.PageInfo?.cms_topico?.slug ?? "",
    },
    headerImage: {
      formats: data?.PageInfo.headerImage?.formats || {},
      url: data?.PageInfo.headerImage?.url || "",
    },
    title: data?.PageInfo.title || "",
    subtitle: data?.PageInfo.subtitle || "",
    subtitle2: data?.PageInfo.subtitle2 || "",
    description: data?.PageInfo.description || "",
    saiba_mais: data?.saiba_mais || [],
    session_service: {
      title: data?.session_service?.title || "",
      description: data?.session_service?.description || "",
      button: {
        label: data?.session_service?.button?.label || "",
        url: data?.session_service?.button?.url || "",
        external_link: data?.session_service?.button?.external_link || false,
      },
    },
    session_statistic: {
      title: data?.session_statistic?.title || "",
      description: data?.session_statistic?.description || "",
      statistic_data:
        data?.session_statistic?.statistic_data.map((item: any) => ({
          label: item?.label || "",
          number: item?.number || "",
        })) || [],
      acion: {
        label: data?.session_statistic?.acion?.label || "",
        url: data?.session_statistic?.acion?.url || "",
        external_link: data?.session_statistic?.acion?.external_link || false,
      },
    },
    session_doc_relev: {
      label: data?.session_doc_relev?.label || "",
      description: data?.session_doc_relev?.description || "",
    },
    session_entity: {
      title: data?.session_entity?.title || "",
      description: data?.session_entity?.description || "",
      image: {
        formats: data?.session_entity?.image?.formats || "",
        url: data?.session_entity?.image?.url || "",
      },
      acion: {
        label: data?.session_entity?.acion?.label || "",
        url: data?.session_entity?.acion?.url || "",
        external_link: data?.session_entity?.acion?.external_link || false,
      },
    },
  };
};
