import {IPageListaQualificacaoAcreditada} from "@/services/page-list-formacao-acreditada/types/type";

export function mapper(response: any) : IPageListaQualificacaoAcreditada | undefined {
    const data = response?.pageLQualificacaoAcredit

    if (!data) return undefined

    return {
        title: data?.PageInfo?.title || "",
        description: data?.PageInfo?.description || "",
        configs: data?.PageInfo?.configs || {},
        subtitle: data?.PageInfo?.subtitle || "",
        subtitle2: data?.PageInfo?.subtitle2 || "",
        headerImage: data?.PageInfo?.headerImage || "",
        saiba_mais: data?.saiba_mais || [],
    }
}