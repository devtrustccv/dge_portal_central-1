import {IPageInfo} from "@/services/page-info/type";

export interface IPageFormadorFp extends IPageInfo{
    cms_topico?: {
        name?: string;
        slug?: string;
    }
        session_desc :{
            label : string;
            description: string;
        }
        perguntas :{
            questions: string;
            response: string;
        }[]
        session_oferta :{
            label: string;
            description: string;
        }
    formadores?: {
    location : string;
    name: string;
    button: {
        label: string;
        url: string;
        external_link : boolean;
    }

}[]

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
        }

}