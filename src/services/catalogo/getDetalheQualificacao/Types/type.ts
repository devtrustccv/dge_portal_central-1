export interface IQuestion {
    id: string;
    questions: string;
    response: string;
}

export interface IProgramaFormativo {
    formats: string[];
}

export interface IFormacao {
    id: string;
    denominacao: string;
    label: string;
}

export interface ICertificado {
    id: string;
    denominacao: string;
    label: string;
}

export interface IEntidade {
    name: string;
    ilha: string;
    documentId: string;
    concelho: string;
    zona: string;
    formacoes?: {
        name: string
    }[];
}

export interface IEntidadeConnection {
    nodes: IEntidade[];
}

export interface ISaibaMais {
    id: string;
    title: string;
    url: string;
    url_externo: string;
    button_label: string;
}

export interface IPageInfo {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface INode {
    documentId: string;
    slug: string,
    nivel: string;
    name: string;
    description: string;
    codigo_qualificacao: string;
    escolaridade_min: string;
    familia: string;
    questions: IQuestion[];
    programaFormativo: IProgramaFormativo;
    formacao: IFormacao[];
    certificado: ICertificado[];
    entidades_connection?: IEntidadeConnection;
    SaibaMais: ISaibaMais[];
}

export interface IQualificacaoModal {
    nodes?: INode[];
    pageInfo?: IPageInfo;
}