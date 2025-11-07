export interface IAllDocumenNode {
    id?: number,
    label: string,
    url: string,
    file: {
        documentId: string,
        url: string
    },
    topicos_servicos?: {
    name? : string;
    slug? : string;
}[]
}