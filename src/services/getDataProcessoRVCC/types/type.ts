import {IHeaderImage} from "@/services/page-info/type";
import {
    ISaibaMais,
} from "@/services/getDataSNQ/types/type";

interface IButton{
    id: string,
    label: string,
    url: string,
    external_link: boolean
}

interface IBanner {
    configs: Record<string, any>;
    headerImage: IHeaderImage;
    title: string;
    subtitle: string;
    subtitle2?: string;
    description: string;
    cms_topico:{
        slug: string,
        name: string,
    },
    saiba_mais?: ISaibaMais[]
}

interface IHomeDataBanner {
    banner: IBanner;
    description: string;
}
/*interface IFile{
    formats: {
        thumbnail: {
            url: string,
        },
    }
}*/

interface IListConteudos{
    id: string,
    title: string,
    description?: string
    url?: string,
    file?: string
}

interface ITabs{
    id: string,
    label: string,
    description: string,
    list_contents?: IListConteudos[]
}

export interface ICertificacaoConfig{
    id: string,
    title: string,
    description: string,
    tabs: ITabs[],
}

export interface SessionEntitiesCertificado{
    id?: string,
    title: string,
    description: string,
    button: {
        id?: string,
        label: string,
        url: string,
        external_link: boolean
    }
}

export interface ITabsCertificacao_comp_profissionais{
    id: string,
    title: string,
    description: string,
    tabs: ITabs[],
}

export interface ISessionDocRelevant{
    id: string,
    label: string,
    description: string,
    list_contents: IListConteudos[]
}

export interface ISessionEntity{
    title: string;
    description: string;
    image: {

        url: string;
    };
    acion: {
        label: string;
        url: string;
        external_link: boolean;
    };
}

interface IEstatisticas{
    id: string,
    title: string,
    description: string,
    action: IButton,
    statistic_data:{
        id: string,
        label: string,
        number: number
    }
}

export interface ISessionServices{
    id: string,
    title: string,
    description: string,
    button: IButton
}

export interface IProcessoRvccProps{
    homeBanner?: IHomeDataBanner,
    certificacao_config?: ICertificacaoConfig,
    session_entities_cert?: SessionEntitiesCertificado,
    tabs_certificacao_comp_profissionais?: ITabsCertificacao_comp_profissionais,
    session_doc_relevant?: ISessionDocRelevant,
    session_entity?: ISessionEntity,
    estatisticas?: IEstatisticas,
    session_services?: ISessionServices
}