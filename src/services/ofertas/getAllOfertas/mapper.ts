import { IOfertaFormativaListItem } from "@/services/ofertas/types";

export function mapper(response: any): IOfertaFormativaListItem[] | null {
    const data = response?.ofertasFormativas_connection.nodes;
    if (!data) return null;
    return data?.map((item: any) => ({
        formacao: item.formacao || "",
        denominacao_entidade: item.denominacao_entidade || "",
        url_logo_entidade: item?.url_logo_entidade || "",
        documentId: item?.documentId || "",
        referencia_formacao: item?.referencia_formacao || "",
        duracao: item?.duracao || "",
        periodo_formacao: item?.periodo_formacao || "",
        nivel: item?.nivel || "",
        slug: item?.slug || "",
    }));
}