import {IPageInfo} from "@/services/page-info/type";

interface IDocumento{
    documentId : string;
    title: string;
    tipo_documento: {
        title: string;
    }
    createdAt: string;
    publishedAt: string;
    url: string;
    fifle : {
        url : string;
    }
}

export interface IPageListaDocumentos extends IPageInfo{
    doc_destaque : IDocumento[];
}