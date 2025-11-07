import {IPageInfo} from "@/services/page-info/type";

export interface IPageDetalheApoioIncentivoData extends IPageInfo{
    cms_topico?: {
    name?: string;
    slug?: string;
}

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


}