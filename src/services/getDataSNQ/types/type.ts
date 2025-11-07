import {IHeaderImage} from "@/services/page-info/type";

export interface IBanner {
    configs: Record<string, any>;
    headerImage: IHeaderImage;
    title: string;
    subtitle: string;
    subtitle2?: string;
    description: string;
    cms_topico?: {
        slug: string;
        name: string;
    }
    saiba_mais?: ISaibaMais[]
}

interface IHomeDataBanner {
    banner: IBanner;
    description: string;
}

export interface INivelDescription {
    id: string;
    label: string;
    denominacao: string;
}

export interface Nivel {
    documentId: string;
    title: string;
    descriptions: INivelDescription[];
}

export interface INivelsConnection {
    estruturaTitle: string;
    niveis?: Nivel[];
}

export interface IQualificacao{
    id: string,
    label: string,
    denominacao: string,
}

export interface IBotao {
    id: string;
    label: string;
    url: string | null;
    external_link: boolean;
}

export interface ISectionCatalogo {
    id: string;
    title: string;
    description: string;
    button: IBotao;
}

export interface ISectionDocRelevante {
    id: string;
    label: string;
    description: string;
}

export interface IFamiliaProfissional {
    code: string;
    documentId: string;
    title: string;
}

export interface IFamiliaProfissionalConnection {
    nodes: IFamiliaProfissional[];
}

export interface IComponente {
    id: string;
    title: string;
    description: string;
    button: IBotao;
}

export interface IOutrosComponentes {
    outros_title: string;
    componentes: IComponente[];
}

export interface ISaibaMais{
    id: string,
    title: string,
    url: string,
    url_externo: string,
    button_label: string
}

export interface IGetCSNQ{
    homeBanner?: IHomeDataBanner,
    qualificao_title?: IQualificacao,
    nivels_connection?: INivelsConnection,
    section_catalogo?: ISectionCatalogo,
    familia_profissional?: IFamiliaProfissionalConnection,
    outros_componentes?: IOutrosComponentes,
    section_doc_relevante?: ISectionDocRelevante
}