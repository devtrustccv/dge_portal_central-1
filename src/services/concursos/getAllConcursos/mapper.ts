import {IConcursoConnectionResponse} from "@/services/concursos/types";

export const mapper = (data: any): IConcursoConnectionResponse | null => {
    if (!data || !data.concursos_connection) return null;

    return {
        nodes: data?.concursos_connection?.nodes?.map((node:any, index:number) => ({
            documentId: node?.documentId ?? String(index),
            dataPublication: node?.dataPublication ?? "",
            title : node?.title ?? "",
            medida: node?.medida ?? "",
            concurso_description : node?.concurso_description ?? "",
            edital: node?.edital ?? "",
            estado: node?.estado ?? true
        })),
        pageInfo: {
            page: data.services_connection.pageInfo.page ?? 1,
            pageCount: data.services_connection.pageInfo.pageCount ?? 1,
            pageSize: data.services_connection.pageInfo.pageSize ?? 10,
            total: data.services_connection.pageInfo.total ?? 0,
        },
    }
}