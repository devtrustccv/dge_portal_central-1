import {IPageInfo} from "@/services/page-info/type";

export interface IPageCandidatura extends IPageInfo{
    cms_topico: {
    name : string;
    slug : string
}
    termo_aceitacao? : string;
}