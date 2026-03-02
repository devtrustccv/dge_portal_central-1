export interface Idioma {
    idioma: string;
    nivel: string;
}

export interface Personal {
    nome?: string;
    email?: string;
    endereco?: string;
    socialMidia?: string;
    telefone?: string;
    foto?: string;
}

export interface Project {
    link?: string;
    nome: string;
    descricao?: string;
}

export interface Education {
    curso: string;
    dataInicio?: string;
    dataFim?: string;
    instituicao: string;
    observacoes?: string;
}

export interface Experience {
    cargo: string;
    local?: string;
    dataFim?: string;
    empresa: string;
    descricao?: string;
    dataInicio?: string;
}

export interface Reference {
    nome: string,
    cargo: string,
    email: string,
    empresa: string,
    telefone: string,
}

export interface Certificate {
    nome: string;
    entidade?: string;
    dataInicio?: string;
    dataConclusao?: string;
}

export interface CurriculoContent {
    skills: string[];
    idiomas: Idioma[];
    summary: string;
    personal: Personal;
    projects?: Project[];
    education?: Education[];
    experience?: Experience[];
    references?: Reference[];
    certificates?: Certificate[];
}

export interface CurriculoCv {
    email: string;
    content: CurriculoContent;
}

export interface CurriculoResponse {
    data: {
        cmsCurriculoCvs: CurriculoCv[];
    };
}