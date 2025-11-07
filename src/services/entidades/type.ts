export interface EntidadesFormadoraFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}

export interface PaginationArg {
    page?: number;
    pageSize?: number;
}
export interface IEntidadeNode {
    slug: string;
    documentId: string;
    publishedAt?: string,
    name: string;
    concelho : string;
    zona : string;
    formacoes?: {
        name: string
    }[]
}

export interface PageInfo {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface IEntidadesConnectionResponse {
    nodes: IEntidadeNode[];
    pageInfo: PageInfo;
}