import {IConcurso} from "@/services/concursos/types";

export const mapper = (data: any): IConcurso[] => {
    if (!data || !data.concursos) return [];

    return data.concursos.map((concurso: any) => ({
        documentId: concurso?.documentId ?? "",
        data_publicacao: concurso?.data_publicacao ?? "",
        title: concurso?.title ?? "",
        slug: concurso?.slug ?? "",
        medida: concurso?.medida ?? "",
        concurso_description: concurso?.concurso_description ?? "",
        url: concurso?.url ?? "",
        url_externo: concurso?.url_externo ?? "",
        edital: concurso?.edital ?? "",
        documentos: concurso?.documentos?.map((item: any) => ({
            id: item?.file?.id ?? "",
            label: item?.label ?? "",
            url: item?.file?.url ?? "",
            file: {
                documentId: item?.documentId ?? "",
                url: item?.url ?? "",
            },
        })) ?? [],
        fonte_recursos: concurso?.fonte_recursos ?? "",
        prazo: concurso?.prazo ?? "",
        publico_alvo: concurso?.publico_alvo ?? "",
        estado: concurso?.estado ?? true,
    }));
};