export interface ConcursoFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}
export interface PaginationArg {
    page?: number;
    pageSize?: number;
}

export interface IConcursoNode{
    slug: string;
    documentId: string;
    data_publicacao: string;
    title: string;
    medida: string;
    concurso_description: string;
    edital: string;
    estado: boolean;
}

export interface PageInfo {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface IConcursoConnectionResponse{
    nodes: IConcursoNode[];
    pageInfo: PageInfo;
}
export interface IDocumentNecessary {
    id?: number,
    label: string,
    url: string,
    file: {
        documentId: string,
        url: string
    },
}

export interface IConcurso{
    slug: string;
    documentId: string;
    data_publicacao: string;
    title: string;
    medida: string;
    concurso_description: string;
    url: string;
    url_externo: string;
    edital: string;
    documentos: IDocumentNecessary[];
    fonte_recursos: string;
    prazo: string;
    publico_alvo: string;
    estado: boolean;
}

export interface IConcursoProps{
    concurso : IConcurso[];
}






