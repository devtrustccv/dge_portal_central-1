export interface DocumentoFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}
export interface PaginationArg {
    page?: number;
    pageSize?: number;
}

export interface IDocumentoNode{
    title: string;
    documentId: string;
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