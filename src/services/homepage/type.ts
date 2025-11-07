export interface IImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface IImage {
  formats?: {
    small?: IImageFormat;
    medium?: IImageFormat;
    large?: IImageFormat;
    thumbnail?: IImageFormat;
  };
  url: string;
}

export interface IButton {
  id?: string;
  label: string;
  url: string | null;
  external_link: boolean;
}

export interface IBanner {
  title: string;
  description: string;
  image: IImage;
  button: IButton;
  abrir_simulador?:boolean;
}


export interface IServico {
  slug: string;
  title: string;
}

export interface IPerfi {
  name: string;
  description: string;
  icon: IImage;
}

export interface IDadosPerfis {
  titulo: string;
  highlight_title_word: string;
  title_digital_service: string;
  servicos: IServico[];
  perfi: IPerfi;
}

export interface ISectionProfile {
  title: string;
  description: string;
  DadosPerfis: IDadosPerfis[];
}


export interface IOpportunity {
  id: string;
  title: string;
  description: string;
  sub_title: string;
  link: string;
  link_externo: boolean;
  number: number;
}        

export interface ICarouselItem {
  id: string;
  title: string;
  description: string;
  button: IButton;
  image: IImage;
  emphasis: boolean;
}

export interface ISectionOpportunity {
  id: string;
  title: string;
  description: string;
  highlight_title_word: string;
  opportunity: IOpportunity[];
  caroucel: ICarouselItem[];
}


export interface IQuestionariosLink {
  label: string;
  url: string;
  external_link: boolean;
}

export interface IQuestionario {
  title: string;
  Questionarios_Links: IQuestionariosLink[];
}

export interface ISectionVozKreMais {
  id: string;
  title_mobile: IImage;
  title_desktop: IImage;
  description: string;
  questionarios_vos_kres: IQuestionario[];
}


export interface IGraphic {
  id: string;
  label: string;
  number: string;
}

export interface ITestemunho {
  name: string;
  description: string;
  cover: IImage;
  hash_tags: string;
  url: string;
}

export interface ISectionNosStoria {
  id: string;
  title: string;
  description: string;
  graphic: IGraphic[];
  testimunhos: ITestemunho[];
}


export interface IHomePageResponse {
  banner: IBanner[];
  section_profile: ISectionProfile;
  section_opportunity: ISectionOpportunity;
  section_voz_kre_mais: ISectionVozKreMais;
  section_nos_storia: ISectionNosStoria;
}
