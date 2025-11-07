import {IAllDocumenNode} from "@/services/getDocumentoList/getAllDocumentos/types";

export const mapper = (data: any): IAllDocumenNode[] => {
    if (!data || !data.documentos) return [];  // Retorna um array vazio em vez de null

    return data.documentos.map((item: any) => ({
        label: item?.title ?? "",
        url: item?.url ?? "",
        file: {
            documentId: item?.file?.documentId ?? "",
            url: item?.file?.url ?? "",
        },
        topicos_servicos: item?.topicos_servicos?.map((topic: any) => ({
            name: topic?.name ?? "",
            slug: topic?.slug ?? "",
        })) ?? [],
    }));
};
