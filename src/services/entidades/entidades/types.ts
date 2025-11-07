export interface EntidadeFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}
export interface IPagination{
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
export interface PageInfo {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface IContactos{
    title : string;
    type : string;
    value : string;
}
export interface IAlvaras{
    estabelecimento: string;
    number: string;
    address: string;
    date_init : string;
    date_end :string;
    estado:string;
    url_alvara:string;
}
export interface IFormacao{
    name: string;
    nivel: string;
    familia: string;
    metodologia: string;
    modalidade: string;
    num_alvara: string
}

export interface IEntidade{
    slug: string;
    documentId : string;
    name : string;
    ilha : string;
    concelho : string;
    zona : string;
    long_latitude : string;
    contactos?: IContactos[];
    alvara_entidade?: IAlvaras[];
    formacoes?: IFormacao[];
}
export interface IEntidadesData{
    nodes : IEntidade[];
    pageInfo? : IPagination;
}