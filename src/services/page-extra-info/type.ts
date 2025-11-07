import { IPageInfo } from "../page-info/type";

export interface IHeaderImage {
  formats: Record<string, any>;
  url: string;
}

export interface IPageExtraInfo extends IPageInfo {
  session_statistic?: IStatistics;
  session_service?: IServicos;
  session_doc_relev?: IDocs;
  session_entity?: IEntity;
  cms_topico?: ICMSTopic;
}

export interface ISaibaMais {
  id: string;
  title: string;
  url: string;
  url_externo: string;
  button_label: string;
}

export interface IServicos {
  title: string;
  description: string;
  button: {
    label: string;
    url: string;
    external_link: boolean;
  };
}

export interface IStatistics {
  title: string;
  description: string;
  statistic_data: {
    label: string;
    number: string;
  }[];
  acion: {
    label: string;
    url: string;
    external_link: boolean;
  };
}

export interface IEntity {
  title: string;
  description: string;
  image: {
    formats?: string;
    name?: string;
    url: string;
  };
  acion: {
    label: string;
    url: string;
    external_link: boolean;
  };
}

export interface IDocs {
  id?: string;
  label: string;
  description: string;
}

export interface ICMSTopic {
  name?: string;
  slug?: string;
}
