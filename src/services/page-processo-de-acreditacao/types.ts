import {IPageInfo} from "@/services/page-info/type";

export interface IPageProcessoAcreditacaoData extends IPageInfo {
    cms_topico?: {
        name?: string;
        slug?: string;
    }

    tabs: {
        id?: string;
        title: string;
        description: string;
        tabs: {
            id?: string;
            label: string;
            description: string;
            list_contents: {
                id?: string;
                questions: string;
                response: string;
            }[],
        }[],
    }
    session_service: {
        title: string;
        description: string;
        button: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        },
    },
    statistics: {
        title: string;
        description: string;
        statistic_data: {
            label: string;
            number: string;
        }[],
        acion: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        },
    },
    session_doc_relev: {
        label: string;
        description: string;

    }
    session_entities_acredit: {
        title: string;
        description: string;
        button: {
            label: string;
            url: string;
            external_link: boolean; // Add this property -- KJ
        }
    }

    session_entity: {
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