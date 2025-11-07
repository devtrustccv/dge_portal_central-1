import {IEntidadesConnectionResponse} from "@/services/entidades/type";

export const mapper = (
    data: any
): IEntidadesConnectionResponse | null => {
    if (!data || !data.entidadesFormadoras_connection) return null;

    return {
        nodes: data.entidadesFormadoras_connection.nodes.map((node: any, index: number) => ({
            slug: node.slug ?? String(index),
            documentId: node.documentId ?? String(index),
            name: node.name ?? "",
            concelho: node.concelho ?? "",
            zona: node.zona ?? "",
            formacoes: node?.formacoes?.map((item:any)=>({
              name : item?.name ?? ""
                })),
        })),
        pageInfo: {
            page: data.entidadesFormadoras_connection.pageInfo.page ?? 1,
            pageCount: data.entidadesFormadoras_connection.pageInfo.pageCount ?? 1,
            pageSize: data.entidadesFormadoras_connection.pageInfo.pageSize ?? 10,
            total: data.entidadesFormadoras_connection.pageInfo.total ?? 0,
        },
    }
}