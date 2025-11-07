import {IPageListaDocumentos} from "@/services/page-list-documentos/type";

export const mapper =(data: any): IPageListaDocumentos | null => {
    if (!data || !data.listaDocumento) return null;


    return {
        configs: data.listaDocumento.PageInfo.configs || {},
        headerImage: {
            formats: data.listaDocumento.PageInfo.headerImage?.formats || {},
            url: data.listaDocumento.PageInfo.headerImage?.url || "",
        },
        title: data.listaDocumento.PageInfo.title || "",
        subtitle: data.listaDocumento.PageInfo.subtitle || "",
        description: data.listaDocumento.PageInfo.description || "",
        doc_destaque: data?.listaDocumento?.documentos_destaque.map((doc: any)=>({
            title: doc?.title || "",
            documentId: doc?.documentId || "",
            tipo_documento: {
                title: doc?.tipo_documento?.title || "",
            },
            createdAt: doc?.createdAt || "",
            publishedAt: doc?.publishedAt || "",
            url: doc?.url || "",
            fifle : {
                url : doc?.file?.url || "",
            }
        }))

    };
};