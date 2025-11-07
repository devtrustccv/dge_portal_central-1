import {IHeaderImage, ISaibaMais} from "@/services/page-info/type";

export interface IPageInfo {
    headerImage: IHeaderImage;
    title: string;
    subtitle: string;
    subtitle2: string
    description: string;
    saiba_mais?: ISaibaMais[]
}

export interface IPageInfoModal{
    pageInfo: IPageInfo,
}