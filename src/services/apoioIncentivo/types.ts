import {ISaibaMais} from "@/services/page-info/type";

export interface ApoiIncentivoFiltersInput<T = Record<string, unknown>> {
    [key: string]: T;
}

export interface IApoiIncentivo{
    slug: string;
    title: string;
    description: string;
    tabs :{
    title: string;
    description: string;
    tabs :{
        label: string;
        description: string;
        list_contents :{
            questions: string;
            response: string;
        }[]
    }[]
}
medida: string;
session_entity :{
    title: string;
    description: string;
    image :{
        formats: string;
        url: string;
    }
    acion :{
        label: string;
        url: string;
        external_link: boolean;
    }
}
cms_topico: {
    slug: string;
    name: string;
}
saiba_mais : ISaibaMais[];

image :{
    formats: string;
    url: string;
}
}