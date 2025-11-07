import {IPageInfo} from "@/services/page-info/type";

export interface IPageApoioIncentivoData extends IPageInfo{
    cms_topico?: {
    name?: string;
    slug?: string;
}
    statistics :{
        title: string;
        description: string;
        statistic_data :{
            label: string;
            number: string;
        }[],
        acion: {
            label: string;
            url: string;
            external_link: boolean;
        },
    },
    session_doc_relev :{
        label: string;
        description: string;

    }
        session_service :{
            title: string;
            description: string;
            button :{
                label : string;
                url: string;
                external_link: boolean;
            },
        },

    cms_instituicao_entidades_do_setor: {
            title: string;
            description: string;
            image: {
                formats: string;
                url: string;
            }
            acion: {
                label: string;
                url: string;
                external_link: boolean;
            }
}


}