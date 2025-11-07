export interface IHomePage {
    homePage: {
        banner: IBanner;
        section_profile: ISectionProfile;
        section_service: ISectionService;
        section_opportunity: ISectionOpportunity;
        section_voz_kre_mais: ISectionVozKreMais;
        section_nos_storia: ISectionNosStoria;
    };
}

export interface IBanner {
    title: string;
    description: string;
    image?: {
        formats: any;
    };
    button?: IButton;
}

export interface IButton {
    id: string;
    label: string;
    url: string;
}

export interface ISectionProfile {
    title: string;
    description: string;
    profiles: IProfile[];
}

export interface IProfile {
    title: string;
    name: string;
    icon: {
        formats: any;
    };
}

export interface ISectionService {
    id: string;
    title: string;
    services: IService[];
}

export interface IService {
    title: string;
    code: string;
    profile: IProfile;
}

export interface ISectionOpportunity {
    id: string;
    title: string;
    description: string;
    opportunity: IOpportunity[];
    caroucel: ICarousel[];
}

export interface IOpportunity {
    id: string;
    title: string;
    description: string;
    sub_title: string;
    number: number;
}

export interface ICarousel {
    id: string;
    title: string;
    description: string;
    button: IButton;
    image: {
        formats: any;
    };
    emphasis: boolean;
}

export interface ISectionVozKreMais {
    id: string;
    title: string;
    description: string;
    active_policies: IPolicy[];
    vos_kre_mas: IVozKreMas[];
}

export interface IPolicy {
    label: string;
}

export interface IVozKreMas {
    label: string;
    url: string;
    external_link: boolean;
    active_policie: IPolicy;
}

export interface ISectionNosStoria {
    id: string;
    title: string;
    description: string;
    graphic: IGraphic[];
    videos: IVideo[];
}

export interface IGraphic {
    id: string;
    label: string;
    number: number;
}

export interface IVideo {
    id: string;
    title: string;
    name: string;
    description: string;
    url: string;
    cover: {
        formats: any;
    };
}
