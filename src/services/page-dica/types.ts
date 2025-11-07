import {IPageInfo} from "@/services/page-info/type";

export interface IPageDicasCarreiraEComoProcurarEmprego extends IPageInfo{
    cms_topico?: {
        name?: string;
        slug?: string;
    }
    session_desc?: {
    label?: string;
    description: string;
}
session_dicas: {
    title: string;
    description: string;
    image?: {
        formats: string;
        url: string;
    }
}[]
conclusao?: {
    label: string;
    description: string;
}

}