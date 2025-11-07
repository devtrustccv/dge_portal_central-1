import { IServicesConnectionResponse } from "../type";

export const mapper = (
  data: any
): IServicesConnectionResponse | null => {
  if (!data || !data.services_connection) return null;

  return {
    nodes: data.services_connection.nodes.map((node: any, index: number) => ({
      slug: node.slug ?? String(index),
      title: node.title ?? "",
      topic_services : node?.topic_services.map((item:any)=>({
        name : item?.name ?? "",
        slug : item?.slug ?? "",
      })) ?? [],
    })),
    pageInfo: {
      page: data.services_connection.pageInfo.page ?? 1,
      pageCount: data.services_connection.pageInfo.pageCount ?? 1,
      pageSize: data.services_connection.pageInfo.pageSize ?? 10,
      total: data.services_connection.pageInfo.total ?? 0,
    },

  };
};

