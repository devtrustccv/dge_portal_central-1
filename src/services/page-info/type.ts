export interface IHeaderImage {
    formats: Record<string, any>;
    url?: string;
}

export interface IPageInfo {
    configs?: Record<string, any>;
    headerImage?: IHeaderImage;
    title?: string;
    subtitle?: string;
    subtitle2?: string;
    description?: string;
    saiba_mais?: ISaibaMais[]
}

export interface ISaibaMais{
    id: string,
    title: string,
    url: string,
    url_externo: string,
    button_label: string
}