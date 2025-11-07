export interface ServiceFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}
export interface PaginationArg {
    page?: number;
    pageSize?: number;
}

export interface IServiceNode {
    slug: string;
    title: string;
    topic_services?: {
        name?: string;
        slug?: string;
    }[]
}

export interface PageInfo {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
}

export interface IServicesConnectionResponse {
    nodes: IServiceNode[];
    pageInfo: PageInfo;
}



export interface IServiceQuestion {
    question: string;
    response: string | null;
}
export interface IProfile {
    documentId: string;
    name: string;
}

export interface ITopicService {
    documentId: string;
    name: string;
}

export interface IServiceActivePolicy {
    label: string;
    slug: string;
}

export interface IServiceItem {
    documentId: string;
    slug: string;
    title: string;
    avaliacao_media: number;
    total_avaliacao: number;
    description: string;
    url: string;
    url_externo: string;
    questions: IServiceQuestion[];
    profile: IProfile | null;
    topicServices: ITopicService[];
    sectionTitle: string | null;
    activePolicy: IServiceActivePolicy | null;
}

export interface IService {
    slug: string;
    title: string;
    total: string;
    document_id: string;
}

export interface IServiceTopByProfile {
    services: IService[];
    profile_name: string;
    profile_slug: string;
    profile_plurall_name: string;
    profile_icon: string;
    description: string;
}

export interface IServiceSimple {
    slug: string;
    title: string;
    total: string;
    document_id: string;
  }
  
  export interface IServiceTopByProfile {
    services: IServiceSimple[];
    profile_name: string;
    profile_slug: string;
    profile_plurall_name: string;
    profile_icon: string;
    description: string;
  }
  
  export interface IServiceTopProfile {
    icon: string | null;
    name: string | null;
    slug: string | null;
    documentId: string | null;
  }
  
  export interface IServiceTopTopic {
    id: number;
    name: string;
    slug: string;
    documentId: string;
  }
  
  export interface IServiceTopActivePolicie {
    id: number;
    slug: string;
    label: string;
    documentId: string;
  }
  
  export interface IServiceTop {
    slug: string;
    title: string;
    total: string;
    document_id: string;
    profile: IServiceTopProfile;
    active_policie: IServiceTopActivePolicie | null;
    topic_services: IServiceTopTopic[];
  }
  
  export interface IMoreAccessedService {
    service_top_by_profile: IServiceTopByProfile[];
    service_top: IServiceTop[];
  }
  